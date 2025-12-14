import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { SupabaseService } from '../db/supabase.service';
import { AppNotification, NotificationType, NotificationPreferences } from './notification.models';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  private unreadCountSubject = new BehaviorSubject<number>(0);
  
  public notifications$ = this.notificationsSubject.asObservable();
  public unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(
    private supabase: SupabaseService,
    private errorHandler: ErrorHandlerService
  ) {
    this.loadNotifications();
  }

  async loadNotifications(): Promise<void> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) return;

      const { data, error } = await this.supabase.client
        .from('user_notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const notifications = data.map(this.mapDbNotificationToModel);
      this.notificationsSubject.next(notifications);
      this.updateUnreadCount(notifications);
    } catch (error) {
      this.errorHandler.showError('Ошибка загрузки уведомлений', 'NotificationService');
    }
  }

  async getNotifications(page = 1, limit = 20): Promise<AppNotification[]> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) return [];

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error } = await this.supabase.client
        .from('user_notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      return data.map(this.mapDbNotificationToModel);
    } catch (error) {
      this.errorHandler.showError('Ошибка получения уведомлений', 'NotificationService');
      return [];
    }
  }

  async createNotification(notification: Omit<AppNotification, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const { data, error } = await this.supabase.client
        .from('user_notifications')
        .insert({
          user_id: notification.userId,
          type: notification.type,
          title: notification.title,
          message: notification.message,
          data: notification.data,
          read: notification.read,
          important: notification.important,
          expires_at: notification.expiresAt?.toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (error) throw error;

      await this.loadNotifications(); // Reload notifications
      return data.id;
    } catch (error) {
      this.errorHandler.showError('Ошибка создания уведомления', 'NotificationService');
      throw error;
    }
  }

  async markAsRead(notificationId: string): Promise<void> {
    try {
      const { error } = await this.supabase.client
        .from('user_notifications')
        .update({ 
          read: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', notificationId);

      if (error) throw error;

      await this.loadNotifications(); // Reload notifications
    } catch (error) {
      this.errorHandler.showError('Ошибка обновления уведомления', 'NotificationService');
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) return;

      const { error } = await this.supabase.client
        .from('user_notifications')
        .update({ 
          read: true,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;

      await this.loadNotifications(); // Reload notifications
    } catch (error) {
      this.errorHandler.showError('Ошибка обновления уведомлений', 'NotificationService');
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    try {
      const { error } = await this.supabase.client
        .from('user_notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;

      await this.loadNotifications(); // Reload notifications
    } catch (error) {
      this.errorHandler.showError('Ошибка удаления уведомления', 'NotificationService');
    }
  }

  async deleteAllRead(): Promise<void> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) return;

      const { error } = await this.supabase.client
        .from('user_notifications')
        .delete()
        .eq('user_id', userId)
        .eq('read', true);

      if (error) throw error;

      await this.loadNotifications(); // Reload notifications
    } catch (error) {
      this.errorHandler.showError('Ошибка удаления уведомлений', 'NotificationService');
    }
  }

  async getNotificationPreferences(): Promise<NotificationPreferences | null> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) return null;

      const { data, error } = await this.supabase.client
        .from('user_notification_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Create default preferences
          return await this.createDefaultPreferences(userId);
        }
        throw error;
      }

      return this.mapDbPreferencesToModel(data);
    } catch (error) {
      this.errorHandler.showError('Ошибка получения настроек уведомлений', 'NotificationService');
      return null;
    }
  }

  async updateNotificationPreferences(preferences: Partial<NotificationPreferences>): Promise<void> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) return;

      const { error } = await this.supabase.client
        .from('user_notification_preferences')
        .upsert({
          user_id: userId,
          email: preferences.email,
          push: preferences.push,
          in_app: preferences.inApp,
          types: preferences.types,
          quiet_hours: preferences.quietHours,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
    } catch (error) {
      this.errorHandler.showError('Ошибка обновления настроек уведомлений', 'NotificationService');
    }
  }

  // Системные методы для административных уведомлений
  async sendBulkNotification(
    userIds: string[],
    type: NotificationType,
    title: string,
    message: string,
    data?: any,
    important: boolean = false
  ): Promise<void> {
    try {
      const notifications = userIds.map(userId => ({
        user_id: userId,
        type,
        title,
        message,
        data,
        read: false,
        important,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      const { error } = await this.supabase.client
        .from('user_notifications')
        .insert(notifications);

      if (error) throw error;
    } catch (error) {
      this.errorHandler.showError('Ошибка отправки массовых уведомлений', 'NotificationService');
    }
  }

  async sendSystemNotification(
    title: string,
    message: string,
    type: NotificationType = NotificationType.SYSTEM,
    important: boolean = false
  ): Promise<void> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) return;

      await this.createNotification({
        userId,
        type,
        title,
        message,
        read: false,
        important
      });
    } catch (error) {
      this.errorHandler.showError('Ошибка отправки системного уведомления', 'NotificationService');
    }
  }

  // Уведомления о изменениях в подписках
  async sendSubscriptionNotification(
    title: string,
    message: string,
    subscriptionData?: any
  ): Promise<void> {
    await this.sendSystemNotification(
      title,
      message,
      NotificationType.BILLING,
      true
    );
  }

  // Обработка webhook уведомлений от HH.ru
  async handleWebhookNotification(webhookData: any): Promise<void> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) return;

      let title = 'Новое уведомление';
      let message = 'Получено уведомление от HH.ru';
      let type = NotificationType.SYSTEM;

      // Определяем тип уведомления на основе webhook данных
      if (webhookData.action) {
        switch (webhookData.action) {
          case 'new_negotiation_vacancy':
            title = 'Новый отклик на вакансию';
            message = `Получен новый отклик на вакансию ${webhookData.vacancy?.name || ''}`;
            type = NotificationType.FEATURE;
            break;
          case 'new_response_or_invitation_vacancy':
            title = 'Новое приглашение';
            message = `Получено новое приглашение на вакансию ${webhookData.vacancy?.name || ''}`;
            type = NotificationType.FEATURE;
            break;
          case 'vacancy_change':
            title = 'Изменение вакансии';
            message = `Вакансия ${webhookData.vacancy?.name || ''} была изменена`;
            type = NotificationType.SYSTEM;
            break;
          case 'vacancy_archivation':
            title = 'Вакансия архивирована';
            message = `Вакансия ${webhookData.vacancy?.name || ''} была архивирована`;
            type = NotificationType.SECURITY;
            break;
          case 'vacancy_publication_for_vacancy_manager':
            title = 'Вакансия опубликована';
            message = `Вакансия ${webhookData.vacancy?.name || ''} была опубликована`;
            type = NotificationType.FEATURE;
            break;
          case 'negotiation_employer_state_change':
            title = 'Изменение статуса отклика';
            message = `Статус отклика на вакансию ${webhookData.vacancy?.name || ''} был изменен`;
            type = NotificationType.SYSTEM;
            break;
          default:
            title = 'Уведомление от HH.ru';
            message = `Получено уведомление: ${webhookData.action}`;
        }
      }

      await this.createNotification({
        userId,
        type,
        title,
        message,
        data: webhookData,
        read: false,
        important: true
      });

    } catch (error) {
      console.error('Error handling webhook notification:', error);
      this.errorHandler.showError('Ошибка обработки webhook уведомления', 'NotificationService');
    }
  }

  // Метод для обработки входящих webhook запросов
  async processWebhookPayload(payload: any): Promise<void> {
    try {
      // Валидация webhook данных
      if (!payload || typeof payload !== 'object') {
        throw new Error('Invalid webhook payload');
      }

      // Обработка в зависимости от типа webhook
      if (payload.action && payload.vacancy) {
        await this.handleWebhookNotification(payload);
      } else {
        console.warn('Unknown webhook payload format:', payload);
      }
    } catch (error) {
      console.error('Error processing webhook payload:', error);
    }
  }

  private mapDbNotificationToModel(dbData: any): AppNotification {
    return {
      id: dbData.id,
      userId: dbData.user_id,
      type: dbData.type as NotificationType,
      title: dbData.title,
      message: dbData.message,
      data: dbData.data,
      read: dbData.read,
      important: dbData.important,
      expiresAt: dbData.expires_at ? new Date(dbData.expires_at) : undefined,
      createdAt: new Date(dbData.created_at),
      updatedAt: new Date(dbData.updated_at)
    };
  }

  private mapDbPreferencesToModel(dbData: any): NotificationPreferences {
    return {
      userId: dbData.user_id,
      email: dbData.email,
      push: dbData.push,
      inApp: dbData.in_app,
      types: dbData.types || this.getDefaultNotificationTypes(),
      quietHours: dbData.quiet_hours
    };
  }

  private async createDefaultPreferences(userId: string): Promise<NotificationPreferences> {
    const defaultPreferences: NotificationPreferences = {
      userId,
      email: true,
      push: true,
      inApp: true,
      types: this.getDefaultNotificationTypes()
    };

    await this.updateNotificationPreferences(defaultPreferences);
    return defaultPreferences;
  }

  private getDefaultNotificationTypes(): { [key in NotificationType]: boolean } {
    return {
      [NotificationType.SYSTEM]: true,
      [NotificationType.BILLING]: true,
      [NotificationType.FEATURE]: true,
      [NotificationType.SECURITY]: true,
      [NotificationType.PROMOTIONAL]: false
    };
  }

  private updateUnreadCount(notifications: AppNotification[]): void {
    const unreadCount = notifications.filter(n => !n.read).length;
    this.unreadCountSubject.next(unreadCount);
  }

  getUnreadNotifications(): Observable<AppNotification[]> {
    return this.notifications$.pipe(
      map(notifications => notifications.filter(n => !n.read))
    );
  }

  getImportantNotifications(): Observable<AppNotification[]> {
    return this.notifications$.pipe(
      map(notifications => notifications.filter(n => n.important && !n.read))
    );
  }
}