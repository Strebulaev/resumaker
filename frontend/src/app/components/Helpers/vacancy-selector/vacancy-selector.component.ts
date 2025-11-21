import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { VacancyService } from '../../../shared/vacancy/vacancy.service';
import { TranslatedFileInputComponent } from '../translated-file-input/translated-file-input.component';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { FileProcessorService } from '../../../shared/utils/file-processor.service';
import { Vacancy } from '../../../vacancy-schema';

// Убираем дублирующий интерфейс Vacancy и используем импортированный

@Component({
  selector: 'app-vacancy-selector',
  templateUrl: './vacancy-selector.component.html',
  styleUrls: ['./vacancy-selector.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TooltipModule,
    TranslatePipe,
    TranslatedFileInputComponent
  ]
})
export class VacancySelectorComponent implements OnInit {
  @Input() showSelector = false;
  @Output() showSelectorChange = new EventEmitter<boolean>();
  @Output() vacancySelected = new EventEmitter<Vacancy>();

  activeTab: 'link' | 'file' | 'favorites' = 'link';
  urlForm: FormGroup;
  isLoading = false;
  selectedFile: File | null = null;
  selectedVacancy: Vacancy | null = null;
  favoriteVacancies: Vacancy[] = [];
  recentUrls: string[] = [];

  constructor(
    private fb: FormBuilder,
    private vacancyService: VacancyService,
    private fileProcessor: FileProcessorService,
    private messageService: MessageService,
    private translate: TranslateService,
    private errorHandler: ErrorHandlerService
  ) {
    this.urlForm = this.fb.group({
      vacancyUrl: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadFavorites();
    this.loadRecentUrls();
  }

  // Загрузка избранных вакансий
  private loadFavorites(): void {
    const favorites = localStorage.getItem('favorite_vacancies');
    if (favorites) {
      try {
        this.favoriteVacancies = JSON.parse(favorites);
        // Нормализуем данные избранных вакансий
        this.favoriteVacancies = this.favoriteVacancies.map(vacancy => 
          this.normalizeVacancyData(vacancy)
        );
      } catch (error) {
        console.error('Error parsing favorite vacancies:', error);
        this.favoriteVacancies = [];
      }
    }
  }

  // Загрузка истории ссылок
  private loadRecentUrls(): void {
    const recent = localStorage.getItem('recent_vacancy_urls');
    if (recent) {
      try {
        this.recentUrls = JSON.parse(recent).slice(0, 5); // Последние 5 ссылок
      } catch (error) {
        console.error('Error parsing recent URLs:', error);
        this.recentUrls = [];
      }
    }
  }

  // Сохранение ссылки в историю
  private saveToRecentUrls(url: string): void {
    this.recentUrls = this.recentUrls.filter(u => u !== url); // Удаляем дубликаты
    this.recentUrls.unshift(url); // Добавляем в начало
    this.recentUrls = this.recentUrls.slice(0, 10); // Сохраняем только 10 последних
    
    localStorage.setItem('recent_vacancy_urls', JSON.stringify(this.recentUrls));
  }

  // Загрузка по ссылке
  async loadFromUrl(): Promise<void> {
    if (this.urlForm.invalid) return;

    const url = this.urlForm.get('vacancyUrl')?.value;
    this.isLoading = true;

    try {
      const vacancy = await this.vacancyService.getVacancyWithCache(url);
      
      if (vacancy) {
        this.selectedVacancy = vacancy;
        this.saveToRecentUrls(url);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Вакансия загружена',
          detail: `Платформа: ${vacancy.platform || 'Неизвестно'}`
        });
      }
    } catch (error: any) {
      this.errorHandler.showError('Ошибка загрузки вакансии', 'VacancySelectorComponent');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка загрузки вакансии',
        detail: error.message
      });
    } finally {
      this.isLoading = false;
    }
  }

  // Загрузка из истории
  loadFromRecentUrl(url: string): void {
    this.urlForm.patchValue({ vacancyUrl: url });
    this.loadFromUrl();
  }

  private createVacancyFromText(content: string, fileName: string): any {
    const lines = content.split('\n').filter(line => line.trim());
    
    return {
      id: `file-${Date.now()}`,
      name: fileName.replace(/\.[^/.]+$/, ""), // Убираем расширение файла
      description: content.substring(0, 500) + (content.length > 500 ? '...' : ''),
      employer: { name: 'Из файла' },
      platform: 'file'
    };
  }

  // Парсинг YAML (упрощенная версия)
  private parseYaml(content: string): any {
    // Простая реализация парсинга YAML для базовых случаев
    const lines = content.split('\n');
    const result: any = {};
    
    lines.forEach(line => {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (match) {
        const [, key, value] = match;
        result[key] = value.trim();
      }
    });
    
    return result;
  }

  // Нормализация данных вакансии для соответствия типу Vacancy
  private normalizeVacancyData(data: any): Vacancy {
    // Обрабатываем salary чтобы убрать null и лишние поля
    let normalizedSalary: any = undefined;
    if (data.salary && data.salary !== null) {
      normalizedSalary = {
        from: data.salary.from || undefined,
        to: data.salary.to || undefined,
        currency: data.salary.currency || undefined
      };
      // Убираем salary если все поля undefined
      if (!normalizedSalary.from && !normalizedSalary.to && !normalizedSalary.currency) {
        normalizedSalary = undefined;
      }
    }

    // Обрабатываем address
    let normalizedAddress: any = undefined;
    if (data.address && data.address !== null) {
      normalizedAddress = {
        city: data.address.city || undefined,
        street: data.address.street || undefined,
        building: data.address.building || undefined,
        lat: data.address.lat || undefined,
        lng: data.address.lng || undefined,
        description: data.address.description || undefined
      };
    }

    return {
      id: data.id || `vacancy-${Date.now()}`,
      name: data.name || data.title || data.profession || 'Вакансия из файла',
      description: data.description || data.vacancyRichText || '',
      key_skills: Array.isArray(data.key_skills) 
        ? data.key_skills.map((skill: any) => ({ 
            name: skill.name || skill || 'Не указано' 
          }))
        : [],
      employer: {
        id: data.employer?.id || undefined,
        name: data.employer?.name || data.firm_name || data.company || 'Не указано',
        url: data.employer?.url || undefined,
        logo_urls: data.employer?.logo_urls || undefined
      },
      salary: normalizedSalary,
      address: normalizedAddress,
      area: data.area || undefined,
      experience: data.experience || undefined,
      employment: data.employment || undefined,
      schedule: data.schedule || undefined,
      professional_roles: data.professional_roles || undefined,
      published_at: data.published_at || undefined,
      alternate_url: data.alternate_url || data.link || undefined,
      snippet: data.snippet || undefined,
      platform: data.platform || 'file'
    };
  }

  // Выбор из избранного
  selectFavoriteVacancy(vacancy: Vacancy): void {
    this.selectedVacancy = vacancy;
  }

  // Удаление из избранного
  removeFromFavorites(vacancy: Vacancy): void {
    this.favoriteVacancies = this.favoriteVacancies.filter(fav => fav.id !== vacancy.id);
    localStorage.setItem('favorite_vacancies', JSON.stringify(this.favoriteVacancies));
    
    if (this.selectedVacancy?.id === vacancy.id) {
      this.selectedVacancy = null;
    }
  }

  // Выбор вакансии
  selectVacancy(): void {
    if (this.selectedVacancy) {
      this.vacancySelected.emit(this.selectedVacancy);
      this.closeSelector();
    }
  }

  // Закрытие селектора
  closeSelector(): void {
    this.showSelector = false;
    this.showSelectorChange.emit(false);
    this.selectedVacancy = null;
    this.selectedFile = null;
    this.urlForm.reset();
    this.activeTab = 'link';
  }

  // Очистка файла
  clearFile(): void {
    this.selectedFile = null;
    this.selectedVacancy = null;
  }

  // Вспомогательные методы
  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getVacancyPlatform(vacancy: any): string {
    return this.vacancyService.getVacancyPlatform(vacancy);
  }

  getPlatformLabel(platform: string): string {
    return this.vacancyService.getPlatformLabel(platform);
  }

  getSalaryText(vacancy: any): string {
    if (!vacancy.salary) return 'Зарплата не указана';
    
    const salary = vacancy.salary;
    let text = '';
    
    if (salary.from) text += `от ${salary.from} `;
    if (salary.to) text += `до ${salary.to} `;
    if (salary.currency) text += salary.currency;
    
    return text.trim() || 'Зарплата не указана';
  }

  async onFileSelect(file: File | File[]): Promise<void> {
    // Обрабатываем как одиночный файл
    const selectedFile = file instanceof File ? file : (Array.isArray(file) ? file[0] : null);
    
    if (!selectedFile) return;
  
    this.selectedFile = selectedFile;
    
    try {
      const content = await this.fileProcessor.extractTextFromFile(selectedFile);
      
      // Пытаемся распарсить как структурированные данные
      let vacancyData: any;
      try {
        if (selectedFile.name.endsWith('.json')) {
          vacancyData = JSON.parse(content);
        } else if (selectedFile.name.endsWith('.yaml') || selectedFile.name.endsWith('.yml')) {
          // Для YAML потребуется дополнительная библиотека
          vacancyData = this.parseYaml(content);
        } else {
          // Для текстовых файлов создаем базовую структуру
          vacancyData = this.createVacancyFromText(content, selectedFile.name);
        }
      } catch (parseError) {
        // Если не удалось распарсить, создаем базовую структуру из текста
        vacancyData = this.createVacancyFromText(content, selectedFile.name);
      }
  
      this.selectedVacancy = this.normalizeVacancyData(vacancyData);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Файл вакансии загружен'
      });
    } catch (error) {
      this.errorHandler.showError('Ошибка обработки файла', 'VacancySelectorComponent');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обработки файла'
      });
    }
  }
}