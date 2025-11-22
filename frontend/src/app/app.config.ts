// src/app/app.config.ts
import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from "@primeng/themes/aura";
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MarkdownService, SECURITY_CONTEXT } from 'ngx-markdown';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
import { AppConfig, ConfigService } from './shared/config/config.service';
import { SupabaseService } from './shared/db/supabase.service';
import { environment } from '../environments/environment.prod';
import { LanguageService } from './shared/utils/language.service';

export function initializeApp(configService: ConfigService, supabaseService: SupabaseService): () => Promise<void> {
  return async () => {
    try {
      const config = await configService.loadConfig();
      
      if (!config.supabaseUrl || !config.supabaseKey) {
        console.warn('Supabase config missing, using mock mode');
        await supabaseService.initialize(config);
        return;
      }
      
      await supabaseService.initialize(config);
    } catch (error) {
      console.error('Failed to initialize app:', error);
      const fallbackConfig = {
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
        demoMode: false,
        analytics: {
          googleAnalyticsId: '',
          yandexMetrikaId: '',
          microsoftClarityId: '',
          hotjarId: '',
        }

      };
      await supabaseService.initialize(fallbackConfig);
    }
  };
}

export function initializeTranslation(
  translate: TranslateService, 
  languageService: LanguageService
) {
  return () => {
    const defaultLang = languageService.getLanguage();
    translate.setDefaultLang('en');
    translate.use(defaultLang);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService, SupabaseService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslation,
      deps: [TranslateService, LanguageService],
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true,
    },
    provideAnimationsAsync(),
    providePrimeNG(
      {
        theme: {
          preset: Aura
        }
      }
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    MarkdownService,
    MessageService,
    { provide: SECURITY_CONTEXT, useValue: 0 },
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/locale/messages.',
        suffix: '.json'
      })
    }),
  ]
};