import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { HHResume, HHAuthService } from '../../../shared/job-platforms/hh/hh-auth.service';
import { SuperJobResume, SuperJobAuthService } from '../../../shared/job-platforms/super-job/superjob-auth.service';

@Component({
  selector: 'app-resume-management',
  templateUrl: './resume-management.component.html',
  styleUrls: ['./resume-management.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    TagModule,
    TranslatePipe
  ]
})
export class ResumeManagementComponent implements OnInit {
  hhResumes: HHResume[] = [];
  superJobResumes: SuperJobResume[] = [];
  isLoading = false;
  activeTab: 'hh' | 'superjob' = 'hh';
  selectedResume: any = null;
  showDetailsDialog = false;

  constructor(
    private hhAuthService: HHAuthService,
    private messageService: MessageService,
    private translate: TranslateService,
    public superJobService: SuperJobAuthService,
  ) {}

  ngOnInit() {
    this.loadResumes();
  }
  closeDetailsDialog(): void {
    this.showDetailsDialog = false;
  }

  async loadResumes() {
    this.isLoading = true;
    try {
      // Загрузка резюме HH.ru
      if (this.hhAuthService.isTokenValid()) {
        try {
          this.hhResumes = await this.hhAuthService.getUserResumes();
          console.log('HH.ru resumes loaded:', this.hhResumes.length);
        } catch (error) {
          console.error('Error loading HH.ru resumes:', error);
          this.hhResumes = [];
        }
      }
  
      // Загрузка резюме SuperJob с улучшенной обработкой
      if (this.superJobService.isTokenValid()) {
        try {
          const superJobResumes = await this.superJobService.getUserResumes();
          
          // Дополнительная валидация данных SuperJob
          this.superJobResumes = superJobResumes.filter(resume => {
            const isValid = resume && 
                           resume.id && 
                           (resume.title || resume.profession) &&
                           typeof resume.status !== 'undefined';
            
            if (!isValid) {
              console.warn('Invalid SuperJob resume filtered out:', resume);
            }
            
            return isValid;
          });
          
          console.log('Valid SuperJob resumes:', this.superJobResumes.length);
          
          if (superJobResumes.length > 0 && this.superJobResumes.length === 0) {
            console.warn('All SuperJob resumes were filtered out. Raw data:', superJobResumes);
            this.messageService.add({
              severity: 'warn',
              summary: 'Нет доступных резюме в SuperJob',
              detail: 'Все полученные данные не являются резюме'
            });
          }
          
        } catch (error) {
          console.error('Error loading SuperJob resumes:', error);
          this.superJobResumes = [];
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка загрузки резюме SuperJob'
          });
        }
      }
    } catch (error) {
      console.error('Error loading resumes:', error);
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('ERROR.LOAD_RESUMES')
      });
    } finally {
      this.isLoading = false;
    }
  }

  testResumeLink(resume: any, platform: 'hh' | 'superjob'): void {
    let testUrl: string;
    
    if (platform === 'superjob') {
      testUrl = `https://www.superjob.ru/resume/${resume.id}.html`;
    } else {
      testUrl = `https://hh.ru/resume/${resume.id}`;
    }
    
    // Открываем в новом окне для проверки
    const testWindow = window.open(testUrl, '_blank');
    
    if (!testWindow) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Не удалось открыть ссылку',
        detail: 'Возможно, браузер блокирует всплывающие окна'
      });
    }
    
    // Логируем для отладки
    console.log('Testing resume link:', {
      platform,
      id: resume.id,
      url: testUrl,
      resumeData: resume
    });
  }

  openResumeInPlatform(resume: any, platform: 'hh' | 'superjob'): void {
    let url: string;
    
    if (platform === 'hh') {
      url = `https://hh.ru/resume/${resume.id}`;
    } else {
      url = `https://www.superjob.ru/resume/${resume.id}.html`;
    }
    
    console.log('Opening resume URL:', url);
    window.open(url, '_blank');
  }

  async deleteHHResume(resumeId: string) {
    if (!confirm(this.translate.instant('RESUME.DELETE_CONFIRM'))) {
      return;
    }

    try {
      await this.hhAuthService.deleteResume(resumeId);
      this.hhResumes = this.hhResumes.filter(r => r.id !== resumeId);
      this.messageService.add({
        severity: 'success',
        summary: this.translate.instant('RESUME.DELETE_SUCCESS')
      });
    } catch (error) {
      console.error('Error deleting HH resume:', error);
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('ERROR.DELETE_RESUME')
      });
    }
  }

  async deleteSuperJobResume(resumeId: number) {
    if (!confirm(this.translate.instant('RESUME.DELETE_CONFIRM'))) {
      return;
    }

    try {
      await this.superJobService.deleteResume(resumeId);
      this.superJobResumes = this.superJobResumes.filter(r => r.id !== resumeId);
      this.messageService.add({
        severity: 'success',
        summary: this.translate.instant('RESUME.DELETE_SUCCESS')
      });
    } catch (error) {
      console.error('Error deleting SuperJob resume:', error);
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('ERROR.DELETE_RESUME')
      });
    }
  }

  showResumeDetails(resume: any, platform: 'hh' | 'superjob') {
    this.selectedResume = { ...resume, platform };
    this.showDetailsDialog = true;
  }

  getResumeStatus(status: any): string {
    if (typeof status === 'object') {
      return status.name || 'Unknown';
    }
    return status === 1 ? 'Active' : 'Inactive';
  }

  getResumeStatusSeverity(status: any): string {
    if (typeof status === 'object') {
      return status.id === 'published' ? 'success' : 'warning';
    }
    return status === 1 ? 'success' : 'warning';
  }

  formatDate(date: string | number | null | undefined): string {
    if (!date) return 'Не указано';
    
    try {
      if (typeof date === 'number') {
        return new Date(date * 1000).toLocaleDateString('ru-RU');
      }
      
      if (typeof date === 'string') {
        return new Date(date).toLocaleDateString('ru-RU');
      }
      
      return 'Не указано';
    } catch (error) {
      console.warn('Date formatting error:', error, date);
      return 'Не указано';
    }
  }
}