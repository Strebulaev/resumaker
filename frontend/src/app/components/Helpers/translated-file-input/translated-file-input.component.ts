import { Component, EventEmitter, Output, Input, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../shared/utils/language.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-translated-file-input',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './translated-file-input.component.html',
  styleUrls: ['./translated-file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TranslatedFileInputComponent),
      multi: true
    }
  ]
})
export class TranslatedFileInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() id: string = 'file-input-' + Math.random().toString(36).substr(2, 9);
  @Input() accept: string = '*';
  @Input() showFileTypes: boolean = false;
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() fieldName: string = '';
  
  // Раздельные события для лучшей типизации
  @Output() fileSelected = new EventEmitter<File>();
  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() fileCleared = new EventEmitter<void>();
  
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  private langSubscription!: Subscription;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

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
    const files: FileList = event.target.files;
    
    if (files.length === 0) return;

    if (this.multiple) {
      this.selectedFiles = Array.from(files);
      this.selectedFile = null;
      this.filesSelected.emit(this.selectedFiles);
      this.onChange(this.selectedFiles);
    } else {
      this.selectedFile = files[0];
      this.selectedFiles = [];
      this.fileSelected.emit(this.selectedFile);
      this.onChange(this.selectedFile);
    }
    
    this.onTouched();
    
    console.log(`File selected in ${this.fieldName}:`, 
      this.multiple ? this.selectedFiles.map(f => f.name) : this.selectedFile?.name);
  }

  clearFile() {
    this.selectedFile = null;
    this.selectedFiles = [];
    this.fileCleared.emit();
    this.onChange(null);
    
    const input = document.getElementById(this.id) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
    
    console.log(`File cleared in ${this.fieldName}`);
  }

  writeValue(value: any): void {
    if (value) {
      if (Array.isArray(value)) {
        this.selectedFiles = value;
      } else {
        this.selectedFile = value;
      }
    } else {
      this.selectedFile = null;
      this.selectedFiles = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
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

  getDisplayText(): string {
    if (this.multiple && this.selectedFiles.length > 0) {
      return `${this.selectedFiles.length} файлов выбрано`;
    } else if (this.selectedFile) {
      return `${this.selectedFile.name} (${this.getFileSize(this.selectedFile.size)})`;
    }
    return '';
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}