import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notification, NotificationPreferences, NotificationCategory } from './notification.models';
import { SupabaseService } from '../db/supabase.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();

  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$: Observable<number> = this.unreadCountSubject.asObservable();

  constructor(
    private http: HttpClient,
    private supabase: SupabaseService
  ) {}

  async loadNotifications(): Promise<void> {
    if (!this.supabase.currentUser) return;

    try {
      // Mock data for now - replace with actual API calls
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'comment',
          title: 'Новый комментарий',
          message: 'К вашему резюме добавлен новый комментарий',
          time: new Date(),
          isRead: false,
          read: false,
          createdAt: new Date(),
          important: false,
          metadata: { applicantId: '123', commentId: '456' }
        },
        {
          id: '2',
          type: 'negotiation',
          title: 'Отклик на вакансию',
          message: 'Ваша вакансия получила новый отклик',
          time: new Date(Date.now() - 3600000),
          isRead: true,
          read: true,
          createdAt: new Date(Date.now() - 3600000),
          important: true,
          metadata: { negotiationId: '789', vacancyId: '101' }
        }
      ];

      this.notificationsSubject.next(mockNotifications);
      this.updateUnreadCount(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
      throw error;
    }
  }

  updateNotifications(notifications: Notification[]): void {
    this.notificationsSubject.next(notifications);
    this.updateUnreadCount(notifications);
  }

  private updateUnreadCount(notifications: Notification[]): void {
    const unread = notifications.filter(n => !n.isRead).length;
    this.unreadCountSubject.next(unread);
  }

  async markAsRead(id: string): Promise<void> {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.map(n =>
      n.id === id ? { ...n, isRead: true, read: true } : n
    );
    this.notificationsSubject.next(updatedNotifications);
    this.updateUnreadCount(updatedNotifications);

    // TODO: Call API to mark as read
    // await this.http.put(`/api/notifications/${id}/read`, {}).toPromise();
  }

  async markAllAsRead(): Promise<void> {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.map(n => ({ ...n, isRead: true, read: true }));
    this.notificationsSubject.next(updatedNotifications);
    this.unreadCountSubject.next(0);

    // TODO: Call API to mark all as read
    // await this.http.put('/api/notifications/mark-all-read', {}).toPromise();
  }

  async deleteNotification(id: string): Promise<void> {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(updatedNotifications);
    this.updateUnreadCount(updatedNotifications);

    // TODO: Call API to delete notification
    // await this.http.delete(`/api/notifications/${id}`).toPromise();
  }

  clearAllNotifications(): void {
    this.notificationsSubject.next([]);
    this.unreadCountSubject.next(0);
  }

  async getNotificationPreferences(): Promise<NotificationPreferences> {
    // TODO: Implement API call
    return {
      email: true,
      push: true,
      inApp: true,
      types: {
        [NotificationCategory.SYSTEM]: true,
        [NotificationCategory.BILLING]: true,
        [NotificationCategory.FEATURE]: true,
        [NotificationCategory.SECURITY]: true,
        [NotificationCategory.PROMOTIONAL]: false
      }
    };
  }

  async updateNotificationPreferences(preferences: NotificationPreferences): Promise<void> {
    // TODO: Implement API call
    console.log('Updating preferences:', preferences);
  }
}