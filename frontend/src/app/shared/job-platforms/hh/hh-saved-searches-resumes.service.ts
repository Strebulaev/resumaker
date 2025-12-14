import { Injectable } from '@angular/core';
import { HHAuthService } from './hh-auth.service';

@Injectable({ providedIn: 'root' })
export class HHSavedSearchesResumesService {
  constructor(private hhAuthService: HHAuthService) {}

  async getSavedSearches(): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('https://api.hh.ru/saved_searches/resumes', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка получения сохраненных поисков');
    return response.json();
  }

  async createSavedSearch(searchData: any): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('https://api.hh.ru/saved_searches/resumes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: JSON.stringify(searchData)
    });

    if (!response.ok) throw new Error('Ошибка создания сохраненного поиска');
    return response.json();
  }

  async getSavedSearch(id: string): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/saved_searches/resumes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка получения сохраненного поиска');
    return response.json();
  }

  async updateSavedSearch(id: string, updates: any): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/saved_searches/resumes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) throw new Error('Ошибка обновления сохраненного поиска');
    return response.json();
  }

  async deleteSavedSearch(id: string): Promise<void> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/saved_searches/resumes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка удаления сохраненного поиска');
  }

  async transferSavedSearch(savedSearchId: string, managerId: string): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/saved_searches/resumes/${savedSearchId}/managers/${managerId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка передачи сохраненного поиска');
    return response.json();
  }
}