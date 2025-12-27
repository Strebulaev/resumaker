import { Injectable } from '@angular/core';
import { AIService } from '../ai/ai.service';
import { ProfileService } from '../profile/profile.service';
import { Observable, catchError, map, of, switchMap, from } from 'rxjs';
import { Person } from '../../person-schema';
import { HHVacancyService } from '../job-platforms/hh/hh-vacancy.service';
import { ErrorHandlerService } from '../error-handler.service';
import { UsageService } from '../billing/usage.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class ResumeGenerationService {
  private readonly RESUME_KEY = 'generatedResume';
  private readonly COVER_LETTER_KEY = 'coverLetter';
  currentVacancy: any = null;

  constructor(
    private aiService: AIService,
    private profileService: ProfileService,
    private vacancyService: HHVacancyService,
    private errorHandler: ErrorHandlerService,
    private usageService: UsageService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  setCurrentVacancy(vacancy: any): void {
    this.currentVacancy = vacancy;
  }
  
  generateResume(coverLetterContent?: string): Observable<string> {
    return from(this.usageService.checkLimit('resumeGenerations')).pipe(
      switchMap(limitCheck => {
        if (!limitCheck.allowed) {
          const errorMsg = `Resume generation daily limit reached. Available: ${limitCheck.remaining} out of ${limitCheck.limit}. Upgrade your plan to increase limits.`;
          this.messageService.add({
            severity: 'warn',
            summary: 'Limit exceeded',
            detail: errorMsg,
            life: 5000
          });
          throw new Error(errorMsg);
        }
  
        return this.profileService.loadProfile().pipe(
          switchMap(profile => {
            if (!profile) {
              return of('Ошибка: Профиль пользователя не найден. Пожалуйста, заполните профиль сначала.');
            }
  
            const validationErrors = this.validateProfileForResume(profile);
            if (validationErrors.length > 0) {
              const errorMsg = `Для генерации качественного резюме необходимо заполнить: ${validationErrors.join(', ')}`;
              this.messageService.add({
                severity: 'warn',
                summary: 'Недостаточно данных',
                detail: errorMsg,
                life: 7000
              });
              return of(this.createFallbackResume(profile));
            }
  
            const prompt = this.buildResumePrompt(profile, coverLetterContent);
            
            console.log('Generating resume with prompt length:', prompt.length);
  
            const request = {
              model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
              prompt: prompt,
              max_tokens: 3000,
              temperature: 0.6,
              top_p: 0.8,
              top_k: 50,
              repetition_penalty: 1.1,
              stop: ['<|im_end|>', '<|im_start|>'],
              stream: false
            };
  
            return this.aiService.generateText(request).pipe(
              map(resume => this.cleanResumeContent(resume)),
              switchMap(resume => {
                return from(this.usageService.incrementUsage('resumeGenerations')).pipe(
                  map(() => resume)
                );
              }),
              catchError(error => {
                console.error('Resume generation error:', error);
                this.errorHandler.showError(this.translate.instant('ERROR.GENERATE_RESUME'), 'ResumeGenerationService');
                return of(this.createFallbackResume(profile));
              })
            );
          }),
          catchError(error => {
            console.error('Profile loading error:', error);
            this.errorHandler.showError(this.translate.instant('ERROR.LOAD_PROFILE'), 'ResumeGenerationService');
            return of('Profile loading error. Please check your profile completion.');
          })
        );
      }),
      catchError(error => {
        return of(error.message);
      })
    );
  }
  
  private validateProfileForResume(profile: any): string[] {
    const errors: string[] = [];
    
    if (!profile.name || profile.name.trim().length < 2) {
      errors.push('ФИО');
    }
    
    if (!profile.contact?.email) {
      errors.push('email');
    }
    
    if (!profile.experience || profile.experience.length === 0) {
      errors.push('опыт работы');
    }
    
    if (!profile.skills || profile.skills.length === 0) {
      errors.push('навыки');
    }
    
    if (!profile.education || profile.education.length === 0) {
      errors.push('образование');
    }
    
    return errors;
  }

  private buildResumePrompt(profile: any, coverLetter?: string): string {
    const userName = profile.name || 'Кандидат';
    const userEmail = profile.contact.email;
    const userPhone = profile.contact.phone || '';
    const userLinkedIn = profile.contact['linkedin'] || '';
    const userGitHub = profile.contact['github'] || '';
    const userTelegram = profile.contact['telegram'] || '';
    
    const desiredPositions = profile.desiredPositions?.join(', ') || 'Не указаны';
    const desiredSalary = 'Не указана'; 
    
    const experienceText = profile.experience?.map((exp: any, index: number) => {
      const duration = this.calculateExperienceDuration(exp.start_date || '', exp.end_date);
      const achievements = exp.achievements?.map((ach: any) =>
        `✓ ${ach.name}${ach.initial_value ? `: ${ach.initial_value} → ${ach.final_value}${ach.uom ? ` ${ach.uom}` : ''}` : ''}`
      ).join('\n       ') || 'Достижения не указаны'
      
      return `### ${exp.position}
  **Компания:** ${exp.company}
  **Период:** ${exp.start_date} - ${exp.end_date || 'по настоящее время'} (${duration})
  **Обязанности:** ${exp.tasks?.join('; ') || 'Не указаны'}
  **Технологии:** ${exp.stack?.join(', ') || 'Не указаны'}
  **Достижения:**
  ${achievements}`;
    }).join('\n\n') || 'Опыт работы не указан';
  
    const skillsByArea = this.groupSkillsByPriority(profile.skills || []);

    const educationText = profile.education?.map((edu: any) =>
      `### ${edu.institution}
   **Специальность:** ${edu.specialty}
   **Степень:** ${edu.degree || 'Не указана'}
   **Год окончания:** ${edu.end_year || 'Не указан'}`
    ).join('\n\n') || 'Образование не указано';

    const languagesText = profile.languages?.map((lang: any) =>
      `- ${lang.language}: ${this.getLanguageLevel(lang.level)}`
    ).join('\n') || 'Языки не указаны';
  
    const vacancyContext = this.currentVacancy ? `
  ## 🎯 КОНТЕКСТ ВАКАНСИИ
  
  **Должность:** ${this.currentVacancy.name}
  **Компания:** ${this.currentVacancy.employer?.name}
  **Зарплата:** ${this.currentVacancy.salary ? this.formatSalary(this.currentVacancy.salary) : 'Не указана'}
  **Требуемый опыт:** ${this.currentVacancy.experience?.name || 'Не указан'}
  **Ключевые требования:**
  ${this.vacancyService.extractKeySkills(this.currentVacancy).map(skill => `- ${skill}`).join('\n')}
  
  **Описание вакансии:**
  ${this.currentVacancy.description?.substring(0, 800) || 'Описание не указано'}...
  ` : '';
  
    const vacancyMatchAnalysis = this.currentVacancy ? this.analyzeVacancyMatch(profile, this.currentVacancy) : '';
  
    const promptText = `# ЗАДАЧА: Сгенерировать профессиональное резюме мирового уровня
  
  Ты - эксперт по карьере и HR-специалист с 15-летним опытом. Создай ИДЕАЛЬНОЕ резюме на основе предоставленных данных.
  
  ## 📋 КРИТИЧЕСКИ ВАЖНЫЕ ТРЕБОВАНИЯ:
  
  ### СТРУКТУРА (обязательная):
  1. **Контактная информация** (имя, телефон, email, LinkedIn, локация)
  2. **Цель/Краткое описание** (3-4 предложения, хук для рекрутера)
  3. **Ключевые навыки** (сгруппированные по категориям)
  4. **Опыт работы** (в обратном хронологическом порядке)
  5. **Образование**
  6. **Сертификаты и курсы**
  7. **Языки**
  8. **Проекты** (если есть)
  9. **Дополнительная информация**
  
  ### СТИЛЬ И ФОРМАТ:
  - **Профессиональный деловой стиль**
  - **Использование action verbs** (разработал, оптимизировал, внедрил, увеличил)
  - **Конкретные цифры и метрики** везде где возможно
  - **Длина:** 1.5-2 страницы (800-1200 слов)
  - **Формат:** Markdown с четкой структуру
  - **Акцент на достижениях**, а не на обязанностях
  - **Релевантность** к желаемой позиции
  
  ### КОНКРЕТНЫЕ УКАЗАНИЯ:
  - Преобразуй обычные обязанности в impactful достижения
  - Используй формулу: "Что сделал + Как + Результат"
  - Подчеркивай бизнес-ценность каждого достижения
  - Группируй навыки логически (Technical, Soft Skills, Tools etc.)
  - Создай compelling summary в начале
  
  ${vacancyContext}
  
  ${vacancyMatchAnalysis}
  
  ## 👤 ДАННЫЕ КАНДИДАТА:
  
  ### ОСНОВНАЯ ИНФОРМАЦИЯ
  **ФИО:** ${userName}
  **Целевые позиции:** ${desiredPositions}
  **Желаемая зарплата:** ${desiredSalary}
  
  ### КОНТАКТЫ
  - **Email:** ${userEmail}
  - **Телефон:** ${userPhone || 'Не указан'}
  - **LinkedIn:** ${userLinkedIn || 'Не указан'}
  - **GitHub:** ${userGitHub || 'Не указан'}
  - **Telegram:** ${userTelegram || 'Не указан'}
  
  ### ЛОКАЦИЯ
  - **Город:** ${profile.location.city}
  - **Страна:** ${profile.location.country || 'Россия'}
  - **Переезд:** ${profile.location.relocation ? 'Готов' : 'Не готов'}
  - **Удаленная работа:** ${profile.location.remote ? 'Доступна' : 'Не доступна'}
  - **Командировки:** ${profile.location.business_trips ? 'Возможны' : 'Не возможны'}
  
  ${coverLetter ? `### ДОПОЛНИТЕЛЬНЫЙ КОНТЕКСТ ИЗ СОПРОВОДИТЕЛЬНОГО ПИСЬМА:
  ${coverLetter.substring(0, 1000)}...
  ` : ''}
  
  ## 💼 ОПЫТ РАБОТЫ
  ${experienceText}
  
  ## 🎓 ОБРАЗОВАНИЕ
  ${educationText}
  
  ## 🌐 ЯЗЫКИ
  ${languagesText}
  
  ## 🎯 НАВЫКИ
  ${Object.entries(skillsByArea).map(([area, skills]) => 
    `### ${area}\n${skills.map(s => `- ${s.name}${s.level ? ` (${s.level}/10)` : ''}`).join('\n')}`
  ).join('\n\n')}
  
  ## 🎨 ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ
  - **Хобби:** ${profile.hobby?.join(', ') || 'Не указаны'}
  - **Литература:** ${profile.literature?.join(', ') || 'Не указана'}
  
  ---
  
  **СГЕНЕРИРУЙ ПРОФЕССИОНАЛЬНОЕ РЕЗЮМЕ, КОТОРОЕ:**
  1. Выделит кандидата среди сотен других
  2. Покажет измеримую бизнес-ценность
  3. Будет идеально соответствовать целевым позициям
  4. Использует лучшие практики современных HR-трендов
  5. Содержит конкретные достижения с цифрами
  6. Имеет четкую логическую структуру
  7. Легко читается и сканируется за 30 секунд
  
  Начни резюме сразу с контактной информации, без вступлений.`;
    
    return promptText;
  }
  
  private pluralize(count: number, forms: string[]): string {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ];
  }

  private calculateExperienceDuration(startDate: string, endDate?: string): string {
    try {
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : new Date();
      
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      
      if (years === 0) {
        return `${remainingMonths} ${this.pluralize(remainingMonths, ['месяц', 'месяца', 'месяцев'])}`;
      } else if (remainingMonths === 0) {
        return `${years} ${this.pluralize(years, ['год', 'года', 'лет'])}`;
      } else {
        return `${years} ${this.pluralize(years, ['год', 'года', 'лет'])} ${remainingMonths} ${this.pluralize(remainingMonths, ['месяц', 'месяца', 'месяцев'])}`;
      }
    } catch {
      return 'Период не указан';
    }
  }
  
  private groupSkillsByPriority(skills: any[]): { [key: string]: any[] } {
    const areaPriority: { [key: string]: number } = {
      'Технические навыки': 1,
      'Программирование': 2,
      'Фреймворки': 3,
      'Базы данных': 4,
      'Инструменты': 5,
      'Методологии': 6,
      'Soft Skills': 7,
      'Языки': 8,
      'Другие навыки': 9
    };
  
    const groups = skills.reduce((acc: { [key: string]: any[] }, skill) => {
      const area = skill.area || 'Другие навыки';
      if (!acc[area]) {
        acc[area] = [];
      }
      
      acc[area].push(skill);
      acc[area].sort((a, b) => (b.level || 0) - (a.level || 0));
      
      return acc;
    }, {});
  
    return Object.keys(groups)
      .sort((a, b) => (areaPriority[a] || 10) - (areaPriority[b] || 10))
      .reduce((acc, key) => {
        acc[key] = groups[key];
        return acc;
      }, {} as { [key: string]: any[] });
  }
  
  private getLanguageLevel(level: string): string {
    const levelMap: { [key: string]: string } = {
      'beginner': 'Начальный',
      'elementary': 'Элементарный',
      'intermediate': 'Средний',
      'upper-intermediate': 'Выше среднего',
      'advanced': 'Продвинутый',
      'proficient': 'Свободный',
      'native': 'Родной',
      'a1': 'Начальный (A1)',
      'a2': 'Элементарный (A2)',
      'b1': 'Средний (B1)',
      'b2': 'Выше среднего (B2)',
      'c1': 'Продвинутый (C1)',
      'c2': 'В совершенстве (C2)'
    };
    
    return levelMap[level.toLowerCase()] || level;
  }
  
  private analyzeVacancyMatch(profile: Person, vacancy: any): string {
    const vacancySkills = this.vacancyService.extractKeySkills(vacancy);
    const profileSkills = profile.skills?.map(s => s.name.toLowerCase()) || [];
    
    const matchingSkills = vacancySkills.filter(skill => 
      profileSkills.some(profileSkill => 
        profileSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(profileSkill)
      )
    );
    
    const matchPercentage = vacancySkills.length > 0 
      ? Math.round((matchingSkills.length / vacancySkills.length) * 100) 
      : 0;
    
    const missingSkills = vacancySkills.filter(skill => 
      !profileSkills.some(profileSkill => 
        profileSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(profileSkill)
      )
    );
    
    return `
  ## 📊 АНАЛИЗ СООТВЕТСТВИЯ ВАКАНСИИ
  
  **Совпадение навыков:** ${matchPercentage}%
  **Найденные соответствия:** ${matchingSkills.length} из ${vacancySkills.length}
  
  ${matchingSkills.length > 0 ? `✅ **Сильные стороны:**
  ${matchingSkills.map(skill => `- ${skill}`).join('\n')}` : ''}
  
  ${missingSkills.length > 0 ? `⚠️ **Рекомендуется развить:**
  ${missingSkills.map(skill => `- ${skill}`).join('\n')}` : ''}
  
  **Рекомендация:** ${this.getMatchRecommendation(matchPercentage)}
  `;
  }
  
  private getMatchRecommendation(percentage: number): string {
    if (percentage >= 80) return 'Идеальное соответствие! Сделай акцент на точном совпадении навыков.';
    if (percentage >= 60) return 'Хорошее соответствие. Подчеркни ключевые совпадающие навыки.';
    if (percentage >= 40) return 'Умеренное соответствие. Выдели transferable skills и готовность к обучению.';
    return 'Низкое соответствие. Сделай акцент на быстрой обучаемости и смежных навыках.';
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

  private cleanResumeContent(text: string): string {
    if (!text) return this.createFallbackResume(null);
    
    let cleaned = text
      .replace(/```(?:json|html|markdown)?/g, '')
      .replace(/^#+\s*ЗАДАЧА:.*$/gm, '')
      .replace(/^#+\s*КРИТИЧЕСКИ.*$/gm, '')
      .replace(/^#+\s*СТРУКТУРА.*$/gm, '')
      .replace(/^#+\s*СТИЛЬ И ФОРМАТ.*$/gm, '')
      .replace(/^#+\s*КОНКРЕТНЫЕ УКАЗАНИЯ.*$/gm, '')
      .replace(/^#+\s*ДАННЫЕ КАНДИДАТА.*$/gm, '')
      .replace(/^#+\s*СГЕНЕРИРУЙ ПРОФЕССИОНАЛЬНОЕ РЕЗЮМЕ.*$/gm, '')
      .replace(/\*{2,}/g, '*')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  
    if (!cleaned.startsWith('#')) {
      cleaned = `# Резюме\n\n${cleaned}`;
    }
  
    return cleaned;
  }

  private createFallbackResume(profile: any): string {
    if (!profile) {
      return `# Резюме

## Контактная информация
- Email: example@email.com
- Телефон: +7 XXX XXX XX XX

## О себе
Опытный специалист с доказанными навыками в своей области.

## Навыки
- Профессиональные навыки
- Работа в команде
- Решение проблем

## Опыт работы
Ответственный сотрудник с опытом достижения результатов.

## Образование
Высшее образование по соответствующей специальности.

Примечание: Заполните профиль для генерации персонализированного резюме.`;
    }

    return `# Резюме - ${profile.name}

## Контактная информация
- Email: ${profile.contact.email}
- Телефон: ${profile.contact.phone || 'Не указан'}
- Город: ${profile.location.city}

## О себе
Профессионал с опытом работы в ${profile.experience?.length || 0} компаниях.

## Навыки
${(profile.skills || []).slice(0, 5).map((s: any) => `- ${s.name}`).join('\n') || '- Навыки не указаны'}

## Опыт работы
${(profile.experience || []).slice(0, 3).map((exp: any) =>
  `- ${exp.company}: ${exp.position}`
).join('\n') || '- Опыт не указан'}

## Образование
${(profile.education || []).map((edu: any) =>
  `- ${edu.institution}: ${edu.specialty}`
).join('\n') || '- Образование не указано'}`;
  }

  generateResumeSection(promptText: string): Observable<string> {
    const prompt = `Сгенерируй качественный текст для раздела резюме на русском языке.
Требования:
- Профессиональный деловой стиль
- Конкретные достижения с цифрами
- Без воды, только факты
- Максимально информативно

Задание: ${promptText}`;

    const request = {
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt: prompt,
      max_tokens: 800,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1.1,
      stop: ['<|im_end|>', '<|im_start|>'],
      stream: false
    };

    return this.aiService.generateText(request).pipe(
      catchError(error => {
        console.error('Resume section generation error:', error);
        return of(this.createFallbackSection(promptText));
      })
    );
  }

  private createFallbackSection(prompt: string): string {
    if (prompt.includes('О себе') || prompt.includes('описание')) {
      return 'Опытный специалист с сильными профессиональными навыками и стремлением к развитию.';
    }
    if (prompt.includes('опыт') || prompt.includes('работа')) {
      return 'Ответственный сотрудник с доказанным опытом достижения результатов.';
    }
    return 'Профессионал с качественным опытом работы.';
  }

  saveResume(resume: string): void {
    localStorage.setItem(this.RESUME_KEY, resume);
  }

  saveCoverLetter(coverLetter: string): void {
    localStorage.setItem(this.COVER_LETTER_KEY, coverLetter);
  }

  getCoverLetter(): string | null {
    return localStorage.getItem(this.COVER_LETTER_KEY);
  }

  deleteResume(): void {
    localStorage.removeItem(this.RESUME_KEY);
  }

  deleteCoverLetter(): void {
    localStorage.removeItem(this.COVER_LETTER_KEY);
  }

  getResume(): string | null {
    return localStorage.getItem(this.RESUME_KEY);
  }

  hasSavedResume(): boolean {
    return localStorage.getItem(this.RESUME_KEY) !== null;
  }

  hasCoverLetter(): boolean {
    return localStorage.getItem(this.COVER_LETTER_KEY) !== null;
  }
}