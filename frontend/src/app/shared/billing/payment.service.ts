import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentResult } from './billing.models';
import { ConfigService } from '../config/config.service';
import { BillingService } from './billing.service';
import { SupabaseService } from '../db/supabase.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly API_BASE = '/api/payments';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private supabase: SupabaseService,
    private translate: TranslateService
  ) {}

  async createPayment(planId: string): Promise<PaymentResult> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const config = this.configService.getConfig();
      
      // В демо-режиме сразу активируем тариф
      if (config.demoMode) {
        return this.activateDemoPlan(planId, userId);
      }

      const response = await this.http.post<{paymentUrl: string; paymentId: string}>(
        `${this.API_BASE}/create`,
        { planId, userId }
      ).toPromise();

      if (!response) {
        throw new Error('No response from payment API');
      }

      return {
        success: true,
        paymentUrl: response.paymentUrl,
        paymentId: response.paymentId
      };
    } catch (error: any) {
      console.error('Payment creation error:', error);
      return {
        success: false,
        error: error.message || 'Ошибка создания платежа'
      };
    }
  }

  async checkPaymentStatus(paymentId: string): Promise<{status: string; planId?: string}> {
    try {
      const response = await this.http.get<{status: string; planId?: string}>(
        `${this.API_BASE}/status/${paymentId}`
      ).toPromise();

      if (!response) {
        return { status: 'unknown' };
      }

      return response;
    } catch (error) {
      console.error('Payment status check error:', error);
      return { status: 'unknown' };
    }
  }

  private async activateDemoPlan(planId: string, userId: string): Promise<PaymentResult> {
    // Имитируем успешный платеж в демо-режиме
    return {
      success: true,
      paymentUrl: `${window.location.origin}/payment/success?demo=true&planId=${planId}`,
      paymentId: `demo_${Date.now()}`
    };
  }

  async handlePaymentSuccess(paymentId: string, planId: string): Promise<void> {
    const userId = this.supabase.currentUser?.id;
    if (!userId) return;

    const billingService = new BillingService(this.supabase, this.configService, this.translate);
    const subscription = await billingService.getUserSubscription();
    
    subscription.planId = planId;
    subscription.status = 'active';
    subscription.paymentId = paymentId;
    subscription.currentPeriodStart = new Date();
    subscription.currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 дней
    subscription.usage = {
      resumeGenerations: 0,
      coverLetters: 0,
      interviewPlans: 0,
      lastReset: new Date()
    };

    await billingService.saveSubscription(subscription);
  }
}