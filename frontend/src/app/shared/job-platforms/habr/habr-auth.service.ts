
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

export interface HabrIntegrationVacancy {
  id: number;
  title: string;
  divisions: any[];
  specializations: Array<{
    id: number;
    title: { ru: string; en: string };
  }>;
  published_at: string;
  url: string;
  qualification: {
    title: { ru: string; en: string };
  };
  city: string;
  marked: boolean;
  company: {
    name: string;
    alias_name: string;
    url: string;
    logo_url: string;
  };
  employment_type: string;
  salary: string;
  remote: boolean;
  expanded_salary: {
    from: number;
    to: number;
    currency: string;
  };
  published: boolean;
  paid: boolean;
  skills: Array<{
    value: number;
    alias: string;
    title: string;
  }>;
  locations: Array<{
    title: string;
    href: string;
  }>;
  description: string;
  bonuses: string;
  instructions: string;
  team: string;
  candidate: string;
}

export interface HabrVacancyResult {
  vacancy: HabrIntegrationVacancy;
  result: {
    message: string;
    status: number;
  };
}

export interface HabrResponse {
  id: number;
  vacancy_id: number;
  user: {
    login: string;
    name: string;
    avatar: string;
    birthday: string;
    specialization: string;
    skills: Array<{
      title: string;
      alias_name: string;
    }>;
    experience_total: string;
    relocation: boolean;
    remote: boolean;
    compensation: { value: number; currency: string };
    work_state: string;
    age: number;
    location: { city: string; country: string };
    experiences: {
      company: string;
      position: string;
      period: string;
    };
    educations: {
      university: string;
      faculty: string;
      start_date: string;
      end_date: string;
    };
  };
  body: string;
  favorite: boolean;
  archived: boolean;
  created_at: string;
}

export interface HabrSpecializationGroup {
  id: number;
  title: { ru: string; en: string };
  specializations: Array<{
    id: number;
    title: { ru: string; en: string };
  }>;
}

export interface HabrQualification {
  id: number;
  title: { ru: string; en: string };
}

export interface HabrSalaryStats {
  dataAvailable: boolean;
  averageSalary: number;
  profilesAmount: number;
  min: number;
  max: number;
  percentile25: number;
  percentile75: number;
  href: string;
  bars: {
    labels: string[];
    data: number[];
    median: number;
  };
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

  async createVacancy(vacancyData: {
    vacancy: {
      title: string;
      salary_from: number;
      salary_to: number;
      currency: string;
      remote: number;
      employment_type: string;
      description: string;
      bonuses: string;
      instructions: string;
      team: string;
      candidate: string;
      skills: string;
      specialization_ids: string;
      members: string;
    };
  }): Promise<HabrVacancyResult> {
    const token = await this.getValidToken();

    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const response = await fetch(`${this.API_URL}/v1/integrations/vacancies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vacancyData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Habr Career API error: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  async updateVacancy(id: number, vacancyData: {
    vacancy: {
      title: string;
      salary_from: number;
      salary_to: number;
      currency: string;
      remote: number;
      employment_type: string;
      description: string;
      bonuses: string;
      instructions: string;
      team: string;
      candidate: string;
      skills: string;
      specialization_ids: string;
      members: string;
    };
  }): Promise<HabrVacancyResult> {
    const token = await this.getValidToken();

    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const response = await fetch(`${this.API_URL}/v1/integrations/vacancies/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vacancyData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Habr Career API error: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  async payVacancy(id: number, account?: number, placement_type?: number): Promise<HabrVacancyResult> {
    const token = await this.getValidToken();

    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const body: any = {};
    if (account !== undefined) body.account = account;
    if (placement_type !== undefined) body.placement_type = placement_type;

    const response = await fetch(`${this.API_URL}/v1/integrations/vacancies/${id}/pay`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Habr Career API error: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  async toggleVacancyPublishedState(id: number): Promise<HabrVacancyResult & { result: { published: boolean; status: number } }> {
    const token = await this.getValidToken();

    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const response = await fetch(`${this.API_URL}/v1/integrations/vacancies/${id}/toggle_published_state`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Habr Career API error: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  async destroyResponse(vacancyId: number, responseId: number): Promise<HabrResponse> {
    const token = await this.getValidToken();

    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const response = await fetch(`${this.API_URL}/v1/integrations/vacancies/${vacancyId}/responses/${responseId}/destroy`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Habr Career API error: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  async getSpecializations(): Promise<{ groups: HabrSpecializationGroup[] }> {
    const token = await this.getValidToken();

    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const response = await fetch(`${this.API_URL}/v1/integrations/specializations`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Habr Career API error: ${response.status}`);
    }

    return await response.json();
  }

  async getQualifications(): Promise<{ qualifications: HabrQualification[] }> {
    const token = await this.getValidToken();

    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const response = await fetch(`${this.API_URL}/v1/integrations/qualifications`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Habr Career API error: ${response.status}`);
    }

    return await response.json();
  }

  async getSalaryStatistics(params: {
    employment_type?: string;
    remote?: number;
    sg?: number;
    s?: number;
    q?: number;
    skills_list?: string;
    company_alias?: string;
    p?: number;
    cities?: string;
    exclude_cities?: number;
  } = {}): Promise<HabrSalaryStats> {
    const token = await this.getValidToken();

    if (!token) {
      throw new Error('Требуется авторизация в Habr Career');
    }

    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.set(key, value.toString());
      }
    });

    const response = await fetch(`${this.API_URL}/v1/integrations/salaries?${queryParams}`, {
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