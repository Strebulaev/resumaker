export interface AppNotification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    data?: any;
    read: boolean;
    important: boolean;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export enum NotificationType {
    SYSTEM = 'system',
    BILLING = 'billing',
    FEATURE = 'feature',
    SECURITY = 'security',
    PROMOTIONAL = 'promotional'
  }
  
  export interface NotificationPreferences {
    userId: string;
    email: boolean;
    push: boolean;
    inApp: boolean;
    types: {
      [key in NotificationType]: boolean;
    };
    quietHours?: {
      enabled: boolean;
      start: string; // HH:mm
      end: string; // HH:mm
    };
  }