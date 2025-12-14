import { Injectable } from '@angular/core';
import { HHAuthService } from './hh-auth.service';

@Injectable({ providedIn: 'root' })
export class HHApplicantCommentsService {
  constructor(private hhAuthService: HHAuthService) {}

  async getApplicantComments(applicantId: string): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/applicant_comments/${applicantId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка получения комментариев');
    return response.json();
  }

  async addApplicantComment(applicantId: string, comment: { text: string; access_type: string }): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/applicant_comments/${applicantId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: JSON.stringify(comment)
    });

    if (!response.ok) throw new Error('Ошибка добавления комментария');
    return response.json();
  }

  async updateApplicantComment(applicantId: string, commentId: string, updates: { text?: string; access_type?: string }): Promise<any> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/applicant_comments/${applicantId}/${commentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) throw new Error('Ошибка обновления комментария');
    return response.json();
  }

  async deleteApplicantComment(applicantId: string, commentId: string): Promise<void> {
    const token = await this.hhAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch(`https://api.hh.ru/applicant_comments/${applicantId}/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });

    if (!response.ok) throw new Error('Ошибка удаления комментария');
  }
}