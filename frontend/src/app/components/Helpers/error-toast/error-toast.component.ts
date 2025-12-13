import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

interface ErrorInfo {
  id: number;
  message: string;
  source?: string;
  timestamp: number;
  progress: number;
  fadingOut: boolean;
  type: 'error' | 'warning' | 'ai-error';
  originalMessage: string;
}

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss']
})

export class ErrorToastComponent implements OnInit, OnDestroy {

  errors: ErrorInfo[] = [];
  private errorId = 0;
  private consoleErrorHandler?: (event: ErrorEvent) => void;
  private consoleRejectionHandler?: (event: PromiseRejectionEvent) => void;
  private timerSubscription?: Subscription;
  private originalConsoleError?: (...data: any[]) => void;
  private originalConsoleWarn?: (...data: any[]) => void;

  private errorCache = new Map<string, number>();
  private readonly DUPLICATE_TIMEOUT = 5000;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.setupErrorHandling();
    this.startProgressTimer();
  }

  ngOnDestroy() {
    this.cleanupErrorHandling();
    this.timerSubscription?.unsubscribe();
  }

  private readonly IGNORED_ERRORS = [
    'Acquiring an exclusive Navigator LockManager lock',
    'Navigator LockManager',
    'lock:sb-',
    /wt: Acquiring an exclusive Navigator LockManager lock.*immediately failed/ // Регулярное выражение для точного совпадения
  ];
  
  private isIgnoredError(message: string): boolean {
    return this.IGNORED_ERRORS.some(ignored => {
      if (typeof ignored === 'string') {
        return message.includes(ignored);
      } else if (ignored instanceof RegExp) {
        return ignored.test(message);
      }
      return false;
    });
  }

  private normalizeErrorMessage(message: string, type: 'error' | 'warning' | 'ai-error'): string {
    let normalized = message.trim().toLowerCase();
    
    if (this.isIgnoredError(message)) {
      return 'ignored_lock_manager_error';
    }
    
    normalized = normalized.replace(/\d+/g, '#');
    normalized = normalized.replace(/\[.*?\]/g, '');
    normalized = normalized.replace(/http\S+/g, 'URL');
    
    return normalized;
  }

  private setupErrorHandling() {
    this.originalConsoleError = console.error;
    this.originalConsoleWarn = console.warn;

    console.error = (...args: any[]) => {
      this.handleConsoleError(args);
      this.originalConsoleError?.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      this.handleConsoleWarn(args);
      this.originalConsoleWarn?.apply(console, args);
    };

    this.consoleErrorHandler = (event: ErrorEvent) => {
      const message = event.error?.message || event.message;
      this.addError(message, this.getErrorSource(event), 'error');
    };

    this.consoleRejectionHandler = (event: PromiseRejectionEvent) => {
      const message = event.reason?.message || event.reason || 'Unhandled Promise Rejection';
      this.addError(message, 'Promise', 'error');
    };

    window.addEventListener('error', this.consoleErrorHandler);
    window.addEventListener('unhandledrejection', this.consoleRejectionHandler);
  }

  private cleanupErrorHandling() {
    if (this.originalConsoleError) {
      console.error = this.originalConsoleError;
    }
    if (this.originalConsoleWarn) {
      console.warn = this.originalConsoleWarn;
    }

    if (this.consoleErrorHandler) {
      window.removeEventListener('error', this.consoleErrorHandler);
    }
    if (this.consoleRejectionHandler) {
      window.removeEventListener('unhandledrejection', this.consoleRejectionHandler);
    }
  }

  private handleConsoleError(args: any[]) {
    const message = this.formatConsoleArgs(args);
    const source = this.getConsoleErrorSource();
    
    let type: 'error' | 'warning' | 'ai-error' = 'error';
    
    if (this.isAIError(message)) {
      type = 'ai-error';
    } else if (this.isWarning(message)) {
      type = 'warning';
    }
    
    this.addError(message, source, type);
  }

  private handleConsoleWarn(args: any[]) {
    const message = this.formatConsoleArgs(args);
    const source = this.getConsoleErrorSource();
    this.addError(message, source, 'warning');
  }

  private isAIError(message: string): boolean {
    const aiKeywords = [
      'ai',
      'together.xyz',
      'api.together',
      '429',
      'too many requests',
      'rate limit',
      '400',
      'bad request',
      'превышен лимит',
      'слишком много запросов',
      'ai service',
      'ai api'
    ];
    
    return aiKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private isWarning(message: string): boolean {
    const warningKeywords = [
      'deprecated',
      'deprecation',
      'warning',
      'устарел',
      'предупреждение'
    ];
    
    return warningKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private formatConsoleArgs(args: any[]): string {
    return args.map(arg => {
      if (typeof arg === 'object') {
        try {
          // Для AI ошибок пытаемся извлечь полезную информацию
          if (arg.status === 429) {
            return 'Превышен лимит запросов к AI сервису. Попробуйте позже.';
          }
          if (arg.status === 400) {
            return 'Неверный запрос к AI сервису. Проверьте параметры.';
          }
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
  }

  private getConsoleErrorSource(): string {
    try {
      throw new Error();
    } catch (error) {
      const stack = (error as Error).stack;
      if (stack) {
        const lines = stack.split('\n');
        for (let i = 3; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.includes('at ') && !line.includes('node_modules') && !line.includes('zone.js')) {
            const match = line.match(/at .+?\((.*?):(\d+):(\d+)\)/);
            if (match) {
              const fileName = match[1].split('/').pop();
              return `${fileName}:${match[2]}`;
            }
            return line.split(' ')[1] || 'Unknown';
          }
        }
      }
    }
    return 'Console';
  }

  private getErrorSource(event: ErrorEvent): string {
    const filename = event.filename ? event.filename.split('/').pop() : 'Unknown';
    return `${filename}:${event.lineno}`;
  }

  private addError(message: string, source?: string, type: 'error' | 'warning' | 'ai-error' = 'error') {
    if (this.isIgnoredError(message)) {
      console.log('Ignoring LockManager error:', message);
      return;
    }
    const normalizedMessage = this.normalizeErrorMessage(message, type);
    
    if (this.isDuplicateError(normalizedMessage)) {
      return;
    }

    const displayMessage = normalizedMessage.length > 200 
      ? normalizedMessage.substring(0, 200) + '...' 
      : normalizedMessage;

    const error: ErrorInfo = {
      id: this.errorId++,
      message: this.enhanceAIMessage(displayMessage, type),
      source: source,
      timestamp: Date.now(),
      progress: 100,
      fadingOut: false,
      type: type,
      originalMessage: normalizedMessage
    };

    // Добавляем в кэш
    this.errorCache.set(normalizedMessage, Date.now());

    this.errors.push(error);

    // Автоматическое удаление
    setTimeout(() => {
      this.removeError(error);
    }, 5000);

    // Очищаем кэш от старых записей
    this.cleanErrorCache();
  }

  private isDuplicateError(normalizedMessage: string): boolean {
    const lastSeen = this.errorCache.get(normalizedMessage);
    if (!lastSeen) return false;
    
    // Если такая ошибка была показана менее DUPLICATE_TIMEOUT назад - это дубликат
    return Date.now() - lastSeen < this.DUPLICATE_TIMEOUT;
  }

  private cleanErrorCache() {
    const now = Date.now();
    for (const [message, timestamp] of this.errorCache.entries()) {
      if (now - timestamp > this.DUPLICATE_TIMEOUT) {
        this.errorCache.delete(message);
      }
    }
  }

  private enhanceAIMessage(message: string, type: 'error' | 'warning' | 'ai-error'): string {
    if (type !== 'ai-error') return message;

    // Enhance AI error messages for user
    if (message.includes('429') || message.includes('too many requests') || message.includes('превышен лимит')) {
      return this.translate.instant('ERROR.AI_RATE_LIMIT');
    }

    if (message.includes('400') || message.includes('bad request')) {
      return this.translate.instant('ERROR.AI_BAD_REQUEST');
    }

    if (message.includes('ai') || message.includes('together')) {
      return this.translate.instant('ERROR.AI_SERVICE_TEMPORARY');
    }

    return message;
  }

  private startProgressTimer() {
    this.timerSubscription = interval(50).subscribe(() => {
      const now = Date.now();
      this.errors.forEach(error => {
        const elapsed = now - error.timestamp;
        const remaining = Math.max(0, 5000 - elapsed);
        error.progress = (remaining / 5000) * 100;
      });
    });
  }

  removeError(error: ErrorInfo) {
    error.fadingOut = true;
    setTimeout(() => {
      const index = this.errors.indexOf(error);
      if (index > -1) {
        this.errors.splice(index, 1);
      }
    }, 300);
  }

  // Публичные методы для использования в сервисах
  showError(message: string, source?: string) {
    this.addError(message, source, 'error');
  }

  showAIError(message: string, source?: string) {
    this.addError(message, source, 'ai-error');
  }

  showWarning(message: string, source?: string) {
    this.addError(message, source, 'warning');
  }

  handleApiError(error: any, context: string = 'API') {
    if (error.status === 429) {
      this.showAIError(this.translate.instant('ERROR.AI_RATE_LIMIT'), context);
    } else if (error.status === 400) {
      this.showAIError(this.translate.instant('ERROR.AI_BAD_REQUEST'), context);
    } else if (error.status >= 500) {
      this.showError(this.translate.instant('ERROR.SERVER'), context);
    } else {
      const message = error.message || this.translate.instant('ERROR.GENERIC');
      this.showError(message, context);
    }
  }

  getToastClasses(error: ErrorInfo): string {
    return `${error.type}-type error-toast`;
  }
  
  getIconClass(error: ErrorInfo): string {
    switch (error.type) {
      case 'ai-error':
        return 'pi pi-robot';
      case 'warning':
        return 'pi pi-exclamation-circle';
      case 'error':
      default:
        return 'pi pi-exclamation-triangle';
    }
  }
  
  showSource(error: ErrorInfo): boolean {
    // Не показываем источник для AI ошибок, чтобы не засорять интерфейс
    return error.type !== 'ai-error';
  }
}
