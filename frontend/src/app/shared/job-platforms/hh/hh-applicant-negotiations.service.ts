import { Injectable } from '@angular/core';
import { HHAuthService } from './hh-auth.service';

@Injectable({ providedIn: 'root' })
export class HHApplicantNegotiationsService {
  constructor(private hhAuthService: HHAuthService) {}

  async applyToVacancy(vacancyId: string, resumeId: string, message: string): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('https://api.hh.ru/negotiations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: JSON.stringify({
        vacancy_id: vacancyId,
        resume_id: resumeId,
        message: message
      })
    });

    if (!response.ok) throw new Error('Ошибка отправки отклика');
    return response.json();
  }

  async getNegotiations(params?: any): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const query = new URLSearchParams(params).toString();
    const url = `https://api.hh.ru/negotiations${query ? '?' + query : ''}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка получения откликов');
    return response.json();
  }

  async sendNegotiationMessage(nid: string, message: string): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/negotiations/${nid}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: new URLSearchParams({ message }).toString()
    });

    if (!response.ok) throw new Error('Ошибка отправки сообщения');
    return response.json();
  }

  async getNegotiationMessages(nid: string): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/negotiations/${nid}/messages`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка получения сообщений');
    return response.json();
  }

  async editNegotiationMessage(nid: string, mid: string, message: string): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/negotiations/${nid}/messages/${mid}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) throw new Error('Ошибка редактирования сообщения');
    return response.json();
  }

  async hideNegotiation(nid: string, declineMessage?: boolean): Promise<void> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const params = declineMessage ? `?with_decline_message=${declineMessage}` : '';

    const response = await fetch(`https://api.hh.ru/negotiations/active/${nid}${params}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка скрытия отклика');
  }
}