import { Injectable } from '@angular/core';
import { HHAuthService } from './hh-auth.service';

@Injectable({ providedIn: 'root' })
export class HHResumeProfileService {
  constructor(private hhAuthService: HHAuthService) {}

  async createResumeProfile(profileData: any): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('https://api.hh.ru/resume_profile', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) throw new Error('Ошибка создания резюме-профиля');
    return response.json();
  }

  async getResumeProfileSchema(resumeId: string): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/resume_profile/${resumeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка получения схемы резюме-профиля');
    return response.json();
  }

  async updateResumeProfile(resumeId: string, updates: any): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/resume_profile/${resumeId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) throw new Error('Ошибка обновления резюме-профиля');
    return response.json();
  }

  async getResumeProfileDictionaries(): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('https://api.hh.ru/resume_profile/dictionaries', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка получения словарей резюме-профиля');
    return response.json();
  }
}