import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';
import { HHAuthService } from '../../../shared/job-platforms/hh/hh-auth.service';
import { SuperJobAuthService } from '../../../shared/job-platforms/super-job/superjob-auth.service';
import { FileProcessorService } from '../../../shared/utils/file-processor.service';

export interface Resume {
  id: string;
  title: string;
  platform: 'hh' | 'superjob' | 'file';
  skills?: string[];
  created?: string;
  updated?: string;
  file?: File;
  content?: string;
}

@Component({
  selector: 'app-resume-selector',
  templateUrl: './resume-selector.component.html',
  styleUrls: ['./resume-selector.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    ProgressSpinnerModule,
    TranslatePipe
  ]
})
export class ResumeSelectorComponent implements OnInit {
  @Input() showSelector = false;
  @Output() showSelectorChange = new EventEmitter<boolean>();
  @Output() resumeSelected = new EventEmitter<Resume>();

  resumes: Resume[] = [];
  isLoading = false;
  selectedResume: Resume | null = null;
  uploadedFile: File | null = null;

  constructor(
    private hhAuthService: HHAuthService,
    private superJobService: SuperJobAuthService,
    private fileProcessor: FileProcessorService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadResumes();
  }

  async loadResumes(): Promise<void> {
    this.isLoading = true;
    this.resumes = [];

    try {
      // Загружаем резюме с HH.ru
      if (this.hhAuthService.isTokenValid()) {
        try {
          const hhResumes = await this.hhAuthService.getUserResumes();
          const mappedHHResumes: Resume[] = hhResumes.map(resume => ({
            id: resume.id,
            title: resume.title,
            platform: 'hh' as const,
            skills: resume.skills ? [resume.skills] : [],
            created: resume.created,
            updated: resume.updated
          }));
          this.resumes.push(...mappedHHResumes);
        } catch (error) {
          console.error('Error loading HH.ru resumes:', error);
        }
      }

      // Загружаем резюме с SuperJob
      if (this.superJobService.isTokenValid()) {
        try {
          const superJobResumes = await this.superJobService.getUserResumes();
          const mappedSJResumes: Resume[] = superJobResumes.map(resume => ({
            id: resume.id.toString(),
            title: resume.title || resume.profession || 'Резюме SuperJob',
            platform: 'superjob' as const,
            skills: resume.skills ? [resume.skills] : [],
            created: resume.created ? new Date(resume.created * 1000).toISOString() : undefined,
            updated: resume.modified ? new Date(resume.modified * 1000).toISOString() : undefined
          }));
          this.resumes.push(...mappedSJResumes);
        } catch (error) {
          console.error('Error loading SuperJob resumes:', error);
        }
      }

    } catch (error) {
      console.error('Error loading resumes:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка загрузки резюме'
      });
    } finally {
      this.isLoading = false;
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    // Проверяем тип файла
    const allowedTypes = ['.txt', '.pdf', '.doc', '.docx', '.rtf'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Неподдерживаемый формат файла'
      });
      return;
    }

    this.uploadedFile = file;
    
    // Создаем объект резюме из файла
    const fileResume: Resume = {
      id: 'file-' + Date.now(),
      title: file.name,
      platform: 'file',
      file: file
    };

    this.resumes.push(fileResume);
    this.selectedResume = fileResume;

    this.messageService.add({
      severity: 'success',
      summary: 'Файл загружен'
    });
  }

  async selectResume(): Promise<void> {
    if (!this.selectedResume) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Выберите резюме'
      });
      return;
    }

    // Если выбран файл, читаем его содержимое
    if (this.selectedResume.platform === 'file' && this.selectedResume.file) {
      try {
        const content = await this.fileProcessor.extractTextFromFile(this.selectedResume.file);
        this.selectedResume.content = content;
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка чтения файла'
        });
        return;
      }
    }

    this.resumeSelected.emit(this.selectedResume);
    this.closeSelector();
  }

  closeSelector(): void {
    this.showSelector = false;
    this.showSelectorChange.emit(false);
    this.selectedResume = null;
    this.uploadedFile = null;
  }

  getPlatformLabel(platform: string): string {
    const labels: { [key: string]: string } = {
      'hh': 'HH.ru',
      'superjob': 'SuperJob',
      'file': 'Файл'
    };
    return labels[platform] || platform;
  }

  getPlatformIcon(platform: string): string {
    const icons: { [key: string]: string } = {
      'hh': 'pi pi-briefcase',
      'superjob': 'pi pi-briefcase',
      'file': 'pi pi-file'
    };
    return icons[platform] || 'pi pi-question-circle';
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Не указано';
    return new Date(dateString).toLocaleDateString('ru-RU');
  }
}