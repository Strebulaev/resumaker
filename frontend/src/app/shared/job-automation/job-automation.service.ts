import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap, map, catchError, startWith } from 'rxjs/operators';
import { Person } from '../../person-schema';
import { JobSearchService, JobVacancy, JobApplication, JobSearchParams } from '../job-search/job-search.service';
import { ResumeGenerationService } from '../resume/resume-generation.service';

export interface AutomationSettings {
  enabled: boolean;
  dailyLimit: number;
  platforms: {
    hh: boolean;
    superjob: boolean;
  };
  searchCriteria: JobSearchParams;
  autoApply: boolean;
  notificationEnabled: boolean;
}

export interface AutomationStats {
  lastRun: string;
  jobsFound: number;
  applicationsSent: number;
  successRate: number;
  nextRun: string;
}

export interface DailyReport {
  date: string;
  jobsFound: JobVacancy[];
  applications: JobApplication[];
  stats: AutomationStats;
  recommendations: string[];
}

@Injectable({
  providedIn: 'root'
})
export class JobAutomationService {
  private apiUrl = '/api';

  // Automation state
  private automationEnabled$ = new BehaviorSubject<boolean>(false);
  private lastRun$ = new BehaviorSubject<string | null>(null);
  private stats$ = new BehaviorSubject<AutomationStats | null>(null);

  constructor(
    private http: HttpClient,
    private jobSearchService: JobSearchService,
    private resumeService: ResumeGenerationService
  ) {
    // Load saved settings
    this.loadAutomationSettings();
  }

  // Get automation status
  getAutomationStatus(): Observable<{ enabled: boolean; stats: AutomationStats | null }> {
    return combineLatest([
      this.automationEnabled$,
      this.stats$
    ]).pipe(
      map(([enabled, stats]) => ({ enabled, stats }))
    );
  }

  // Enable/disable automation
  setAutomationEnabled(enabled: boolean): void {
    this.automationEnabled$.next(enabled);
    this.saveAutomationSettings({ enabled });
  }

  // Update automation settings
  updateSettings(settings: Partial<AutomationSettings>): void {
    this.saveAutomationSettings(settings);
  }

  // Run daily automation cycle
  async runDailyAutomation(profile: Person): Promise<DailyReport> {
    const report: DailyReport = {
      date: new Date().toISOString(),
      jobsFound: [],
      applications: [],
      stats: {
        lastRun: new Date().toISOString(),
        jobsFound: 0,
        applicationsSent: 0,
        successRate: 0,
        nextRun: this.getNextRunTime()
      },
      recommendations: []
    };

    try {
      // 1. Update profile analytics
      await this.updateProfileAnalytics(profile);

      // 2. Search for jobs
      const jobs = await this.searchJobs(profile);
      report.jobsFound = jobs;
      report.stats.jobsFound = jobs.length;

      // 3. Generate personalized resumes and apply
      if (jobs.length > 0) {
        const applications = await this.autoApplyToJobs(jobs, profile);
        report.applications = applications;
        report.stats.applicationsSent = applications.length;
        report.stats.successRate = applications.length > 0 ? (applications.length / jobs.length) * 100 : 0;
      }

      // 4. Generate recommendations
      report.recommendations = this.generateRecommendations(profile, report);

      // 5. Send notifications
      await this.sendDailyReport(report);

      // Update stats
      this.stats$.next(report.stats);
      this.lastRun$.next(report.date);

    } catch (error) {
      console.error('Daily automation error:', error);
      report.recommendations.push('Произошла ошибка в автоматизации. Проверьте настройки интеграций.');
    }

    return report;
  }

  // Search for relevant jobs
  private async searchJobs(profile: Person): Promise<JobVacancy[]> {
    const searchParams = this.jobSearchService.getSearchParamsFromProfile(profile);

    // Get stored tokens (in production, get from secure storage)
    const tokens = await this.getStoredTokens();

    const jobs = await this.jobSearchService.searchAllJobs(searchParams, tokens).toPromise() || [];

    // Filter and rank jobs
    return jobs
      .filter(job => (job.matchScore || 0) > 50) // Only high-match jobs
      .slice(0, 10); // Limit to top 10
  }

  // Auto-apply to jobs
  private async autoApplyToJobs(jobs: JobVacancy[], profile: Person): Promise<JobApplication[]> {
    const tokens = await this.getStoredTokens();

    // Generate personalized resumes for each job
    const personalizedApplications = await Promise.all(
      jobs.map(async (job) => {
        try {
          // Generate resume tailored to this job
          const resumeData = await this.resumeService.generateResume(job.title + ' ' + job.description).toPromise();

          // Apply using appropriate platform
          const application = await this.jobSearchService.autoApplyToJobs([job], profile, tokens).toPromise();

          return application || [];
        } catch (error) {
          console.error(`Failed to apply to job ${job.id}:`, error);
          return [];
        }
      })
    );

    return personalizedApplications.flat();
  }

  // Update profile analytics
  private async updateProfileAnalytics(profile: Person): Promise<void> {
    // In production, this would update analytics in the database
    // For now, just log the activity
    console.log('Updating profile analytics for user:', profile.name);
  }

  // Generate AI-powered recommendations
  private generateRecommendations(profile: Person, report: DailyReport): string[] {
    const recommendations: string[] = [];

    if (report.stats.jobsFound === 0) {
      recommendations.push('Не найдено подходящих вакансий. Рассмотрите расширение критериев поиска.');
    }

    if (report.stats.applicationsSent === 0) {
      recommendations.push('Не удалось отправить отклики. Проверьте настройки интеграций с HH.ru и SuperJob.');
    }

    if (report.stats.successRate < 50) {
      recommendations.push('Низкий процент успешных откликов. Рекомендуем обновить резюме или навыки.');
    }

    // AI-based recommendations (simplified)
    if (profile.skills && profile.skills.length < 5) {
      recommendations.push('Добавьте больше навыков в профиль для улучшения релевантности вакансий.');
    }

    if (!profile.experience || profile.experience.length === 0) {
      recommendations.push('Добавьте опыт работы для повышения привлекательности профиля.');
    }

    return recommendations;
  }

  // Send daily report via email/telegram
  private async sendDailyReport(report: DailyReport): Promise<void> {
    // In production, integrate with email service and Telegram bot
    console.log('Daily Report:', report);

    // Send to configured notification channels
    // await this.sendEmailReport(report);
    // await this.sendTelegramReport(report);
  }

  // Get stored OAuth tokens
  private async getStoredTokens(): Promise<{ hh?: string; sj?: string }> {
    // Get tokens from localStorage (in production, use secure storage)
    let hhToken = localStorage.getItem('hh_access_token');
    let sjToken = localStorage.getItem('sj_access_token');

    // Check if tokens need refresh
    if (hhToken) {
      hhToken = await this.ensureValidToken('hh', hhToken);
    }
    if (sjToken) {
      sjToken = await this.ensureValidToken('sj', sjToken);
    }

    return {
      hh: hhToken || undefined,
      sj: sjToken || undefined
    };
  }

  // Ensure token is valid, refresh if needed
  private async ensureValidToken(platform: 'hh' | 'sj', token: string): Promise<string | null> {
    // For now, just return the token. In production, check expiration and refresh
    // This is a simplified implementation
    return token;
  }

  // Load automation settings from storage
  private loadAutomationSettings(): void {
    // In production, load from database
    const settings = localStorage.getItem('automation_settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      this.automationEnabled$.next(parsed.enabled || false);
    }
  }

  // Save automation settings
  private saveAutomationSettings(settings: Partial<AutomationSettings>): void {
    const current = localStorage.getItem('automation_settings');
    const parsed = current ? JSON.parse(current) : {};
    const updated = { ...parsed, ...settings };

    localStorage.setItem('automation_settings', JSON.stringify(updated));
  }

  // Calculate next run time (daily at 2:00 AM)
  private getNextRunTime(): string {
    const now = new Date();
    const nextRun = new Date(now);
    nextRun.setDate(now.getDate() + 1);
    nextRun.setHours(2, 0, 0, 0);

    return nextRun.toISOString();
  }

  // Schedule daily automation (simplified - in production use cron jobs)
  startAutomationScheduler(profile: Person): void {
    // Check every hour if it's time to run
    interval(60 * 60 * 1000).subscribe(() => {
      const now = new Date();
      const shouldRun = now.getHours() === 2 && this.automationEnabled$.value;

      if (shouldRun) {
        this.runDailyAutomation(profile);
      }
    });
  }

  // Get automation history
  getAutomationHistory(): Observable<DailyReport[]> {
    // In production, fetch from database
    return of([]);
  }
}