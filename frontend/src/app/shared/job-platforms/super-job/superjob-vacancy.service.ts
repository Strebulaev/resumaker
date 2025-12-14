import { Injectable } from '@angular/core';
import { SuperJobAuthService } from './superjob-auth.service';

@Injectable({ providedIn: 'root' })
export class SuperJobVacancyService {
  constructor(private superJobAuthService: SuperJobAuthService) {}

  async searchVacancies(params?: any): Promise<any> {
    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/vacancies/?${new URLSearchParams(params).toString()}`,
        method: 'GET'
      })
    });

    if (!response.ok) throw new Error('Ошибка поиска вакансий SuperJob');
    return response.json();
  }

  async createVacancy(vacancyData: any): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/vacancies/`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vacancyData)
      })
    });

    if (!response.ok) throw new Error('Ошибка создания вакансии SuperJob');
    return response.json();
  }

  async getVacancy(vacancyId: number): Promise<any> {
    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/vacancies/${vacancyId}/`,
        method: 'GET'
      })
    });

    if (!response.ok) throw new Error('Ошибка получения вакансии SuperJob');
    return response.json();
  }

  async updateVacancy(vacancyId: number, updates: any): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/vacancies/${vacancyId}/`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })
    });

    if (!response.ok) throw new Error('Ошибка обновления вакансии SuperJob');
    return response.json();
  }

  async deleteVacancy(vacancyId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/vacancies/${vacancyId}/`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка удаления вакансии SuperJob');
    return response.json();
  }

  async archiveVacancy(vacancyId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/vacancies/${vacancyId}/archive/`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка архивирования вакансии SuperJob');
    return response.json();
  }

  async republishVacancy(vacancyId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/vacancies/${vacancyId}/republish/`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка восстановления вакансии SuperJob');
    return response.json();
  }

  async getClientVacancies(): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/vacancies/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения вакансий клиента SuperJob');
    return response.json();
  }
}