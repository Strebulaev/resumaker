import { Injectable } from '@angular/core';
import { UsageLimit } from './billing.models';
import { BillingService } from './billing.service';
import { SupabaseService } from '../db/supabase.service';

@Injectable({ providedIn: 'root' })
export class UsageService {
  
  constructor(
    private billingService: BillingService,
    private supabase: SupabaseService
  ) {
    console.log('UsageService initialized');
  }

  async getUsageStats(): Promise<{feature: string, used: number, limit: number, remaining: number}[]> {
    const subscription = await this.billingService.getUserSubscription();
    const plan = this.billingService.getPlan(subscription.planId);

    return [
      {
        feature: 'Резюме',
        used: subscription.usage.resumeGenerations,
        limit: plan.dailyLimits.resumeGenerations,
        remaining: plan.dailyLimits.resumeGenerations === -1 ? -1 : plan.dailyLimits.resumeGenerations - subscription.usage.resumeGenerations
      },
      {
        feature: 'Сопроводительные письма',
        used: subscription.usage.coverLetters,
        limit: plan.dailyLimits.coverLetters,
        remaining: plan.dailyLimits.coverLetters === -1 ? -1 : plan.dailyLimits.coverLetters - subscription.usage.coverLetters
      },
      {
        feature: 'Планы собеседований',
        used: subscription.usage.interviewPlans,
        limit: plan.dailyLimits.interviewPlans,
        remaining: plan.dailyLimits.interviewPlans === -1 ? -1 : plan.dailyLimits.interviewPlans - subscription.usage.interviewPlans
      },
      {
        feature: 'Анализы GitHub',
        used: subscription.usage.githubAnalyses,
        limit: plan.dailyLimits.githubAnalyses,
        remaining: plan.dailyLimits.githubAnalyses === -1 ? -1 : plan.dailyLimits.githubAnalyses - subscription.usage.githubAnalyses
      }
    ];
  }

  private async resetDailyUsageIfNeeded(subscription: any): Promise<void> {
    const now = new Date();
    const lastReset = new Date(subscription.usage.lastReset);
    
    // Сбрасываем счетчики если прошло больше 24 часов
    if (now.getDate() !== lastReset.getDate() || now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
      subscription.usage = {
        resumeGenerations: 0,
        coverLetters: 0,
        interviewPlans: 0,
        githubAnalyses: 0,
        lastReset: now
      };
      await this.billingService.saveSubscription(subscription);
    }
  }

  private getFeatureName(feature: string): string {
    const names: {[key: string]: string} = {
      'resumeGenerations': 'Генерация резюме',
      'coverLetters': 'Генерация сопроводительных писем',
      'interviewPlans': 'Генерация планов собеседований',
      'githubAnalyses': 'Анализ GitHub репозиториев'
    };
    return names[feature] || feature;
  }

  async checkLimit(feature: 'resumeGenerations' | 'coverLetters' | 'interviewPlans' | 'githubAnalyses'): Promise<UsageLimit> {
    try {
      const subscription = await this.billingService.getUserSubscription();
      
      // Сбрасываем дневное использование если нужно
      await this.billingService.resetDailyUsageIfNeeded(subscription);
      
      const plan = this.billingService.getPlan(subscription.planId);
      const limit = plan.dailyLimits[feature];
      const used = subscription.usage[feature];

      // Безлимитный тариф
      if (limit === -1) {
        return {
          allowed: true,
          remaining: -1,
          limit: -1,
          feature: this.getFeatureName(feature)
        };
      }

      const remaining = limit - used;
      const allowed = remaining > 0;

      return {
        allowed,
        remaining: Math.max(0, remaining),
        limit,
        feature: this.getFeatureName(feature)
      };
    } catch (error) {
      console.error('Error checking limit:', error);
      // В случае ошибки разрешаем использование
      return {
        allowed: true,
        remaining: -1,
        limit: -1,
        feature: this.getFeatureName(feature)
      };
    }
  }

  async incrementUsage(feature: 'resumeGenerations' | 'coverLetters' | 'interviewPlans' | 'githubAnalyses'): Promise<void> {
    try {
      const subscription = await this.billingService.getUserSubscription();
      const plan = this.billingService.getPlan(subscription.planId);
      
      // Не увеличиваем счетчик для безлимитного тарифа
      if (plan.dailyLimits[feature] === -1) {
        return;
      }

      subscription.usage[feature]++;
      await this.billingService.saveSubscription(subscription);
    } catch (error) {
      console.error('Error incrementing usage:', error);
    }
  }
}