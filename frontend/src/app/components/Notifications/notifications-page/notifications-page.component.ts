import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { SupabaseService } from '../../../shared/db/supabase.service';
import { AppNotification } from '../../../shared/notifications/notification.models';
import { NotificationService } from '../../../shared/notifications/notification.service';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    TooltipModule,
  ]
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  notifications: AppNotification[] = [];
  unreadCount = 0;
  isLoading = false;
  private refreshInterval: any;

  constructor(
    public notificationService: NotificationService,
    public supabase: SupabaseService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();

    // Подписываемся на изменения уведомлений
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });

    this.notificationService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });

    // Авто-обновление каждые 30 секунд
    this.refreshInterval = setInterval(() => {
      this.loadNotifications();
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  async loadNotifications(): Promise<void> {
    if (!this.supabase.currentUser) return;

    this.isLoading = true;
    try {
      await this.notificationService.loadNotifications();
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async markAsRead(notification: AppNotification): Promise<void> {
    try {
      await this.notificationService.markAsRead(notification.id);
      this.messageService.add({
        severity: 'success',
        summary: 'Уведомление прочитано'
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось отметить уведомление как прочитанное'
      });
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      await this.notificationService.markAllAsRead();
      this.messageService.add({
        severity: 'success',
        summary: 'Все уведомления прочитаны'
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось отметить все уведомления как прочитанные'
      });
    }
  }

  async deleteNotification(notification: AppNotification, event?: Event): Promise<void> {
    if (event) {
      event.stopPropagation();
    }

    try {
      await this.notificationService.deleteNotification(notification.id);
      this.messageService.add({
        severity: 'success',
        summary: 'Уведомление удалено'
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось удалить уведомление'
      });
    }
  }

  getNotificationIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'system': 'pi pi-cog',
      'billing': 'pi pi-credit-card',
      'feature': 'pi pi-star',
      'security': 'pi pi-shield',
      'promotional': 'pi pi-megaphone'
    };
    return icons[type] || 'pi pi-bell';
  }

  getNotificationClass(type: string): string {
    const classes: { [key: string]: string } = {
      'system': 'notification-system',
      'billing': 'notification-billing',
      'feature': 'notification-feature',
      'security': 'notification-security',
      'promotional': 'notification-promotional'
    };
    return classes[type] || '';
  }
}