import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from, map, catchError, of, switchMap, throwError } from 'rxjs';
import { HHAuthService } from './hh-auth.service';
import { vacancySchema, type Vacancy } from '../../../vacancy-schema';
import { TranslateService } from '@ngx-translate/core';

export interface VacancySearchParams {
  text?: string;
  area?: string;
  experience?: string;
  employment?: string;
  schedule?: string;
  salary?: number;
  currency?: string;
  only_with_salary?: boolean;
  period?: number;
  professional_role?: string;
  industry?: string;
  employer_id?: string;
  order_by?: string;
  per_page?: number;
  page?: number;
  [key: string]: any;
}

export interface VacancyExportOptions {
  includeSalary: boolean;
  includeContacts: boolean;
  includeAddress: boolean;
  includeCounters: boolean;
  includeSnippet: boolean;
  includeDescription: boolean;
  includeRequirements: boolean;
  includeResponsibilities: boolean;
  includeEmployerInfo: boolean;
  includeMetadata: boolean;
  format: 'txt' | 'json' | 'yaml';
}

export interface VacancyFromUrlResult {
  vacancy: Vacancy;
  vacancyId: string;
  success: boolean;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class HHVacancyService {
  private readonly API_URL = 'https://api.hh.ru/vacancies';
  private vacancyCache = new Map<string, any>();

  constructor(
    private http: HttpClient,
    private hhAuthService: HHAuthService,
    private translate: TranslateService
  ) {}
  getVacancy(identifier: string): Observable<Vacancy> {
    return from(this.hhAuthService.getValidToken()).pipe(
      switchMap(token => {
        const vacancyId = typeof identifier === 'string' 
        ? this.extractVacancyIdFromUrl(identifier) || identifier
        : String(identifier);

        if (!this.validateVacancyId(vacancyId)) {
          return throwError(() => new Error(`Invalid vacancy ID: ${vacancyId}`));
        }

        return this.http.get<any>(`https://api.hh.ru/vacancies/${vacancyId}`, {
          headers: {
            'User-Agent': 'RezulutionApp/1.0 (serezhka@example.com)',
            'HH-User-Agent': 'RezulutionApp/1.0'
          }
        }).pipe(
          map(response => {
            const validation = vacancySchema.safeParse(response);
            if (!validation.success) {
              throw new Error('Invalid vacancy data format');
            }
            return validation.data;
          }),
          catchError(error => {
            throw new Error(this.handleApiError(error, 'HH.ru'));
          })
        );
      })
    );
  }

  searchVacancies(params: VacancySearchParams): Observable<any> {
    return from(this.hhAuthService.getValidToken()).pipe(
      switchMap(token => {
        let httpParams = new HttpParams();
        
        Object.keys(params).forEach(key => {
          const value = params[key];
          if (value !== undefined && value !== null && value !== '') {
            httpParams = httpParams.append(key, value.toString());
          }
        });

        return this.http.get<any>('https://api.hh.ru/vacancies', {
          headers: {
            'User-Agent': 'RezulutionApp/1.0 (serezhka@example.com)',
            'HH-User-Agent': 'RezulutionApp/1.0'
          },
          params: httpParams
        }).pipe(
          catchError(error => {
            throw new Error(this.handleApiError(error, 'HH.ru'));
          })
        );
      })
    );
  } 
  getVacancyFromUrl(url: string): Observable<VacancyFromUrlResult> {
    const vacancyId = this.extractVacancyIdFromUrl(url);
    
    if (!vacancyId) {
      return of({
        vacancy: null as any,
        vacancyId: '',
        success: false,
        error: 'Не удалось извлечь ID вакансии из ссылки'
      });
    }
  
    return this.getVacancy(vacancyId).pipe(
      map(vacancy => ({
        vacancy: vacancy,
        vacancyId: vacancyId,
        success: true
      })),
      catchError(error => {
        return of({
          vacancy: null as any,
          vacancyId: vacancyId,
          success: false,
          error: error.message
        });
      })
    );
  }
  
  getVacancyById(id: string): Observable<Vacancy> {
    return this.getVacancy(id);
  }

  async getVacancyWithCache(vacancyIdOrUrl: string): Promise<any> {
    const vacancyId = this.extractVacancyIdFromUrl(vacancyIdOrUrl) || vacancyIdOrUrl;
    
    if (this.vacancyCache.has(vacancyId)) {
      return this.vacancyCache.get(vacancyId);
    }
    
    const vacancy = await this.getVacancyDetails(vacancyId).toPromise();
    this.vacancyCache.set(vacancyId, vacancy);
    return vacancy;
  }
  extractKeySkills(vacancy: any): string[] {
    return vacancy.key_skills?.map((skill: any) => skill.name) || [];
  }
  
  extractRequirements(vacancy: any): string {
    return this.cleanHtml(vacancy.snippet?.requirement || '');
  }
  
  extractCompanyInfo(vacancy: any): any {
    return {
      name: vacancy.employer?.name,
      industry: vacancy.employer?.industry?.name,
      trusted: vacancy.employer?.trusted
    };
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

  exportVacancy(vacancy: any, options: VacancyExportOptions): string {
    let exportData = this.prepareExportData(vacancy, options);

    switch (options.format) {
      case 'json':
        return JSON.stringify(exportData, null, 2);
      case 'yaml':
        return this.convertToYaml(exportData);
      case 'txt':
      default:
        return this.convertToText(exportData, vacancy, options);
    }
  }

  extractVacancyIdFromUrl(url: string): string | null {
    if (!url) return null;
    
    try {
      let normalizedUrl = url;
      if (!url.startsWith('http')) {
        normalizedUrl = 'https://' + url;
      }
      
      const urlObj = new URL(normalizedUrl);
      
      const hhDomains = ['hh.ru', 'hh.ua', 'hh.by', 'hh.kz', 'api.hh.ru'];
      
      if (!hhDomains.some(domain => urlObj.hostname.includes(domain))) {
        return null;
      }
      
      const pathParts = urlObj.pathname.split('/').filter(part => part);
      const vacancyIndex = pathParts.findIndex(part => 
        part === 'vacancy' || part === 'vacancies'
      );
      
      if (vacancyIndex !== -1 && vacancyIndex + 1 < pathParts.length) {
        let id = pathParts[vacancyIndex + 1];
        
        if (id.includes('?')) id = id.split('?')[0];
        if (id.includes('/')) id = id.split('/')[0];
        
        if (/^\d+$/.test(id)) {
          return id;
        }
      }
      
      const directIdMatch = url.match(/\b\d{5,10}\b/);
      if (directIdMatch) {
        return directIdMatch[0];
      }
      
      return null;
      
    } catch (error) {
      console.error('Error parsing URL:', error);
      
      const digitMatch = url.match(/\d{5,10}/);
      return digitMatch ? digitMatch[0] : null;
    }
  }
  validateVacancyId(id: string): boolean {
    return /^\d{5,10}$/.test(id);
  }
  private prepareExportData(vacancy: any, options: VacancyExportOptions): any {
    const data: any = {};

    if (options.includeMetadata) {
      data.id = vacancy.id;
      data.name = vacancy.name;
      data.published_at = vacancy.published_at;
      data.alternate_url = vacancy.alternate_url;
      data.type = vacancy.type?.name;
    }

    if (options.includeEmployerInfo && vacancy.employer) {
      data.employer = {
        name: vacancy.employer.name,
        url: vacancy.employer.alternate_url,
        trusted: vacancy.employer.trusted,
        accredited_it_employer: vacancy.employer.accredited_it_employer
      };
    }

    if (options.includeMetadata) {
      data.experience = vacancy.experience?.name;
      data.employment = vacancy.employment?.name;
      data.schedule = vacancy.schedule?.name;
      data.professional_roles = vacancy.professional_roles?.map((role: any) => role.name);
    }

    if (options.includeSalary && vacancy.salary) {
      data.salary = vacancy.salary;
    }

    if (options.includeAddress && vacancy.address) {
      data.address = {
        city: vacancy.address.city,
        street: vacancy.address.street,
        building: vacancy.address.building,
        description: vacancy.address.description,
        metro_stations: vacancy.address.metro_stations?.map((station: any) => ({
          name: station.station_name,
          line: station.line_name
        }))
      };
    }

    if (options.includeContacts && vacancy.contacts) {
      data.contacts = vacancy.contacts;
    }

    if (options.includeCounters && vacancy.counters) {
      data.counters = vacancy.counters;
    }

    if (options.includeSnippet && vacancy.snippet) {
      data.snippet = {};
      if (options.includeRequirements && vacancy.snippet.requirement) {
        data.snippet.requirement = this.cleanHtml(vacancy.snippet.requirement);
      }
      if (options.includeResponsibilities && vacancy.snippet.responsibility) {
        data.snippet.responsibility = this.cleanHtml(vacancy.snippet.responsibility);
      }
    }

    if (options.includeDescription && vacancy.description) {
      data.description = this.cleanHtml(vacancy.description);
    }

    return data;
  }
  getVacancyDetails(vacancyId: string): Observable<Vacancy> {
    return from(this.hhAuthService.getValidToken()).pipe(
      switchMap(token => {
        if (!token) {
          throw new Error('Требуется авторизация в HH.ru');
        }
  
        return this.http.get<any>(`https://api.hh.ru/vacancies/${vacancyId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'RezulutionApp/1.0',
            'HH-User-Agent': 'RezulutionApp/1.0'
          }
        });
      }),
      map(response => {
        const validation = vacancySchema.safeParse(response);
        if (!validation.success) {
          throw new Error('Invalid vacancy data format');
        }
        return validation.data;
      }),
      catchError(error => {
        console.error('Vacancy details error:', error);
        throw new Error('Ошибка получения деталей вакансии: ' + error.message);
      })
    );
  }
  private convertToText(data: any, originalVacancy: any, options: VacancyExportOptions): string {
    let text = `=== ИНФОРМАЦИЯ О ВАКАНСИИ ===\n\n`;
    
    if (data.id) text += `ID: ${data.id}\n`;
    if (data.name) text += `Название: ${data.name}\n`;
    if (data.employer?.name) text += `Компания: ${data.employer.name}\n`;
    if (data.alternate_url) text += `Ссылка: ${data.alternate_url}\n`;
    if (data.published_at) text += `Опубликована: ${new Date(data.published_at).toLocaleDateString('ru-RU')}\n\n`;

    if (data.type || data.experience || data.employment || data.schedule) {
      text += `=== ОСНОВНАЯ ИНФОРМАЦИЯ ===\n`;
      if (data.type) text += `Тип: ${data.type}\n`;
      if (data.experience) text += `Опыт: ${data.experience}\n`;
      if (data.employment) text += `Занятость: ${data.employment}\n`;
      if (data.schedule) text += `График: ${data.schedule}\n`;
      
      if (data.professional_roles && data.professional_roles.length > 0) {
        text += `Роли: ${data.professional_roles.join(', ')}\n`;
      }
      text += '\n';
    }

    if (data.salary) {
      text += `=== ЗАРПЛАТА ===\n`;
      if (data.salary.from) text += `От: ${data.salary.from} ${data.salary.currency}\n`;
      if (data.salary.to) text += `До: ${data.salary.to} ${data.salary.currency}\n`;
      text += `Брутто: ${data.salary.gross ? 'Да' : 'Нет'}\n\n`;
    }

    if (data.address) {
      text += `=== АДРЕС ===\n`;
      if (data.address.city) text += `Город: ${data.address.city}\n`;
      if (data.address.street) text += `Улица: ${data.address.street}\n`;
      if (data.address.building) text += `Дом: ${data.address.building}\n`;
      if (data.address.description) text += `Описание: ${data.address.description}\n`;
      
      if (data.address.metro_stations && data.address.metro_stations.length > 0) {
        text += `Метро: ${data.address.metro_stations.map((s: any) => s.name).join(', ')}\n`;
      }
      text += '\n';
    }

    if (data.snippet) {
      text += `=== КРАТКОЕ ОПИСАНИЕ ===\n`;
      if (data.snippet.requirement) {
        text += `Требования: ${data.snippet.requirement}\n\n`;
      }
      if (data.snippet.responsibility) {
        text += `Обязанности: ${data.snippet.responsibility}\n\n`;
      }
    }

    if (data.description) {
      text += `=== ПОЛНОЕ ОПИСАНИЕ ===\n`;
      text += `${data.description}\n\n`;
    }

    if (data.contacts) {
      text += `=== КОНТАКТЫ ===\n`;
      if (data.contacts.name) text += `Контактное лицо: ${data.contacts.name}\n`;
      if (data.contacts.email) text += `Email: ${data.contacts.email}\n`;
      if (data.contacts.phones && data.contacts.phones.length > 0) {
        text += `Телефоны:\n`;
        data.contacts.phones.forEach((phone: any, index: number) => {
          text += `  ${index + 1}. ${phone.country}${phone.city}${phone.number}`;
          if (phone.comment) text += ` (${phone.comment})`;
          text += '\n';
        });
      }
    }

    return text;
  }

  private convertToYaml(data: any): string {
    const convertToYamlString = (obj: any, indent = 0): string => {
      let yaml = '';
      const spaces = '  '.repeat(indent);
      
      if (typeof obj !== 'object' || obj === null) {
        return `${spaces}${obj}\n`;
      }
      
      if (Array.isArray(obj)) {
        obj.forEach(item => {
          if (typeof item === 'object') {
            yaml += `${spaces}- \n`;
            yaml += convertToYamlString(item, indent + 2);
          } else {
            yaml += `${spaces}- ${item}\n`;
          }
        });
      } else {
        Object.keys(obj).forEach(key => {
          const value = obj[key];
          if (typeof value === 'object' && value !== null) {
            yaml += `${spaces}${key}:\n`;
            yaml += convertToYamlString(value, indent + 1);
          } else {
            yaml += `${spaces}${key}: ${value}\n`;
          }
        });
      }
      
      return yaml;
    };
    
    return convertToYamlString(data);
  }

  private cleanHtml(text: string): string {
    if (!text) return '';
    
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  downloadFile(content: string, filename: string, format: string): void {
    const blob = new Blob([content], { 
      type: format === 'json' ? 'application/json' : 
            format === 'yaml' ? 'application/yaml' : 'text/plain' 
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  getAvailableFilters(): any {
    return {
      experience: [
        { value: 'noExperience', label: this.translate.instant('FILTERS.EXPERIENCE.NO_EXPERIENCE') },
        { value: 'between1And3', label: this.translate.instant('FILTERS.EXPERIENCE.BETWEEN_1_AND_3') },
        { value: 'between3And6', label: this.translate.instant('FILTERS.EXPERIENCE.BETWEEN_3_AND_6') },
        { value: 'moreThan6', label: this.translate.instant('FILTERS.EXPERIENCE.MORE_THAN_6') }
      ],
      employment: [
        { value: 'full', label: this.translate.instant('FILTERS.EMPLOYMENT.FULL') },
        { value: 'part', label: this.translate.instant('FILTERS.EMPLOYMENT.PART') },
        { value: 'project', label: this.translate.instant('FILTERS.EMPLOYMENT.PROJECT') },
        { value: 'volunteer', label: this.translate.instant('FILTERS.EMPLOYMENT.VOLUNTEER') },
        { value: 'probation', label: this.translate.instant('FILTERS.EMPLOYMENT.PROBATION') }
      ],
      schedule: [
        { value: 'fullDay', label: this.translate.instant('FILTERS.SCHEDULE.FULL_DAY') },
        { value: 'shift', label: this.translate.instant('FILTERS.SCHEDULE.SHIFT') },
        { value: 'flexible', label: this.translate.instant('FILTERS.SCHEDULE.FLEXIBLE') },
        { value: 'remote', label: this.translate.instant('FILTERS.SCHEDULE.REMOTE') },
        { value: 'flyInFlyOut', label: this.translate.instant('FILTERS.SCHEDULE.FLY_IN_FLY_OUT') }
      ],
      order_by: [
        { value: 'relevance', label: this.translate.instant('FILTERS.ORDER_BY.RELEVANCE') },
        { value: 'salary_desc', label: this.translate.instant('FILTERS.ORDER_BY.SALARY_DESC') },
        { value: 'salary_asc', label: this.translate.instant('FILTERS.ORDER_BY.SALARY_ASC') },
        { value: 'publication_time', label: this.translate.instant('FILTERS.ORDER_BY.PUBLICATION_TIME') },
        { value: 'distance', label: this.translate.instant('FILTERS.ORDER_BY.DISTANCE') }
      ]
    };
  }

  getDefaultExportOptions(): VacancyExportOptions {
    return {
      includeSalary: true,
      includeContacts: false,
      includeAddress: true,
      includeCounters: false,
      includeSnippet: true,
      includeDescription: true,
      includeRequirements: true,
      includeResponsibilities: true,
      includeEmployerInfo: true,
      includeMetadata: true,
      format: 'txt'
    };
  }
}