import { Injectable } from '@angular/core';
import { SupabaseService } from '../db/supabase.service';
import {
  AnalyticsData,
  DashboardData,
  ReportData,
  Alert,
  ProfileView,
  VacancyView,
  ApplicationStats,
  ConversionRates,
  TimeBasedMetrics,
  GeographicData,
  SkillDemand,
  IndustryTrend,
  Insight,
  Recommendation,
  InsightType,
  ImpactLevel,
  RecommendationType,
  PriorityLevel
} from './analytics.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private dashboardDataSubject = new BehaviorSubject<DashboardData | null>(null);
  public dashboardData$ = this.dashboardDataSubject.asObservable();

  constructor(private supabaseService: SupabaseService) {}

  async getAnalyticsData(userId: string, dateRange?: { start: Date; end: Date }): Promise<AnalyticsData> {
    const { data, error } = await this.supabaseService.client
      .from('analytics_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async trackProfileView(profileView: Omit<ProfileView, 'id'>): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('profile_views')
      .insert({
        profile_id: profileView.profileId,
        viewer_id: profileView.viewerId,
        viewer_type: profileView.viewerType,
        viewed_at: profileView.viewedAt.toISOString(),
        duration: profileView.duration,
        source: profileView.source,
        device_info: profileView.deviceInfo
      });

    if (error) throw error;
  }

  async trackVacancyView(vacancyView: Omit<VacancyView, 'id'>): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('vacancy_views')
      .insert({
        vacancy_id: vacancyView.vacancyId,
        viewer_id: vacancyView.viewerId,
        viewed_at: vacancyView.viewedAt.toISOString(),
        applied: vacancyView.applied,
        time_to_apply: vacancyView.timeToApply,
        source: vacancyView.source
      });

    if (error) throw error;
  }

  async getApplicationStats(userId: string): Promise<ApplicationStats> {
    const { data, error } = await this.supabaseService.client
      .from('application_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async getConversionRates(userId: string): Promise<ConversionRates> {
    const { data, error } = await this.supabaseService.client
      .from('conversion_rates')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async getTimeBasedMetrics(userId: string, period: string): Promise<TimeBasedMetrics> {
    const { data, error } = await this.supabaseService.client
      .from('time_based_metrics')
      .select('*')
      .eq('user_id', userId)
      .eq('period', period)
      .single();

    if (error) throw error;
    return data;
  }

  async getGeographicData(userId: string): Promise<GeographicData> {
    const { data, error } = await this.supabaseService.client
      .from('geographic_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async getSkillDemand(): Promise<SkillDemand[]> {
    const { data, error } = await this.supabaseService.client
      .from('skill_demand')
      .select('*')
      .order('demand', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getIndustryTrends(): Promise<IndustryTrend[]> {
    const { data, error } = await this.supabaseService.client
      .from('industry_trends')
      .select('*')
      .order('growth', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getDashboardData(userId: string): Promise<DashboardData> {
    const [analytics, alerts] = await Promise.all([
      this.getAnalyticsData(userId),
      this.getAlerts(userId)
    ]);

    const dashboardData: DashboardData = {
      overview: {
        totalViews: analytics.profileViews.length,
        totalApplications: analytics.applicationStats.totalApplications,
        activeVacancies: 0, // This would come from vacancy service
        responseRate: analytics.applicationStats.responseRate,
        averageResponseTime: analytics.applicationStats.averageResponseTime,
        topPerformingProfile: '', // Calculate from data
        trendingSkills: analytics.skillDemand.slice(0, 5).map(s => s.skill)
      },
      charts: await this.generateCharts(analytics),
      insights: await this.generateInsights(analytics),
      recommendations: await this.generateRecommendations(analytics)
    };

    this.dashboardDataSubject.next(dashboardData);
    return dashboardData;
  }

  async getAlerts(userId: string): Promise<Alert[]> {
    const { data, error } = await this.supabaseService.client
      .from('alerts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async markAlertAsRead(alertId: string): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('alerts')
      .update({ read: true })
      .eq('id', alertId);

    if (error) throw error;
  }

  async generateReport(userId: string, reportData: Omit<ReportData, 'id' | 'generatedAt'>): Promise<ReportData> {
    const report: Partial<ReportData> = {
      ...reportData,
      generatedAt: new Date()
    };

    const { data, error } = await this.supabaseService.client
      .from('reports')
      .insert(report)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getReports(userId: string): Promise<ReportData[]> {
    const { data, error } = await this.supabaseService.client
      .from('reports')
      .select('*')
      .eq('user_id', userId)
      .order('generated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  private async generateCharts(analytics: AnalyticsData): Promise<any[]> {
    return [
      {
        id: 'applications_over_time',
        title: 'Заявки по времени',
        type: 'line',
        data: analytics.timeBasedMetrics.dailyApplications,
        config: {
          xAxis: 'date',
          yAxis: 'applications',
          colors: ['#3b82f6']
        }
      },
      {
        id: 'conversion_funnel',
        title: 'Воронка конверсии',
        type: 'bar',
        data: {
          labels: ['Просмотры профиля', 'Заявки', 'Собеседования', 'Предложения', 'Принятия'],
          datasets: [{
            data: [
              analytics.profileViews.length,
              analytics.applicationStats.totalApplications,
              analytics.applicationStats.interviewRate * analytics.applicationStats.totalApplications,
              analytics.applicationStats.offerRate * analytics.applicationStats.totalApplications,
              analytics.applicationStats.acceptanceRate * analytics.applicationStats.totalApplications
            ]
          }]
        },
        config: {
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
        }
      },
      {
        id: 'geographic_distribution',
        title: 'Географическое распределение',
        type: 'pie',
        data: analytics.geographicData.countries,
        config: {
          showLegend: true
        }
      }
    ];
  }

  private async generateInsights(analytics: AnalyticsData): Promise<Insight[]> {
    const insights: Insight[] = [];

    if (analytics.applicationStats.responseRate > 0.8) {
      insights.push({
        id: this.generateId(),
        type: InsightType.ACHIEVEMENT,
        title: 'Высокий отклик на заявки',
        description: `Ваш уровень отклика ${Math.round(analytics.applicationStats.responseRate * 100)}% значительно выше среднего`,
        impact: ImpactLevel.HIGH,
        data: { responseRate: analytics.applicationStats.responseRate },
        createdAt: new Date()
      });
    }

    if (analytics.skillDemand.some(skill => skill.trending)) {
      const trendingSkills = analytics.skillDemand.filter(s => s.trending);
      insights.push({
        id: this.generateId(),
        type: InsightType.OPPORTUNITY,
        title: 'Трендовые навыки',
        description: `Навыки ${trendingSkills.map(s => s.skill).join(', ')} сейчас в высоком спросе`,
        impact: ImpactLevel.MEDIUM,
        data: { trendingSkills },
        createdAt: new Date()
      });
    }

    return insights;
  }

  private async generateRecommendations(analytics: AnalyticsData): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];

    if (analytics.applicationStats.averageResponseTime > 7) {
      recommendations.push({
        id: this.generateId(),
        type: RecommendationType.APPLICATION_STRATEGY,
        title: 'Улучшите время отклика',
        description: 'Работодатели ожидают быстрого отклика. Старайтесь отвечать в течение 1-3 дней.',
        priority: PriorityLevel.HIGH,
        actions: [
          {
            id: this.generateId(),
            description: 'Настроить автоматические уведомления о новых заявках',
            completed: false
          },
          {
            id: this.generateId(),
            description: 'Создать шаблоны ответов для типичных ситуаций',
            completed: false
          }
        ],
        expectedImpact: 'Увеличение конверсии на 20-30%',
        createdAt: new Date()
      });
    }

    const lowConversionSkills = analytics.skillDemand.filter(s => s.growth < 0);
    if (lowConversionSkills.length > 0) {
      recommendations.push({
        id: this.generateId(),
        type: RecommendationType.SKILL_DEVELOPMENT,
        title: 'Обновите навыки',
        description: `Навыки ${lowConversionSkills.map(s => s.skill).join(', ')} теряют актуальность`,
        priority: PriorityLevel.MEDIUM,
        actions: lowConversionSkills.map(skill => ({
          id: this.generateId(),
          description: `Изучить ${skill.skill} и добавить в профиль`,
          completed: false
        })),
        expectedImpact: 'Повышение привлекательности профиля',
        createdAt: new Date()
      });
    }

    return recommendations;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}