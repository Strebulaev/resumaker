import { Injectable } from '@angular/core';
import { AIService } from '../ai/ai.service';
import { ProfileService } from '../profile/profile.service';
import { Observable, catchError, map, of, switchMap, from } from 'rxjs';
import { Person } from '../../person-schema';
import { HHVacancyService } from '../job-platforms/hh/hh-vacancy.service';
import { ErrorHandlerService } from '../error-handler.service';
import { UsageService } from '../billing/usage.service';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService
  ) {}

  generateResume(coverLetterContent?: string): Observable<string> {
    return from(this.usageService.checkLimit('resumeGenerations')).pipe(
      switchMap(limitCheck => {
        if (!limitCheck.allowed) {
          const errorMsg = `Достигнут дневной лимит генерации резюме. Доступно: ${limitCheck.remaining} из ${limitCheck.limit}. Обновите тариф для увеличения лимитов.`;
          this.messageService.add({
            severity: 'warn',
            summary: 'Лимит исчерпан',
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

            const prompt = this.buildResumePrompt(profile, coverLetterContent);
            
            const request = {
              model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
              prompt: prompt,
              max_tokens: 2500,
              temperature: 0.7,
              top_p: 0.7,
              top_k: 50,
              repetition_penalty: 1.1,
              stop: ['<|im_end|>', '<|im_start|>'],
              stream: false
            };

            return this.aiService.generateText(request).pipe(
              map(resume => this.cleanResumeContent(resume)),
              switchMap(resume => {
                // Увеличиваем счетчик использования после успешной генерации
                return from(this.usageService.incrementUsage('resumeGenerations')).pipe(
                  map(() => resume)
                );
              }),
              catchError(error => {
                this.errorHandler.showError('Ошибка генерации резюме', 'ResumeGenerationService');
                return of(this.createFallbackResume(profile));
              })
            );
          }),
          catchError(error => {
            this.errorHandler.showError('Ошибка загрузки профиля', 'ResumeGenerationService');
            return of('Ошибка загрузки профиля. Пожалуйста, проверьте заполнение профиля.');
          })
        );
      }),
      catchError(error => {
        // Ошибка проверки лимита
        return of(error.message);
      })
    );
  }

  private buildResumePrompt(profile: Person, coverLetter?: string): string {
    const experienceText = profile.experience?.map(exp => 
      `- ${exp.company} (${exp.startDate} - ${exp.endDate || 'по настоящее время'}): ${exp.position}
       Обязанности: ${exp.tasks.join('; ')}
       Технологии: ${exp.stack.join(', ')}
       Достижения: ${exp.achievements.map(a => `${a.name}: ${a.initial_value} → ${a.final_value} ${a.uom || ''}`).join('; ')}`
    ).join('\n') || 'Опыт работы не указан';

    const skillsByArea = this.groupSkillsByArea(profile.skills || []);
    const vacancyContext = this.currentVacancy ? `
      ИНФОРМАЦИЯ О ВАКАНСИИ:
      - Должность: ${this.currentVacancy.name}
      - Компания: ${this.currentVacancy.employer?.name}
      - Требования: ${this.vacancyService.extractRequirements(this.currentVacancy)}
      - Ключевые навыки: ${this.vacancyService.extractKeySkills(this.currentVacancy).join(', ')}
      ` : '';

    return `Сгенерируй качественное, профессиональное резюме на русском языке на основе следующего профиля.

${vacancyContext}

ТРЕБОВАНИЯ К РЕЗЮМЕ:
- Структурированное резюме с разделами: Контакты, О себе, Опыт работы, Образование, Навыки, Достижения
- Профессиональный деловой стиль
- Конкретные достижения с цифрами и метриками
- Акцент на релевантных для желаемой позиции навыках
- Формат: Markdown
- Длина: 1-2 страницы

${coverLetter ? `ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ ИЗ СОПРОВОДИТЕЛЬНОГО ПИСЬМА:
${coverLetter.substring(0, 500)}...\n\n` : ''}

ПРОФИЛЬ КАНДИДАТА:
Имя: ${profile.name}
Желаемые позиции: ${profile.desiredPositions?.join(', ') || 'Не указаны'}

КОНТАКТНАЯ ИНФОРМАЦИЯ:
Email: ${profile.contact.email}
Телефон: ${profile.contact.phone || 'Не указан'}
LinkedIn: ${profile.contact['linkedin'] || 'Не указан'}
GitHub: ${profile.contact['github'] || 'Не указан'}

МЕСТОПОЛОЖЕНИЕ:
Город: ${profile.location.city}
Страна: ${profile.location.country || 'Не указана'}
Готов к переезду: ${profile.location.relocation ? 'Да' : 'Нет'}
Удаленная работа: ${profile.location.remote ? 'Да' : 'Нет'}
Командировки: ${profile.location.business_trips ? 'Да' : 'Нет'}

ЯЗЫКИ:
${profile.languages?.map(l => `- ${l.language}: ${l.level}`).join('\n') || 'Не указаны'}

ОБРАЗОВАНИЕ:
${profile.education?.map(edu => 
  `- ${edu.institution} (${edu.year}): ${edu.degree}, ${edu.specialty}`
).join('\n') || 'Не указано'}

ОПЫТ РАБОТЫ:
${experienceText}

НАВЫКИ ПО ОБЛАСТЯМ:
${Object.entries(skillsByArea).map(([area, skills]) => 
  `${area}: ${skills.map(s => `${s.name} (${s.level}/10)`).join(', ')}`
).join('\n')}

ХОББИ: ${profile.hobby?.join(', ') || 'Не указаны'}
ЛИТЕРАТУРА: ${profile.literature?.join(', ') || 'Не указана'}

Сгенерируй профессиональное резюме:`;
  }

  private groupSkillsByArea(skills: any[]): { [key: string]: any[] } {
    return skills.reduce((groups: { [key: string]: any[] }, skill) => {
      const area = skill.area || 'Другие навыки';
      if (!groups[area]) {
        groups[area] = [];
      }
      groups[area].push(skill);
      return groups;
    }, {});
  }

  private cleanResumeContent(text: string): string {
    if (!text) return this.createFallbackResume(null);
    
    return text.trim();
  }

  private createFallbackResume(profile: Person | null): string {
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
${profile.skills?.slice(0, 5).map(s => `- ${s.name}`).join('\n') || '- Навыки не указаны'}

## Опыт работы
${profile.experience?.slice(0, 3).map(exp => 
  `- ${exp.company}: ${exp.position}`
).join('\n') || '- Опыт не указан'}

## Образование
${profile.education?.map(edu => 
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
      model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
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