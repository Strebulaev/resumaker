import { Injectable } from '@angular/core';
import { SuperJobAuthService } from './superjob-auth.service';

@Injectable({ providedIn: 'root' })
export class SuperJobResumeService {
  constructor(private superJobAuthService: SuperJobAuthService) {}

  async searchResumes(params?: any): Promise<any> {
    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/resumes/?${new URLSearchParams(params).toString()}`,
        method: 'GET'
      })
    });

    if (!response.ok) throw new Error('Ошибка поиска резюме SuperJob');
    return response.json();
  }

  async getResume(resumeId: number): Promise<any> {
    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/resumes/${resumeId}/`,
        method: 'GET'
      })
    });

    if (!response.ok) throw new Error('Ошибка получения резюме SuperJob');
    return response.json();
  }

  async buyResumeContacts(resumeId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/${resumeId}/buy/`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка покупки контактов резюме');
    return response.json();
  }

  async getResumeContacts(resumeId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/${resumeId}/open/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения контактов резюме');
    return response.json();
  }

  async getResumeMailData(resumeId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/${resumeId}/mail_data/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения шаблонов писем');
    return response.json();
  }

  async sendResumeByEmail(resumeId: number, emailData: any): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/${resumeId}/mail_to/`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      })
    });

    if (!response.ok) throw new Error('Ошибка отправки резюме на email');
    return response.json();
  }

  async sendMailToResume(resumeId: number, mailData: any): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/${resumeId}/send_mail/`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mailData)
      })
    });

    if (!response.ok) throw new Error('Ошибка отправки письма соискателю');
    return response.json();
  }

  async getResumeInvitationData(resumeId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/${resumeId}/invitation_data/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения шаблонов приглашения');
    return response.json();
  }

  async inviteResume(resumeId: number, invitationData: any): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/${resumeId}/invite/`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invitationData)
      })
    });

    if (!response.ok) throw new Error('Ошибка приглашения соискателя');
    return response.json();
  }

  async getResumeRejectionData(resumeId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/${resumeId}/rejection_data/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения шаблонов отказа');
    return response.json();
  }

  async rejectResume(resumeId: number, rejectionData: any): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/${resumeId}/reject/`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rejectionData)
      })
    });

    if (!response.ok) throw new Error('Ошибка отказа соискателю');
    return response.json();
  }

  async getResumeComments(resumeId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/${resumeId}/comments/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения комментариев');
    return response.json();
  }

  async addResumeComment(resumeId: number, comment: string): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/${resumeId}/comments/`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
      })
    });

    if (!response.ok) throw new Error('Ошибка добавления комментария');
    return response.json();
  }

  async deleteResumeComment(commentId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/hr/resumes/comments/${commentId}/`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка удаления комментария');
    return response.json();
  }

  async getReceivedResumes(): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/resumes/received/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения полученных резюме');
    return response.json();
  }

  async getReceivedResumesByClient(): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/resumes/received-by-client/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения резюме всех пользователей');
    return response.json();
  }

  async getReceivedResumesCounter(): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/resumes/received/counter`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения счетчика резюме');
    return response.json();
  }

  async getReceivedResumesByVacancy(vacancyId: number): Promise<any> {
    const token = await this.superJobAuthService.getValidToken();
    if (!token) throw new Error('Требуется авторизация');

    const response = await fetch('/api/cors-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://api.superjob.ru/2.0/resumes/received/${vacancyId}/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-App-Id': this.superJobAuthService.clientSecret
        }
      })
    });

    if (!response.ok) throw new Error('Ошибка получения откликов на вакансию');
    return response.json();
  }
}