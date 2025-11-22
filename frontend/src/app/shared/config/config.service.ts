import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../error-handler.service';

export interface AnalyticsConfig {
  googleAnalyticsId: string;
  yandexMetrikaId: string;
  microsoftClarityId: string;
  hotjarId: string;
}

export interface AppConfig {
  supabaseUrl: string;
  supabaseKey: string;
  togetherApiKey: string;
  hhClientId: string;
  hhClientSecret: string;
  superJobClientId: string;
  superJobClientSecret: string;
  habrClientId: string;
  habrClientSecret: string;
  yookassaShopId: string;
  yookassaSecretKey: string;
  demoMode: boolean;
  analytics: AnalyticsConfig;
}

export interface EnvironmentConfig {
  production: boolean;
  supabaseUrl: string;
  supabaseKey: string;
  togetherApiKey: string;
  hh?: {
    hhClientId: string;
    hhClientSecret: string;
  };
  superJob?: {
    superJobClientId: string;
    superJobClientSecret: string;
  };
  habr?: {
    habrClientId: string;
    habrClientSecret: string;
  };
  yookassaShopId?: string;
  yookassaSecretKey?: string;
  demoMode?: boolean;
  analytics?: AnalyticsConfig;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private configLoaded = new BehaviorSubject<boolean>(false);
  private config!: AppConfig;
  private configCache: AppConfig | null = null;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  async loadConfig(): Promise<AppConfig> {
    if (this.configCache) {
      return this.configCache;
    }
    if (!environment.production) {
      console.log('Using development config from environment.ts');
      const devConfig: AppConfig = {
        supabaseUrl: environment.supabaseUrl,
        supabaseKey: environment.supabaseKey,
        togetherApiKey: environment.togetherApiKey,
        hhClientId: environment.hh?.hhClientId || '',
        hhClientSecret: environment.hh?.hhClientSecret || '',
        superJobClientId: environment.superJob?.superJobClientId || '',
        superJobClientSecret: environment.superJob?.superJobClientSecret || '',
        habrClientId: environment.habr?.habrClientId || '',
        habrClientSecret: environment.habr?.habrClientSecret || '',
        yookassaShopId: environment.yookassaShopId || '',
        yookassaSecretKey: environment.yookassaSecretKey || '',
        demoMode: environment.demoMode || true,
        analytics: {
          googleAnalyticsId: environment.analytics?.googleAnalyticsId || '',
          yandexMetrikaId: environment.analytics?.yandexMetrikaId || '',
          microsoftClarityId: environment.analytics?.microsoftClarityId || '',
          hotjarId: environment.analytics?.hotjarId || '',
        }
      };
      
      this.config = devConfig;
      this.configCache = devConfig;
      this.configLoaded.next(true);
      return devConfig;
    }

    // В production всегда используем API endpoint
    try {
      console.log('Loading config from API endpoint');
      const config = await this.http.get<AppConfig>('/api/config').toPromise();
      
      if (!config) {
        throw new Error('Empty response from config API');
      }

      console.log('Config loaded from API successfully');
      this.config = config;
      this.configCache = config;
      this.configLoaded.next(true);
      return config;

    } catch (error) {
      this.errorHandler.showError('Ошибка загрузки конфигурации', 'ConfigService');

      const emptyConfig: AppConfig = {
        supabaseUrl: '',
        supabaseKey: '',
        togetherApiKey: '',
        hhClientId: '',
        hhClientSecret: '',
        superJobClientId: '',
        superJobClientSecret: '',
        habrClientId: '',
        habrClientSecret: '',
        yookassaShopId: '',
        yookassaSecretKey: '',
        demoMode: true,
        analytics: {
          googleAnalyticsId: '',
          yandexMetrikaId: '',
          microsoftClarityId: '',
          hotjarId: '',
        }
      };
      
      this.config = emptyConfig;
      this.configCache = emptyConfig;
      this.configLoaded.next(true);
      return emptyConfig;
    }
  }

  getConfig(): AppConfig {
    if (!this.config) {
      throw new Error('Config not loaded yet');
    }
    return this.config;
  }

  isConfigLoaded() {
    return this.configLoaded.asObservable();
  }

  hasAnalytics(): boolean {
    const analytics = this.config?.analytics;
    return !!(analytics?.googleAnalyticsId || analytics?.yandexMetrikaId || 
              analytics?.microsoftClarityId || analytics?.hotjarId);
  }
}