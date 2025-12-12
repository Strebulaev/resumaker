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
        interviewPlans: 1,
        githubAnalyses: 2
      },
      features: [
        'Базовые функции генерации',
        '1 резюме в день',
        '1 сопроводительное письмо в день',
        '1 план собеседования в день',
        '2 анализа GitHub репозиториев в месяц',
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
        interviewPlans: 5,
        githubAnalyses: 20
      },
      features: [
        'Все функции генерации',
        '5 резюме в день',
        '5 сопроводительных писем в день',
        '5 планов собеседования в день',
        '20 анализов GitHub репозиториев в месяц',
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
        interviewPlans: -1,
        githubAnalyses: -1
      },
      features: [
        'Безлимитная генерация',
        'Все функции платформы',
        'Неограниченные анализы GitHub репозиториев',
        'Премиум шаблоны',
        'Персональная поддержка',
        'Ранний доступ к новым функциям',
        'Аналитика эффективности'
      ],
      description: 'Для профессионалов и рекрутеров'
    }
  ];

  private currentSubscription = new BehaviorSubject<UserSubscription | null>(null);
  private plans: TariffPlan[] = this.PLANS; // Используем статические планы

  constructor(
    private supabase: SupabaseService,
    private configService: ConfigService,
    private translate: TranslateService
  ) {
    console.log('BillingService initialized with:', {
      supabase: !!supabase,
      configService: !!configService,
      translate: !!translate
    });
    
    this.initializePlans();
  }
  
  initializePlans(): void {
    console.log('BillingService: Initializing plans...');
    
    this.plans = [
      {
        id: 'free',
        name: 'Бесплатный',
        price: 0,
        dailyLimits: {
          resumeGenerations: 1,
          coverLetters: 1,
          interviewPlans: 1,
          githubAnalyses: 2
        },
        features: [
          'Базовые функции генерации',
          '1 резюме в день',
          '1 сопроводительное письмо в день',
          '1 план собеседования в день',
          '2 анализа GitHub репозиториев в месяц',
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
          interviewPlans: 5,
          githubAnalyses: 20
        },
        features: [
          'Все функции генерации',
          '5 резюме в день',
          '5 сопроводительных писем в день',
          '5 планов собеседования в день',
          '20 анализов GitHub репозиториев в месяц',
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
          interviewPlans: -1,
          githubAnalyses: -1
        },
        features: [
          'Безлимитная генерация',
          'Все функции платформы',
          'Неограниченные анализы GitHub репозиториев',
          'Премиум шаблоны',
          'Персональная поддержка',
          'Ранний доступ к новым функциям',
          'Аналитика эффективности'
        ],
        description: 'Для профессионалов и рекрутеров'
      }
    ];
    
    console.log('BillingService: Plans initialized:', this.plans);
  }

  async getUserSubscription(): Promise<UserSubscription> {
    const userId = this.supabase.currentUser?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    try {
      console.log('Loading subscription from Supabase for user:', userId);
      
      const { data, error } = await this.supabase.client
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        
        if (error.code === 'PGRST116') {
          // Подписка не найдена - создаем новую
          console.log('Subscription not found, creating free subscription');
          return await this.createFreeSubscription(userId);
        }
        
        // Для других ошибок пробуем создать подписку
        console.warn('Error loading subscription, creating new one:', error.message);
        return await this.createFreeSubscription(userId);
      }

      console.log('Subscription loaded from DB:', data);
      
      const subscription = this.mapDbSubscriptionToModel(data);
      this.currentSubscription.next(subscription);
      return subscription;

    } catch (error) {
      console.error('Unexpected error loading subscription:', error);
      // Создаем бесплатную подписку как fallback
      return await this.createFreeSubscription(userId!);
    }
  }

  async saveSubscription(subscription: UserSubscription): Promise<void> {
    const userId = this.supabase.currentUser?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    subscription.updatedAt = new Date();
    
    try {
      console.log('Saving subscription to Supabase:', subscription);

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
        console.error('Error saving subscription to Supabase:', error);
        throw new Error(`Failed to save subscription: ${error.message}`);
      }

      console.log('Subscription saved successfully');
      this.currentSubscription.next(subscription);
      
    } catch (error) {
      console.error('Failed to save subscription:', error);
      throw error;
    }
  }

  private mapDbSubscriptionToModel(dbData: any): UserSubscription {
    return {
      userId: dbData.user_id,
      planId: dbData.plan_id || 'free',
      status: dbData.status || 'active',
      currentPeriodStart: new Date(dbData.current_period_start),
      currentPeriodEnd: new Date(dbData.current_period_end),
      usage: dbData.usage || {
        resumeGenerations: 0,
        coverLetters: 0,
        interviewPlans: 0,
        githubAnalyses: 0,
        lastReset: new Date()
      },
      paymentId: dbData.payment_id,
      createdAt: new Date(dbData.created_at),
      updatedAt: new Date(dbData.updated_at)
    };
  }

  private async createFreeSubscription(userId: string): Promise<UserSubscription> {
    const freeSubscription: UserSubscription = {
      userId,
      planId: 'free',
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 год
      usage: {
        resumeGenerations: 0,
        coverLetters: 0,
        interviewPlans: 0,
        githubAnalyses: 0,
        lastReset: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.saveSubscription(freeSubscription);
    
    return freeSubscription;
  }

  getPlans(): TariffPlan[] {
    return this.plans;
  }

  getPlan(planId: string): TariffPlan {
    const plan = this.plans.find(p => p.id === planId);
    if (!plan) {
      throw new Error(`Plan not found: ${planId}`);
    }
    return plan;
  }

  getCurrentPlan(): TariffPlan {
    const subscription = this.currentSubscription.value;
    return this.getPlan(subscription?.planId || 'free');
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
        githubAnalyses: 0,
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
        githubAnalyses: 0,
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