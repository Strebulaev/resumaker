import { Injectable } from '@angular/core';
import { HHAuthService } from './hh-auth.service';

@Injectable({ providedIn: 'root' })
export class HHResumeSearchService {
  constructor(private hhAuthService: HHAuthService) {}

  async searchResumes(params?: any): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const query = new URLSearchParams(params).toString();
    const url = `https://api.hh.ru/resumes${query ? '?' + query : ''}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка поиска резюме');
    return response.json();
  }
}