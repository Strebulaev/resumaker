import { Injectable } from '@angular/core';
import { Observable, of, throwError, from, forkJoin } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HHAuthService } from '../job-platforms/hh/hh-auth.service';
import { ProfileService } from '../profile/profile.service';
import { AIService } from '../ai/ai.service';
import { VacancyService } from '../vacancy/vacancy.service';
import { SuperJobAuthService } from '../job-platforms/super-job/superjob-auth.service';
import { ErrorHandlerService } from '../error-handler.service';
import { UsageService } from '../billing/usage.service';
import { MessageService } from 'primeng/api';

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
  currentVacancy: any = null;

  constructor(
    private hhAuthService: HHAuthService,
    private superjobAuthService: SuperJobAuthService,
    private profileService: ProfileService,
    private aiService: AIService,
    private vacancyService: VacancyService,
    private errorHandler: ErrorHandlerService,
    private usageService: UsageService,
    private messageService: MessageService
  ) {}

  generateCoverLetter(request: any): Observable<any> {
    return from(this.usageService.checkLimit('coverLetters')).pipe(
      switchMap(limitCheck => {
        if (!limitCheck.allowed) {
          const errorMsg = `Достигнут дневной лимит генерации сопроводительных писем. Доступно: ${limitCheck.remaining} из ${limitCheck.limit}. Обновите тариф для увеличения лимитов.`;
          this.messageService.add({
            severity: 'warn',
            summary: 'Лимит исчерпан',
            detail: errorMsg,
            life: 5000
          });
          throw new Error(errorMsg);
        }
  
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
              throw new Error(`Не удалось загрузить профиля: ${error.message}`);
            })
          )
        }).pipe(
          switchMap(({ vacancy, profile }) => {
            console.log('📊 Using full profile data:', profile);
            console.log('📋 Using full vacancy data:', vacancy);
            
            const promptText = this.buildPrompt(vacancy, profile, request.style || 'formal', request.tone || 'professional');
            
            const aiRequest = {
              model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
              prompt: promptText,
              max_tokens: 1500, // Увеличил для более детальных писем
              temperature: 0.4, // Снизил для большей консистентности
              top_p: 0.8,
              top_k: 40,
              repetition_penalty: 1.2,
              stop: [],
              stream: false
            };
      
            return this.aiService.generateText(aiRequest).pipe(
              map(content => {
                const cleaned = this.cleanLetterContent(content);
                
                // Проверяем, что в письме есть контактные данные
                const finalContent = this.ensureContactDetails(cleaned, profile);
                
                return {
                  content: finalContent,
                  generated_at: new Date().toISOString(),
                  resume_id: request.resume_id || 'uploaded',
                  vacancy_id: request.vacancy_id,
                  style: request.style || 'formal',
                  tone: request.tone || 'professional',
                  profile_used: !!profile, // Флаг что использовались данные профиля
                  contacts_included: this.hasContactDetails(finalContent, profile)
                };
              }),
              switchMap(response => {
                return from(this.usageService.incrementUsage('coverLetters')).pipe(
                  map(() => response)
                );
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
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  private ensureContactDetails(content: string, profile: any): string {
    const hasEmail = content.includes('@') || 
                    (profile?.email && content.toLowerCase().includes(profile.email.toLowerCase())) ||
                    (profile?.contact?.email && content.toLowerCase().includes(profile.contact.email.toLowerCase()));
    
    const hasPhone = /\+\d|тел|phone|contact/i.test(content) ||
                    (profile?.phone && content.includes(profile.phone)) ||
                    (profile?.contact?.phone && content.includes(profile.contact.phone));
    
    const userName = profile?.name || profile?.full_name || 'Кандидат';
    
    let finalContent = content;
    
    // Добавляем контактные данные если их нет
    if (!hasEmail || !hasPhone) {
      let contactSection = `\n\nС уважением,\n${userName}`;
      
      if (!hasEmail && profile?.email) {
        contactSection += `\nEmail: ${profile.email}`;
      } else if (!hasEmail && profile?.contact?.email) {
        contactSection += `\nEmail: ${profile.contact.email}`;
      }
      
      if (!hasPhone && profile?.phone) {
        contactSection += `\nТелефон: ${profile.phone}`;
      } else if (!hasPhone && profile?.contact?.phone) {
        contactSection += `\nТелефон: ${profile.contact.phone}`;
      }
      
      if (content.includes('С уважением')) {
        finalContent = content.replace(/С уважением[\s\S]*$/, contactSection);
      } else {
        finalContent += contactSection;
      }
    }
    
    return finalContent;
  }
  
  private hasContactDetails(content: string, profile: any): boolean {
    const hasEmail = content.includes('@') || 
                    (profile?.email && content.toLowerCase().includes(profile.email.toLowerCase())) ||
                    (profile?.contact?.email && content.toLowerCase().includes(profile.contact.email.toLowerCase()));
    
    const hasPhone = /\+\d|тел|phone|contact/i.test(content) ||
                    (profile?.phone && content.includes(profile.phone)) ||
                    (profile?.contact?.phone && content.includes(profile.contact.phone));
    
    return hasEmail && hasPhone;
  }

  private cleanLetterContent(content: string): string {
    if (!content) return this.createFallbackLetterContent();
    
    console.log('🧹 Cleaning AI response, length:', content.length);
    
    let cleaned = content
      .replace(/```(?:json|html|markdown)?/g, '')
      .replace(/[\*\_]{2,}/g, '')
      .replace(/\n{3,}/g, '\n\n') 
      .replace(/^\s*\{.*?\}\s*$/gm, '')
      .replace(/\b(?:шаг\s*\d+|этап\s*\d+|step\s*\d+)/gi, '')
      .replace(/\b(?:комиссия по отбору|члены комиссии|экспертная оценка|улучшенная версия)\b/gi, '')
      .replace(/[!]{2,}/g, '!')
      .trim();
  
    const invalidPhrases = [
      'комиссия по отбору',
      'члены комиссии', 
      'экспертная оценка',
      'улучшенная версия',
      'шаг 6',
      'с уважением!',
      '!!!',
      'господа',
      'уважаемые господа'
    ];
  
    invalidPhrases.forEach(phrase => {
      const regex = new RegExp(phrase, 'gi');
      cleaned = cleaned.replace(regex, '');
    });
  
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
    console.log('🔍 BUILDING ENHANCED PROMPT WITH FULL PROFILE DATA');
    
    // Извлечение данных вакансии
    let companyName, vacancyName, city, salary, description, requirements, keySkills, experience, employment, responsibilities;
    
    if (vacancy.platform === 'superjob') {
      companyName = vacancy.firm_name || vacancy.employer?.name;
      vacancyName = vacancy.profession || vacancy.name;
      city = vacancy.town?.title || vacancy.area?.name || '';
      salary = vacancy.salary ? this.formatSalary(vacancy.salary) : 
               (vacancy.payment_from || vacancy.payment_to) ? 
               `${vacancy.payment_from ? `от ${vacancy.payment_from}` : ''} ${vacancy.payment_to ? `до ${vacancy.payment_to}` : ''} ${vacancy.currency || 'руб.'}`.trim() : '';
      description = vacancy.vacancyRichText || vacancy.description || '';
      requirements = vacancy.candidat || '';
      keySkills = vacancy.key_skills?.map((skill: any) => skill.name).join(', ') || '';
      experience = vacancy.experience?.name || '';
      employment = vacancy.type_of_work?.title || vacancy.employment?.name || '';
      responsibilities = vacancy.work_place || '';
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
      responsibilities = vacancy.snippet?.responsibility || '';
    }
  
    // Полное извлечение данных профиля
    const userName = profile?.name || profile?.full_name || 'Кандидат';
    const userEmail = profile?.email || profile?.contact?.email || '';
    const userPhone = profile?.phone || profile?.contact?.phone || '';
    const userPosition = profile?.position || profile?.title || '';
    const userAbout = profile?.about || profile?.summary || '';
    
    // Навыки профиля
    const userSkills = profile?.skills?.map((s: any) => {
      if (typeof s === 'string') return s;
      return `${s.name}${s.level ? ` (${s.level}/10)` : ''}`;
    }).join(', ') || '';
    
    // Опыт работы
    const userExperience = this.calculateTotalExperience(profile?.experience);
    const formattedExperience = this.formatExperience(userExperience);
    
    // Образование
    const userEducation = profile?.education?.map((e: any) => {
      if (typeof e === 'string') return e;
      return `${e.institution || e.school} - ${e.specialty || e.degree}${e.year ? ` (${e.year})` : ''}`;
    }).join('; ') || '';
    
    // Языки
    const userLanguages = profile?.languages?.map((l: any) => {
      if (typeof l === 'string') return l;
      return `${l.language}${l.level ? ` - ${l.level}` : ''}`;
    }).join(', ') || '';
    
    // Дополнительная информация
    const userCertifications = profile?.certifications?.map((c: any) => {
      if (typeof c === 'string') return c;
      return `${c.name}${c.issuer ? ` (${c.issuer})` : ''}${c.date ? ` - ${c.date}` : ''}`;
    }).join('; ') || '';
  
    const userProjects = profile?.projects?.map((p: any) => {
      if (typeof p === 'string') return p;
      return `${p.name}${p.description ? `: ${p.description}` : ''}`;
    }).join('; ') || '';
  
    if (!companyName || !vacancyName) {
      console.error('❌ Insufficient vacancy data:', vacancy);
      throw new Error('Недостаточно данных о вакансии для генерации письма');
    }
  
    const promptText = `Ты профессиональный HR-специалист и эксперт по составлению сопроводительных писем. Сгенерируй КОРРЕКТНОЕ и РЕЛЕВАНТНОЕ сопроводительное письмо строго по шаблону.
  
  # КРИТИЧЕСКИ ВАЖНЫЕ ПРАВИЛА:
  - Текст должен быть РЕЛЕВАНТЕН конкретной вакансии и навыкам кандидата
  - Используй ТОЛЬКО реальные данные из профиля кандидата
  - Деловой профессиональный стиль, без эмоциональных восклицаний
  - Без упоминания "комиссии по отбору", "членов комиссии" и т.п.
  - Максимальная конкретика и соответствие требованиям вакансии
  - Длина: 250-400 слов
  - Обязательно включи контактные данные: ${userEmail}${userPhone ? `, ${userPhone}` : ''}
  
  # ШАБЛОН ПИСЬМА (соблюдай структуру):
  
  [ПРИВЕТСТВИЕ]
  Уважаемые HR-специалисты компании "${companyName}"!
  
  [ВСТУПЛЕНИЕ - интерес к вакансии]
  Проявляю интерес к вакансии "${vacancyName}" и хотел(а) бы представить свою кандидатуру на рассмотрение.
  
  [СООТВЕТСТВИЕ ТРЕБОВАНИЯМ - конкретные навыки и опыт]
  ${this.generateSkillsSection(keySkills, userSkills, userExperience, userPosition)}
  
  [МОТИВАЦИЯ - почему именно эта компания/должность]
  ${this.generateMotivationSection(companyName, vacancyName, userAbout)}
  
  [ЗАВЕРШЕНИЕ]
  Буду рад(а) обсудить возможность сотрудничества на собеседовании.
  
  [ПОДПИСЬ]
  С уважением,
  ${userName}
  ${userEmail ? `Email: ${userEmail}` : ''}${userPhone ? `
  Телефон: ${userPhone}` : ''}
  
  # ДАННЫЕ ВАКАНСИИ:
  - Компания: "${companyName}"
  - Должность: "${vacancyName}"
  - Город: ${city || 'не указан'}
  - Зарплата: ${salary || 'не указана'}
  - Требуемый опыт: ${experience || 'не указан'}
  - Тип занятости: ${employment || 'не указан'}
  
  # КЛЮЧЕВЫЕ ТРЕБОВАНИЯ ВАКАНСИИ:
  ${keySkills || 'Не указаны'}
  ${requirements ? `Дополнительные требования: ${requirements.substring(0, 300)}...` : ''}
  ${responsibilities ? `Обязанности: ${responsibilities.substring(0, 300)}...` : ''}
  
  # ОПИСАНИЕ ВАКАНСИИ:
  ${description.substring(0, 600)}...
  
  # ПРОФИЛЬ КАНДИДАТА:
  - Имя: ${userName}
  - Текущая должность: ${userPosition || 'не указана'}
  - Email: ${userEmail || 'не указан'}
  - Телефон: ${userPhone || 'не указан'}
  - Опыт работы: ${formattedExperience}
  - Ключевые навыки: ${userSkills || 'не указаны'}
  - Образование: ${userEducation || 'не указано'}
  - Языки: ${userLanguages || 'не указаны'}
  - ${userAbout ? `О себе: ${userAbout.substring(0, 200)}...` : ''}
  - ${userCertifications ? `Сертификаты: ${userCertifications}` : ''}
  - ${userProjects ? `Проекты: ${userProjects}` : ''}
  
  # СТИЛЬ И ТОН:
  - Стиль: ${this.getStyleDescription(style)}
  - Тон: ${this.getToneDescription(tone)}
  
  Сгенерируй сопроводительное письмо строго по шаблону, используя ВСЕ релевантные данные из профиля кандидата и делая акцент на соответствие требованиям вакансии:`;
  
    return promptText;
  }

  private calculateTotalExperience(experience: any[]): number {
    if (!experience || !Array.isArray(experience)) return 0;
    
    let totalMonths = 0;
    
    experience.forEach(exp => {
      if (exp.start_date && exp.end_date) {
        const start = new Date(exp.start_date);
        const end = exp.end_date === 'present' ? new Date() : new Date(exp.end_date);
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        totalMonths += Math.max(0, months);
      } else if (exp.duration) {
        // Если длительность указана в текстовом формате
        totalMonths += this.parseDuration(exp.duration);
      }
    });
    
    return Math.round(totalMonths / 12);
  }
  
  private parseDuration(duration: string): number {
    const yearsMatch = duration.match(/(\d+)\s*год/);
    const monthsMatch = duration.match(/(\d+)\s*месяц/);
    
    let months = 0;
    if (yearsMatch) months += parseInt(yearsMatch[1]) * 12;
    if (monthsMatch) months += parseInt(monthsMatch[1]);
    
    return months;
  }
  
  private formatExperience(years: number): string {
    if (years === 0) return 'Без опыта';
    if (years === 1) return '1 год';
    if (years >= 2 && years <= 4) return `${years} года`;
    return `${years} лет`;
  }
  
  private generateSkillsSection(vacancySkills: string, userSkills: string, experience: number, position: string): string {
    let section = 'Мои профессиональные навыки и опыт включают: ';
    
    if (userSkills) {
      // Находим пересечение навыков вакансии и кандидата
      const vacancySkillsArray = vacancySkills.toLowerCase().split(', ').map(s => s.trim());
      const userSkillsArray = userSkills.split(', ').map(s => s.trim());
      
      const matchingSkills = userSkillsArray.filter(skill => 
        vacancySkillsArray.some(vacSkill => 
          skill.toLowerCase().includes(vacSkill) || vacSkill.includes(skill.toLowerCase())
        )
      );
      
      if (matchingSkills.length > 0) {
        section += matchingSkills.slice(0, 5).join(', ') + '. ';
      } else {
        section += userSkills.split(', ').slice(0, 5).join(', ') + '. ';
      }
    }
    
    if (experience > 0) {
      section += `Опыт работы в сфере ${position || 'по специальности'} составляет ${experience} ${this.pluralize(experience, ['год', 'года', 'лет'])}.`;
    } else {
      section += `Несмотря на отсутствие коммерческого опыта, обладаю сильной теоретической подготовкой в ключевых областях.`;
    }
    
    return section;
  }
  
  private generateMotivationSection(companyName: string, vacancyName: string, userAbout: string): string {
    let motivation = `Заинтересован(а) в позиции "${vacancyName}" в компании "${companyName}", так как `;
    
    if (userAbout && userAbout.length > 50) {
      // Извлекаем ключевые моменты из "О себе"
      const aboutKeywords = this.extractKeywords(userAbout);
      if (aboutKeywords.length > 0) {
        motivation += `мои профессиональные интересы и компетенции (${aboutKeywords.slice(0, 3).join(', ')}) полностью соответствуют требованиям данной позиции.`;
      } else {
        motivation += `считаю, что мой опыт и навыки идеально подходят для успешного выполнения поставленных задач.`;
      }
    } else {
      motivation += `уверен(а), что смогу внести значительный вклад в развитие компании благодаря своему опыту и профессиональным качествам.`;
    }
    
    return motivation;
  }
  
  private extractKeywords(text: string): string[] {
    const keywords = [
      'разработка', 'управление', 'анализ', 'проектирование', 'оптимизация', 
      'внедрение', 'координация', 'планирование', 'контроль', 'развитие',
      'автоматизация', 'тестирование', 'дизайн', 'маркетинг', 'продажи'
    ];
    
    return keywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
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

  sendToSuperJob(coverLetterContent: string, vacancyId: string, resumeId: string): Observable<any> {
    return from(this.superjobAuthService.sendApplication(parseInt(vacancyId), parseInt(resumeId), coverLetterContent)).pipe(
      catchError(error => {
        this.errorHandler.showError('Ошибка отправки на SuperJob', 'CoverLetterService');
        return throwError(() => new Error('Ошибка отправки на SuperJob: ' + error.message));
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