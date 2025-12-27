import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../shared/analytics/analytics.service';
import { DashboardData, Alert, ReportData } from '../../shared/analytics/analytics.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss']
})
export class AnalyticsDashboardComponent implements OnInit {
  dashboardData$: Observable<DashboardData | null>;
  alerts: Alert[] = [];
  reports: ReportData[] = [];
  selectedPeriod = 'month';

  constructor(private analyticsService: AnalyticsService) {
    this.dashboardData$ = this.analyticsService.dashboardData$;
  }

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadAlerts();
    this.loadReports();
  }

  async loadDashboardData(): Promise<void> {
    try {
      const user = await this.getCurrentUser();
      if (user) {
        await this.analyticsService.getDashboardData(user.id);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }

  async loadAlerts(): Promise<void> {
    try {
      const user = await this.getCurrentUser();
      if (user) {
        this.alerts = await this.analyticsService.getAlerts(user.id);
      }
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  }

  async loadReports(): Promise<void> {
    try {
      const user = await this.getCurrentUser();
      if (user) {
        this.reports = await this.analyticsService.getReports(user.id);
      }
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  }

  async markAlertAsRead(alert: Alert): Promise<void> {
    try {
      await this.analyticsService.markAlertAsRead(alert.id);
      await this.loadAlerts();
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  }

  async generateReport(type: string): Promise<void> {
    try {
      const user = await this.getCurrentUser();
      if (!user) return;

      const reportData = {
        userId: user.id,
        title: `Отчет ${type} - ${new Date().toLocaleDateString()}`,
        type: type as any,
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date()
        },
        data: {},
        format: 'pdf' as any
      };

      await this.analyticsService.generateReport(user.id, reportData);
      await this.loadReports();
    } catch (error) {
      console.error('Error generating report:', error);
    }
  }

  async changePeriod(period: string): Promise<void> {
    this.selectedPeriod = period;
    await this.loadDashboardData();
  }

  getAlertSeverityClass(severity: string): string {
    const classes = {
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      success: 'bg-green-100 text-green-800'
    };
    return classes[severity as keyof typeof classes] || classes.info;
  }

  getInsightTypeIcon(type: string): string {
    const icons = {
      trend: '📈',
      opportunity: '💡',
      warning: '⚠️',
      achievement: '🏆'
    };
    return icons[type as keyof typeof icons] || '📊';
  }

  getPriorityClass(priority: string): string {
    const classes = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return classes[priority as keyof typeof classes] || classes.low;
  }

  private async getCurrentUser(): Promise<any> {
    return new Promise((resolve) => {
      resolve({ id: 'current-user-id' });
    });
  }
}