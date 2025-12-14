import { Injectable } from '@angular/core';
import { SuperJobAuthService } from './superjob-auth.service';

@Injectable({ providedIn: 'root' })
export class SuperJobSubscriptionsService {
  constructor(private superJobAuthService: SuperJobAuthService) {}

  async getSubscriptions(): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/subscriptions/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения подборок SuperJob');
    return response.json();
  }

  async createSubscription(subscriptionData: any): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/subscriptions/`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriptionData)
      })
    });

    if (!response.ok) throw new Error('Ошибка создания подборки SuperJob');
    return response.json();
  }

  async getSubscription(subscriptionId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/subscriptions/${subscriptionId}/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения подборки SuperJob');
    return response.json();
  }

  async updateSubscription(subscriptionId: number, updates: any): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/subscriptions/${subscriptionId}/`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })
    });

    if (!response.ok) throw new Error('Ошибка обновления подборки SuperJob');
    return response.json();
  }

  async deleteSubscription(subscriptionId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/subscriptions/${subscriptionId}/`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка удаления подборки SuperJob');
    return response.json();
  }
}