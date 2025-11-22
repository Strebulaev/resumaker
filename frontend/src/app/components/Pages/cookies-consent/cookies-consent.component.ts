import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../../shared/analytics.service';

@Component({
  selector: 'app-cookies-consent',
  templateUrl: './cookies-consent.component.html',
  styleUrls: ['./cookies-consent.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class CookiesConsentComponent implements OnInit {
  showCookiesBanner = false;
  showSettings = false;
  analyticsEnabled = true;
  functionalEnabled = true;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Проверяем, давал ли пользователь уже согласие на cookies
    const cookiesConsent = localStorage.getItem('cookies_consent');
    if (!cookiesConsent) {
      // Показываем баннер через 3 секунды после загрузки
      setTimeout(() => {
        this.showCookiesBanner = true;
      }, 3000);
    } else {
      // Если согласие уже дано, инициализируем аналитику
      const settings = JSON.parse(localStorage.getItem('cookies_settings') || '{}');
      this.analyticsService.initializeAnalytics(settings);
    }
  }

  acceptAll() {
    this.saveCookieSettings({
      necessary: true,
      analytics: true,
      functional: true
    });
    this.closeBanner();
  }

  rejectAll() {
    this.saveCookieSettings({
      necessary: true, // Обязательные cookies нельзя отключить
      analytics: false,
      functional: false
    });
    this.closeBanner();
  }

  saveSettings() {
    this.saveCookieSettings({
      necessary: true,
      analytics: this.analyticsEnabled,
      functional: this.functionalEnabled
    });
    this.showSettings = false;
    this.closeBanner();
  }

  private saveCookieSettings(settings: any) {
    localStorage.setItem('cookies_consent', 'true');
    localStorage.setItem('cookies_settings', JSON.stringify(settings));
    localStorage.setItem('cookies_consent_date', new Date().toISOString());
    
    // Инициализация аналитики в соответствии с настройками
    this.analyticsService.initializeAnalytics(settings);
    
    console.log('Настройки cookies сохранены:', settings);
  }

  closeBanner() {
    this.showCookiesBanner = false;
  }
}