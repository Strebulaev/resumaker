import { Component, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../shared/utils/language.service';

@Component({
  selector: 'app-translated-file-input',
  imports: 
  [
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './translated-file-input.component.html',
  styleUrl: './translated-file-input.component.scss'
})

export class TranslatedFileInputComponent implements OnInit, OnDestroy {
  @Input() id: string = 'file-input';
  @Input() accept: string = '*';
  @Input() showFileTypes: boolean = false;
  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileCleared = new EventEmitter<void>();
  
  selectedFile: File | null = null;
  private langSubscription!: Subscription;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.langSubscription = this.languageService.languageChanges$.subscribe(() => {
      this.translate.use(this.languageService.getCurrentLanguage());
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileSelected.emit(file);
    }
  }

  clearFile() {
    this.selectedFile = null;
    this.fileCleared.emit();
    
    // Очищаем значение input
    const input = document.getElementById(this.id) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFormatsList(): string {
    if (!this.accept || this.accept === '*') {
      return this.translate.instant('FILE.ALL_FORMATS');
    }
    
    // Преобразуем accept string в читаемый список
    const formats = this.accept
      .split(',')
      .map(format => format.trim())
      .filter(format => format !== '')
      .map(format => {
        if (format.startsWith('.')) {
          return format.substring(1).toUpperCase();
        }
        return format;
      });
    
    return formats.join(', ');
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}