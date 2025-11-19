// Файл: C:\Users\Serezhka\Documents\CollectiveProjects\resume\frontend\src\app\resume-generation\resume-generation.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { TranslatePipe } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { HHAuthService } from '../../../shared/job-platforms/hh/hh-auth.service';
import { HHVacancyService } from '../../../shared/job-platforms/hh/hh-vacancy.service';
import { ProfileService } from '../../../shared/profile/profile.service';
import { ResumeGenerationService } from '../../../shared/resume/resume-generation.service';
import { FileProcessorService } from '../../../shared/utils/file-processor.service';
import { TranslatedFileInputComponent } from '../../Helpers/translated-file-input/translated-file-input.component';
import { ErrorToastComponent } from '../../Helpers/error-toast/error-toast.component';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { AiConfigModalComponent } from "../../Pages/ai-config-modal/ai-config-modal.component";
import { AIGuardService } from '../../../shared/ai/ai-guard.service';

@Component({
  selector: 'app-resume-generation',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent,
    TranslatePipe,
    ButtonModule,
    DialogModule,
    ProgressSpinnerModule,
    FormsModule,
    InputTextModule,
    TranslatedFileInputComponent,
    AiConfigModalComponent
],
  templateUrl: './resume-generation.component.html',
  styleUrls: ['./resume-generation.component.scss']
})
export class ResumeGenerationComponent {
  private router = inject(Router);
  private profileService = inject(ProfileService);
  private messageService = inject(MessageService);
  private fileProcessor = inject(FileProcessorService);
  
  vacancyUrl: string = '';
  currentVacancy: any = null;
  generatedResume: string | null = null;
  coverLetterContent: string = '';
  coverLetterFile: File | null = null;
  vacancyFile: File | null = null;
  isLoading = false;
  error: string | null = null;
  hhAuthModalVisible = false;
  isPublishing = false;
  publishStatus: 'idle' | 'success' | 'error' = 'idle';
  hhResumeUrl: string | null = null;
  showAIConfigModal = false;
  
  constructor(
    private resumeService: ResumeGenerationService,
    private hhAuthService: HHAuthService,
    private vacancyService: HHVacancyService,
    public aiGuard: AIGuardService,
    private errorHandler: ErrorHandlerService
  ) {
    this.generatedResume = this.resumeService.getResume();
    const savedCoverLetter = this.resumeService.getCoverLetter();
    if (savedCoverLetter) {
      this.coverLetterContent = savedCoverLetter;
    }
  }

  async onCoverLetterFileSelect(file: File): Promise<void> {
    try {
      this.coverLetterFile = file;
      const content = await this.fileProcessor.extractTextFromFile(file);
      this.coverLetterContent = content;
      this.messageService.add({
        severity: 'success',
        summary: 'Файл сопроводительного письма загружен'
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка загрузки файла'
      });
    }
  }

  removeCoverLetterFile(): void {
    this.coverLetterFile = null;
    this.coverLetterContent = '';
  }

  async onVacancyFileSelect(file: File): Promise<void> {
    try {
      this.vacancyFile = file;
      const content = await this.fileProcessor.extractTextFromFile(file);
      // Можно сохранить содержимое вакансии для использования при генерации
      this.messageService.add({
        severity: 'success',
        summary: 'Файл вакансии загружен'
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка загрузки файла вакансии'
      });
    }
  }

  removeVacancyFile(): void {
    this.vacancyFile = null;
  }

  async loadVacancyInfo(): Promise<void> {
    if (!this.vacancyUrl) return;
    
    this.isLoading = true;
    try {
      this.currentVacancy = await this.vacancyService.getVacancyWithCache(this.vacancyUrl);
      
      if (this.currentVacancy) {
        this.messageService.add({
          severity: 'success',
          summary: 'Информация о вакансии загружена'
        });
      }
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка загрузки вакансии',
        detail: error.message
      });
    } finally {
      this.isLoading = false;
    }
  }

  generateResume() {
    const aiCheck = this.aiGuard.ensureAIConfigured();
    if (!aiCheck.configured) {
      this.errorHandler.showAIError(aiCheck.message || 'AI не настроен', 'ResumeGenerationComponent');
      this.showAIConfigModal = true;
      return;
    }

    this.isLoading = true;
    this.error = null;

    if (this.vacancyUrl) {
      this.loadVacancyInfo().then(() => {
        this.generateResumeWithContext();
      });
    } else {
      this.generateResumeWithContext();
    }
  }

  private generateResumeWithContext(): void {
    const coverLetter = this.coverLetterContent || undefined;

    this.resumeService.generateResume(coverLetter).subscribe({
      next: (resume) => {
        this.generatedResume = resume;
        this.isLoading = false;
        if (this.coverLetterContent) {
          this.resumeService.saveCoverLetter(this.coverLetterContent);
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Резюме сгенерировано успешно!'
        });
      },
      error: (error) => {
        this.error = 'Не удалось сгенерировать резюме: ' + error.message;
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка генерации резюме',
          detail: error.message
        });
      }
    });
  }

  saveResume() {
    if (this.generatedResume) {
      this.resumeService.saveResume(this.generatedResume);
      if (this.coverLetterContent) {
        this.resumeService.saveCoverLetter(this.coverLetterContent);
      }
      this.messageService.add({
        severity: 'success',
        summary: 'Резюме сохранено'
      });
    }
  }

  deleteResume() {
    this.resumeService.deleteResume();
    this.resumeService.deleteCoverLetter();
    this.generatedResume = null;
    this.coverLetterContent = '';
    this.coverLetterFile = null;
    this.vacancyFile = null;
    this.vacancyUrl = '';
    this.messageService.add({
      severity: 'info',
      summary: 'Резюме удалено'
    });
  }

  openHHAuthModal() {
    this.hhAuthModalVisible = true;
    this.publishStatus = 'idle';
    this.hhResumeUrl = null;
  }

  async connectToHH() {
    const hhToken = localStorage.getItem('hh_access_token');
    if (!hhToken) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Сначала подключите аккаунт HH.ru'
      });
      return null;
    }
    return hhToken;
  }

  async publishToHH() {
    if (!this.generatedResume) {
      this.messageService.add({
        severity: 'error',
        summary: 'Сначала сгенерируйте резюме'
      });
      return;
    }

    this.isPublishing = true;
    this.publishStatus = 'idle';

    try {
      const hhToken = await this.connectToHH();
      if (!hhToken) return;

      const resumeData = await this.prepareHHResumeData();
      if (!resumeData) return;
      
      const resumeId = await this.hhAuthService.publishResume(hhToken, resumeData);
      this.hhResumeUrl = `https://hh.ru/resume/${resumeId}`;
      this.publishStatus = 'success';
      
      this.messageService.add({
        severity: 'success',
        summary: 'Резюме опубликовано на HH.ru',
        detail: `Ссылка: ${this.hhResumeUrl}`
      });
    } catch (error: any) {
      this.errorHandler.showError('Ошибка публикации резюме', 'ResumeGenerationComponent');
      this.publishStatus = 'error';
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка публикации',
        detail: error.message || 'Не удалось опубликовать резюме'
      });
    } finally {
      this.isPublishing = false;
    }
  }

  private async prepareHHResumeData(): Promise<any> {
    const profile = await this.profileService.loadProfile().toPromise();
    if (!profile) {
      this.router.navigate(['/profile/edit']);
      this.messageService.add({
        severity: 'warn',
        summary: 'Заполните профиль перед публикацией'
      });
      return null;
    }

    const requiredFields = [
      { field: profile.name, error: 'Укажите имя' },
      { field: profile.contact.email, error: 'Укажите email' },
      { field: profile.experience?.length > 0, error: 'Добавьте опыт работы' },
      { field: profile.education?.length > 0, error: 'Добавьте образование' }
    ];

    const missingField = requiredFields.find(f => !f.field);
    if (missingField) {
      this.router.navigate(['/profile/edit'], {
        state: { highlightMissing: true }
      });
      this.messageService.add({
        severity: 'error',
        summary: missingField.error
      });
      return null;
    }

    const aboutText = await this.generateResumeSection(`
      Напиши профессиональное описание для раздела "О себе" используя:
      Навыки: ${profile.skills.map(s => s.name).join(', ')}
      Опыт: ${profile.experience.length} ${this.pluralize(profile.experience.length, ['год', 'года', 'лет'])}
      Образование: ${profile.education.map(e => e.specialty).join(', ')}
    `);

    const experienceTexts = await Promise.all(
      profile.experience.map((exp: any) => 
        this.generateResumeSection(`
          Опиши профессиональный опыт для резюме:
          Должность: ${exp.position}
          Компания: ${exp.company}
          Период: ${exp.startDate} - ${exp.endDate || 'по настоящее время'}
          Обязанности: ${exp.tasks.join('; ')}
          Достижения: ${exp.achievements.map((a: any) => a.name).join('; ')}
          Технологии: ${exp.stack.join(', ')}
        `)
      )
    );

    return {
      title: `${profile.desiredPositions?.[0] || 'Специалист'} ${profile.name}`,
      first_name: profile.name.split(' ')[0],
      last_name: profile.name.split(' ')[1] || '',
      middle_name: profile.name.split(' ')[2] || '',
      contacts: this.formatContacts(profile.contact),
      salary: {
        amount: 200000,
        currency: 'RUR'
      },
      experience: profile.experience.map((exp: any, i: number) => ({
        position: exp.position,
        company: exp.company,
        start: exp.startDate,
        end: exp.endDate || null,
        description: experienceTexts[i],
        achievements: exp.achievements.map((a: any) => a.name)
      })),
      education: profile.education.map((edu: any) => ({
        year: edu.year,
        name: edu.institution,
        result: `${edu.degree}, ${edu.specialty}`,
        type: 'higher'
      })),
      skill_set: [
        ...profile.skills.map((s: any) => s.name),
        ...profile.languages.map((l: any) => `${l.language} (${l.level})`)
      ],
      about: aboutText,
      skills: this.formatSkills(profile.skills),
      hidden_fields: ['resume_access'],
      resume_locale: 'RU'
    };
  }
  closeHHAuthModal(): void {
    this.hhAuthModalVisible = false;
  }
  private generateResumeSection(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.resumeService.generateResumeSection(prompt).subscribe({
        next: (text) => resolve(text),
        error: () => resolve(this.createFallbackText(prompt))
      });
    });
  }
  
  private createFallbackText(prompt: string): string {
    if (prompt.includes('О себе') || prompt.includes('описание')) {
      return 'Опытный специалист с сильными профессиональными навыками и стремлением к развитию.';
    }
    if (prompt.includes('опыт') || prompt.includes('работа')) {
      return 'Ответственный сотрудник с доказанным опытом достижения результатов.';
    }
    return 'Профессионал с качественным опытом работы.';
  }

  private formatContacts(contact: any): any[] {
    return [
      { type: 'email', value: contact.email, preferred: true },
      contact.phone ? { type: 'cell', value: contact.phone } : null,
      contact['linkedin'] ? { type: 'skype', value: contact['linkedin'] } : null
    ].filter(Boolean);
  }

  private formatSkills(skills: any[]): string {
    return skills
      .sort((a: any, b: any) => b.level - a.level)
      .map((s: any) => `${s.name} - ${s.level}/10`)
      .join('\n');
  }

  private pluralize(count: number, forms: string[]): string {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ];
  }
}