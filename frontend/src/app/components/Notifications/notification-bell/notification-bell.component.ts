import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { PopoverModule } from 'primeng/popover';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { SupabaseService } from '../../../shared/db/supabase.service';
import { AppNotification } from '../../../shared/notifications/notification.models';
import { NotificationService } from '../../../shared/notifications/notification.service';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    BadgeModule,
    PopoverModule,
    MenuModule,
    DialogModule,
    ProgressSpinnerModule,
    TooltipModule,
  ]
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  @ViewChild('popover') popover: any;
  
  notifications: AppNotification[] = [];
  unreadCount = 0;
  showNotificationsPopover = false;
  showAllNotificationsDialog = false;
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

  togglePopover(event: Event): void {
    this.popover.toggle(event);
    this.loadNotifications();
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

  formatNotificationDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'только что';
    if (diffMins < 60) return `${diffMins} мин. назад`;
    if (diffHours < 24) return `${diffHours} ч. назад`;
    if (diffDays < 7) return `${diffDays} дн. назад`;
    
    return date.toLocaleDateString('ru-RU');
  }

  openAllNotifications(): void {
    this.showAllNotificationsDialog = true;
    this.popover.hide();
  }

  closeAllNotifications(): void {
    this.showAllNotificationsDialog = false;
  }

  onPopoverShow(): void {
    this.showNotificationsPopover = true;
  }

  onPopoverHide(): void {
    this.showNotificationsPopover = false;
  }
}