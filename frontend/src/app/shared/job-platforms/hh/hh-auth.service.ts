import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { ErrorHandlerService } from '../../error-handler.service';

type HHTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  expires_at?: number;
};
export interface HHResume {
  id: string;
  title: string;
  created: string;
  updated: string;
  url: string;
  access_type: { type: string };
  status: { id: string; name: string };
  views_count: number;
  total_views: number;
  skills: string;
  experience: Array<{
    company: string;
    position: string;
    start: string;
    end: string;
  }>;
  education: Array<{
    level: { name: string };
    primary: Array<{
      name: string;
      year: number;
    }>;
  }>;
}

@Injectable({ providedIn: 'root' })
export class HHAuthService {
  public clientId: string = '';
  private clientSecret: string = '';
  private readonly HH_TOKEN_KEY = 'hh_access_token';
  private readonly HH_TOKEN_EXPIRY_KEY = 'hh_token_expiry';
  private readonly HH_REFRESH_TOKEN_KEY = 'hh_refresh_token';

  constructor(private configService: ConfigService,
  private errorHandler: ErrorHandlerService
  ) {
    this.configService.isConfigLoaded().subscribe(loaded => {
      if (loaded) {
        const config = this.configService.getConfig();
        this.clientId = config.hhClientId;
        this.clientSecret = config.hhClientSecret;
      }
    });
    this.initializeConfig();

  }
  private apiUrl = 'https://api.hh.ru';

  async initializeConfig(): Promise<void> {
    try {
      await this.configService.loadConfig();
      const config = this.configService.getConfig();
      this.clientId = config.hhClientId;
      this.clientSecret = config.hhClientSecret;
      
      if (!this.clientId || !this.clientSecret) {
        throw new Error('OAuth credentials not configured');
      }
    } catch (error) {
      console.error('Failed to initialize config:', error);
      throw error;
    }
  }
  private getRedirectUri(): string {
    return window.location.origin + '/auth/hh-callback';
  }
  getAuthUrl(state: string): string {
    if (!this.clientId) {
      throw new Error('HH OAuth not configured');
    }

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.getRedirectUri(),
      state: state,
    });
    
    return `https://hh.ru/oauth/authorize?${params.toString()}`;
  }
  async getUserResumes(): Promise<HHResume[]> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в HH.ru');
    }
  
    const response = await fetch('https://api.hh.ru/resumes/mine', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HH API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  }
  
  async deleteResume(resumeId: string): Promise<void> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в HH.ru');
    }
  
    const response = await fetch(`https://api.hh.ru/resumes/${resumeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete resume: ${response.status}`);
    }
  }

  async exchangeCodeForToken(code: string): Promise<HHTokenResponse> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error('HH OAuth not configured');
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: code,
      redirect_uri: this.getRedirectUri(),
    });

    const response = await fetch('https://hh.ru/oauth/token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'RezulutionApp/1.0'
      },
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token exchange failed: ${response.status} ${errorText}`);
    }

    const tokenData: HHTokenResponse = await response.json();
    
    this.saveToken(tokenData);
    
    return tokenData;
  }

  private saveToken(tokenData: HHTokenResponse): void {
    const expiryTime = Date.now() + (tokenData.expires_in * 1000);
    
    localStorage.setItem(this.HH_TOKEN_KEY, tokenData.access_token);
    localStorage.setItem(this.HH_TOKEN_EXPIRY_KEY, expiryTime.toString());
    
    if (tokenData.refresh_token) {
      localStorage.setItem(this.HH_REFRESH_TOKEN_KEY, tokenData.refresh_token);
    }
  }

  getStoredToken(): string | null {
    const token = localStorage.getItem(this.HH_TOKEN_KEY);
    const expiry = localStorage.getItem(this.HH_TOKEN_EXPIRY_KEY);

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
    localStorage.removeItem(this.HH_TOKEN_KEY);
    localStorage.removeItem(this.HH_TOKEN_EXPIRY_KEY);
    localStorage.removeItem(this.HH_REFRESH_TOKEN_KEY);
  }

  async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem(this.HH_REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      return null;
    }

    try {
      const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      });

      const response = await fetch('https://hh.ru/oauth/token', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'RezulutionApp/1.0'
        },
        body,
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const tokenData: HHTokenResponse = await response.json();
      this.saveToken(tokenData);
      
      return tokenData.access_token;
    } catch (error) {
      this.errorHandler.showError('Ошибка обновления токена', 'HHAuthService');
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

  async getVacancyDetails(vacancyId: string, accessToken: string): Promise<any> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Требуется авторизация в HH.ru');
    }

    const response = await fetch(`https://api.hh.ru/vacancies/${vacancyId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RezulutionApp/1.0',
        'HH-User-Agent': 'RezulutionApp/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }

  async getCurrentUser(accessToken: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'RezulutionApp/1.0 (serezhka@example.com)'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch HH user info');
    return response.json();
  }
  
  async publishResume(accessToken: string, resumeData: any): Promise<string> {
    const draftResponse = await fetch(`${this.apiUrl}/resumes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'RezulutionApp/1.0 (serezhka@example.com)'
      },
      body: JSON.stringify(resumeData)
    });

    if (!draftResponse.ok) {
      const error = await draftResponse.json();
      throw new Error(error.description || 'Failed to create resume draft');
    }

    const { id } = await draftResponse.json();
    
    const publishResponse = await fetch(`${this.apiUrl}/resumes/${id}/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'RezulutionApp/1.0 (serezhka@example.com)'
      }
    });

    if (!publishResponse.ok) {
      const error = await publishResponse.json();
      throw new Error(error.description || 'Failed to publish resume');
    }

    return id;
  }

  async getResumeStatus(accessToken: string, resumeId: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/resumes/${resumeId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'RezulutionApp/1.0 (serezhka@example.com)'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch resume status');
    return response.json();
  }

  async sendApplication(vacancyId: string, resumeId: string, letter: string, accessToken: string): Promise<any> {
    try {
      const applicationData = {
        vacancy_id: vacancyId,
        resume_id: resumeId,
        message: letter
      };
  
      const response = await fetch('https://api.hh.ru/negotiations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'User-Agent': 'RezulutionApp/1.0',
          'HH-User-Agent': 'RezulutionApp/1.0'
        },
        body: JSON.stringify(applicationData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description || `HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      this.errorHandler.showError('Ошибка отправки заявки', 'HHAuthService');
      throw error;
    }
  }
}