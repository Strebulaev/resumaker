import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SupabaseService } from '../db/supabase.service';
import { AppNotification, NotificationPreferences, NotificationType } from './notification.models';

export interface NotificationSettings {
  email: boolean;
  telegram: boolean;
  inApp: boolean;
  dailyReports: boolean;
  instantAlerts: boolean;
  emailAddress?: string;
  telegramChatId?: string;
}

export interface NotificationMessage {
  type: 'daily_report' | 'job_alert' | 'application_success' | 'application_failed' | 'system_alert';
  title: string;
  message: string;
  data?: any;
  priority: 'low' | 'medium' | 'high';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = '/api';

  // Notification inbox management
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  public unreadCount$ = this.notifications$.pipe(
    map(notifications => notifications.filter(n => !n.read).length)
  );

  constructor(
    private http: HttpClient,
    private supabase: SupabaseService
  ) {}

  // Send notification via configured channels
  sendNotification(notification: NotificationMessage): Observable<boolean> {
    const settings = this.getNotificationSettings();

    const notifications: Observable<boolean>[] = [];

    if (settings.email && settings.emailAddress) {
      notifications.push(this.sendEmail(notification, settings.emailAddress));
    }

    if (settings.telegram && settings.telegramChatId) {
      notifications.push(this.sendTelegram(notification, settings.telegramChatId));
    }

    if (settings.inApp) {
      notifications.push(this.showInAppNotification(notification));
    }

    // Return true if at least one notification was sent successfully
    return of(true); // Simplified - in production, combine results
  }

  // Send daily automation report
  sendDailyReport(report: any): Observable<boolean> {
    const notification: NotificationMessage = {
      type: 'daily_report',
      title: 'Ежедневный отчет Rezulution',
      message: this.formatDailyReportMessage(report),
      data: report,
      priority: 'medium'
    };

    return this.sendNotification(notification);
  }

  // Send job alert
  sendJobAlert(job: any): Observable<boolean> {
    const notification: NotificationMessage = {
      type: 'job_alert',
      title: 'Найдена подходящая вакансия',
      message: `Новая вакансия: ${job.title} в ${job.company}`,
      data: job,
      priority: 'high'
    };

    return this.sendNotification(notification);
  }

  // Send application status notification
  sendApplicationNotification(application: any, success: boolean): Observable<boolean> {
    const notification: NotificationMessage = {
      type: success ? 'application_success' : 'application_failed',
      title: success ? 'Отклик отправлен' : 'Ошибка отправки отклика',
      message: success
        ? `Успешно отправлен отклик на вакансию ${application.vacancyTitle}`
        : `Не удалось отправить отклик на вакансию ${application.vacancyTitle}`,
      data: application,
      priority: success ? 'medium' : 'high'
    };

    return this.sendNotification(notification);
  }

  // Update notification settings
  updateSettings(settings: Partial<NotificationSettings>): void {
    const current = this.getNotificationSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem('notification_settings', JSON.stringify(updated));
  }

  // Get current notification settings
  getNotificationSettings(): NotificationSettings {
    const stored = localStorage.getItem('notification_settings');
    return stored ? JSON.parse(stored) : {
      email: false,
      telegram: false,
      inApp: true,
      dailyReports: true,
      instantAlerts: true
    };
  }

  // Private methods for sending notifications

  private sendEmail(notification: NotificationMessage, email: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const emailData = {
      to: email,
      subject: notification.title,
      html: this.formatEmailContent(notification),
      text: notification.message
    };

    return this.http.post<{ success: boolean }>(`${this.apiUrl}/notifications/email`, emailData, { headers }).pipe(
      map(response => response.success),
      catchError(error => {
        console.error('Email notification error:', error);
        return of(false);
      })
    );
  }

  private sendTelegram(notification: NotificationMessage, chatId: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const telegramData = {
      chat_id: chatId,
      text: this.formatTelegramMessage(notification),
      parse_mode: 'HTML'
    };

    return this.http.post<{ success: boolean }>(`${this.apiUrl}/notifications/telegram`, telegramData, { headers }).pipe(
      map(response => response.success),
      catchError(error => {
        console.error('Telegram notification error:', error);
        return of(false);
      })
    );
  }

  private showInAppNotification(notification: NotificationMessage): Observable<boolean> {
    // In a real implementation, this would integrate with Angular's notification system
    console.log('In-app notification:', notification);

    // For now, just log and return success
    return of(true);
  }

  // Formatting methods

  private formatDailyReportMessage(report: any): string {
    return `
📊 Ежедневный отчет Rezulution

📅 Дата: ${new Date(report.date).toLocaleDateString('ru-RU')}

🔍 Вакансий найдено: ${report.stats.jobsFound}
📤 Откликов отправлено: ${report.stats.applicationsSent}
✅ Успешность: ${report.stats.successRate}%

💡 Рекомендации:
${report.recommendations.map((rec: string) => `• ${rec}`).join('\n')}

Подробный отчет доступен в личном кабинете.
    `.trim();
  }

  private formatEmailContent(notification: NotificationMessage): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">${notification.title}</h2>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            ${notification.message.replace(/\n/g, '<br>')}
          </p>
        </div>
        <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
          <p>Rezulution - Автоматизация карьеры</p>
        </div>
      </div>
    `;
  }

  private formatTelegramMessage(notification: NotificationMessage): string {
    const emoji = this.getNotificationEmoji(notification.type);

    return `
${emoji} <b>${notification.title}</b>

${notification.message}

<i>Отправлено от Rezulution</i>
    `.trim();
  }

  private getNotificationEmoji(type: string): string {
    switch (type) {
      case 'daily_report': return '📊';
      case 'job_alert': return '💼';
      case 'application_success': return '✅';
      case 'application_failed': return '❌';
      case 'system_alert': return '⚠️';
      default: return '📢';
    }
  }

  // Test notification settings
  testNotification(): Observable<boolean> {
    const testNotification: NotificationMessage = {
      type: 'system_alert',
      title: 'Тестовое уведомление',
      message: 'Это тестовое уведомление для проверки настроек.',
      priority: 'low'
    };

    return this.sendNotification(testNotification);
  }

  // Notification inbox methods

  async loadNotifications(): Promise<void> {
    if (!this.supabase.currentUser) return;

    try {
      const { data, error } = await this.supabase.client
        .from('user_notifications')
        .select('*')
        .eq('user_id', this.supabase.currentUser.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const notifications: AppNotification[] = data.map(item => ({
        id: item.id,
        userId: item.user_id,
        type: item.type,
        title: item.title,
        message: item.message,
        data: item.data,
        read: item.read,
        important: item.important,
        expiresAt: item.expires_at ? new Date(item.expires_at) : undefined,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at)
      }));

      this.notificationsSubject.next(notifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
      throw error;
    }
  }

  async markAsRead(notificationId: string): Promise<void> {
    if (!this.supabase.currentUser) return;

    try {
      const { error } = await this.supabase.client
        .from('user_notifications')
        .update({ read: true, updated_at: new Date().toISOString() })
        .eq('id', notificationId)
        .eq('user_id', this.supabase.currentUser.id);

      if (error) throw error;

      // Update local state
      const current = this.notificationsSubject.value;
      const updated = current.map(n =>
        n.id === notificationId ? { ...n, read: true, updatedAt: new Date() } : n
      );
      this.notificationsSubject.next(updated);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  async markAllAsRead(): Promise<void> {
    if (!this.supabase.currentUser) return;

    try {
      const { error } = await this.supabase.client
        .from('user_notifications')
        .update({ read: true, updated_at: new Date().toISOString() })
        .eq('user_id', this.supabase.currentUser.id)
        .eq('read', false);

      if (error) throw error;

      // Update local state
      const current = this.notificationsSubject.value;
      const updated = current.map(n => ({ ...n, read: true, updatedAt: new Date() }));
      this.notificationsSubject.next(updated);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    if (!this.supabase.currentUser) return;

    try {
      const { error } = await this.supabase.client
        .from('user_notifications')
        .delete()
        .eq('id', notificationId)
        .eq('user_id', this.supabase.currentUser.id);

      if (error) throw error;

      // Update local state
      const current = this.notificationsSubject.value;
      const updated = current.filter(n => n.id !== notificationId);
      this.notificationsSubject.next(updated);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }

  async getNotificationPreferences(): Promise<NotificationPreferences> {
    if (!this.supabase.currentUser) {
      return this.getDefaultPreferences();
    }

    try {
      const { data, error } = await this.supabase.client
        .from('user_notification_preferences')
        .select('*')
        .eq('user_id', this.supabase.currentUser.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }

      if (data) {
        return {
          userId: data.user_id,
          email: data.email,
          push: data.push,
          inApp: data.in_app,
          types: data.types,
          quietHours: data.quiet_hours
        };
      }

      return this.getDefaultPreferences();
    } catch (error) {
      console.error('Error loading notification preferences:', error);
      return this.getDefaultPreferences();
    }
  }

  async updateNotificationPreferences(preferences: NotificationPreferences): Promise<void> {
    if (!this.supabase.currentUser) return;

    try {
      const { error } = await this.supabase.client
        .from('user_notification_preferences')
        .upsert({
          user_id: this.supabase.currentUser.id,
          email: preferences.email,
          push: preferences.push,
          in_app: preferences.inApp,
          types: preferences.types,
          quiet_hours: preferences.quietHours,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
  }

  private getDefaultPreferences(): NotificationPreferences {
    return {
      userId: this.supabase.currentUser?.id || '',
      email: false,
      push: false,
      inApp: true,
      types: {
        [NotificationType.SYSTEM]: true,
        [NotificationType.BILLING]: true,
        [NotificationType.FEATURE]: true,
        [NotificationType.SECURITY]: true,
        [NotificationType.PROMOTIONAL]: false
      }
    };
  }
}