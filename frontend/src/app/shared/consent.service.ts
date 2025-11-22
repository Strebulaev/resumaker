import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {
  private personalDataConsent = new BehaviorSubject<boolean>(this.hasPersonalDataConsent());
  private cookiesConsent = new BehaviorSubject<any>(this.getCookiesSettings());

  personalDataConsent$ = this.personalDataConsent.asObservable();
  cookiesConsent$ = this.cookiesConsent.asObservable();

  setPersonalDataConsent(consent: boolean) {
    localStorage.setItem('personal_data_consent', consent.toString());
    localStorage.setItem('personal_data_consent_date', new Date().toISOString());
    this.personalDataConsent.next(consent);
  }

  setCookiesConsent(settings: any) {
    localStorage.setItem('cookies_consent', 'true');
    localStorage.setItem('cookies_settings', JSON.stringify(settings));
    localStorage.setItem('cookies_consent_date', new Date().toISOString());
    this.cookiesConsent.next(settings);
  }

  private hasPersonalDataConsent(): boolean {
    return localStorage.getItem('personal_data_consent') === 'true';
  }

  private getCookiesSettings(): any {
    const settings = localStorage.getItem('cookies_settings');
    return settings ? JSON.parse(settings) : {
      necessary: true,
      analytics: false,
      functional: false
    };
  }

  hasGivenAllConsents(): boolean {
    return this.hasPersonalDataConsent() && localStorage.getItem('cookies_consent') === 'true';
  }
}