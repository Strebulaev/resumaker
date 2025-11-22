import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TariffPlan, UserSubscription } from './billing.models';
import { ConfigService } from '../config/config.service';
import { SupabaseService } from '../db/supabase.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class BillingService {
  private readonly PLANS: TariffPlan[] = [
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

  private currentSubscription = new BehaviorSubject<UserSubscription | null>(null);
  private isDemoMode = false;
  private plans: TariffPlan[] = [];

  constructor(
    private supabase: SupabaseService,
    private configService: ConfigService,
    private translate: TranslateService
  ) {
    this.initializePlans();
    
    this.configService.isConfigLoaded().subscribe(loaded => {
      if (loaded) {
        const config = this.configService.getConfig();
        console.log('Billing service initialized in PRODUCTION mode');
      }
    });

    this.translate.onLangChange.subscribe(() => {
      this.initializePlans();
    });
  }


  private initializePlans(): void {
    this.plans = [
      {
        id: 'free',
        name: this.translate.instant('BILLING.PLANS.FREE.NAME'),
        price: 0,
        dailyLimits: { 
          resumeGenerations: 1, 
          coverLetters: 1, 
          interviewPlans: 1 
        },
        features: [
          this.translate.instant('BILLING.PLANS.FREE.FEATURES.BASIC_GENERATION'),
          this.translate.instant('BILLING.PLANS.FREE.FEATURES.RESUME_LIMIT'),
          this.translate.instant('BILLING.PLANS.FREE.FEATURES.COVER_LETTER_LIMIT'),
          this.translate.instant('BILLING.PLANS.FREE.FEATURES.INTERVIEW_PLAN_LIMIT'),
          this.translate.instant('BILLING.PLANS.FREE.FEATURES.EMAIL_SUPPORT')
        ],
        description: this.translate.instant('BILLING.PLANS.FREE.DESCRIPTION')
      },
      {
        id: 'basic',
        name: this.translate.instant('BILLING.PLANS.BASIC.NAME'),
        price: 290,
        dailyLimits: { 
          resumeGenerations: 5, 
          coverLetters: 5, 
          interviewPlans: 5 
        },
        features: [
          this.translate.instant('BILLING.PLANS.BASIC.FEATURES.ALL_GENERATION'),
          this.translate.instant('BILLING.PLANS.BASIC.FEATURES.RESUME_LIMIT'),
          this.translate.instant('BILLING.PLANS.BASIC.FEATURES.COVER_LETTER_LIMIT'),
          this.translate.instant('BILLING.PLANS.BASIC.FEATURES.INTERVIEW_PLAN_LIMIT'),
          this.translate.instant('BILLING.PLANS.BASIC.FEATURES.PRIORITY_SUPPORT'),
          this.translate.instant('BILLING.PLANS.BASIC.FEATURES.EXTENDED_TEMPLATES')
        ],
        description: this.translate.instant('BILLING.PLANS.BASIC.DESCRIPTION'),
        popular: true
      },
      {
        id: 'pro',
        name: this.translate.instant('BILLING.PLANS.PRO.NAME'),
        price: 790,
        dailyLimits: { 
          resumeGenerations: -1, 
          coverLetters: -1, 
          interviewPlans: -1 
        },
        features: [
          this.translate.instant('BILLING.PLANS.PRO.FEATURES.UNLIMITED_GENERATION'),
          this.translate.instant('BILLING.PLANS.PRO.FEATURES.ALL_FEATURES'),
          this.translate.instant('BILLING.PLANS.PRO.FEATURES.PREMIUM_TEMPLATES'),
          this.translate.instant('BILLING.PLANS.PRO.FEATURES.PERSONAL_SUPPORT'),
          this.translate.instant('BILLING.PLANS.PRO.FEATURES.EARLY_ACCESS'),
          this.translate.instant('BILLING.PLANS.PRO.FEATURES.ANALYTICS')
        ],
        description: this.translate.instant('BILLING.PLANS.PRO.DESCRIPTION')
      }
    ];
  }

  getPlans(): TariffPlan[] {
    return this.plans;
  }

  getPlan(planId: string): TariffPlan {
    const plan = this.plans.find(p => p.id === planId);
    if (!plan) {
      throw new Error(this.translate.instant('BILLING.ERRORS.PLAN_NOT_FOUND', { planId }));
    }
    return plan;
  }

  getCurrentPlan(): TariffPlan {
    const subscription = this.currentSubscription.value;
    return this.getPlan(subscription?.planId || 'free');
  }

  async getUserSubscription(): Promise<UserSubscription> {
    const userId = this.supabase.currentUser?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    try {
      const { data, error } = await this.supabase.client
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Подписка не найдена - создаем бесплатную
          return await this.createFreeSubscription(userId);
        }
        throw error;
      }

      // Преобразуем данные из БД в нашу модель
      const subscription = this.mapDbSubscriptionToModel(data);
      this.currentSubscription.next(subscription);
      return subscription;

    } catch (error) {
      console.error('Error loading subscription from DB:', error);
      // Fallback: создаем бесплатную подписку
      return await this.createFreeSubscription(userId);
    }
  }

  private async createFreeSubscription(userId: string): Promise<UserSubscription> {
    const freeSubscription: UserSubscription = {
      userId,
      planId: 'free',
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      usage: {
        resumeGenerations: 0,
        coverLetters: 0,
        interviewPlans: 0,
        lastReset: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.saveSubscription(freeSubscription);
    return freeSubscription;
  }

  async saveSubscription(subscription: UserSubscription): Promise<void> {
    subscription.updatedAt = new Date();
    
    try {
      // Исправленный upsert - убраны неверные параметры
      const { error } = await this.supabase.client
        .from('user_subscriptions')
        .upsert({
          user_id: subscription.userId,
          plan_id: subscription.planId,
          status: subscription.status,
          current_period_start: subscription.currentPeriodStart.toISOString(),
          current_period_end: subscription.currentPeriodEnd.toISOString(),
          usage: subscription.usage,
          payment_id: subscription.paymentId,
          updated_at: subscription.updatedAt.toISOString()
        }, { 
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error saving subscription to DB:', error);
        localStorage.setItem(`subscription_${subscription.userId}`, JSON.stringify(subscription));
      } else {
        localStorage.removeItem(`subscription_${subscription.userId}`);
      }

      this.currentSubscription.next(subscription);
      
    } catch (error) {
      console.error('Error in saveSubscription:', error);
      localStorage.setItem(`subscription_${subscription.userId}`, JSON.stringify(subscription));
    }
  }

  private mapDbSubscriptionToModel(dbData: any): UserSubscription {
    return {
      userId: dbData.user_id,
      planId: dbData.plan_id,
      status: dbData.status,
      currentPeriodStart: new Date(dbData.current_period_start),
      currentPeriodEnd: new Date(dbData.current_period_end),
      usage: dbData.usage,
      paymentId: dbData.payment_id,
      createdAt: new Date(dbData.created_at),
      updatedAt: new Date(dbData.updated_at)
    };
  }

  async activateFreePlan(): Promise<void> {
    const userId = this.supabase.currentUser?.id;
    if (!userId) return;

    const subscription: UserSubscription = {
      userId,
      planId: 'free',
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      usage: {
        resumeGenerations: 0,
        coverLetters: 0,
        interviewPlans: 0,
        lastReset: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.saveSubscription(subscription);
  }

  async resetDailyUsageIfNeeded(subscription: UserSubscription): Promise<void> {
    const now = new Date();
    const lastReset = new Date(subscription.usage.lastReset);
    
    if (now.getDate() !== lastReset.getDate() || 
        now.getMonth() !== lastReset.getMonth() || 
        now.getFullYear() !== lastReset.getFullYear()) {
      
      subscription.usage = {
        resumeGenerations: 0,
        coverLetters: 0,
        interviewPlans: 0,
        lastReset: now
      };
      
      await this.saveSubscription(subscription);
    }
  }

  getCurrentSubscriptionObservable(): Observable<UserSubscription | null> {
    return this.currentSubscription.asObservable();
  }

  getPaymentMethod(): string {
    return 'yookassa';
  }
}