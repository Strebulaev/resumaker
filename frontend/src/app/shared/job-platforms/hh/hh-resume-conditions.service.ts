import { Injectable } from '@angular/core';
import { HHAuthService } from './hh-auth.service';

@Injectable({ providedIn: 'root' })
export class HHResumeConditionsService {
  constructor(private hhAuthService: HHAuthService) {}

  async getResumeConditions(): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('https://api.hh.ru/resume_conditions', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка получения условий резюме');
    return response.json();
  }

  async getResumeConditionsById(resumeId: string): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/resumes/${resumeId}/conditions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка получения условий резюме');
    return response.json();
  }
}