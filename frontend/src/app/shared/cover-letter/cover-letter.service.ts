import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, from, forkJoin } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HHAuthService } from '../job-platforms/hh/hh-auth.service';
import { ProfileService } from '../profile/profile.service';
import { ConfigService } from '../config/config.service';
import { AIService } from '../ai/ai.service';
import { VacancyService } from '../vacancy/vacancy.service';
import { SuperJobAuthService } from '../job-platforms/super-job/superjob-auth.service';
import { ErrorToastComponent } from '../../components/Helpers/error-toast/error-toast.component';
import { ErrorHandlerService } from '../error-handler.service';

export interface CoverLetterRequest {
  resume_id: string;
  vacancy_id: string;
  style?: string;
  tone?: string;
  selected_resume?: any;
  resume_content?: string;
}

export interface CoverLetterResponse {
  id?: string;
  content: string;
  generated_at: string;
  resume_id: string;
  vacancy_id: string;
  style: string;
  tone: string;
}

export interface CoverLetterTemplate {
  id: string;
  name: string;
  content: string;
  is_default: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CoverLetterService {
  private readonly API_URL = 'https://api.together.xyz/v1/completions';
  currentVacancy: any = null;

  constructor(
    private http: HttpClient,
    private hhAuthService: HHAuthService,
    private superJobService: SuperJobAuthService,
    private profileService: ProfileService,
    private configService: ConfigService,
    private aiService: AIService,
    private vacancyService: VacancyService,
    private errorHandler: ErrorHandlerService
  ) {}

  generateCoverLetter(request: any): Observable<any> {
    console.log('🚀 STARTING COVER LETTER GENERATION');
    
    return forkJoin({
      vacancy: this.getVacancyDetails(request.vacancy_id).pipe(
        catchError(error => {
          this.errorHandler.showError('Ошибка загрузки вакансии', 'CoverLetterService');
          throw new Error(`Не удалось загрузить вакансию: ${error.message}`);
        })
      ),
      profile: this.profileService.loadProfile().pipe(
        catchError(error => {
          this.errorHandler.showError('Ошибка загрузки профиля', 'CoverLetterService');
          throw new Error(`Не удалось загрузить профиль: ${error.message}`);
        })
      )
    }).pipe(
      switchMap(({ vacancy, profile }) => {
        const promptText = this.buildPrompt(vacancy, profile, request.style || 'formal', request.tone || 'professional');
        
        const aiRequest = {
          model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
          prompt: promptText,
          max_tokens: 1200,
          temperature: 0.5,
          top_p: 0.8,
          top_k: 40,
          repetition_penalty: 1.2,
          stop: [],
          stream: false
        };
  
        return this.aiService.generateText(aiRequest).pipe(
          map(content => {
            const cleaned = this.cleanLetterContent(content);
            
            let finalContent = cleaned;

            return {
              content: finalContent,
              generated_at: new Date().toISOString(),
              resume_id: request.resume_id || 'uploaded',
              vacancy_id: request.vacancy_id,
              style: request.style || 'formal',
              tone: request.tone || 'professional'
            };
          })
        );
      }),
      catchError(error => {
        if (error.status === 429 || error.status === 400) {
          this.errorHandler.showAIError('Ошибка генерации письма', 'CoverLetterService');
        } else {
          this.errorHandler.showError('Ошибка генерации письма', 'CoverLetterService');
        }
        // Возвращаем новый Observable с ошибкой
        return throwError(() => error);
      })
    );
  }

  private cleanLetterContent(content: string): string {
    if (!content) return this.createFallbackLetterContent();
    
    console.log('🧹 Raw AI response length:', content.length);
    
    // Базовая очистка
    let cleaned = content
      .replace(/```/g, '') // Убираем markdown код
      .replace(/[\*\_]{2,}/g, '') // Убираем лишнее форматирование
      .replace(/\n{3,}/g, '\n\n') // Убираем множественные переносы
      .trim();

    // Валидация содержания
    const invalidPhrases = [
      'комиссия по отбору',
      'члены комиссии', 
      'экспертная оценка',
      'улучшенная версия',
      'шаг 6',
      'с уважением!',
      '!!!'
    ];

    const hasInvalidContent = invalidPhrases.some(phrase => 
      cleaned.toLowerCase().includes(phrase.toLowerCase())
    );

    return cleaned;
  }

  // Улучшенный fallback
  private createFallbackLetterContent(vacancy?: any, profile?: any): string {
    const companyName = vacancy?.employer?.name || vacancy?.firm_name || 'компании';
    const vacancyName = vacancy?.name || vacancy?.profession || 'должности';
    const userName = profile?.name || 'Кандидат';
    
    return `Не работает генерация сопр. письма`;
  }

  private getVacancyDetails(vacancyId: string): Observable<any> {
    return from(this.hhAuthService.getValidToken()).pipe(
      switchMap(token => {
        const platform = this.detectPlatformFromId(vacancyId);
        
        console.log('🔍 Detected platform:', platform, 'for vacancy ID:', vacancyId);
        
        if (platform === 'hh') {
          // HH.ru API call
          return this.http.get<any>(`https://api.hh.ru/vacancies/${vacancyId}`, {
            headers: {
              'User-Agent': 'RezulutionApp/1.0',
              'HH-User-Agent': 'RezulutionApp/1.0'
            }
          }).pipe(
            map(response => this.mapHHVacancyData(response))
          );
        } else {
          // SuperJob API call through proxy
          return this.http.post<any>('/api/cors-proxy', {
            url: `https://api.superjob.ru/2.0/vacancies/${vacancyId}/`,
            method: 'GET',
            headers: {
              'X-Api-App-Id': this.superJobService.clientSecret
            }
          }).pipe(
            map(response => {
              console.log('🔍 RAW SUPERJOB RESPONSE:', response);
              return this.mapSuperJobVacancyData(response);
            })
          );
        }
      }),
      catchError(error => {
        this.errorHandler.showError('Ошибка загрузки вакансии', 'CoverLetterService');
        return of(this.createFallbackVacancyData());
      })
    );
  }
  
  private mapHHVacancyData(response: any): any {
    console.log('🔍 MAPPING HH.RU VACANCY DATA:', response);
    
    return {
      employer: { 
        name: response.employer?.name || 'Компания',
        id: response.employer?.id
      },
      name: response.name || 'Сотрудник',
      description: response.description || '',
      key_skills: response.key_skills || [],
      salary: response.salary,
      address: response.address,
      area: response.area,
      experience: response.experience,
      employment: response.employment,
      schedule: response.schedule,
      professional_roles: response.professional_roles,
      snippet: response.snippet,
      published_at: response.published_at,
      alternate_url: response.alternate_url,
      platform: 'hh'
    };
  }
  
  private mapSuperJobVacancyData(response: any): any {
    console.log('🔍 MAPPING SUPERJOB VACANCY DATA:', response);
    
    // SuperJob returns data in different structure
    const vacancy = response.objects?.[0] || response;
    
    return {
      employer: { 
        name: vacancy.firm_name || 'Компания',
        id: vacancy.firm_id
      },
      name: vacancy.profession || 'Сотрудник',
      description: vacancy.vacancyRichText || vacancy.candidat || '',
      key_skills: vacancy.catalogues?.map((cat: any) => ({ name: cat.title })) || [],
      salary: {
        from: vacancy.payment_from,
        to: vacancy.payment_to,
        currency: vacancy.currency || 'rub'
      },
      address: vacancy.town ? { city: vacancy.town.title } : null,
      area: vacancy.town ? { name: vacancy.town.title } : null,
      experience: vacancy.experience ? { name: vacancy.experience.title } : null,
      employment: vacancy.type_of_work ? { name: vacancy.type_of_work.title } : null,
      schedule: vacancy.place_of_work ? { name: vacancy.place_of_work.title } : null,
      published_at: vacancy.date_published ? new Date(vacancy.date_published * 1000).toISOString() : '',
      alternate_url: vacancy.link || `https://www.superjob.ru/vacancy/${vacancy.id}.html`,
      platform: 'superjob',
      // SuperJob specific fields
      firm_name: vacancy.firm_name,
      profession: vacancy.profession,
      payment_from: vacancy.payment_from,
      payment_to: vacancy.payment_to,
      currency: vacancy.currency,
      town: vacancy.town
    };
  }
  
  private createFallbackVacancyData(): any {
    return {
      employer: { name: 'Компания' },
      name: 'Сотрудник',
      description: 'Информация о вакансии недоступна',
      key_skills: [],
      salary: null,
      address: null,
      platform: 'unknown'
    };
  }
  
  private detectPlatformFromId(vacancyId: string): string {
    if (/^\d+$/.test(vacancyId)) {
      return 'superjob';
    }
    return 'hh';
  }
  private getStoredToken(): string | null {
    return localStorage.getItem('hh_access_token');
  }
  
  private getHHResume(resumeId: string): Observable<any> {
    if (!this.hhAuthService.isTokenValid()) {
      return throwError(() => new Error('Требуется авторизация в HH.ru'));
    }
  
    return from(this.hhAuthService.getUserResumes()).pipe(
      map(resumes => resumes.find((r: any) => r.id === resumeId)),
      catchError(() => of(null))
    );
  }

  private buildPrompt(vacancy: any, profile: any, style: string, tone: string): string {
    console.log('🔍 BUILDING IMPROVED PROMPT WITH VACANCY:', vacancy);
    
    // Extract data based on platform
    let companyName, vacancyName, city, salary, description, requirements, keySkills, experience, employment;
    
    if (vacancy.platform === 'superjob') {
      companyName = vacancy.firm_name || vacancy.employer?.name;
      vacancyName = vacancy.profession || vacancy.name;
      city = vacancy.town?.title || vacancy.area?.name || '';
      salary = vacancy.salary ? this.formatSalary(vacancy.salary) : 
               (vacancy.payment_from || vacancy.payment_to) ? 
               `${vacancy.payment_from ? `от ${vacancy.payment_from}` : ''} ${vacancy.payment_to ? `до ${vacancy.payment_to}` : ''} ${vacancy.currency || 'руб.'}`.trim() : '';
      description = vacancy.vacancyRichText || vacancy.description || '';
      requirements = '';
      keySkills = vacancy.key_skills?.map((skill: any) => skill.name).join(', ') || '';
      experience = vacancy.experience?.name || '';
      employment = vacancy.type_of_work?.title || vacancy.employment?.name || '';
    } else {
      companyName = vacancy.employer?.name;
      vacancyName = vacancy.name;
      city = vacancy.area?.name || '';
      salary = vacancy.salary ? this.formatSalary(vacancy.salary) : '';
      description = vacancy.description || '';
      requirements = vacancy.snippet?.requirement || '';
      keySkills = vacancy.key_skills?.map((skill: any) => skill.name).join(', ') || '';
      experience = vacancy.experience?.name || '';
      employment = vacancy.employment?.name || '';
    }
  
    const userName = profile?.name || '';
    const userEmail = profile?.contact?.email || '';
    const userPhone = profile?.contact?.phone || '';
    const userSkills = profile?.skills?.map((s: any) => `${s.name} (${s.level}/10)`).join(', ') || '';
    const userExperience = profile?.experience?.length || 0;
    const userEducation = profile?.education?.map((e: any) => `${e.institution} - ${e.specialty}`).join('; ') || '';
    const userLanguages = profile?.languages?.map((l: any) => `${l.language} - ${l.level}`).join(', ') || '';
  
    if (!companyName || !vacancyName) {
      console.error('❌ Insufficient vacancy data:', vacancy);
      throw new Error('Недостаточно данных о вакансии для генерации письма');
    }
  
    const promptText = `Ты профессиональный HR-специалист и эксперт по составлению сопроводительных писем. Сгенерируй КОРРЕКТНОЕ и РЕЛЕВАНТНОЕ сопроводительное письмо строго по шаблону.
  
  # КРИТИЧЕСКИ ВАЖНЫЕ ПРАВИЛА:
  - Текст должен быть РЕЛЕВАНТЕН вакансии и навыкам кандидата
  - Только деловой профессиональный стиль
  - Без эмоциональных восклицаний и лишних эмоций
  - Без упоминания "комиссии по отбору", "членов комиссии" и т.п.
  - Максимальная конкретика и соответствие требованиям вакансии
  - Длина: 200-300 слов
  
  # ШАБЛОН ПИСЬМА (соблюдай структуру):
  
  [ПРИВЕТСТВИЕ]
  Уважаемые HR-специалисты [Название компании]!
  
  [ВСТУПЛЕНИЕ - интерес к вакансии]
  Проявляю интерес к вакансии "[Название вакансии]" и хотел бы представить свою кандидатуру на рассмотрение.
  
  [СООТВЕТСТВИЕ ТРЕБОВАНИЯМ - конкретные навыки]
  Мои профессиональные навыки включают: [перечисли релевантные навыки из профиля]. 
  [Если есть опыт] Опыт работы в данной области составляет [количество] лет.
  [Если нет опыта] Несмотря на отсутствие коммерческого опыта, обладаю strong fundamental knowledge в [ключевые области].
  
  [МОТИВАЦИЯ - почему именно эта компания/должность]
  Заинтересован в позиции [название вакансии], так как [обоснование релевантности интереса].
  
  [ЗАВЕРШЕНИЕ]
  Буду рад обсудить возможность сотрудничества на собеседовании.
  
  [ПОДПИСЬ]
  С уважением,
  [Имя кандидата]
  [Контакты: email, телефон]
  
  # ДАННЫЕ ВАКАНСИИ:
  - Платформа: ${vacancy.platform === 'superjob' ? 'SuperJob' : 'HH.ru'}
  - Компания: "${companyName}"
  - Должность: "${vacancyName}"
  - Город: ${city || 'не указан'}
  - Зарплата: ${salary || 'не указана'}
  - Требуемый опыт: ${experience || 'не указан'}
  - Тип занятости: ${employment || 'не указан'}
  
  # КЛЮЧЕВЫЕ НАВЫКИ ИЗ ВАКАНСИИ:
  ${keySkills || 'Не указаны'}
  
  # ОПИСАНИЕ ВАКАНСИИ (для понимания контекста):
  ${description.substring(0, 500)}...
  
  ${requirements ? `# ТРЕБОВАНИЯ К КАНДИДАТУ:
  ${requirements.substring(0, 300)}...` : ''}
  
  # ПРОФИЛЬ КАНДИДАТА:
  - Имя: ${userName}
  - Email: ${userEmail}
  - Телефон: ${userPhone || 'не указан'}
  - Навыки: ${userSkills || 'не указаны'}
  - Опыт работы: ${userExperience} ${this.pluralize(userExperience, ['год', 'года', 'лет'])}
  - Образование: ${userEducation || 'не указано'}
  - Языки: ${userLanguages || 'не указаны'}
  
  # СТИЛЬ И ТОН:
  - Стиль: ${this.getStyleDescription(style)}
  - Тон: ${this.getToneDescription(tone)}
  
  Сгенерируй сопроводительное письмо строго по шаблону, соблюдая релевантность и профессионализм:`;
  
    return promptText;
  }
  
  private formatSalary(salary: any): string {
    if (!salary) return '';
    
    if (salary.from && salary.to) {
      return `${salary.from} - ${salary.to} ${salary.currency}`;
    } else if (salary.from) {
      return `от ${salary.from} ${salary.currency}`;
    } else if (salary.to) {
      return `до ${salary.to} ${salary.currency}`;
    }
    return '';
  }
  
  // Новые вспомогательные методы
  private filterRelevantSkills(profileSkills: any[], vacancySkills: string[], requirements: string): string[] {
    const relevant: string[] = [];
    const allKeywords = [...vacancySkills, ...requirements.toLowerCase().split(' ')];
    
    profileSkills.forEach(skill => {
      const skillName = skill.name.toLowerCase();
      if (allKeywords.some(keyword => 
        keyword.toLowerCase().includes(skillName) || skillName.includes(keyword.toLowerCase())
      )) {
        relevant.push(skill.name);
      }
    });
    
    return relevant;
  }
  
  private hasRelevantExperience(profile: any, vacancy: any): boolean {
    const vacancySkills = this.vacancyService.extractKeySkills(vacancy);
    const requirements = this.vacancyService.extractRequirements(vacancy);
    const profileSkills = profile?.skills || [];
    
    return this.filterRelevantSkills(profileSkills, vacancySkills, requirements).length > 0;
  }
  
  private getRelevantExperience(profile: any, vacancy: any): string {
    const relevantSkills = this.filterRelevantSkills(profile.skills || [], 
      this.vacancyService.extractKeySkills(vacancy), 
      this.vacancyService.extractRequirements(vacancy));
    
    if (relevantSkills.length === 0) return 'нет релевантного опыта';
    
    const experienceYears = profile.experience?.length || 0;
    return `${experienceYears} ${this.pluralize(experienceYears, ['год', 'года', 'лет'])} в смежных областях`;
  }
  
  private getStyleDescription(style: string): string {
    const styles: { [key: string]: string } = {
      'formal': 'формальный деловой стиль',
      'creative': 'креативный современный стиль', 
      'technical': 'технический ориентированный стиль'
    };
    return styles[style] || 'формальный деловой стиль';
  }
  
  private getToneDescription(tone: string): string {
    const tones: { [key: string]: string } = {
      'professional': 'профессиональный сдержанный',
      'enthusiastic': 'энтузиастичный энергичный',
      'conservative': 'консервативный традиционный'
    };
    return tones[tone] || 'профессиональный сдержанный';
  }

  private pluralize(count: number, forms: string[]): string {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ];
  }

  sendToHH(coverLetterContent: string, vacancyId: string, resumeId: string, hhToken: string): Observable<any> {
    return from(this.hhAuthService.sendApplication(vacancyId, resumeId, coverLetterContent, hhToken)).pipe(
      catchError(error => {
        this.errorHandler.showError('Ошибка отправки на HH.ru', 'CoverLetterService');
        return throwError(() => new Error('Ошибка отправки на HH.ru: ' + error.message));
      })
    );
  }

  saveTemplate(template: CoverLetterTemplate): Observable<CoverLetterTemplate> {
    const templates = this.getTemplates();
    const existingIndex = templates.findIndex(t => t.id === template.id);
    
    if (existingIndex >= 0) {
      templates[existingIndex] = template;
    } else {
      templates.push(template);
    }

    localStorage.setItem('cover_letter_templates', JSON.stringify(templates));
    return of(template);
  }

  getTemplates(): CoverLetterTemplate[] {
    const stored = localStorage.getItem('cover_letter_templates');
    return stored ? JSON.parse(stored) : this.getDefaultTemplates();
  }

  deleteTemplate(templateId: string): Observable<void> {
    const templates = this.getTemplates().filter(t => t.id !== templateId);
    localStorage.setItem('cover_letter_templates', JSON.stringify(templates));
    return of(void 0);
  }

  private getDefaultTemplates(): CoverLetterTemplate[] {
    return [
      {
        id: 'formal-1',
        name: 'Формальный шаблон',
        content: `Уважаемые представители компании {{companyName}}!

Проявляю интерес к вашей вакансии "{{vacancyName}}" и представляю свое резюме.

С уважением,
{{userName}}`,
        is_default: true
      },
      {
        id: 'creative-1',
        name: 'Креативный шаблон',
        content: `Привет команде {{companyName}}! 🚀

Загорелся вашей вакансией "{{vacancyName}}"!

Давайте знакомиться!
{{userName}}`,
        is_default: false
      }
    ];
  }
}