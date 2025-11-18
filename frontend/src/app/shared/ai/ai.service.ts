import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError, of } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { ErrorHandlerService } from '../error-handler.service';

export interface AIRequest {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
  top_p: number;
  top_k?: number;
  repetition_penalty?: number;
  stop?: string[];
  stream?: boolean;
}

export interface AIProvider {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  isConfigured: boolean;
  models: string[];
}

@Injectable({ providedIn: 'root' })
export class AIService {
  private currentProvider: AIProvider | null = null;
  private providers: AIProvider[] = [
    {
      id: 'together',
      name: 'Together AI',
      baseUrl: 'https://api.together.xyz/v1',
      apiKey: '',
      isConfigured: false,
      models: ['meta-llama/Llama-3.3-70B-Instruct-Turbo-Free', 'meta-llama/Llama-3.1-70B-Instruct-Turbo']
    },
    {
      id: 'deepseek',
      name: 'DeepSeek',
      baseUrl: 'https://api.deepseek.com/v1',
      apiKey: '',
      isConfigured: false,
      models: ['deepseek-chat', 'deepseek-coder']
    },
    {
      id: 'openai',
      name: 'OpenAI',
      baseUrl: 'https://api.openai.com/v1',
      apiKey: '',
      isConfigured: false,
      models: ['gpt-4', 'gpt-3.5-turbo']
    },
    {
      id: 'huggingface',
      name: 'Hugging Face',
      baseUrl: 'https://api-inference.huggingface.co/v1',
      apiKey: '',
      isConfigured: false,
      models: ['mistralai/Mistral-7B-Instruct-v0.2', 'google/flan-t5-xxl']
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      baseUrl: 'https://api.anthropic.com/v1',
      apiKey: '',
      isConfigured: false,
      models: ['claude-3-sonnet-20240229', 'claude-3-haiku-20240307']
    },
    {
      id: 'qwen',
      name: 'Qwen',
      baseUrl: 'https://dashscope.aliyuncs.com/api/v1',
      apiKey: '',
      isConfigured: false,
      models: ['qwen-turbo', 'qwen-plus']
    }
  ];

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private errorHandler: ErrorHandlerService
  ) {
    this.loadProvidersConfig();
  }

  private loadProvidersConfig(): void {
    const savedProviders = localStorage.getItem('ai_providers_config');
    if (savedProviders) {
      this.providers = JSON.parse(savedProviders);
    } else {
      // Устанавливаем Together AI как настроенного по умолчанию
      const togetherConfig = this.configService.getConfig();
      if (togetherConfig.togetherApiKey) {
        const togetherProvider = this.providers.find(p => p.id === 'together');
        if (togetherProvider) {
          togetherProvider.apiKey = togetherConfig.togetherApiKey;
          togetherProvider.isConfigured = true;
          this.currentProvider = togetherProvider;
          this.saveProvidersConfig();
        }
      }
    }
  }

  private saveProvidersConfig(): void {
    localStorage.setItem('ai_providers_config', JSON.stringify(this.providers));
  }

  getProviders(): AIProvider[] {
    return this.providers;
  }

  getCurrentProvider(): AIProvider | null {
    return this.currentProvider;
  }

  setCurrentProvider(providerId: string): void {
    const provider = this.providers.find(p => p.id === providerId);
    if (provider && provider.isConfigured) {
      this.currentProvider = provider;
    }
  }

  configureProvider(providerId: string, apiKey: string, baseUrl?: string): boolean {
    const provider = this.providers.find(p => p.id === providerId);
    if (provider) {
      provider.apiKey = apiKey;
      if (baseUrl) provider.baseUrl = baseUrl;
      provider.isConfigured = !!apiKey;
      
      if (provider.isConfigured && !this.currentProvider) {
        this.currentProvider = provider;
      }
      
      this.saveProvidersConfig();
      return true;
    }
    return false;
  }

  isAnyProviderConfigured(): boolean {
    return this.providers.some(provider => provider.isConfigured);
  }

  generateText(request: AIRequest): Observable<string> {
    if (!this.currentProvider || !this.currentProvider.isConfigured) {
      return throwError(() => new Error('AI provider not configured'));
    }

    const url = `${this.currentProvider.baseUrl}/completions`;

    return this.http.post<any>(url, request, {
      headers: {
        'Authorization': `Bearer ${this.currentProvider.apiKey}`,
        'Content-Type': 'application/json'
      }
    }).pipe(
      map(response => {
        if (!response.choices?.[0]?.text) {
          throw new Error('Invalid response from AI API');
        }
        return this.cleanGeneratedText(response.choices[0].text);
      }),
      catchError(error => {
        this.errorHandler.showAIError('Ошибка AI API', 'AIService');
        
        if (error.status === 503) {
          return throwError(() => new Error('Сервис временно недоступен. Попробуйте позже.'));
        }
        
        return throwError(() => new Error('Failed to generate text: ' + (error.error?.error?.message || error.message)));
      }),
      retry(2)
    );
  }

  private cleanGeneratedText(text: string): string {
    if (!text) return '';
    
    return text;
  }

  // Метод для проверки конфигурации провайдера
  testProviderConnection(providerId: string): Observable<boolean> {
    const provider = this.providers.find(p => p.id === providerId);
    if (!provider || !provider.isConfigured) {
      return of(false);
    }

    const testRequest = {
      model: provider.models[0],
      prompt: 'Test connection',
      max_tokens: 5,
      temperature: 0.1
    };

    return this.http.post<any>(`${provider.baseUrl}/completions`, testRequest, {
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json'
      }
    }).pipe(
      map(response => true),
      catchError(() => of(false))
    );
  }
}