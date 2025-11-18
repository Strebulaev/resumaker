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
    private superJobService: SuperJobAuthService,
    private messageService: MessageService,
    private translate: TranslateService
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
      if (this.hhAuthService.isTokenValid()) {
        this.hhResumes = await this.hhAuthService.getUserResumes();
      }

      if (this.superJobService.isTokenValid()) {
        this.superJobResumes = await this.superJobService.getUserResumes();
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

  formatDate(date: string | number): string {
    if (typeof date === 'number') {
      return new Date(date * 1000).toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  }

  openResumeInPlatform(resume: any, platform: 'hh' | 'superjob') {
    let url: string;
    
    if (platform === 'hh') {
      url = `https://hh.ru/resume/${resume.id}`;
    } else {
      url = `https://www.superjob.ru/resume/${resume.id}.html`;
    }
    
    window.open(url, '_blank');
  }
}