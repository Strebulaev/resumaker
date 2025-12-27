import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { NotificationPreferences, NotificationCategory } from '../../../shared/notifications/notification.models';
import { NotificationService } from '../../../shared/notifications/notification.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    ToggleSwitchModule,
    SelectModule,
    InputTextModule,
    ProgressSpinnerModule
  ]
})
export class NotificationSettingsComponent implements OnInit {
  preferences: NotificationPreferences | null = null;
  isLoading = false;
  isSaving = false;

  notificationTypes = [
    { label: 'Системные', value: NotificationCategory.SYSTEM },
    { label: 'Биллинг', value: NotificationCategory.BILLING },
    { label: 'Новые функции', value: NotificationCategory.FEATURE },
    { label: 'Безопасность', value: NotificationCategory.SECURITY },
    { label: 'Рекламные', value: NotificationCategory.PROMOTIONAL }
  ];

  timeOptions = this.generateTimeOptions();

  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadPreferences();
  }

  async loadPreferences(): Promise<void> {
    this.isLoading = true;
    try {
      this.preferences = await this.notificationService.getNotificationPreferences();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось загрузить настройки уведомлений'
      });
    } finally {
      this.isLoading = false;
    }
  }

  async savePreferences(): Promise<void> {
    if (!this.preferences) return;

    this.isSaving = true;
    try {
      await this.notificationService.updateNotificationPreferences(this.preferences);
      this.messageService.add({
        severity: 'success',
        summary: 'Успешно',
        detail: 'Настройки уведомлений сохранены'
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось сохранить настройки уведомлений'
      });
    } finally {
      this.isSaving = false;
    }
  }

  toggleQuietHours(): void {
    if (!this.preferences) return;

    if (this.preferences.quietHours?.enabled) {
      this.preferences.quietHours = {
        enabled: true,
        start: '22:00',
        end: '08:00'
      };
    } else {
      this.preferences.quietHours = undefined;
    }
  }

  private generateTimeOptions(): string[] {
    const options: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  }

  getNotificationTypeLabel(type: NotificationCategory): string {
    const labels: { [key in NotificationCategory]: string } = {
      [NotificationCategory.SYSTEM]: 'Системные',
      [NotificationCategory.BILLING]: 'Биллинг',
      [NotificationCategory.FEATURE]: 'Новые функции',
      [NotificationCategory.SECURITY]: 'Безопасность',
      [NotificationCategory.PROMOTIONAL]: 'Рекламные'
    };
    return labels[type];
  }

  getTypeDescription(type: NotificationCategory): string {
    const descriptions: { [key in NotificationCategory]: string } = {
      [NotificationCategory.SYSTEM]: 'Важные системные уведомления и обновления',
      [NotificationCategory.BILLING]: 'Информация о подписках, платежах и тарифах',
      [NotificationCategory.FEATURE]: 'Уведомления о новых функциях и возможностях',
      [NotificationCategory.SECURITY]: 'Уведомления о безопасности и изменениях доступа',
      [NotificationCategory.PROMOTIONAL]: 'Рекламные рассылки и специальные предложения'
    };
    return descriptions[type];
  }
}