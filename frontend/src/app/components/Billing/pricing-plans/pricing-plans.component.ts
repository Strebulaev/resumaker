import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TariffPlan } from '../../../shared/billing/billing.models';
import { BillingService } from '../../../shared/billing/billing.service';
import { PaymentService } from '../../../shared/billing/payment.service';
import { SupabaseService } from '../../../shared/db/supabase.service';
import { ConfigService } from '../../../shared/config/config.service';
import { Tag } from "primeng/tag";
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../../shared/analytics.service';

@Component({
  selector: 'app-pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    CardModule,
    DialogModule,
    ProgressSpinnerModule,
    TranslatePipe
  ]
})
export class PricingPlansComponent implements OnInit {
  plans: TariffPlan[] = [];
  selectedPlan: TariffPlan | null = null;
  showPaymentDialog = false;
  isLoading = false;
  currentPlanId = 'free';

  constructor(
    private billingService: BillingService,
    private paymentService: PaymentService,
    private configService: ConfigService,
    private supabase: SupabaseService,
    private messageService: MessageService,
    private router: Router,
    private translate: TranslateService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.initializePlans();
    this.loadCurrentSubscription();
  }

  private initializePlans(): void {
    try {
      console.log('Initializing plans...');
      this.plans = this.billingService.getPlans();
      console.log('Plans loaded:', this.plans);
      
      if (this.plans.length === 0) {
        console.error('No plans found!');
        // Создаем fallback планы на случай ошибки
        this.plans = this.createFallbackPlans();
      }
    } catch (error) {
      console.error('Error initializing plans:', error);
      this.plans = this.createFallbackPlans();
    }
  }

  private createFallbackPlans(): TariffPlan[] {
    return [
      {
        id: 'free',
        name: 'Бесплатный',
        price: 0,
        dailyLimits: { 
          resumeGenerations: 1, 
          coverLetters: 1, 
          interviewPlans: 1 
        },
        features: [
          'Базовые функции генерации',
          '1 резюме в день',
          '1 сопроводительное письмо в день', 
          '1 план собеседования в день',
          'Поддержка по email'
        ],
        description: 'Для начала карьерного пути'
      },
      {
        id: 'basic',
        name: 'Базовый',
        price: 290,
        dailyLimits: { 
          resumeGenerations: 5, 
          coverLetters: 5, 
          interviewPlans: 5 
        },
        features: [
          'Все функции генерации',
          '5 резюме в день',
          '5 сопроводительных писем в день',
          '5 планов собеседования в день', 
          'Приоритетная поддержка',
          'Расширенные шаблоны'
        ],
        description: 'Для активного поиска работы',
        popular: true
      },
      {
        id: 'pro',
        name: 'PRO',
        price: 790,
        dailyLimits: { 
          resumeGenerations: -1, 
          coverLetters: -1, 
          interviewPlans: -1 
        },
        features: [
          'Безлимитная генерация',
          'Все функции платформы',
          'Премиум шаблоны',
          'Персональная поддержка',
          'Ранний доступ к новым функциям',
          'Аналитика эффективности'
        ],
        description: 'Для профессионалов и рекрутеров'
      }
    ];
  }

  async loadCurrentSubscription() {
    try {
      const subscription = await this.billingService.getUserSubscription();
      this.currentPlanId = subscription.planId;
      console.log('Current subscription:', this.currentPlanId);
    } catch (error) {
      console.error('Error loading subscription:', error);
      this.currentPlanId = 'free';
    }
  }

  selectPlan(plan: TariffPlan) {
    console.log('Selected plan:', plan);
    
    this.analyticsService.trackEvent('select_plan', {
      plan_name: plan.name,
      plan_price: plan.price,
      plan_id: plan.id
    });
    
    if (plan.id === this.currentPlanId) {
      this.messageService.add({
        severity: 'info',
        summary: 'Это ваш текущий тариф',
        detail: `Вы уже используете тариф "${plan.name}"`
      });
      return;
    }

    if (plan.price === 0) {
      this.activateFreePlan(plan);
    } else {
      this.selectedPlan = plan;
      this.showPaymentDialog = true;
    }
  }

  async activateFreePlan(plan: TariffPlan) {
    this.isLoading = true;
    try {
      await this.billingService.activateFreePlan();
      this.currentPlanId = plan.id;
      this.messageService.add({
        severity: 'success',
        summary: 'Тариф активирован',
        detail: `Тариф "${plan.name}" успешно активирован`
      });
      this.router.navigate(['/profile/view']);
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: error.message || 'Не удалось активировать тариф'
      });
    } finally {
      this.isLoading = false;
    }
  }

  async processPayment() {
    if (!this.selectedPlan) return;

    this.analyticsService.trackEcommerceEvent('purchase', {
      transaction_id: `order_${Date.now()}`,
      value: this.selectedPlan.price,
      currency: 'RUB',
      items: [{
        id: this.selectedPlan.id,
        name: this.selectedPlan.name,
        price: this.selectedPlan.price
      }]
    });

    this.isLoading = true;
    try {
      const result = await this.paymentService.createPayment(this.selectedPlan.id);
      
      if (result.success && result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка оплаты',
          detail: result.error || 'Не удалось создать платеж'
        });
      }
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: error.message || 'Произошла ошибка при обработке платежа'
      });
    } finally {
      this.isLoading = false;
      this.showPaymentDialog = false;
    }
  }

  getButtonClass(plan: TariffPlan): string {
    if (plan.id === this.currentPlanId) {
      return 'p-button-outlined';
    }
    return plan.popular ? 'p-button-primary' : 'p-button-outlined';
  }

  closeDialog() {
    this.showPaymentDialog = false;
    this.selectedPlan = null;
  }

  getButtonLabel(plan: any): string {
    if (this.isLoading) {
      return '';
    }
    if (plan.id === this.currentPlanId) {
      return this.translate.instant('BILLING.CURRENT_PLAN_BADGE');
    }
    if (plan.price === 0) {
      return this.translate.instant('BILLING.ACTIVATE_FREE');
    }
    return this.translate.instant('BILLING.SELECT_PLAN');
  }
}