import { Injectable } from '@angular/core';
import { AIService } from './ai.service';

@Injectable({ providedIn: 'root' })
export class AIGuardService {
  
  constructor(private aiService: AIService) {}

  checkAIConfigured(): boolean {
    return this.aiService.isAnyProviderConfigured();
  }

  getCurrentProviderName(): string {
    const provider = this.aiService.getCurrentProvider();
    return provider?.name || 'Не настроен';
  }
}