import { Injectable } from '@angular/core';
import { AIService } from './ai.service';
import { BillingService } from '../billing/billing.service';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AIFeatureAccess {
  hasAccess: boolean;
  reason?: string;
  upgradeRequired?: boolean;
  limitReached?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AIGuardService {
  private currentProviderSubject = new BehaviorSubject<string>('Not configured');

  constructor(
    private aiService: AIService,
    private billingService: BillingService
  ) {
    this.aiService.getCurrentProviderObservable().subscribe(provider => {
      this.currentProviderSubject.next(provider?.name || 'Not configured');
    });
  }

  checkAIConfigured(): boolean {
    return this.aiService.isAnyProviderConfigured();
  }

  getCurrentProviderName(): string {
    return this.currentProviderSubject.value;
  }

  getCurrentProviderNameObservable(): Observable<string> {
    return this.currentProviderSubject.asObservable();
  }

  ensureAIConfigured(): { configured: boolean; message?: string } {
    if (this.checkAIConfigured()) {
      return { configured: true };
    }

    return {
      configured: false,
      message: 'To use this function, you need to configure an AI provider'
    };
  }

  async canUseAIFeature(feature: string): Promise<AIFeatureAccess> {
    if (!this.checkAIConfigured()) {
      return {
        hasAccess: false,
        reason: 'AI provider not configured. Go to AI settings for configuration.'
      };
    }

    try {
      const subscription = await this.billingService.getUserSubscription();
      const plan = this.billingService.getCurrentPlan();

      if (!subscription || !plan) {
        return {
          hasAccess: false,
          reason: 'An active plan is required to use AI functions.',
          upgradeRequired: true
        };
      }

      const featureLimits: { [key: string]: number } = {
        'resume_analysis': plan.dailyLimits.resumeGenerations,
        'cover_letter_generation': plan.dailyLimits.coverLetters,
        'interview_prep': plan.dailyLimits.interviewPlans,
        'github_analysis': plan.dailyLimits.githubAnalyses,
        'career_advice': plan.dailyLimits.resumeGenerations,
        'vacancy_improvement': plan.dailyLimits.resumeGenerations,
        'candidate_matching': plan.dailyLimits.resumeGenerations,
        'skill_assessment': plan.dailyLimits.resumeGenerations
      };

      const featureLimit = featureLimits[feature];

      if (featureLimit !== undefined && featureLimit !== -1) {
        const currentUsage = this.getCurrentUsage(subscription, feature);

        if (currentUsage >= featureLimit) {
          return {
            hasAccess: false,
            reason: `Usage limit exceeded for function "${this.getFeatureName(feature)}". Upgrade your plan to increase the limit.`,
            limitReached: true,
            upgradeRequired: true
          };
        }
      }

      return { hasAccess: true };
    } catch (error) {
      console.error('Error checking AI feature access:', error);
      return {
        hasAccess: false,
        reason: 'Error checking access to AI functions'
      };
    }
  }

  private getCurrentUsage(subscription: any, feature: string): number {
    const usageMap: { [key: string]: keyof any } = {
      'resume_analysis': 'resumeGenerations',
      'cover_letter_generation': 'coverLetters',
      'interview_prep': 'interviewPlans',
      'github_analysis': 'githubAnalyses',
      'career_advice': 'resumeGenerations',
      'vacancy_improvement': 'resumeGenerations',
      'candidate_matching': 'resumeGenerations',
      'skill_assessment': 'resumeGenerations'
    };

    const usageKey = usageMap[feature];
    return subscription.usage?.[usageKey] || 0;
  }

  private getFeatureName(feature: string): string {
    const featureNames: { [key: string]: string } = {
      'resume_analysis': 'Resume Analysis',
      'cover_letter_generation': 'Cover Letter Generation',
      'interview_prep': 'Interview Preparation',
      'career_advice': 'Career Advice',
      'vacancy_improvement': 'Vacancy Improvement',
      'candidate_matching': 'Candidate Matching',
      'github_analysis': 'GitHub Analysis',
      'skill_assessment': 'Skill Assessment'
    };

    return featureNames[feature] || feature;
  }
}