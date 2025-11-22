import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentResult } from './billing.models';
import { ConfigService } from '../config/config.service';
import { SupabaseService } from '../db/supabase.service';
import { TranslateService } from '@ngx-translate/core';
import { BillingService } from './billing.service'; // Добавить импорт

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly API_BASE = '/api/payments';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private supabase: SupabaseService,
    private translate: TranslateService,
    private injector: Injector
  ) {}

  async createPayment(planId: string): Promise<PaymentResult> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      // Для бесплатного тарифа сразу активируем
      if (planId === 'free') {
        await this.activateFreePlan(userId);
        return {
          success: true,
          paymentUrl: undefined,
          paymentId: `free_activation_${Date.now()}`
        };
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

  private async activateFreePlan(userId: string): Promise<void> {
    // Ленивая загрузка BillingService чтобы избежать циклической зависимости
    const billingService = this.injector.get(BillingService);
    await billingService.activateFreePlan();
  }

  async handlePaymentSuccess(paymentId: string, planId: string): Promise<void> {
    const userId = this.supabase.currentUser?.id;
    if (!userId) return;

    // Ленивая загрузка BillingService
    const billingService = this.injector.get(BillingService);
    const subscription = await billingService.getUserSubscription();
    
    subscription.planId = planId;
    subscription.status = 'active';
    subscription.paymentId = paymentId;
    subscription.currentPeriodStart = new Date();
    subscription.currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    subscription.usage = {
      resumeGenerations: 0,
      coverLetters: 0,
      interviewPlans: 0,
      lastReset: new Date()
    };

    await billingService.saveSubscription(subscription);
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
}