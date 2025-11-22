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
  // private readonly API_URL = 'https://api.together.xyz/v1/completions';
  currentVacancy: any = null;

  constructor(
    private hhAuthService: HHAuthService,
    private profileService: ProfileService,
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
        return throwError(() => error);
      })
    );
  }

  private cleanLetterContent(content: string): string {
    if (!content) return this.createFallbackLetterContent();
    
    console.log('🧹 Raw AI response length:', content.length);
    
    let cleaned = content
      .replace(/```/g, '')
      .replace(/[\*\_]{2,}/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

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

  private createFallbackLetterContent(vacancy?: any, profile?: any): string {
    const companyName = vacancy?.employer?.name || vacancy?.firm_name || 'компании';
    const vacancyName = vacancy?.name || vacancy?.profession || 'должности';
    const userName = profile?.name || 'Кандидат';
    
    return `Не работает генерация сопр. письма`;
  }

  private getVacancyDetails(vacancyId: string): Observable<any> {
    return this.vacancyService.getVacancy(vacancyId).pipe(
      catchError(error => {
        this.errorHandler.showError('Ошибка загрузки вакансии', 'CoverLetterService');
        throw new Error(`Не удалось загрузить вакансию: ${error.message}`);
      })
    );
  }

  private buildPrompt(vacancy: any, profile: any, style: string, tone: string): string {
    console.log('🔍 BUILDING IMPROVED PROMPT WITH VACANCY:', vacancy);
    
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