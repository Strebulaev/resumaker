import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AIService, AIProvider } from '../../../shared/ai/ai.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ai-config-modal',
  templateUrl: './ai-config-modal.component.html',
  styleUrls: ['./ai-config-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule]
})
export class AiConfigModalComponent {
  @Output() closed = new EventEmitter<void>();
  
  providers: AIProvider[] = [];
  editingProvider: string | null = null;
  originalProviderState: any = null;

  constructor(
    private aiService: AIService,
    private messageService: MessageService
  ) {
    this.providers = this.aiService.getProviders();
  }

  editProvider(providerId: string): void {
    this.editingProvider = providerId;
    // Сохраняем оригинальное состояние для отмены
    const provider = this.providers.find(p => p.id === providerId);
    if (provider) {
      this.originalProviderState = { ...provider };
    }
  }

  cancelEdit(): void {
    if (this.originalProviderState && this.editingProvider) {
      const index = this.providers.findIndex(p => p.id === this.editingProvider);
      if (index !== -1) {
        this.providers[index] = { ...this.originalProviderState };
      }
    }
    this.editingProvider = null;
    this.originalProviderState = null;
  }

  saveProviderConfig(provider: AIProvider): void {
    const success = this.aiService.configureProvider(provider.id, provider.apiKey, provider.baseUrl);
    
    if (success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Настройки сохранены',
        detail: `${provider.name} успешно настроен`
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось сохранить настройки'
      });
    }
    
    this.editingProvider = null;
    this.originalProviderState = null;
  }

  setCurrentProvider(providerId: string): void {
    this.aiService.setCurrentProvider(providerId);
    this.messageService.add({
      severity: 'success',
      summary: 'Провайдер изменен',
      detail: 'Теперь используется выбранный AI провайдер'
    });
  }

  testConnection(providerId: string): void {
    this.aiService.testProviderConnection(providerId).subscribe(success => {
      if (success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Подключение успешно',
          detail: 'Соединение с AI провайдером установлено'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка подключения',
          detail: 'Не удалось подключиться к AI провайдеру'
        });
      }
    });
  }

  isCurrentProvider(providerId: string): boolean {
    const current = this.aiService.getCurrentProvider();
    return current?.id === providerId;
  }

  closeModal(): void {
    this.closed.emit();
  }
}