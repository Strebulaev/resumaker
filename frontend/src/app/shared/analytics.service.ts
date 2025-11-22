import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConfigService } from './config/config.service';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: Function;
    ym: Function;
    clarity: Function;
    hj: Function;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private isBrowser: boolean;
  private analyticsEnabled = false;
  private scriptsLoaded = {
    googleAnalytics: false,
    yandexMetrika: false,
    microsoftClarity: false,
    hotjar: false
  };

  constructor(
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  initializeAnalytics(settings: any): void {
    if (!this.isBrowser) return;

    const config = this.configService.getConfig();
    this.analyticsEnabled = settings.analytics;

    if (!this.analyticsEnabled) {
      console.log('Analytics disabled by user');
      return;
    }

    // Загружаем скрипты аналитики с обработкой ошибок
    this.loadAnalyticsScripts(config.analytics);
  }

  private loadAnalyticsScripts(analyticsConfig: any): void {
    // Google Analytics
    if (analyticsConfig.googleAnalyticsId) {
      this.loadGoogleAnalytics(analyticsConfig.googleAnalyticsId);
    }

    // Yandex Metrika (загружаем с обработкой блокировки)
    if (analyticsConfig.yandexMetrikaId) {
      this.loadYandexMetrika(analyticsConfig.yandexMetrikaId);
    }

    // Microsoft Clarity
    if (analyticsConfig.microsoftClarityId) {
      this.loadMicrosoftClarity(analyticsConfig.microsoftClarityId);
    }

    // Hotjar
    if (analyticsConfig.hotjarId) {
      this.loadHotjar(analyticsConfig.hotjarId);
    }
  }

  private loadGoogleAnalytics(measurementId: string): void {
    try {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { 
          window.dataLayer.push(arguments); 
        };
        window.gtag('js', new Date());
        window.gtag('config', measurementId, {
          page_title: document.title,
          page_location: window.location.href
        });
        this.scriptsLoaded.googleAnalytics = true;
        console.log('✅ Google Analytics initialized with ID:', measurementId);
      };

      script.onerror = (error) => {
        console.warn('❌ Google Analytics script loading failed:', error);
      };

      document.head.appendChild(script);
    } catch (error) {
      console.warn('❌ Google Analytics initialization failed:', error);
    }
  }

  private loadYandexMetrika(counterId: string): void {
    try {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      
      // Добавляем обработку ошибок для скрипта
      script.onerror = (error) => {
        console.warn('❌ Yandex Metrika script loading failed (likely blocked by ad blocker):', error);
        // Не прерываем выполнение - метрика может работать частично
      };

      script.innerHTML = `
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
        })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

        try {
          ym(${counterId}, 'init', {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            ecommerce: "dataLayer"
          });
          console.log('✅ Yandex Metrika initialized');
        } catch (e) {
          console.warn('❌ Yandex Metrika initialization failed:', e);
        }
      `;
      
      document.head.appendChild(script);
      this.scriptsLoaded.yandexMetrika = true;
      console.log('✅ Yandex Metrika script injected with ID:', counterId);

      // Добавляем noscript (работает даже при блокировке JavaScript)
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${counterId}" style="position:absolute; left:-9999px;" alt="" /></div>`;
      document.body.appendChild(noscript);

    } catch (error) {
      console.warn('❌ Yandex Metrika initialization failed:', error);
    }
  }

  private loadMicrosoftClarity(projectId: string): void {
    try {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      
      script.onerror = (error) => {
        console.warn('❌ Microsoft Clarity script loading failed:', error);
      };

      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `;
      
      document.head.appendChild(script);
      this.scriptsLoaded.microsoftClarity = true;
      console.log('✅ Microsoft Clarity initialized with ID:', projectId);
    } catch (error) {
      console.warn('❌ Microsoft Clarity initialization failed:', error);
    }
  }

  private loadHotjar(hotjarId: string): void {
    try {
      const script = document.createElement('script');
      
      script.onerror = (error) => {
        console.warn('❌ Hotjar script loading failed:', error);
      };

      script.innerHTML = `
        (function(c,s,q,u,a,r,e){
          c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
          c._hjSettings={hjid:${hotjarId}};
          r=s.getElementsByTagName('head')[0];
          e=s.createElement('script');
          e.async=true;
          e.src=q+c._hjSettings.hjid+u;
          r.appendChild(e);
        })(window,document,'https://static.hj.contentsquare.net/c/csq-','.js');
      `;
      
      document.head.appendChild(script);
      this.scriptsLoaded.hotjar = true;
      console.log('✅ Hotjar initialized with ID:', hotjarId);
    } catch (error) {
      console.warn('❌ Hotjar initialization failed:', error);
    }
  }

  // Методы для отправки событий с проверкой доступности
  trackEvent(eventName: string, eventParams?: any): void {
    if (!this.isBrowser || !this.analyticsEnabled) return;

    try {
      // Google Analytics
      if (typeof window.gtag === 'function' && this.scriptsLoaded.googleAnalytics) {
        window.gtag('event', eventName, eventParams);
      }

      // Yandex Metrika (пробуем отправить, даже если скрипт мог быть заблокирован)
      if (typeof window.ym === 'function' && this.scriptsLoaded.yandexMetrika) {
        const config = this.configService.getConfig();
        try {
          window.ym(config.analytics.yandexMetrikaId, 'reachGoal', eventName, eventParams);
        } catch (e) {
          console.warn('Yandex Metrika event failed (likely blocked):', e);
        }
      }

      console.log(`📊 Analytics event: ${eventName}`, eventParams);
    } catch (error) {
      console.warn('Analytics event sending failed:', error);
    }
  }

  trackPageView(pageTitle: string, pagePath: string): void {
    if (!this.isBrowser || !this.analyticsEnabled) return;

    try {
      const config = this.configService.getConfig();

      // Google Analytics
      if (typeof window.gtag === 'function' && this.scriptsLoaded.googleAnalytics && config.analytics.googleAnalyticsId) {
        window.gtag('config', config.analytics.googleAnalyticsId, {
          page_title: pageTitle,
          page_location: pagePath
        });
      }

      this.trackEvent('page_view', {
        page_title: pageTitle,
        page_location: pagePath
      });
    } catch (error) {
      console.warn('Page view tracking failed:', error);
    }
  }

  // Метод для проверки статуса аналитики
  getAnalyticsStatus(): any {
    return {
      enabled: this.analyticsEnabled,
      scriptsLoaded: this.scriptsLoaded,
      config: this.configService.getConfig().analytics
    };
  }

  // Остальные методы без изменений...
  trackEcommerceEvent(action: string, params: any): void {
    if (!this.isBrowser || !this.analyticsEnabled) return;

    try {
      // Яндекс.Метрика e-commerce
      if (typeof window.ym === 'function' && this.scriptsLoaded.yandexMetrika) {
        const config = this.configService.getConfig();
        try {
          window.ym(config.analytics.yandexMetrikaId, 'ecommerce', action, params);
        } catch (e) {
          console.warn('Yandex Metrika ecommerce event failed:', e);
        }
      }

      // Google Analytics e-commerce
      if (typeof window.gtag === 'function' && this.scriptsLoaded.googleAnalytics) {
        window.gtag('event', action, params);
      }
    } catch (error) {
      console.warn('Ecommerce event tracking failed:', error);
    }
  }

  disableAnalytics(): void {
    this.analyticsEnabled = false;
    this.clearAnalyticsCookies();
    console.log('Analytics disabled');
  }

  private clearAnalyticsCookies(): void {
    const domains = [
      window.location.hostname,
      '.google.com',
      '.yandex.ru', 
      '.hotjar.com',
      '.clarity.ms'
    ];

    domains.forEach(domain => {
      this.clearCookiesForDomain(domain);
    });
  }

  private clearCookiesForDomain(domain: string): void {
    const cookies = document.cookie.split(';');
    
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      if (name.includes('_ga') || name.includes('_ym') || name.includes('_hj') || name.includes('_cl')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${domain};path=/`;
      }
    });
  }
}