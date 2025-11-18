
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';

export interface HabrTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  expires_at?: number;
}

export interface HabrVacancy {
  id: number;
  title: string;
  company: { name: string; logo: string };
  salary: { from: number; to: number; currency: string };
  location: { city: string; country: string };
  description: string;
  requirements: string;
  conditions: string;
  skills: string[];
  experience: string;
  employment: string;
  published_at: string;
}

export interface HabrResume {
  id: number;
  title: string;
  skills: string[];
  experience: Array<{
    company: string;
    position: string;
    description: string;
    start_date: string;
    end_date: string;
  }>;
  education: Array<{
    institution: string;
    specialty: string;
    degree: string;
    end_year: number;
  }>;
  languages: Array<{
    language: string;
    level: string;
  }>;
}

@Injectable({ providedIn: 'root' })
export class HabrAuthService {
  private readonly HABR_TOKEN_KEY = 'habr_access_token';
  private readonly HABR_REFRESH_TOKEN_KEY = 'habr_refresh_token';
  private readonly HABR_TOKEN_EXPIRY_KEY = 'habr_token_expiry';
  private clientId: string = '';
  private clientSecret: string = '';
  private readonly API_URL = 'https://career.habr.com/api';

  constructor(private configService: ConfigService) {
    this.initializeConfig();
  }

  async initializeConfig(): Promise<void> {
    try {
      await this.configService.loadConfig();
      const config = this.configService.getConfig();
      this.clientId = config.habrClientId;
      this.clientSecret = config.habrClientSecret;
      
      if (!this.clientId || !this.clientSecret) {
        throw new Error('OAuth credentials not configured');
      }
    } catch (error) {
      console.error('Failed to initialize config:', error);
      throw error;
    }
  }

  getAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.getRedirectUri(),
      response_type: 'code',
      state: state,
      scope: 'cv_read cv_write applications_read applications_write'
    });
    
    return `https://career.habr.com/info/oauth/authorize?${params.toString()}`;
  }

  private getRedirectUri(): string {
    return window.location.origin + '/auth/habr-callback';
  }

  async exchangeCodeForToken(code: string): Promise<HabrTokenResponse> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error('Habr Career OAuth not configured');
    }

    const response = await fetch('https://career.habr.com/info/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: code,
        redirect_uri: this.getRedirectUri(),
        grant_type: 'authorization_code'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Habr Career token exchange failed: ${response.status} ${errorText}`);
    }

    const tokenData: HabrTokenResponse = await response.json();
    this.saveToken(tokenData);
    
    return tokenData;
  }

  private saveToken(tokenData: HabrTokenResponse): void {
    const expiryTime = Date.now() + (tokenData.expires_in * 1000);
    
    localStorage.setItem(this.HABR_TOKEN_KEY, tokenData.access_token);
    localStorage.setItem(this.HABR_TOKEN_EXPIRY_KEY, expiryTime.toString());
    
    if (tokenData.refresh_token) {
      localStorage.setItem(this.HABR_REFRESH_TOKEN_KEY, tokenData.refresh_token);
    }
  }

  getStoredToken(): string | null {
    const token = localStorage.getItem(this.HABR_TOKEN_KEY);
    const expiry = localStorage.getItem(this.HABR_TOKEN_EXPIRY_KEY);

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
    localStorage.removeItem(this.HABR_TOKEN_KEY);
    localStorage.removeItem(this.HABR_REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.HABR_TOKEN_EXPIRY_KEY);
  }

  async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem(this.HABR_REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch('https://career.habr.com/info/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        })
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const tokenData: HabrTokenResponse = await response.json();
      this.saveToken(tokenData);
      
      return tokenData.access_token;
    } catch (error) {
      console.error('Habr Career token refresh error:', error);
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

  // Методы для работы с API Habr Career
  async getVacancies(params: any = {}): Promise<{ data: HabrVacancy[]; meta: any }> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const queryParams = new URLSearchParams({
      ...params,
      per_page: params.per_page || 20,
      page: params.page || 1
    });

    const response = await fetch(`${this.API_URL}/v1/vacancies?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Habr Career API error: ${response.status}`);
    }
    
    return await response.json();
  }

  async getResumes(): Promise<{ data: HabrResume[] }> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const response = await fetch(`${this.API_URL}/v1/resumes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Habr Career API error: ${response.status}`);
    }
    
    return await response.json();
  }

  async getVacancyDetails(vacancyId: number): Promise<{ data: HabrVacancy }> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const response = await fetch(`${this.API_URL}/v1/vacancies/${vacancyId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Habr Career API error: ${response.status}`);
    }
    
    return await response.json();
  }

  async publishResume(resumeData: any): Promise<any> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const response = await fetch(`${this.API_URL}/v1/resumes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resumeData)
    });
    
    if (!response.ok) {
      throw new Error(`Habr Career API error: ${response.status}`);
    }
    
    return await response.json();
  }

  async sendApplication(vacancyId: number, resumeId: number, message: string): Promise<any> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const response = await fetch(`${this.API_URL}/v1/applications`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vacancy_id: vacancyId,
        resume_id: resumeId,
        message: message
      })
    });
    
    if (!response.ok) {
      throw new Error(`Habr Career API error: ${response.status}`);
    }
    
    return await response.json();
  }

  async getCurrentUser(): Promise<any> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const response = await fetch(`${this.API_URL}/v1/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Habr Career API error: ${response.status}`);
    }
    
    return await response.json();
  }
}