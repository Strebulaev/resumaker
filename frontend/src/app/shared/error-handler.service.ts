import { Injectable } from '@angular/core';
import { ErrorToastComponent } from '../components/Helpers/error-toast/error-toast.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorToastComponent?: ErrorToastComponent;

  constructor() {}

  handleAIConnectionError(error: any, context: string = 'AI Service') {
    if (error.status === 0 || error.message?.includes('CORS')) {
      this.showAIError('CORS ошибка: невозможно подключиться к AI API. Проверьте настройки провайдера.', context);
    } else if (error.status === 401) {
      this.showAIError('Неверный API ключ AI провайдера', context);
    } else if (error.status === 403) {
      this.showAIError('Доступ к AI сервису запрещен', context);
    } else if (error.status === 429) {
      this.showAIError('Превышен лимит запросов к AI сервису', context);
    } else {
      this.showAIError(`Ошибка AI сервиса: ${error.message}`, context);
    }
  }

  registerErrorToast(component: ErrorToastComponent) {
    this.errorToastComponent = component;
    console.log('ErrorToastComponent registered successfully');
  }

  showError(message: string, source?: string) {
    console.log('Showing error:', message, source);
    if (this.errorToastComponent) {
      this.errorToastComponent.showError(message, source);
    } else {
      console.warn('ErrorToastComponent not registered. Message:', message);
      // Fallback: показать alert или console.error
      console.error(`[${source}] ${message}`);
    }
  }

  showAIError(message: string, source?: string) {
    console.log('Showing AI error:', message, source);
    if (this.errorToastComponent) {
      this.errorToastComponent.showAIError(message, source);
    } else {
      console.warn('ErrorToastComponent not registered. AI Message:', message);
      console.error(`[AI-${source}] ${message}`);
    }
  }

  showWarning(message: string, source?: string) {
    this.errorToastComponent?.showWarning(message, source);
  }

  handleApiError(error: any, context: string = 'API') {
    if (error.status === 429) {
      this.showAIError('Слишком много запросов', context);
    } else if (error.status === 400) {
      this.showAIError('Неверный запрос', context);
    } else if (error.status >= 500) {
      this.showError('Ошибка сервера', context);
    } else {
      const message = error.message || 'Произошла ошибка';
      this.showError(message, context);
    }
  }
}