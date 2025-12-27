import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../shared/notifications/notification.service';
import { Notification } from '../../../shared/notifications/notification.models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationItemComponent } from '../notification-item/notification-item.component';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationItemComponent],
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  filterType = 'all';
  private notificationSubscription: Subscription | undefined;

  constructor(private notificationService: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
      this.applyFilter();
    });

    this.notificationService.loadNotifications();
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  applyFilter(): void {
    if (this.filterType === 'all') {
      this.filteredNotifications = [...this.notifications];
    } else if (this.filterType === 'unread') {
      this.filteredNotifications = this.notifications.filter(n => !n.isRead);
    } else if (this.filterType === 'read') {
      this.filteredNotifications = this.notifications.filter(n => n.isRead);
    } else {
      this.filteredNotifications = this.notifications.filter(n => n.type === this.filterType);
    }
  }

  onMarkRead(id: string): void {
    this.notificationService.markAsRead(id);
  }

  clearAll(): void {
    this.notificationService.clearAllNotifications();
  }

  async markAllAsRead(): Promise<void> {
    try {
      await this.notificationService.markAllAsRead();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  }
}