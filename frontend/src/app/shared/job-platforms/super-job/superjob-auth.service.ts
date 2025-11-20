// Файл: C:\Users\Serezhka\Documents\CollectiveProjects\resume\frontend\src\app\shared\superjob\superjob-auth.service.ts

import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { BehaviorSubject, filter, first } from 'rxjs';
import { ErrorToastComponent } from '../../../components/Helpers/error-toast/error-toast.component';
import { ErrorHandlerService } from '../../error-handler.service';

export interface SuperJobTokenResponse {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
  expires_at?: number;
}

export interface SuperJobResume {
  id: number;
  title: string;
  profession: string;
  created: number;
  modified: number;
  status: number;
  skills: string;
  education: Array<{
    name: string;
    year: number;
  }>;
  experience: Array<{
    position: string;
    company: string;
    period: string;
  }>;
  language?: Array<{ // делаем опциональным
    level: string;
    language: string;
  }>;
  platform?: string;
  raw_data?: any;
}

export interface SuperJobVacancy {
  id: number;
  profession: string;
  firm_name: string;
  town: { title: string };
  payment_from: number;
  payment_to: number;
  currency: string;
  vacancyRichText: string;
  type_of_work: { title: string };
  education: { title: string };
  experience: { title: string };
  catalogues: Array<{ title: string }>;
  date_published: number;
}

export interface SuperJobResume {
  id: number;
  title: string;
  profession: string;
  education: Array<{ name: string; year: number }>;
  experience: Array<{ position: string; company: string; period: string }>;
  skills: string;
  language?: Array<{ level: string; language: string }>;
}

@Injectable({ providedIn: 'root' })
export class SuperJobAuthService {
  private readonly SJ_TOKEN_KEY = 'superjob_access_token';
  private readonly SJ_REFRESH_TOKEN_KEY = 'superjob_refresh_token';
  private readonly SJ_TOKEN_EXPIRY_KEY = 'superjob_token_expiry';
  public clientId: string = '';
  public clientSecret: string = ''; // Сделаем public для отладки
  private readonly API_URL = 'https://api.superjob.ru/2.0';
  private configLoaded = new BehaviorSubject<boolean>(false);

  constructor(
    private configService: ConfigService,
    private errorHandler: ErrorHandlerService
  ) {
    this.initializeConfig().catch(console.error);
  }

  async initializeConfig(): Promise<void> {
    try {
      // Ждем загрузки конфигурации
      await this.configService.loadConfig();
      const config = this.configService.getConfig();
      
      this.clientId = config.superJobClientId;
      this.clientSecret = config.superJobClientSecret;
      
      // console.log('SuperJob config initialized:', {
      //   hasClientId: !!this.clientId,
      //   hasClientSecret: !!this.clientSecret,
      //   clientId: this.clientId ? '***' + this.clientId.slice(-4) : 'MISSING',
      //   clientSecret: this.clientSecret ? '***' + this.clientSecret.slice(-4) : 'MISSING'
      // });
      
      if (!this.clientId || !this.clientSecret) {
        console.warn('SuperJob OAuth credentials not configured');
      }
      
      this.configLoaded.next(true);
      
    } catch (error) {
      console.error('Failed to initialize SuperJob config:', error);
      this.configLoaded.next(true); // Все равно помечаем как загруженное
    }
  }

  private mapUserResume(resumeData: any): SuperJobResume {
    return {
      id: resumeData.id || resumeData.curriculum_id || 0,
      title: resumeData.position || resumeData.profession || 'Резюме',
      profession: resumeData.profession || resumeData.specialization || '',
      created: resumeData.date_created || resumeData.created || Date.now() / 1000,
      modified: resumeData.date_modified || resumeData.modified || Date.now() / 1000,
      status: resumeData.status || resumeData.is_active ? 1 : 0,
      skills: resumeData.skills || resumeData.key_skills || '',
      education: resumeData.education || [],
      experience: resumeData.experience || [],
      language: resumeData.languages || []
    };
  }
  
  async getVacancies(params: any = {}): Promise<{ objects: SuperJobVacancy[]; total: number }> {
    try {
      await this.waitForConfig();
      
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          queryParams.append(key, params[key].toString());
        }
      });
  
      // Используем ваш CORS прокси вместо прямого вызова
      const response = await fetch('/api/cors-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `https://api.superjob.ru/2.0/vacancies/?${queryParams}`,
          method: 'GET'
        })
      });
  
      if (!response.ok) {
        throw new Error(`SuperJob API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('SuperJob getVacancies error:', error);
      throw error;
    }
  }
  
  async getVacancyDetails(vacancyId: number): Promise<SuperJobVacancy> {
    // Используем ваш CORS прокси
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
  
    if (!response.ok) {
      throw new Error(`SuperJob API error: ${response.status}`);
    }
    
    return await response.json();
  }

  async deleteResume(resumeId: number): Promise<void> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в SuperJob');
    }
  
    try {
      const response = await fetch('/api/cors-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `${this.API_URL}/resumes/${resumeId}/`,
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Api-App-Id': this.clientSecret
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete resume: ${response.status}`);
      }
    } catch (error) {
      this.errorHandler.showError('Ошибка удаления резюме SuperJob', 'SuperJobAuthService');
      throw error;
    }
  }
  async waitForConfig(): Promise<void> {
    if (this.configLoaded.value) {
      return;
    }
    
    return new Promise((resolve) => {
      this.configLoaded.pipe(
        filter(loaded => loaded),
        first()
      ).subscribe(() => resolve());
    });
  }

  getAuthUrl(state: string): string {
    if (!this.clientId) {
      throw new Error('SuperJob OAuth not configured - clientId missing');
    }

    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.getRedirectUri(),
      state: state,
      response_type: 'code'
    });
    
    return `https://www.superjob.ru/authorize/?${params.toString()}`;
  }
  private getRedirectUri(): string {
    return window.location.origin + '/auth/superjob-callback';
  }

  private saveToken(tokenData: SuperJobTokenResponse): void {
    const expiryTime = Date.now() + (tokenData.expires_in * 1000);
    
    localStorage.setItem(this.SJ_TOKEN_KEY, tokenData.access_token);
    localStorage.setItem(this.SJ_REFRESH_TOKEN_KEY, tokenData.refresh_token);
    localStorage.setItem(this.SJ_TOKEN_EXPIRY_KEY, expiryTime.toString());
  }

  getStoredToken(): string | null {
    const token = localStorage.getItem(this.SJ_TOKEN_KEY);
    const expiry = localStorage.getItem(this.SJ_TOKEN_EXPIRY_KEY);

    if (!token || !expiry) {
      return null;
    }

    if (Date.now() > parseInt(expiry)) {
      this.clearTokens();
      return null;
    }

    return token;
  }

  isTokenValid(): boolean {
    return this.getStoredToken() !== null;
  }

  clearTokens(): void {
    localStorage.removeItem(this.SJ_TOKEN_KEY);
    localStorage.removeItem(this.SJ_REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.SJ_TOKEN_EXPIRY_KEY);
  }

  async exchangeCodeForToken(code: string): Promise<SuperJobTokenResponse> {
    try {
      await this.waitForConfig();
      
      if (!this.clientId || !this.clientSecret) {
        console.error('SuperJob config missing in exchangeCodeForToken:', {
          clientId: this.clientId,
          clientSecret: this.clientSecret
        });
        throw new Error('SuperJob OAuth not configured');
      }
  
      console.log('Making token exchange request to server endpoint');
      
      const response = await fetch('/api/superjob/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          redirect_uri: this.getRedirectUri(),
          client_id: this.clientId,
          client_secret: this.clientSecret
        })
      });
  
      const responseText = await response.text();
      console.log('Server response status:', response.status);
      
      if (!response.ok) {
        let errorDetails;
        try {
          errorDetails = JSON.parse(responseText);
        } catch {
          errorDetails = responseText;
        }
        
        throw new Error(`Token exchange failed: ${response.status} - ${JSON.stringify(errorDetails)}`);
      }
  
      const tokenData: SuperJobTokenResponse = JSON.parse(responseText);
      this.saveToken(tokenData);
      
      console.log('Token exchange successful');
      return tokenData;
      
    } catch (error) {
      this.errorHandler.showError('Ошибка обновления токена SuperJob', 'SuperJobAuthService');
      throw error;
    }
  }
  private handleApiError(error: any, platform: string): string {
    console.error(`${platform} API error:`, error);
    
    if (error.status === 0) {
      return `Network error: Cannot connect to ${platform}`;
    }
    
    if (error.status >= 500) {
      return `${platform} server error: ${error.status}`;
    }
    
    if (error.status === 404) {
      return `Not found on ${platform}`;
    }
    
    if (error.status === 401 || error.status === 403) {
      return `Authorization error on ${platform}`;
    }
    
    return `Error accessing ${platform}: ${error.status} ${error.statusText}`;
  }

  async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem(this.SJ_REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      return null;
    }
  
    try {
      // Используем серверный endpoint для refresh token
      const response = await fetch('/api/superjob/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken
        })
      });
  
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
  
      const tokenData: SuperJobTokenResponse = await response.json();
      this.saveToken(tokenData);
      
      return tokenData.access_token;
    } catch (error) {
      console.error('SuperJob token refresh error:', error);
      this.clearTokens();
      return null;
    }
  }

  async getValidToken(): Promise<string | null> {
    let token = this.getStoredToken();
    
    if (!token) {
      token = await this.refreshToken();
    }

    return token;
  }

  async getResumes(): Promise<SuperJobResume[]> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в SuperJob');
    }

    const response = await fetch(`${this.API_URL}/resumes/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Api-App-Id': this.clientSecret
      }
    });
    
    if (!response.ok) {
      throw new Error(`SuperJob API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.objects || [];
  }

  async publishResume(resumeData: any): Promise<any> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в SuperJob');
    }

    const response = await fetch(`${this.API_URL}/resumes/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Api-App-Id': this.clientSecret,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resumeData)
    });
    
    if (!response.ok) {
      throw new Error(`SuperJob API error: ${response.status}`);
    }
    
    return await response.json();
  }
 
  async sendApplication(vacancyId: number, resumeId: number, message: string): Promise<any> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в SuperJob');
    }

    const response = await fetch(`${this.API_URL}/send/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Api-App-Id': this.clientSecret,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_vacancy: vacancyId,
        id_resume: resumeId,
        message: message
      })
    });
    
    if (!response.ok) {
      throw new Error(`SuperJob API error: ${response.status}`);
    }
    
    return await response.json();
  }


  async getUserResumes(): Promise<SuperJobResume[]> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в SuperJob');
    }
  
    try {
      // ПРАВИЛЬНЫЙ ENDPOINT для получения резюме
      const response = await fetch('/api/cors-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `${this.API_URL}/resumes/`, // ИЗМЕНЕНО: правильный endpoint
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Api-App-Id': this.clientSecret
          }
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('SuperJob API error response:', errorText);
        throw new Error(`SuperJob API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('SuperJob user resumes response:', data);
      
      // ПРАВИЛЬНОЕ ИЗВЛЕЧЕНИЕ ДАННЫХ
      if (data.objects && Array.isArray(data.objects)) {
        return data.objects.map((resume: any) => this.mapResumeData(resume));
      }
      
      console.warn('Unexpected SuperJob resumes response structure:', data);
      return [];
      
    } catch (error) {
      console.error('Error loading SuperJob user resumes:', error);
      this.errorHandler.showError('Ошибка загрузки резюме SuperJob', 'SuperJobAuthService');
      return [];
    }
  }
  
  private mapResumeStatus(resumeData: any): number {
    // Статусы SuperJob: 1 - активно, 0 - неактивно
    if (resumeData.is_active !== undefined) {
      return resumeData.is_active ? 1 : 0;
    }
    if (resumeData.status !== undefined) {
      return resumeData.status;
    }
    return 1; // по умолчанию активен
  }
  
  private extractSkills(resumeData: any): string {
    if (resumeData.skills) {
      return resumeData.skills;
    }
    if (resumeData.key_skills && Array.isArray(resumeData.key_skills)) {
      return resumeData.key_skills.map((skill: any) => skill.title || skill.name).join(', ');
    }
    if (resumeData.catalogues && Array.isArray(resumeData.catalogues)) {
      return resumeData.catalogues.map((cat: any) => cat.title).join(', ');
    }
    return '';
  }
  
  private mapResumeData(resumeData: any): SuperJobResume {
    return {
      id: resumeData.id || 0,
      title: resumeData.profession || resumeData.position || 'Резюме без названия',
      profession: resumeData.profession || '',
      created: resumeData.date_published || Date.now() / 1000,
      modified: resumeData.date_published || Date.now() / 1000,
      status: this.mapResumeStatus(resumeData),
      skills: this.extractSkills(resumeData),
      education: this.extractEducation(resumeData),
      experience: this.extractExperience(resumeData),
      language: this.extractLanguages(resumeData), // Добавляем языки
      platform: 'superjob',
      raw_data: resumeData
    };
  }
  
  private extractLanguages(resumeData: any): Array<{ level: string; language: string }> {
    if (resumeData.languages && Array.isArray(resumeData.languages)) {
      return resumeData.languages.map((lang: any) => ({
        level: lang.level || 'intermediate',
        language: lang.language || lang.name || ''
      }));
    }
    
    return [
      {
        level: 'intermediate',
        language: 'Русский'
      }
    ];
  }

  private extractEducation(resumeData: any): Array<{ name: string; year: number }> {
    if (resumeData.education && Array.isArray(resumeData.education)) {
      return resumeData.education.map((edu: any) => ({
        name: edu.name || edu.institution || '',
        year: edu.year || edu.graduation_year || new Date().getFullYear()
      }));
    }
    return [];
  }
  
  private extractExperience(resumeData: any): Array<{ position: string; company: string; period: string }> {
    if (resumeData.experience && Array.isArray(resumeData.experience)) {
      return resumeData.experience.map((exp: any) => ({
        position: exp.position || '',
        company: exp.company || exp.employer || '',
        period: this.formatExperiencePeriod(exp)
      }));
    }
    return [];
  }
  
  private formatExperiencePeriod(exp: any): string {
    if (exp.date_start && exp.date_end) {
      return `${exp.date_start} - ${exp.date_end}`;
    }
    if (exp.period) {
      return exp.period;
    }
    return 'Не указан';
  }
}