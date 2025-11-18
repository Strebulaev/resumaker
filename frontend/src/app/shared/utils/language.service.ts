// src/app/shared/utils/language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'selectedLanguage';
  private readonly supportedLanguages = ['ru', 'en'];
  private languageSubject = new BehaviorSubject<string>(this.getLanguage());

  getLanguage(): string {
    const savedLang = localStorage.getItem(this.STORAGE_KEY);
    if (savedLang && this.supportedLanguages.includes(savedLang)) {
      return savedLang;
    }

    const browserLang = this.getBrowserLanguage();
    if (browserLang && this.supportedLanguages.includes(browserLang)) {
      return browserLang;
    }

    if (this.isLikelyRussianUser()) {
      return 'ru';
    }

    return 'en';
  }

  setLanguage(lang: string): void {
    if (this.supportedLanguages.includes(lang)) {
      localStorage.setItem(this.STORAGE_KEY, lang);
      this.languageSubject.next(lang);
    }
  }

  private getBrowserLanguage(): string | null {
    const browserLang = navigator.language || (navigator as any).userLanguage;
    
    if (!browserLang) return null;
    
    const baseLang = browserLang.split('-')[0].toLowerCase();
    
    return this.supportedLanguages.includes(baseLang) ? baseLang : null;
  }

  private isLikelyRussianUser(): boolean {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const russianTimezones = [
        'Europe/Kaliningrad', 'Europe/Moscow', 'Europe/Samara', 
        'Europe/Volgograd', 'Asia/Yekaterinburg', 'Asia/Omsk',
        'Asia/Krasnoyarsk', 'Asia/Irkutsk', 'Asia/Yakutsk',
        'Asia/Vladivostok', 'Asia/Magadan', 'Asia/Kamchatka'
      ];
      
      if (russianTimezones.includes(timezone)) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }


  get languageChanges$(): Observable<string> {
    return this.languageSubject.asObservable();
  }

  getCurrentLanguage(): string {
    return this.languageSubject.value;
  }
  getSupportedLanguages(): { code: string; name: string }[] {
    return [
      { code: 'en', name: 'English' },
      { code: 'ru', name: 'Русский' }
    ];
  }
}