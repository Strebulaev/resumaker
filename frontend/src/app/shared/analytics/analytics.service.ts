import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Person } from '../../person-schema';

export interface AnalyticsData {
  profileViews: number;
  jobApplications: number;
  interviews: number;
  offers: number;
  conversionRates: {
    applicationToInterview: number;
    interviewToOffer: number;
    overallSuccess: number;
  };
  platformStats: {
    hh: PlatformStats;
    superjob: PlatformStats;
  };
  skillsDemand: SkillDemand[];
  salaryTrends: SalaryTrend[];
  lastUpdated: string;
}

export interface PlatformStats {
  applications: number;
  responses: number;
  interviews: number;
  offers: number;
  responseRate: number;
  averageResponseTime: number; // in days
}

export interface SkillDemand {
  skill: string;
  demand: number; // 1-10 scale
  growth: number; // percentage
  averageSalary: number;
}

export interface SalaryTrend {
  position: string;
  currentAverage: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface ApplicationRecord {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  company: string;
  platform: 'hh.ru' | 'superjob.ru';
  appliedAt: string;
  status: 'applied' | 'viewed' | 'responded' | 'interview' | 'offer' | 'rejected';
  responseTime?: number; // days
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = '/api';
  private analytics$ = new BehaviorSubject<AnalyticsData | null>(null);

  constructor(private http: HttpClient) {
    this.loadAnalytics();
  }

  // Get current analytics data
  getAnalytics(): Observable<AnalyticsData | null> {
    return this.analytics$.asObservable();
  }

  // Record a new job application
  recordApplication(application: ApplicationRecord): Observable<boolean> {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<{ success: boolean }>(
      `${this.apiUrl}/analytics/application`,
      application,
      { headers }
    ).pipe(
      map(response => {
        if (response.success) {
          this.refreshAnalytics();
        }
        return response.success;
      }),
      catchError(error => {
        console.error('Record application error:', error);
        // Store locally if API fails
        this.storeApplicationLocally(application);
        return of(false);
      })
    );
  }

  // Update application status
  updateApplicationStatus(applicationId: string, status: ApplicationRecord['status'], notes?: string): Observable<boolean> {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.put<{ success: boolean }>(
      `${this.apiUrl}/analytics/application/${applicationId}`,
      { status, notes },
      { headers }
    ).pipe(
      map(response => {
        if (response.success) {
          this.refreshAnalytics();
        }
        return response.success;
      }),
      catchError(error => {
        console.error('Update application status error:', error);
        // Update locally if API fails
        this.updateApplicationLocally(applicationId, status, notes);
        return of(false);
      })
    );
  }

  // Get application history
  getApplicationHistory(): Observable<ApplicationRecord[]> {
    return this.http.get<{ applications: ApplicationRecord[] }>(`${this.apiUrl}/analytics/applications`).pipe(
      map(response => response.applications),
      catchError(error => {
        console.error('Get application history error:', error);
        return of(this.getStoredApplications());
      })
    );
  }

  // Generate insights and recommendations
  generateInsights(profile: Person): Observable<{
    recommendations: string[];
    skillGaps: string[];
    marketInsights: string[];
  }> {
    return this.getAnalytics().pipe(
      map(analytics => {
        if (!analytics) {
          return {
            recommendations: ['Недостаточно данных для анализа'],
            skillGaps: [],
            marketInsights: []
          };
        }

        return {
          recommendations: this.generateRecommendations(profile, analytics),
          skillGaps: this.identifySkillGaps(profile, analytics),
          marketInsights: this.generateMarketInsights(analytics)
        };
      }),
      catchError(error => {
        console.error('Generate insights error:', error);
        return of({
          recommendations: ['Ошибка генерации рекомендаций'],
          skillGaps: [],
          marketInsights: []
        });
      })
    );
  }

  // Refresh analytics data
  refreshAnalytics(): void {
    this.loadAnalytics();
  }

  // Private methods

  private loadAnalytics(): void {
    this.http.get<{ analytics: AnalyticsData }>(`${this.apiUrl}/analytics`).pipe(
      map(response => response.analytics),
      catchError(error => {
        console.error('Load analytics error:', error);
        return of(this.generateMockAnalytics());
      })
    ).subscribe(analytics => {
      this.analytics$.next(analytics);
    });
  }

  private generateRecommendations(profile: Person, analytics: AnalyticsData): string[] {
    const recommendations: string[] = [];

    // Response rate analysis
    if (analytics.conversionRates.applicationToInterview < 30) {
      recommendations.push('Низкий процент откликов. Рекомендуем улучшить резюме и сопроводительные письма.');
    }

    // Platform performance
    const hhRate = analytics.platformStats.hh.responseRate;
    const sjRate = analytics.platformStats.superjob.responseRate;

    if (hhRate > sjRate * 1.5) {
      recommendations.push('HH.ru показывает лучшие результаты. Увеличьте активность на этой платформе.');
    } else if (sjRate > hhRate * 1.5) {
      recommendations.push('SuperJob показывает лучшие результаты. Рассмотрите увеличение активности там.');
    }

    // Skills analysis
    const highDemandSkills = analytics.skillsDemand.filter(s => s.demand >= 8);
    const userSkills = profile.skills?.map(s => s.name.toLowerCase()) || [];

    const missingSkills = highDemandSkills.filter(skill =>
      !userSkills.some(userSkill => userSkill.includes(skill.skill.toLowerCase()))
    );

    if (missingSkills.length > 0) {
      recommendations.push(`Рассмотрите изучение востребованных навыков: ${missingSkills.slice(0, 3).map(s => s.skill).join(', ')}`);
    }

    // Application timing
    if (analytics.jobApplications > 10) {
      const avgResponseTime = (analytics.platformStats.hh.averageResponseTime + analytics.platformStats.superjob.averageResponseTime) / 2;
      if (avgResponseTime > 7) {
        recommendations.push('Длительное время ожидания откликов. Попробуйте более активные вакансии или улучшите резюме.');
      }
    }

    return recommendations;
  }

  private identifySkillGaps(profile: Person, analytics: AnalyticsData): string[] {
    const userSkills = profile.skills?.map(s => s.name.toLowerCase()) || [];
    const highDemandSkills = analytics.skillsDemand.filter(s => s.demand >= 7);

    return highDemandSkills
      .filter(skill => !userSkills.some(userSkill =>
        userSkill.includes(skill.skill.toLowerCase()) ||
        skill.skill.toLowerCase().includes(userSkill)
      ))
      .map(skill => skill.skill);
  }

  private generateMarketInsights(analytics: AnalyticsData): string[] {
    const insights: string[] = [];

    // Salary trends
    analytics.salaryTrends.forEach(trend => {
      if (trend.trend === 'up' && trend.changePercent > 10) {
        insights.push(`Рост зарплат в позиции "${trend.position}" на ${trend.changePercent.toFixed(1)}%`);
      }
    });

    // Skills demand
    const growingSkills = analytics.skillsDemand.filter(s => s.growth > 15);
    if (growingSkills.length > 0) {
      insights.push(`Быстро растущий спрос на навыки: ${growingSkills.slice(0, 3).map(s => s.skill).join(', ')}`);
    }

    return insights;
  }

  private generateMockAnalytics(): AnalyticsData {
    return {
      profileViews: 45,
      jobApplications: 23,
      interviews: 5,
      offers: 1,
      conversionRates: {
        applicationToInterview: 21.7,
        interviewToOffer: 20,
        overallSuccess: 4.3
      },
      platformStats: {
        hh: {
          applications: 15,
          responses: 4,
          interviews: 3,
          offers: 1,
          responseRate: 26.7,
          averageResponseTime: 5
        },
        superjob: {
          applications: 8,
          responses: 2,
          interviews: 2,
          offers: 0,
          responseRate: 25,
          averageResponseTime: 7
        }
      },
      skillsDemand: [
        { skill: 'Python', demand: 9, growth: 25, averageSalary: 180000 },
        { skill: 'JavaScript', demand: 8, growth: 15, averageSalary: 150000 },
        { skill: 'React', demand: 8, growth: 20, averageSalary: 160000 },
        { skill: 'SQL', demand: 7, growth: 10, averageSalary: 130000 }
      ],
      salaryTrends: [
        { position: 'Python Developer', currentAverage: 180000, trend: 'up', changePercent: 12.5 },
        { position: 'Frontend Developer', currentAverage: 150000, trend: 'up', changePercent: 8.3 }
      ],
      lastUpdated: new Date().toISOString()
    };
  }

  // Local storage fallbacks for offline functionality

  private storeApplicationLocally(application: ApplicationRecord): void {
    const applications = this.getStoredApplications();
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));
  }

  private updateApplicationLocally(applicationId: string, status: ApplicationRecord['status'], notes?: string): void {
    const applications = this.getStoredApplications();
    const index = applications.findIndex(app => app.id === applicationId);

    if (index !== -1) {
      applications[index].status = status;
      if (notes) {
        applications[index].notes = notes;
      }
      localStorage.setItem('applications', JSON.stringify(applications));
    }
  }

  private getStoredApplications(): ApplicationRecord[] {
    const stored = localStorage.getItem('applications');
    return stored ? JSON.parse(stored) : [];
  }
}