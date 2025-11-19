// src/app/shared/ai/ai-guard.service.ts
import { Injectable } from '@angular/core';
import { AIService } from './ai.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AIGuardService {
  private currentProviderSubject = new BehaviorSubject<string>('Не настроен');
  
  constructor(private aiService: AIService) {
    // Подписываемся на изменения текущего провайдера
    this.aiService.getCurrentProviderObservable().subscribe(provider => {
      this.currentProviderSubject.next(provider?.name || 'Не настроен');
    });
  }

  checkAIConfigured(): boolean {
    return this.aiService.isAnyProviderConfigured();
  }

  getCurrentProviderName(): string {
    return this.currentProviderSubject.value;
  }

  getCurrentProviderNameObservable(): Observable<string> {
    return this.currentProviderSubject.asObservable();
  }

  ensureAIConfigured(): { configured: boolean; message?: string } {
    if (this.checkAIConfigured()) {
      return { configured: true };
    }
    
    return { 
      configured: false, 
      message: 'Для использования этой функции необходимо настроить AI провайдера' 
    };
  }
}