/*
 * src/app/shared/notifications/notification.models.ts
 * Модели для уведомлений
 */

export interface Notification {
  id: string;
  type: 'subscription' | 'comment' | 'negotiation' | 'vacancy' | 'resume' | 'employer' | 'salary' | 'message';
  title: string;
  message: string;
  time: Date;
  isRead: boolean;
  read?: boolean; // Alias for backward compatibility
  createdAt?: Date; // Alias for time
  important?: boolean;
  metadata?: {
    applicantId?: string;
    commentId?: string;
    negotiationId?: string;
    vacancyId?: string;
    resumeId?: string;
    employerId?: string;
    action?: string;
    url?: string;
  };
}

export type NotificationType = Notification['type'];

export enum NotificationCategory {
  SYSTEM = 'system',
  BILLING = 'billing',
  FEATURE = 'feature',
  SECURITY = 'security',
  PROMOTIONAL = 'promotional'
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  types: {
    [key in NotificationCategory]: boolean;
  };
  quietHours?: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

// Alias for backward compatibility
export type AppNotification = Notification;