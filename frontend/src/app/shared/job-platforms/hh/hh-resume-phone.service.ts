import { Injectable } from '@angular/core';
import { HHAuthService } from './hh-auth.service';

@Injectable({ providedIn: 'root' })
export class HHResumePhoneService {
  constructor(private hhAuthService: HHAuthService) {}

  async confirmPhone(phoneData: { phone: string; confirmation_code: string }): Promise<any> {
    const response = await fetch('https://api.hh.ru/resume_phone_confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: new URLSearchParams(phoneData).toString()
    });

    if (!response.ok) throw new Error('Ошибка подтверждения телефона');
    return response.json();
  }

  async generateCode(phoneData: { phone: string }): Promise<any> {
    const response = await fetch('https://api.hh.ru/resume_phone_generate_code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: new URLSearchParams(phoneData).toString()
    });

    if (!response.ok) throw new Error('Ошибка отправки кода подтверждения');
    return response.json();
  }

  async getPhoneInfo(): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('https://api.hh.ru/resume_should_send_sms', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка получения информации о телефоне');
    return response.json();
  }
}