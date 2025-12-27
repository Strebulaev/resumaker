import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloudStorageService } from '../../shared/cloud-storage/cloud-storage.service';
import { CloudFile, StorageQuota, FileCategory, UploadRequest } from '../../shared/cloud-storage/cloud-storage.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-management.component.html',
  styleUrls: ['./document-management.component.scss']
})
export class DocumentManagementComponent implements OnInit {
  files: CloudFile[] = [];
  quota$: Observable<StorageQuota | null>;
  selectedCategory: FileCategory | 'all' = 'all';
  showUploadDialog = false;
  isDragOver = false;

  categories = [
    { value: 'all', label: 'Все файлы' },
    { value: FileCategory.RESUME, label: 'Резюме' },
    { value: FileCategory.COVER_LETTER, label: 'Сопроводительные письма' },
    { value: FileCategory.PORTFOLIO, label: 'Портфолио' },
    { value: FileCategory.CERTIFICATE, label: 'Сертификаты' },
    { value: FileCategory.PROJECT_DOC, label: 'Документы проектов' },
    { value: FileCategory.BACKUP, label: 'Резервные копии' }
  ];

  constructor(private cloudStorageService: CloudStorageService) {
    this.quota$ = this.cloudStorageService.quota$;
  }

  ngOnInit(): void {
    this.loadFiles();
    this.loadQuota();
  }

  async loadFiles(): Promise<void> {
    try {
      if (this.selectedCategory === 'all') {
        this.files = await this.cloudStorageService.getUserFiles();
      } else {
        this.files = await this.cloudStorageService.getUserFiles(this.selectedCategory as FileCategory);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    }
  }

  async loadQuota(): Promise<void> {
    try {
      const user = await this.getCurrentUser();
      if (user) {
        await this.cloudStorageService.getStorageQuota(user.id);
      }
    } catch (error) {
      console.error('Error loading quota:', error);
    }
  }

  onCategoryChange(): void {
    this.loadFiles();
  }

  onFileSelect(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.uploadFiles(files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.uploadFiles(files);
    }
  }

  async uploadFiles(fileList: FileList): Promise<void> {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      await this.uploadFile(file);
    }
    await this.loadFiles();
    await this.loadQuota();
  }

  private async uploadFile(file: File): Promise<void> {
    try {
      const category = this.determineCategory(file);
      const request: UploadRequest = {
        file,
        category,
        metadata: {
          description: `Uploaded ${file.name}`,
          language: 'ru'
        }
      };

      const result = await this.cloudStorageService.uploadFile(request);
      if (!result.success) {
        console.error('Upload failed:', result.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  private determineCategory(file: File): FileCategory {
    const name = file.name.toLowerCase();
    const type = file.type;

    if (name.includes('resume') || name.includes('cv') || type === 'application/pdf') {
      return FileCategory.RESUME;
    }
    if (name.includes('cover') || name.includes('letter')) {
      return FileCategory.COVER_LETTER;
    }
    if (name.includes('portfolio') || name.includes('project')) {
      return FileCategory.PORTFOLIO;
    }
    if (name.includes('cert') || name.includes('diploma')) {
      return FileCategory.CERTIFICATE;
    }
    if (name.includes('backup') || name.includes('.zip') || name.includes('.tar')) {
      return FileCategory.BACKUP;
    }

    return FileCategory.ATTACHMENT;
  }

  async downloadFile(file: CloudFile): Promise<void> {
    try {
      const blob = await this.cloudStorageService.downloadFile(file.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.originalName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  async deleteFile(file: CloudFile): Promise<void> {
    if (confirm(`Удалить файл "${file.name}"?`)) {
      try {
        await this.cloudStorageService.deleteFile(file.id);
        await this.loadFiles();
        await this.loadQuota();
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  }

  async createShareLink(file: CloudFile): Promise<void> {
    try {
      const shareLink = await this.cloudStorageService.createShareLink(file.id, {
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });

      const shareUrl = shareLink.url;
      await navigator.clipboard.writeText(shareUrl);
      alert('Ссылка скопирована в буфер обмена');
    } catch (error) {
      console.error('Error creating share link:', error);
    }
  }

  async createBackup(): Promise<void> {
    try {
      await this.cloudStorageService.backupData({
        id: this.generateId(),
        userId: await this.getCurrentUserId(),
        enabled: true,
        frequency: 'manual' as any,
        retention: 30,
        includeCategories: [FileCategory.RESUME, FileCategory.COVER_LETTER, FileCategory.PORTFOLIO],
        excludePatterns: [],
        destinations: [{ type: 'cloud' }]
      });

      await this.loadFiles();
      alert('Резервная копия создана');
    } catch (error) {
      console.error('Error creating backup:', error);
    }
  }

  getCategoryLabel(category: FileCategory): string {
    const categoryMap = {
      [FileCategory.RESUME]: 'Резюме',
      [FileCategory.COVER_LETTER]: 'Сопроводительное письмо',
      [FileCategory.PORTFOLIO]: 'Портфолио',
      [FileCategory.CERTIFICATE]: 'Сертификат',
      [FileCategory.PROJECT_DOC]: 'Документ проекта',
      [FileCategory.PROFILE_PIC]: 'Фото профиля',
      [FileCategory.ATTACHMENT]: 'Вложение',
      [FileCategory.BACKUP]: 'Резервная копия'
    };
    return categoryMap[category] || category;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('ru-RU');
  }

  getFileIcon(category: FileCategory): string {
    const icons = {
      [FileCategory.RESUME]: '📄',
      [FileCategory.COVER_LETTER]: '📧',
      [FileCategory.PORTFOLIO]: '🎨',
      [FileCategory.CERTIFICATE]: '🏆',
      [FileCategory.PROJECT_DOC]: '📁',
      [FileCategory.PROFILE_PIC]: '👤',
      [FileCategory.ATTACHMENT]: '📎',
      [FileCategory.BACKUP]: '💾'
    };
    return icons[category] || '📄';
  }

  private async getCurrentUser(): Promise<any> {
    return { id: 'current-user-id' };
  }

  private async getCurrentUserId(): Promise<string> {
    const user = await this.getCurrentUser();
    return user.id;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}