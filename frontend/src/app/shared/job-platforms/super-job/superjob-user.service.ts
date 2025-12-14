import { Injectable } from '@angular/core';
import { SuperJobAuthService } from './superjob-auth.service';

@Injectable({ providedIn: 'root' })
export class SuperJobUserService {
  constructor(private superJobAuthService: SuperJobAuthService) {}

  async getCurrentUser(): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/user/current/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения текущего пользователя SuperJob');
    return response.json();
  }

  async getUserById(userId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/user/${userId}/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения пользователя SuperJob');
    return response.json();
  }

  async getCompanyUsers(): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/user/list/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения списка пользователей SuperJob');
    return response.json();
  }

  async createUser(userData: any): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/user/`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
    });

    if (!response.ok) throw new Error('Ошибка создания пользователя SuperJob');
    return response.json();
  }

  async updateUser(userId: number, updates: any): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/user/${userId}/`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })
    });

    if (!response.ok) throw new Error('Ошибка обновления пользователя SuperJob');
    return response.json();
  }

  async deleteUser(userId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/user/${userId}/`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка удаления пользователя SuperJob');
    return response.json();
  }

  async resetPassword(email: string): Promise<any> {
    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/forgot_password/`,
        method: 'POST',
        headers: {
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
    });

    if (!response.ok) throw new Error('Ошибка восстановления пароля SuperJob');
    return response.json();
  }
}