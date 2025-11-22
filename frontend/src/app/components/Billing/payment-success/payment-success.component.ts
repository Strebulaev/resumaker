import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { PaymentService } from '../../../shared/billing/payment.service';
import { BillingService } from '../../../shared/billing/billing.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    TranslatePipe
  ]
})
export class PaymentSuccessComponent implements OnInit {
  isLoading = true;
  isSuccess = false;
  planName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private billingService: BillingService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    const paymentId = this.route.snapshot.queryParamMap.get('paymentId');
    const planId = this.route.snapshot.queryParamMap.get('planId');
    const demo = this.route.snapshot.queryParamMap.get('demo');

    if (demo === 'true' && planId) {
      await this.handleDemoSuccess(planId);
    } else if (paymentId && planId) {
      await this.handlePaymentSuccess(paymentId, planId);
    } else {
      this.isSuccess = false;
      this.isLoading = false;
    }
  }

  async handleDemoSuccess(planId: string) {
    try {
      await this.paymentService.handlePaymentSuccess(`demo_${Date.now()}`, planId);
      const plan = this.billingService.getPlan(planId);
      this.planName = plan.name;
      this.isSuccess = true;
      
      this.messageService.add({
        severity: 'success',
        summary: 'Тариф активирован!',
        detail: `Тариф "${plan.name}" успешно активирован в демо-режиме`
      });
    } catch (error: any) {
      this.isSuccess = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: error.message || 'Не удалось активировать тариф'
      });
    } finally {
      this.isLoading = false;
    }
  }

  async handlePaymentSuccess(paymentId: string, planId: string) {
    try {
      // Проверяем статус платежа
      const status = await this.paymentService.checkPaymentStatus(paymentId);
      
      if (status.status === 'succeeded') {
        await this.paymentService.handlePaymentSuccess(paymentId, planId);
        const plan = this.billingService.getPlan(planId);
        this.planName = plan.name;
        this.isSuccess = true;
        
        this.messageService.add({
          severity: 'success',
          summary: 'Оплата успешна!',
          detail: `Тариф "${plan.name}" успешно активирован`
        });
      } else {
        this.isSuccess = false;
        this.messageService.add({
          severity: 'warn',
          summary: 'Платеж обрабатывается',
          detail: 'Ваш платеж находится в обработке. Тариф будет активирован после подтверждения.'
        });
      }
    } catch (error: any) {
      this.isSuccess = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: error.message || 'Произошла ошибка при обработке платежа'
      });
    } finally {
      this.isLoading = false;
    }
  }

  goToDashboard() {
    this.router.navigate(['/profile/view']);
  }

  goToSubscription() {
    this.router.navigate(['/billing/subscription']);
  }
}