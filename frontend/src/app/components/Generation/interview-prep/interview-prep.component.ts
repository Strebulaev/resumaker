import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { MarkdownModule } from 'ngx-markdown';
import * as yaml from 'js-yaml';
import { TranslatePipe } from '@ngx-translate/core';
import { ConfigService } from '../../../shared/config/config.service';
import { HHVacancyService } from '../../../shared/job-platforms/hh/hh-vacancy.service';
import { ProfileService } from '../../../shared/profile/profile.service';
import { FileProcessorService } from '../../../shared/utils/file-processor.service';
import { TranslatedFileInputComponent } from '../../Helpers/translated-file-input/translated-file-input.component';
import { ErrorToastComponent } from '../../Helpers/error-toast/error-toast.component';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { AIGuardService } from '../../../shared/ai/ai-guard.service';
import { AiConfigModalComponent } from "../../Pages/ai-config-modal/ai-config-modal.component";
import { ResumeSelectorComponent, Resume } from '../../Helpers/resume-selector/resume-selector.component';
import { VacancySelectorComponent } from "../../Helpers/vacancy-selector/vacancy-selector.component";
import { UsageService } from '../../../shared/billing/usage.service';

interface PromptConfig {
  system_prompt: string;
  user_prompt_template: string;
  blocks: {
    [key: string]: string;
  };
}

@Component({
  selector: 'app-interview-prep',
  templateUrl: './interview-prep.component.html',
  styleUrls: ['./interview-prep.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    FileUploadModule,
    ProgressSpinnerModule,
    TextareaModule,
    DialogModule,
    TranslatePipe,
    CheckboxModule,
    MarkdownModule,
    FormsModule,
    TranslatedFileInputComponent,
    AiConfigModalComponent,
    ResumeSelectorComponent,
    VacancySelectorComponent
]
})
export class InterviewPrepComponent implements OnInit {
  interviewForm: FormGroup;
  isLoading = false;
  generatedPlan: string = '';
  showPlanDialog = false;
  userProfile: any = null;
  
  resumeFile: File | null = null;
  vacancyFile: File | null = null;
  companyFile: File | null = null;
  personalContextFile: File | null = null;
  coverLetterFile: File | null = null;
  internalContextFile: File | null = null;
  
  resumeContent: string = '';
  vacancyContent: string = '';
  companyContent: string = '';
  personalContextContent: string = '';
  coverLetterContent: string = '';
  internalContextContent: string = '';

  promptConfig: PromptConfig | null = null;
  vacancyUrl: string = '';
  currentVacancy: any = null;
  showAIConfigModal = false;
  showVacancySelector = false;
  selectedVacancyForInterview: any = null;
  showResumeSelector = false;
  selectedResumeForInterview: Resume | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private profileService: ProfileService,
    private fileProcessor: FileProcessorService,
    private configService: ConfigService,
    private messageService: MessageService,
    private vacancyService: HHVacancyService,
    public aiGuard: AIGuardService,
    private errorHandler: ErrorHandlerService,
    private usageService: UsageService
  ) {
    this.interviewForm = this.fb.group({
      customResume: [''],
      customVacancy: [''],
      customCompany: [''],
      customPersonalContext: [''],
      customCoverLetter: [''],
      customInternalContext: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    this.loadUserProfile();
    await this.loadPromptConfig();
  }

  private async loadPromptConfig(): Promise<void> {
    try {
      const promptContent = await this.http.get('/assets/prompts/interview-prompt.yaml', { 
        responseType: 'text' 
      }).toPromise();
      
      if (promptContent) {
        const parsedConfig = yaml.load(promptContent);
        if (parsedConfig && typeof parsedConfig === 'object') {
          this.promptConfig = parsedConfig as PromptConfig;
          return;
        }
      }
      
      this.promptConfig = {
        system_prompt: 'Ты профессиональный карьерный коуч и эксперт по подготовке к собеседованиям.',
        user_prompt_template: 'Сгенерируй детальный план подготовки на основе данных: Резюме: {resume}, Вакансия: {vacancy}, Компания: {company}, Контекст: {context}, Письмо: {coverLetter}, Внутренний контекст: {internalContext}',
        blocks: {
          analysis: 'Стратегический анализ',
          questions: 'Подготовка ответов',
          strategy: 'Стратегия поведения',
          checklist: 'Чек-листы'
        }
      };
      
    } catch (error) {
      console.error('Error loading prompt config:', error);
      this.promptConfig = {
        system_prompt: 'Ты профессиональный карьерный коуч и эксперт по подготовке к собеседованиям.',
        user_prompt_template: 'Сгенерируй детальный план подготовки на основе данных: Резюме: {resume}, Вакансия: {vacancy}, Компания: {company}, Контекст: {context}, Письмо: {coverLetter}, Внутренний контекст: {internalContext}',
        blocks: {
          analysis: 'Стратегический анализ',
          questions: 'Подготовка ответов',
          strategy: 'Стратегия поведения',
          checklist: 'Чек-листы'
        }
      };
    }
  }
  
  closePlanDialog(): void {
    this.showPlanDialog = false;
  }
  
  private loadUserProfile(): void {
    this.profileService.loadProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
      }
    });
  }
  
  async generateInterviewPlan(): Promise<void> {
    const limitCheck = await this.usageService.checkLimit('interviewPlans');
    if (!limitCheck.allowed) {
      const errorMsg = `Достигнут дневной лимит генерации планов собеседований. Доступно: ${limitCheck.remaining} из ${limitCheck.limit}. Обновите тариф для увеличения лимитов.`;
      this.messageService.add({
        severity: 'warn',
        summary: 'Лимит исчерпан',
        detail: errorMsg,
        life: 5000
      });
      return;
    }

    const aiCheck = this.aiGuard.ensureAIConfigured();
    if (!aiCheck.configured) {
      this.errorHandler.showAIError(aiCheck.message || 'AI не настроен', 'ResumeGenerationComponent');
      this.showAIConfigModal = true;
      return;
    }

    if (this.isLoading) return;

    this.isLoading = true;
    this.generatedPlan = '';

    try {
      const promptData = await this.preparePromptData();
      const plan = await this.generateWithAI(promptData);
      
      await this.usageService.incrementUsage('interviewPlans');
      
      this.generatedPlan = plan;
      this.showPlanDialog = true;
      
    } catch (error) {
      this.errorHandler.showError('Ошибка генерации плана собеседования', 'InterviewPrepComponent');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка генерации плана',
        detail: 'Попробуйте еще раз'
      });
    } finally {
      this.isLoading = false;
    }
  }

  private async processStructuredResumeFile(content: string, fileType: string): Promise<any> {
    try {
      let parsedData: any;
      
      if (fileType.includes('json') || content.trim().startsWith('{')) {
        parsedData = JSON.parse(content);
      } else {
        parsedData = yaml.load(content) as unknown;
      }
  
      if (parsedData && typeof parsedData === 'object') {
        if ('person' in parsedData && parsedData.person && typeof parsedData.person === 'object') {
          return parsedData.person;
        }
        return parsedData;
      }
      
      throw new Error('Invalid file structure');
      
    } catch (error) {
      console.error('Error parsing structured resume file:', error);
      throw new Error('Не удалось распарсить файл резюме');
    }
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
  
  removeFile(field: string): void {
    switch (field) {
      case 'resume':
        this.resumeFile = null;
        this.resumeContent = '';
        break;
      case 'vacancy':
        this.vacancyFile = null;
        this.vacancyContent = '';
        break;
      case 'company':
        this.companyFile = null;
        this.companyContent = '';
        break;
      case 'personalContext':
        this.personalContextFile = null;
        this.personalContextContent = '';
        break;
      case 'coverLetter':
        this.coverLetterFile = null;
        this.coverLetterContent = '';
        break;
      case 'internalContext':
        this.internalContextFile = null;
        this.internalContextContent = '';
        break;
    }
  }

  private async preparePromptData(): Promise<string> {
    let resumeText = '';
    let vacancyText = '';
    let companyText = '';
    let personalContextText = '';
    let coverLetterText = '';
    let internalContextText = '';

    if (this.selectedVacancyForInterview) {
      vacancyText = `
      ИНФОРМАЦИЯ О ВАКАНСИИ:
      - Должность: ${this.selectedVacancyForInterview.name}
      - Компания: ${this.selectedVacancyForInterview.employer?.name}
      - Требования: ${this.vacancyService.extractRequirements(this.selectedVacancyForInterview)}
      - Ключевые навыки: ${this.vacancyService.extractKeySkills(this.selectedVacancyForInterview).join(', ')}
      - Описание: ${this.selectedVacancyForInterview.description?.substring(0, 500)}...
      `;
    } else if (this.vacancyContent) {
      vacancyText = this.vacancyContent;
    } else {
      vacancyText = this.interviewForm.get('customVacancy')?.value || '';
    }

    const vacancyContext = this.currentVacancy ? `
    ИНФОРМАЦИЯ О ВАКАНСИИ:
    - Должность: ${this.currentVacancy.name}
    - Компания: ${this.currentVacancy.employer?.name}
    - Требования: ${this.vacancyService.extractRequirements(this.currentVacancy)}
    - Ключевые навыки: ${this.vacancyService.extractKeySkills(this.currentVacancy).join(', ')}
    ` : '';

    if (this.resumeContent) {
      resumeText = this.resumeContent;
    } else {
      resumeText = this.interviewForm.get('customResume')?.value || '';
    }
  
    if (this.vacancyContent) {
      vacancyText = this.vacancyContent;
    } else {
      vacancyText = this.interviewForm.get('customVacancy')?.value || '';
    }
  
    if (this.companyContent) {
      companyText = this.companyContent;
    } else {
      companyText = this.interviewForm.get('customCompany')?.value || '';
    }
  
    if (this.personalContextContent) {
      personalContextText = this.personalContextContent;
    } else {
      personalContextText = this.interviewForm.get('customPersonalContext')?.value || '';
    }
  
    if (this.coverLetterContent) {
      coverLetterText = this.coverLetterContent;
    } else {
      coverLetterText = this.interviewForm.get('customCoverLetter')?.value || '';
    }
  
    if (this.internalContextContent) {
      internalContextText = this.internalContextContent;
    } else {
      internalContextText = this.interviewForm.get('customInternalContext')?.value || '';
    }
  
    if (this.promptConfig?.user_prompt_template) {
      return this.promptConfig.user_prompt_template
        .replace(/{resume}/g, resumeText)
        .replace(/{vacancy}/g, vacancyText)
        .replace(/{company}/g, companyText)
        .replace(/{context}/g, personalContextText)
        .replace(/{coverLetter}/g, coverLetterText)
        .replace(/{internalContext}/g, internalContextText);
    }
  
    return `
      Информация о вакансии: ${vacancyContext}
      Резюме: ${resumeText}
      Вакансия: ${vacancyText}
      Компания: ${companyText}
      Контекст: ${personalContextText}
      Сопроводительное письмо: ${coverLetterText}
      Внутренний контекст: ${internalContextText}
    `;
  }

  private async generateWithAI(promptText: string): Promise<string> {
    const config = this.configService.getConfig();
    
    if (!config.togetherApiKey) {
      throw new Error('Together API key not configured');
    }
  
    const prompt = `${this.promptConfig?.system_prompt}
  
  Задание: ${promptText}`;
  
    const request = {
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt: prompt,
      max_tokens: 4000,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1.1,
      stop: ['<|im_end|>', '<|im_start|>'],
      stream: false
    };
  
    try {
      const response = await this.http.post<any>('https://api.together.xyz/v1/completions', request, {
        headers: {
          'Authorization': `Bearer ${config.togetherApiKey}`,
          'Content-Type': 'application/json'
        }
      }).toPromise();
  
      if (!response.choices?.[0]?.text) {
        throw new Error('Invalid response from AI');
      }
  
      return this.cleanGeneratedText(response.choices[0].text);
    } catch (error) {
      console.error('AI generation error:', error);
      return this.createFallbackPlan();
    }
  }

  private cleanGeneratedText(text: string): string {
    if (!text) return this.createFallbackPlan();
    
    let cleaned = text
    return cleaned || this.createFallbackPlan();
  }

  private createFallbackPlan(): string {
    return `Генерация не произошла`;
  }

  downloadPlan(): void {
    const blob = new Blob([this.generatedPlan], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-prep-plan-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedPlan).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Текст скопирован в буфер'
      });
    });
  }

  // Новые методы для работы с селектором резюме
  onResumeSelected(resume: Resume): void {
    this.selectedResumeForInterview = resume;
    
    if (resume.platform === 'file' && resume.content) {
      // Автоматически заполняем поле резюме
      this.interviewForm.patchValue({
        customResume: resume.content
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Резюме загружено'
      });
    }
  }

  openResumeSelector(): void {
    this.showResumeSelector = true;
  }

  clearSelectedResume(): void {
    this.selectedResumeForInterview = null;
  }

  onVacancySelected(vacancy: any): void {
    this.selectedVacancyForInterview = vacancy;
    this.currentVacancy = vacancy;
    
    this.messageService.add({
      severity: 'success',
      summary: 'Вакансия выбрана для подготовки',
      detail: vacancy.name
    });
  }

  openVacancySelector(): void {
    this.showVacancySelector = true;
  }

  clearSelectedVacancy(): void {
    this.selectedVacancyForInterview = null;
    this.currentVacancy = null;
  }

  getPlatformLabel(platform: string): string {
    const labels: { [key: string]: string } = {
      'hh.ru': 'HH.ru',
      'superjob.ru': 'SuperJob',
      'file': 'Файл'
    };
    return labels[platform] || platform;
  }

  getSalaryText(vacancy: any): string {
    if (!vacancy.salary) return 'Не указана';
    const salary = vacancy.salary;
    let text = '';
    if (salary.from) text += `от ${salary.from} `;
    if (salary.to) text += `до ${salary.to} `;
    if (salary.currency) text += salary.currency;
    return text.trim();
  }

  async onFileSelect(event: any, field: string): Promise<void> {
    const file = event instanceof File ? event : (Array.isArray(event) ? event[0] : null);
    if (!file) return;
  
    try {
      let content = await this.fileProcessor.extractTextFromFile(file);
      
      if (field === 'resume' && (file.name.endsWith('.json') || file.name.endsWith('.yaml') || file.name.endsWith('.yml'))) {
        try {
          const profileData = await this.processStructuredResumeFile(content, file.type);
          content = this.profileService.exportToTxt(profileData);
        } catch (error) {
          console.warn('Failed to parse structured resume file, using raw content:', error);
        }
      }
      
      switch (field) {
        case 'resume':
          this.resumeFile = file;
          this.resumeContent = content;
          break;
        case 'vacancy':
          this.vacancyFile = file;
          this.vacancyContent = content;
          break;
        case 'company':
          this.companyFile = file;
          this.companyContent = content;
          break;
        case 'personalContext':
          this.personalContextFile = file;
          this.personalContextContent = content;
          break;
        case 'coverLetter':
          this.coverLetterFile = file;
          this.coverLetterContent = content;
          break;
        case 'internalContext':
          this.internalContextFile = file;
          this.internalContextContent = content;
          break;
      }
  
      this.messageService.add({
        severity: 'success',
        summary: 'Файл загружен',
        detail: `${file.name} успешно обработан`
      });
    } catch (error) {
      this.errorHandler.showError('Ошибка обработки файла', 'InterviewPrepComponent');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обработки файла'
      });
    }
  }
}