import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { AIGuardService } from '../../../shared/ai/ai-guard.service';
import { CoverLetterService } from '../../../shared/cover-letter/cover-letter.service';
import { SupabaseService } from '../../../shared/db/supabase.service';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { HHAuthService } from '../../../shared/job-platforms/hh/hh-auth.service';
import { ProfileService } from '../../../shared/profile/profile.service';
import { VacancyService } from '../../../shared/vacancy/vacancy.service';
import { TranslatedFileInputComponent } from '../../Helpers/translated-file-input/translated-file-input.component';
import { ResumeSelectorComponent, Resume } from '../../Helpers/resume-selector/resume-selector.component';
import { AiConfigModalComponent } from "../../Pages/ai-config-modal/ai-config-modal.component";
import { VacancySelectorComponent } from "../../Helpers/vacancy-selector/vacancy-selector.component";

@Component({
  selector: 'app-cover-letter-generate',
  templateUrl: './cover-letter-generate.component.html',
  styleUrls: ['./cover-letter-generate.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    SelectModule,
    CardModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    TranslatePipe,
    DialogModule,
    TextareaModule,
    TooltipModule,
    ResumeSelectorComponent,
    AiConfigModalComponent,
    VacancySelectorComponent
],
  providers: [MessageService]
})
export class CoverLetterGenerateComponent implements OnInit {
  coverLetterForm: FormGroup;
  generatedLetter: any = null;
  isLoading = false;
  isSending = false;
  userProfile: any = null;
  showTemplateDialog = false;
  selectedTemplate: any = null;
  userResumes: any[] = [];
  selectedResume: any = null;
  uploadedResumeFile: File | null = null;
  resumeContent: string = '';
  vacancyUrl: string = '';
  currentVacancy: any = null;
  styleOptions: any[] = [];
  toneOptions: any[] = [];
  private langSubscription!: Subscription;
  showAIConfigModal = false;
  showResumeSelector = false;
  selectedResumeFromSelector: Resume | null = null;
  showVacancySelector = false;
  selectedVacancyFromSelector: any = null;

  constructor(
    private fb: FormBuilder,
    private coverLetterService: CoverLetterService,
    private supabase: SupabaseService,
    private profileService: ProfileService,
    private hhAuthService: HHAuthService,
    private messageService: MessageService,
    private vacancyService: VacancyService,
    private translate: TranslateService,
    public aiGuard: AIGuardService,
    private errorHandler: ErrorHandlerService
  ) {
    this.coverLetterForm = this.fb.group({
      resume_id: [''],
      vacancy_id: ['', Validators.required],
      style: ['formal'],
      tone: ['professional'],
      selected_resume: [null],
      resume_file: [null]
    });
  }
  
  private updateTranslatedOptions(): void {
    this.styleOptions = [
      { label: this.translate.instant('COVER_LETTER.STYLES.FORMAL'), value: 'formal' },
      { label: this.translate.instant('COVER_LETTER.STYLES.CREATIVE'), value: 'creative' },
      { label: this.translate.instant('COVER_LETTER.STYLES.TECHNICAL'), value: 'technical' }
    ];

    this.toneOptions = [
      { label: this.translate.instant('COVER_LETTER.TONES.PROFESSIONAL'), value: 'professional' },
      { label: this.translate.instant('COVER_LETTER.TONES.ENTHUSIASTIC'), value: 'enthusiastic' },
      { label: this.translate.instant('COVER_LETTER.TONES.CONSERVATIVE'), value: 'conservative' }
    ];
  }
  
  ngOnInit(): void {
    this.updateTranslatedOptions();
    this.loadUserProfile();
    this.loadUserResumes();
    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateTranslatedOptions();
    });
  }
  
  closeTemplateDialog(): void {
    this.showTemplateDialog = false;
  }
  
  async loadVacancyForLetter(): Promise<void> {
      if (!this.vacancyUrl) return;
      
      this.isLoading = true;
      try {
        this.currentVacancy = await this.vacancyService.getVacancyWithCache(this.vacancyUrl);
        
        // Автозаполнение поля vacancy_id
        if (this.currentVacancy) {
          this.coverLetterForm.patchValue({
            vacancy_id: this.currentVacancy.id
          });
        }
      } catch (error) {
        this.errorHandler.showError('Ошибка загрузки вакансии', 'CoverLetterGenerateComponent');
      } finally {
        this.isLoading = false;
      }
  }
  
  async loadVacancyInfo(): Promise<void> {
    if (!this.vacancyUrl) return;
    
    this.isLoading = true;
    try {
      // ПРЯМОЙ ВЫЗОВ БЕЗ API ENDPOINTS
      this.currentVacancy = await this.vacancyService.getVacancyWithCache(this.vacancyUrl);
      
      if (this.currentVacancy) {
        this.coverLetterForm.patchValue({
          vacancy_id: this.currentVacancy.id
        });
        
        this.messageService.add({
          severity: 'success',
          summary: 'Информация о вакансии загружена'
        });
      }
    } catch (error: any) {
      this.errorHandler.showError('Ошибка загрузки вакансии', 'CoverLetterGenerateComponent');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка загрузки вакансии',
        detail: error.message
      });
    } finally {
      this.isLoading = false;
    }
  }

  onFileClear(): void {
    this.uploadedResumeFile = null;
    this.resumeContent = '';
  }
  
  private loadUserResumes(): void {
    const hhToken = localStorage.getItem('hh_access_token');
    if (hhToken && this.hhAuthService.isTokenValid()) {
      this.hhAuthService.getUserResumes().then(resumes => {
        this.userResumes = resumes;
      }).catch(error => {
        console.error('Error loading resumes:', error);
        this.messageService.add({
          severity: 'warn',
          summary: 'Не удалось загрузить резюме из HH.ru'
        });
      });
    }
  }
  
  sendToHH(): void {
    if (!this.generatedLetter || !this.userProfile) {
      return;
    }
  
    this.isSending = true;
    const vacancyId = this.coverLetterForm.get('vacancy_id')?.value;
    const resumeId = this.coverLetterForm.get('resume_id')?.value;
    const hhToken = localStorage.getItem('hh_access_token');
  
    if (!hhToken) {
      this.messageService.add({
        severity: 'error',
        summary: 'Требуется авторизация в HH.ru'
      });
      this.isSending = false;
      return;
    }
  
    this.coverLetterService.sendToHH(
      this.generatedLetter.content,
      vacancyId,
      resumeId,
      hhToken
    ).subscribe({
      next: () => {
        this.isSending = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Письмо отправлено на HH.ru!'
        });
      },
      error: (error: Error) => {
        console.error('Error sending to HH:', error);
        this.isSending = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка отправки на HH.ru',
          detail: error.message
        });
      }
    });
  }
  
  private loadUserProfile(): void {
    this.profileService.loadProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        if (profile) {
          this.coverLetterForm.patchValue({
            resume_id: this.supabase.currentUser?.id || ''
          });
        }
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка загрузки профиля'
        });
      }
    });
  }

  getVacancyPlatform(vacancy: any): string {
    if (vacancy.platform) {
      return vacancy.platform;
    }
    if (vacancy.alternate_url?.includes('hh.ru')) return 'hh.ru';
    if (vacancy.alternate_url?.includes('superjob.ru')) return 'superjob.ru';
    return 'unknown';
  }
  
  getPlatformLabel(platform: string): string {
    const platformLabels: { [key: string]: string } = {
      'hh.ru': 'HH.ru',
      'superjob.ru': 'SuperJob'
    };
    return platformLabels[platform] || platform;
  }

  editLetter(): void {
    this.showTemplateDialog = true;
  }

  saveAsTemplate(): void {
    if (!this.generatedLetter) {
      return;
    }

    const template = {
      id: 'template-' + Date.now(),
      name: `Шаблон от ${new Date().toLocaleDateString()}`,
      content: this.generatedLetter.content,
      is_default: false
    };

    this.coverLetterService.saveTemplate(template).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Шаблон сохранен!'
        });
        this.showTemplateDialog = false;
      },
      error: (error: Error) => {
        console.error('Error saving template:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка сохранения шаблона'
        });
      }
    });
  }

  copyToClipboard(): void {
    if (!this.generatedLetter) {
      return;
    }

    navigator.clipboard.writeText(this.generatedLetter.content).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Текст скопирован в буфер обмена!'
      });
    }).catch((err: Error) => {
      console.error('Failed to copy:', err);
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка копирования'
      });
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.coverLetterForm.controls).forEach(key => {
      const control = this.coverLetterForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getStyleLabel(value: string): string {
    const option = this.styleOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  getToneLabel(value: string): string {
    const option = this.toneOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  }
  
  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  // Новые методы для работы с селектором резюме
  onResumeSelected(resume: Resume): void {
    this.selectedResumeFromSelector = resume;
    
    if (resume.platform === 'file' && resume.content) {
      // Используем содержимое файла
      this.resumeContent = resume.content;
      this.messageService.add({
        severity: 'success',
        summary: 'Резюме загружено из файла'
      });
    } else if (resume.platform === 'hh' || resume.platform === 'superjob') {
      // Устанавливаем выбранное резюме с платформы
      this.selectedResume = resume;
      this.coverLetterForm.patchValue({
        selected_resume: resume
      });
    }
  }

  openResumeSelector(): void {
    this.showResumeSelector = true;
  }

  onVacancySelected(vacancy: any): void {
    this.selectedVacancyFromSelector = vacancy;
    
    // Автозаполнение поля vacancy_id
    if (vacancy.id) {
      this.coverLetterForm.patchValue({
        vacancy_id: vacancy.id
      });
    }
    
    // Сохраняем текущую вакансию для использования в генерации
    this.currentVacancy = vacancy;
    
    this.messageService.add({
      severity: 'success',
      summary: 'Вакансия выбрана',
      detail: `${vacancy.name} - ${vacancy.employer?.name}`
    });
  }

  openVacancySelector(): void {
    this.showVacancySelector = true;
  }

  clearSelectedVacancy(): void {
    this.selectedVacancyFromSelector = null;
    this.currentVacancy = null;
    this.coverLetterForm.patchValue({
      vacancy_id: ''
    });
  }

  getPlatformIcon(platform: string): string {
    const icons: { [key: string]: string } = {
      'hh.ru': 'pi pi-briefcase',
      'superjob.ru': 'pi pi-briefcase', 
      'file': 'pi pi-file'
    };
    return icons[platform] || 'pi pi-question-circle';
  }

  getPlatformLabelForSelector(platform: string): string {
    const labels: { [key: string]: string } = {
      'hh.ru': 'HH.ru',
      'superjob.ru': 'SuperJob',
      'file': 'Файл'
    };
    return labels[platform] || platform;
  }

  generateCoverLetter(): void {
    const aiCheck = this.aiGuard.ensureAIConfigured();
    if (!aiCheck.configured) {
      this.errorHandler.showAIError(aiCheck.message || 'AI не настроен', 'CoverLetterGenerateComponent');
      this.showAIConfigModal = true;
      return;
    }
    
    if (this.coverLetterForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.generatedLetter = null;

    const request = {
      ...this.coverLetterForm.value,
      selected_resume: this.selectedResume,
      resume_content: this.resumeContent,
      vacancy_data: this.currentVacancy || null
    };

    console.log('🚀 Starting letter generation for vacancy:', this.coverLetterForm.get('vacancy_id')?.value);

    this.coverLetterService.generateCoverLetter(request).subscribe({
      next: (response) => {
        console.log('✅ Letter generated successfully');
        this.generatedLetter = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorHandler.showError('Ошибка генерации письма', 'CoverLetterGenerateComponent');
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка генерации',
          detail: error.message
        });
      }
    });
  }
  onFileSelect(file: File | File[]): void {
    // Обрабатываем как одиночный файл
    if (file instanceof File) {
      this.uploadedResumeFile = file;
      this.readResumeFile(file);
    } else if (Array.isArray(file) && file.length > 0) {
      // Берем первый файл из массива
      this.uploadedResumeFile = file[0];
      this.readResumeFile(file[0]);
    }
  }
  
  // Обновим метод для работы с новым типом
  private readResumeFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.resumeContent = e.target?.result as string;
      this.messageService.add({
        severity: 'success',
        summary: 'Файл резюме загружен'
      });
    };
    reader.readAsText(file);
  }
}