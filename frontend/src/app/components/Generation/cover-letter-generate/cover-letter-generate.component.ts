import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { Subscription } from 'rxjs';
import { CoverLetterService } from '../../../shared/cover-letter/cover-letter.service';
import { SupabaseService } from '../../../shared/db/supabase.service';
import { HHAuthService } from '../../../shared/job-platforms/hh/hh-auth.service';
import { ProfileService } from '../../../shared/profile/profile.service';
import { VacancyService } from '../../../shared/vacancy/vacancy.service';
import { TranslatedFileInputComponent } from '../../Helpers/translated-file-input/translated-file-input.component';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { AIGuardService } from '../../../shared/ai/ai-guard.service';
import { AiConfigModalComponent } from "../../Pages/ai-config-modal/ai-config-modal.component";

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
    TranslatedFileInputComponent,
    AiConfigModalComponent
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
  onFileSelect(file: File): void {
    this.uploadedResumeFile = file;
    this.readResumeFile(file);
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

  generateCoverLetter(): void {
    const aiCheck = this.aiGuard.ensureAIConfigured();
    if (!aiCheck.configured) {
      this.errorHandler.showAIError(aiCheck.message || 'AI не настроен', 'ResumeGenerationComponent');
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
      resume_content: this.resumeContent
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
}