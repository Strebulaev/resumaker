import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from '../../../shared/notifications/notification.models';
import { NotificationService } from '../../../shared/notifications/notification.service';

@Component({
  selector: 'app-notification-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent {
  @Input() notification: Notification = {
    id: '',
    type: 'subscription',
    title: '',
    message: '',
    time: new Date(),
    isRead: false
  };

  @Output() markRead = new EventEmitter<string>();

  constructor(private notificationService: NotificationService) {}

  getIconType(type: string): string {
    const icons: { [key: string]: string } = {
      subscription: 'bell',
      comment: 'comment',
      negotiation: 'envelope',
      vacancy: 'briefcase',
      resume: 'file-alt',
      employer: 'users',
      salary: 'chart-line',
      message: 'comment-dots'
    };
    return icons[type] || 'bell';
  }

  async onMarkRead(): Promise<void> {
    try {
      await this.notificationService.markAsRead(this.notification.id);
      this.markRead.emit(this.notification.id);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }
}