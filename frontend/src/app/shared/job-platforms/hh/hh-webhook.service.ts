import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HHAuthService } from './hh-auth.service';

@Injectable({ providedIn: 'root' })
export class HHWebhookService {
  constructor(private hhAuthService: HHAuthService) {}

  async subscribeToWebhooks(subscription: any): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('https://api.hh.ru/webhook/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: JSON.stringify(subscription)
    });

    if (!response.ok) throw new Error('Ошибка подписки на webhook');
    return response.json();
  }

  async getWebhookSubscriptions(): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('https://api.hh.ru/webhook/subscriptions', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка получения подписок');
    return response.json();
  }

  async updateWebhookSubscription(subscriptionId: string, updates: any): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/webhook/subscriptions/${subscriptionId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) throw new Error('Ошибка обновления подписки');
    return response.json();
  }

  async deleteWebhookSubscription(subscriptionId: string): Promise<void> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/webhook/subscriptions/${subscriptionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка удаления подписки');
  }
}