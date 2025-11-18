import { Injectable, Injector } from '@angular/core';
import { ErrorToastComponent } from '../components/Helpers/error-toast/error-toast.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorToastComponent?: ErrorToastComponent;

  constructor(private injector: Injector) {}

  // Метод для регистрации компонента (вызывается из компонента)
  registerErrorToast(component: ErrorToastComponent) {
    this.errorToastComponent = component;
  }

  // Публичные методы для показа ошибок
  showError(message: string, source?: string) {
    this.errorToastComponent?.showError(message, source);
  }

  showAIError(message: string, source?: string) {
    this.errorToastComponent?.showAIError(message, source);
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