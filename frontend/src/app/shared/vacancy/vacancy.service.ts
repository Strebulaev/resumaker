import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Vacancy } from '../../vacancy-schema';
import { HHAuthService } from '../job-platforms/hh/hh-auth.service';
import { SuperJobAuthService } from '../job-platforms/super-job/superjob-auth.service';
import { ErrorToastComponent } from '../../components/Helpers/error-toast/error-toast.component';
import { ErrorHandlerService } from '../error-handler.service';

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
  per_page?: number;
  page?: number;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class VacancyService {
  private vacancyCache = new Map<string, any>();
  
  constructor(
    private http: HttpClient,
    private hhAuthService: HHAuthService,
    private superJobService: SuperJobAuthService,
    private errorHandler: ErrorHandlerService
  ) {}

  // Основной метод для получения вакансии по ID или URL
  getVacancy(identifier: string): Observable<Vacancy> {
    const platform = this.detectPlatform(identifier);
    
    if (platform === 'hh') {
      const vacancyId = this.extractHHVacancyId(identifier);
      return this.getHHVacancy(vacancyId || identifier);
    } else if (platform === 'superjob') {
      const vacancyId = this.extractSuperJobVacancyId(identifier);
      return this.getSuperJobVacancy(vacancyId || identifier);
    } else {
      return this.tryAllPlatforms(identifier);
    }
  }

  // Метод с кэшированием для использования в компонентах
  async getVacancyWithCache(identifier: string): Promise<Vacancy> {
    const cacheKey = identifier;
    
    if (this.vacancyCache.has(cacheKey)) {
      return this.vacancyCache.get(cacheKey);
    }
    
    try {
      const vacancy = await this.getVacancy(identifier).toPromise();
      if (vacancy) {
        this.vacancyCache.set(cacheKey, vacancy);
      }
      return vacancy!;
    } catch (error) {
      this.errorHandler.showError('Ошибка получения вакансии', 'VacancySearchComponent');
      throw error;
    }
  }

  // Поиск вакансий на всех платформах
  searchVacancies(params: VacancySearchParams): Observable<{ platform: string; results: any }[]> {
    const searches = [
      this.searchHHVacancies(params).pipe(
        map(results => ({ platform: 'hh', results })),
        catchError(error => of({ platform: 'hh', results: { error: error.message } }))
      ),
      this.searchSuperJobVacancies(params).pipe(
        map(results => ({ platform: 'superjob', results })),
        catchError(error => of({ platform: 'superjob', results: { error: error.message } }))
      )
    ];

    return forkJoin(searches);
  }

  // Методы для HH.ru - ПРЯМЫЕ ВЫЗОВЫ API
  private getHHVacancy(id: string): Observable<Vacancy> {
    return from(this.hhAuthService.getValidToken()).pipe(
      switchMap(token => {
        if (!token) {
          throw new Error('Требуется авторизация в HH.ru');
        }

        // ПРЯМОЙ ВЫЗОВ API HH.RU
        return this.http.get<any>(`https://api.hh.ru/vacancies/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'RezulutionApp/1.0',
            'HH-User-Agent': 'RezulutionApp/1.0'
          }
        });
      }),
      map(response => this.mapHHVacancyToCommon(response)),
      catchError(error => {
        throw new Error(`Ошибка получения вакансии HH.ru: ${error.message}`);
      })
    );
  }

  private searchHHVacancies(params: VacancySearchParams): Observable<any> {
    return from(this.hhAuthService.getValidToken()).pipe(
      switchMap(token => {
        if (!token) {
          throw new Error('Требуется авторизация в HH.ru');
        }

        const queryParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
          const value = params[key];
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value.toString());
          }
        });

        // ПРЯМОЙ ВЫЗОВ API HH.RU
        return this.http.get<any>(`https://api.hh.ru/vacancies?${queryParams}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'RezulutionApp/1.0',
            'HH-User-Agent': 'RezulutionApp/1.0'
          }
        });
      })
    );
  }

  // Методы для SuperJob - ПРЯМЫЕ ВЫЗОВЫ API
  private getSuperJobVacancy(id: string): Observable<Vacancy> {
    return from(this.superJobService.getValidToken()).pipe(
      switchMap(token => {
        if (!token) {
          throw new Error('Требуется авторизация в SuperJob');
        }

        if (!this.superJobService.clientSecret) {
          throw new Error('SuperJob client secret not configured');
        }

        // ПРЯМОЙ ВЫЗОВ API SUPERJOB
        return this.http.get<any>(`https://api.superjob.ru/2.0/vacancies/${id}/`, {
          headers: {
            'X-Api-App-Id': this.superJobService.clientSecret,
            'Authorization': `Bearer ${token}`
          }
        });
      }),
      map(response => this.mapSuperJobVacancyToCommon(response)),
      catchError(error => {
        throw new Error(`Ошибка получения вакансии SuperJob: ${error.message}`);
      })
    );
  }

  private searchSuperJobVacancies(params: VacancySearchParams): Observable<any> {
    return from(this.superJobService.getValidToken()).pipe(
      switchMap(token => {
        if (!token) {
          throw new Error('Требуется авторизация в SuperJob');
        }

        if (!this.superJobService.clientSecret) {
          throw new Error('SuperJob client secret not configured');
        }

        const queryParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
          const value = params[key];
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value.toString());
          }
        });

        // ПРЯМОЙ ВЫЗОВ API SUPERJOB
        return this.http.get<any>(`https://api.superjob.ru/2.0/vacancies/?${queryParams}`, {
          headers: {
            'X-Api-App-Id': this.superJobService.clientSecret,
            'Authorization': `Bearer ${token}`
          }
        });
      })
    );
  }

  // Вспомогательные методы
  private detectPlatform(url: string): string | null {
    if (url.includes('hh.ru') || url.includes('hh.') || /\/vacancy\//.test(url)) {
      return 'hh';
    } else if (url.includes('superjob.ru')) {
      return 'superjob';
    }
    return null;
  }

  private extractHHVacancyId(url: string): string | null {
    const patterns = [
      /\/vacancy\/(\d+)/,
      /vacancy=(\d+)/,
      /hh\.ru\/vacancy\/(\d+)/,
      /(\d{5,10})/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  }

  private extractSuperJobVacancyId(url: string): string | null {
    const patterns = [
      /superjob\.ru\/vakansii\/(\d+)\.html/,
      /superjob\.ru\/vacancy\/(\d+)\.html/,
      /(\d+)\.html/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  }

  private tryAllPlatforms(identifier: string): Observable<Vacancy> {
    return this.getHHVacancy(identifier).pipe(
      catchError(() => {
        return this.getSuperJobVacancy(identifier).pipe(
          catchError(error => {
            throw new Error(`Не удалось найти вакансию: ${error.message}`);
          })
        );
      })
    );
  }

  // Маппинг данных
  private mapHHVacancyToCommon(vacancy: any): Vacancy {
    return {
      id: vacancy.id,
      name: vacancy.name,
      description: vacancy.description || '',
      key_skills: vacancy.key_skills?.map((skill: any) => ({ name: skill.name })) || [],
      employer: {
        name: vacancy.employer?.name,
        logo_urls: { original: vacancy.employer?.logo_urls?.original }
      },
      salary: vacancy.salary ? {
        from: vacancy.salary.from,
        to: vacancy.salary.to,
        currency: vacancy.salary.currency
      } : null,
      address: vacancy.address ? {
        city: vacancy.address.city,
        street: vacancy.address.street,
        building: vacancy.address.building
      } : null,
      experience: vacancy.experience ? { name: vacancy.experience.name } : undefined,
      employment: vacancy.employment ? { name: vacancy.employment.name } : undefined,
      alternate_url: vacancy.alternate_url,
      published_at: vacancy.published_at,
      snippet: vacancy.snippet ? {
        requirement: vacancy.snippet.requirement,
        responsibility: vacancy.snippet.responsibility
      } : undefined
    };
  }

  private mapSuperJobVacancyToCommon(vacancy: any): Vacancy {
    return {
      id: vacancy.id.toString(),
      name: vacancy.profession,
      description: vacancy.vacancyRichText || '',
      key_skills: vacancy.catalogues?.map((c: any) => ({ name: c.title })) || [],
      employer: {
        name: vacancy.firm_name,
        logo_urls: { original: '' }
      },
      salary: (vacancy.payment_from || vacancy.payment_to) ? {
        from: vacancy.payment_from,
        to: vacancy.payment_to,
        currency: vacancy.currency || 'RUR'
      } : null,
      address: vacancy.town ? { city: vacancy.town.title } : null,
      experience: vacancy.experience ? { name: vacancy.experience.title } : undefined,
      employment: vacancy.type_of_work ? { name: vacancy.type_of_work.title } : undefined,
      alternate_url: vacancy.link || `https://www.superjob.ru/vacancy/${vacancy.id}.html`,
      published_at: vacancy.date_published ? new Date(vacancy.date_published * 1000).toISOString() : undefined
    };
  }

  // Вспомогательные методы для работы с вакансиями
  extractKeySkills(vacancy: any): string[] {
    return vacancy.key_skills?.map((skill: any) => skill.name) || [];
  }
  
  extractRequirements(vacancy: any): string {
    return this.cleanHtml(vacancy.snippet?.requirement || '');
  }

  private cleanHtml(text: string): string {
    if (!text) return '';
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Экспорт вакансии
  exportVacancy(vacancy: Vacancy, format: 'txt' | 'json' = 'txt'): string {
    if (format === 'json') {
      return JSON.stringify(vacancy, null, 2);
    }

    let text = `Вакансия: ${vacancy.name}\n`;
    text += `Компания: ${vacancy.employer?.name || 'Не указана'}\n`;
    
    if (vacancy.salary) {
      text += `Зарплата: `;
      if (vacancy.salary.from) text += `от ${vacancy.salary.from} `;
      if (vacancy.salary.to) text += `до ${vacancy.salary.to} `;
      text += `${vacancy.salary.currency || ''}\n`;
    }
    
    if (vacancy.description) {
      text += `Описание: ${this.cleanHtml(vacancy.description.substring(0, 500))}...\n`;
    }
    
    if (vacancy.key_skills && vacancy.key_skills.length > 0) {
      text += `Навыки: ${vacancy.key_skills.map(s => s.name).join(', ')}\n`;
    }
    
    text += `Ссылка: ${vacancy.alternate_url || 'Не указана'}\n`;
    
    return text;
  }
}