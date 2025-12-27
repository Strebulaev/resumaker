import { Injectable } from '@angular/core';
import { SupabaseService } from '../db/supabase.service';
import { NotificationCategory } from './notification.models';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({ providedIn: 'root' })
export class AdminNotificationService {

  constructor(
    private supabase: SupabaseService,
    private errorHandler: ErrorHandlerService
  ) {}

  // Уведомление для всех пользователей
  async broadcastToAllUsers(
    title: string,
    message: string,
    type: NotificationCategory = NotificationCategory.SYSTEM,
    important: boolean = false
  ): Promise<void> {
    try {
      // Получаем всех пользователей
      const { data: users, error } = await this.supabase.client
        .from('user_profiles')
        .select('id');

      if (error) throw error;

      const userIds = users.map(user => user.id);
      await this.sendBulkNotification(userIds, type, title, message, {}, important);
    } catch (error) {
      this.errorHandler.showError('Ошибка рассылки уведомлений', 'AdminNotificationService');
    }
  }

  // Уведомление для пользователей конкретного тарифа
  async broadcastToPlanUsers(
    planId: string,
    title: string,
    message: string,
    type: NotificationCategory = NotificationCategory.BILLING,
    important: boolean = true
  ): Promise<void> {
    try {
      const { data: subscriptions, error } = await this.supabase.client
        .from('user_subscriptions')
        .select('user_id')
        .eq('plan_id', planId)
        .eq('status', 'active');

      if (error) throw error;

      const userIds = subscriptions.map(sub => sub.user_id);
      await this.sendBulkNotification(userIds, type, title, message, { planId }, important);
    } catch (error) {
      this.errorHandler.showError('Ошибка рассылки уведомлений по тарифу', 'AdminNotificationService');
    }
  }

  // Уведомление об изменении условий подписки
  async sendSubscriptionChangeNotification(
    planId: string,
    changes: string,
    effectiveDate: Date
  ): Promise<void> {
    const title = 'Изменения в условиях подписки';
    const message = `В вашем тарифе произошли изменения: ${changes}. Изменения вступят в силу с ${effectiveDate.toLocaleDateString('ru-RU')}.`;
    
    await this.broadcastToPlanUsers(planId, title, message, NotificationCategory.BILLING, true);
  }

  // Уведомление об окончании пробного периода
  async sendTrialEndingNotification(daysLeft: number): Promise<void> {
    const title = 'Пробный период заканчивается';
    const message = `Ваш пробный период закончится через ${daysLeft} ${this.pluralizeDays(daysLeft)}. Рассмотрите переход на платный тариф для продолжения использования всех функций.`;
    
    await this.broadcastToPlanUsers('free', title, message, NotificationCategory.BILLING, true);
  }

  // Уведомление о новых функциях
  async sendNewFeatureNotification(
    featureName: string,
    featureDescription: string,
    userSegment: 'all' | 'basic' | 'pro' = 'all'
  ): Promise<void> {
    const title = `Новая функция: ${featureName}`;
    const message = featureDescription;
    
    if (userSegment === 'all') {
      await this.broadcastToAllUsers(title, message, NotificationCategory.FEATURE, false);
    } else {
      await this.broadcastToPlanUsers(userSegment, title, message, NotificationCategory.FEATURE, false);
    }
  }

  private async sendBulkNotification(
    userIds: string[],
    type: NotificationCategory,
    title: string,
    message: string,
    data: any,
    important: boolean
  ): Promise<void> {
    if (userIds.length === 0) return;

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
  }

  private pluralizeDays(count: number): string {
    if (count % 10 === 1 && count % 100 !== 11) return 'день';
    if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'дня';
    return 'дней';
  }
}