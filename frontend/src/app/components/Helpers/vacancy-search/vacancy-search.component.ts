import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { Tooltip } from 'primeng/tooltip';
import { CoverLetterService } from '../../../shared/cover-letter/cover-letter.service';
import { HHAuthService } from '../../../shared/job-platforms/hh/hh-auth.service';
import { SuperJobAuthService } from '../../../shared/job-platforms/super-job/superjob-auth.service';
import { Vacancy } from '../../../vacancy-schema';
import { ErrorToastComponent } from '../error-toast/error-toast.component';
import { ErrorHandlerService } from '../../../shared/error-handler.service';

interface FavoriteVacancy extends Vacancy {
  isFavorite: boolean;
  coverLetter?: string;
  isGeneratingLetter?: boolean;
  isSending?: boolean;
}

@Component({
  selector: 'app-vacancy-search',
  templateUrl: './vacancy-search.component.html',
  styleUrls: ['./vacancy-search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    Tooltip,
    FormsModule,
    InputTextModule,
    CardModule,
    ProgressSpinnerModule,
    DialogModule,
    TranslatePipe,
    SelectModule,
    MultiSelectModule,
    CheckboxModule
  ]
})
export class VacancySearchComponent implements OnInit {
  urlForm!: FormGroup;
  searchForm!: FormGroup;
  vacancies: FavoriteVacancy[] = [];
  favoriteVacancies: FavoriteVacancy[] = [];
  sortedVacancies: FavoriteVacancy[] = [];
  selectedVacancy: FavoriteVacancy | null = null;
  isLoading = false;
  showDetailsDialog = false;
  searchPerformed = false;
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 20;
  activeSection: 'search' | 'favorites' = 'search';
  isGeneratingAllLetters = false;
  selectedResume: any = null;
  userResumes: any[] = [];

  // Опции фильтров
  experienceOptions: any[] = [];
  employmentOptions: any[] = [];
  scheduleOptions: any[] = [];
  platformOptions: any[] = [];
  sortOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private superJobService: SuperJobAuthService,
    private hhAuthService: HHAuthService,
    private coverLetterService: CoverLetterService,
    private messageService: MessageService,
    private translate: TranslateService,
        private errorHandler: ErrorHandlerService
  ) {
    this.initializeForms();
    this.loadFavorites();
    this.loadUserResumes();
  }

  ngOnInit() {
    this.initializeOptions();
    
    this.searchForm.get('sortBy')?.valueChanges.subscribe(() => {
      this.sortVacancies();
    });

    this.translate.onLangChange.subscribe(() => {
      this.initializeOptions();
    });
  }

  private initializeOptions(): void {
    this.experienceOptions = [
      { label: this.translate.instant('FILTERS.EXPERIENCE.NO_EXPERIENCE'), value: 'noExperience' },
      { label: this.translate.instant('EXPERIENCE.LESS_1_YEAR'), value: 'less1Year' },
      { label: this.translate.instant('EXPERIENCE.1_3_YEARS'), value: 'between1And3' },
      { label: this.translate.instant('EXPERIENCE.3_6_YEARS'), value: 'between3And6' },
      { label: this.translate.instant('EXPERIENCE.MORE_6_YEARS'), value: 'moreThan6' }
    ];

    this.employmentOptions = [
      { label: this.translate.instant('EMPLOYMENT.FULL'), value: 'full' },
      { label: this.translate.instant('EMPLOYMENT.PART'), value: 'part' },
      { label: this.translate.instant('EMPLOYMENT.PROJECT'), value: 'project' },
      { label: this.translate.instant('EMPLOYMENT.VOLUNTEER'), value: 'volunteer' },
      { label: this.translate.instant('EMPLOYMENT.INTERNSHIP'), value: 'internship' }
    ];

    this.scheduleOptions = [
      { label: this.translate.instant('SCHEDULE.FULL_DAY'), value: 'fullDay' },
      { label: this.translate.instant('SCHEDULE.SHIFT'), value: 'shift' },
      { label: this.translate.instant('SCHEDULE.FLEXIBLE'), value: 'flexible' },
      { label: this.translate.instant('SCHEDULE.REMOTE'), value: 'remote' },
      { label: this.translate.instant('SCHEDULE.FLY_IN_FLY_OUT'), value: 'flyInFlyOut' }
    ];

    this.platformOptions = [
      { label: this.translate.instant('PLATFORM.HH'), value: 'hh' },
      { label: this.translate.instant('PLATFORM.SUPERJOB'), value: 'superjob' }
    ];

    this.sortOptions = [
      { label: this.translate.instant('SORT.RELEVANCE'), value: 'relevance' },
      { label: this.translate.instant('SORT.DATE_DESC'), value: 'date_desc' },
      { label: this.translate.instant('SORT.DATE_ASC'), value: 'date_asc' },
      { label: this.translate.instant('SORT.SALARY_DESC'), value: 'salary_desc' },
      { label: this.translate.instant('SORT.SALARY_ASC'), value: 'salary_asc' }
    ];
  }

  private initializeForms(): void {
    this.urlForm = this.fb.group({
      vacancyUrl: ['', [Validators.required]]
    });

    this.searchForm = this.fb.group({
      text: [''],
      salary: [''],
      area: [''],
      experience: [''],
      employment: [''],
      schedule: [''],
      platforms: [['hh', 'superjob']],
      only_with_salary: [false],
      remote: [false],
      sortBy: ['relevance']
    });
  }

  private loadUserResumes(): void {
    const hhToken = localStorage.getItem('hh_access_token');
    if (hhToken && this.hhAuthService.isTokenValid()) {
      this.hhAuthService.getUserResumes().then(resumes => {
        this.userResumes = resumes;
      }).catch(error => {
        console.error('Error loading resumes:', error);
      });
    }
  }

  // Загрузка избранных вакансий из localStorage
  private loadFavorites(): void {
    const favorites = localStorage.getItem('favorite_vacancies');
    if (favorites) {
      this.favoriteVacancies = JSON.parse(favorites);
    }
  }

  // Сохранение избранных вакансий в localStorage
  private saveFavorites(): void {
    localStorage.setItem('favorite_vacancies', JSON.stringify(this.favoriteVacancies));
  }

  // Добавление/удаление из избранного
  toggleFavorite(vacancy: FavoriteVacancy): void {
    const index = this.favoriteVacancies.findIndex(fav => fav.id === vacancy.id);
    
    if (index > -1) {
      // Удаляем из избранного
      this.favoriteVacancies.splice(index, 1);
      vacancy.isFavorite = false;
    } else {
      // Добавляем в избранное
      vacancy.isFavorite = true;
      const favoriteVacancy: FavoriteVacancy = {
        ...vacancy,
        isFavorite: true,
        isGeneratingLetter: false,
        isSending: false
      };
      this.favoriteVacancies.push(favoriteVacancy);
    }
    
    // Обновляем статус в основном списке
    const mainIndex = this.vacancies.findIndex(v => v.id === vacancy.id);
    if (mainIndex > -1) {
      this.vacancies[mainIndex].isFavorite = vacancy.isFavorite;
    }
    
    this.saveFavorites();
    
    this.messageService.add({
      severity: 'success',
      summary: vacancy.isFavorite ? 'Добавлено в избранное' : 'Удалено из избранного'
    });
  }

  // Переключение между секциями
  showSection(section: 'search' | 'favorites'): void {
    this.activeSection = section;
  }

  // Массовая генерация сопроводительных писем
  async generateAllCoverLetters(): Promise<void> {
    if (this.favoriteVacancies.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Нет избранных вакансий'
      });
      return;
    }

    if (!this.selectedResume) {
      this.messageService.add({
        severity: 'error',
        summary: 'Выберите резюме для отправки'
      });
      return;
    }

    this.isGeneratingAllLetters = true;

    try {
      for (const vacancy of this.favoriteVacancies) {
        if (!vacancy.coverLetter) {
          vacancy.isGeneratingLetter = true;
          
          try {
            const coverLetter = await this.generateCoverLetterForVacancy(vacancy);
            vacancy.coverLetter = coverLetter;
            
            this.messageService.add({
              severity: 'success',
              summary: `Письмо для "${vacancy.name}" сгенерировано`
            });
          } catch (error) {
            console.error(`Error generating letter for ${vacancy.name}:`, error);
            this.messageService.add({
              severity: 'error',
              summary: `Ошибка генерации для "${vacancy.name}"`
            });
          } finally {
            vacancy.isGeneratingLetter = false;
          }
        }
      }
      
      this.saveFavorites();
      
    } catch (error) {
      console.error('Error generating all letters:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка массовой генерации'
      });
    } finally {
      this.isGeneratingAllLetters = false;
    }
  }

  private generateCoverLetterForVacancy(vacancy: FavoriteVacancy): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = {
        resume_id: this.selectedResume?.id || '',
        vacancy_id: vacancy.id,
        style: 'formal',
        tone: 'professional',
        selected_resume: this.selectedResume
      };
  
      this.coverLetterService.generateCoverLetter(request).subscribe({
        next: (response) => {
          if (response.content && response.content.length > 10) {
            resolve(response.content);
          } else {
            reject(new Error('Сгенерированное письмо слишком короткое'));
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  // Генерация письма для отдельной вакансии
  async generateCoverLetterForSingle(vacancy: FavoriteVacancy): Promise<void> {
    if (!this.selectedResume) {
      this.messageService.add({
        severity: 'error',
        summary: 'Выберите резюме для отправки'
      });
      return;
    }

    vacancy.isGeneratingLetter = true;

    try {
      const coverLetter = await this.generateCoverLetterForVacancy(vacancy);
      vacancy.coverLetter = coverLetter;
      this.saveFavorites();
      
      this.messageService.add({
        severity: 'success',
        summary: `Письмо для "${vacancy.name}" сгенерировано`
      });
    } catch (error: any) {
      this.errorHandler.showError('Ошибка генерации письма', 'VacancySearchComponent');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка генерации письма',
        detail: error.message
      });
    } finally {
      vacancy.isGeneratingLetter = false;
    }
  }

  // Отправка письма на конкретную вакансию
  async sendCoverLetter(vacancy: FavoriteVacancy): Promise<void> {
    if (!vacancy.coverLetter) {
      this.messageService.add({
        severity: 'error',
        summary: 'Сначала сгенерируйте сопроводительное письмо'
      });
      return;
    }

    if (!this.selectedResume) {
      this.messageService.add({
        severity: 'error',
        summary: 'Выберите резюме для отправки'
      });
      return;
    }

    vacancy.isSending = true;

    try {
      const hhToken = localStorage.getItem('hh_access_token');
      if (!hhToken) {
        throw new Error('Требуется авторизация в HH.ru');
      }

      await this.coverLetterService.sendToHH(
        vacancy.coverLetter,
        vacancy.id,
        this.selectedResume.id,
        hhToken
      ).toPromise();

      this.messageService.add({
        severity: 'success',
        summary: `Отклик отправлен на вакансию "${vacancy.name}"`
      });

      // Удаляем из избранного после успешной отправки
      this.removeFromFavorites(vacancy);

    } catch (error: any) {
      this.errorHandler.showError('Ошибка отправки письма', 'VacancySearchComponent');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка отправки отклика',
        detail: error.message
      });
    } finally {
      vacancy.isSending = false;
    }
  }

  // Удаление из избранного
  removeFromFavorites(vacancy: FavoriteVacancy): void {
    const index = this.favoriteVacancies.findIndex(fav => fav.id === vacancy.id);
    if (index > -1) {
      this.favoriteVacancies.splice(index, 1);
      this.saveFavorites();
      
      // Обновляем статус в основном списке
      const mainIndex = this.vacancies.findIndex(v => v.id === vacancy.id);
      if (mainIndex > -1) {
        this.vacancies[mainIndex].isFavorite = false;
      }
    }
  }

  async searchVacancies(): Promise<void> {
    if (this.isLoading) return;
  
    this.isLoading = true;
    this.searchPerformed = true;
    this.vacancies = [];
    this.currentPage = 1;
  
    const params = this.searchForm.value;
    
    try {
      const searchPromises: Promise<Vacancy[]>[] = [];
  
      // HH.ru поиск
      if (params.platforms?.includes('hh')) {
        searchPromises.push(this.searchHHVacanciesDirectly(this.prepareHHParams(params)));
      }
  
      // SuperJob поиск
      if (params.platforms?.includes('superjob')) {
        searchPromises.push(this.searchSuperJobVacanciesDirectly(this.prepareSuperJobParams(params)));
      }
  
      const results = await Promise.all(
        searchPromises.map(p => p.catch(e => {
          console.error('Search error:', e);
          return [] as Vacancy[];
        }))
      );
      
      this.vacancies = results.flat().map(vacancy => {
        const isFavorite = this.favoriteVacancies.some(fav => fav.id === vacancy.id);
        return {
          ...vacancy,
          isFavorite: isFavorite,
          isGeneratingLetter: false,
          isSending: false
        } as FavoriteVacancy;
      });
      
      this.sortVacancies();
      this.calculatePagination();
  
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка поиска',
        detail: 'Попробуйте изменить параметры поиска'
      });
    } finally {
      this.isLoading = false;
    }
  }
  
  private prepareHHParams(params: any): any {
    const hhParams: any = {};
    
    if (params.text) hhParams.text = params.text;
    if (params.salary) hhParams.salary = params.salary;
    if (params.area) hhParams.area = params.area;
    if (params.experience) hhParams.experience = params.experience;
    if (params.employment) hhParams.employment = params.employment;
    if (params.schedule) hhParams.schedule = params.schedule;
    if (params.only_with_salary) hhParams.only_with_salary = true;
    
    return hhParams;
  }
  
  private prepareSuperJobParams(params: any): any {
    const sjParams: any = {};
    
    if (params.text) sjParams.keywords = params.text;
    if (params.salary) sjParams.payment_from = params.salary;
    if (params.area) sjParams.t = params.area; // town ID для SuperJob
    if (params.experience) {
      // Маппинг опыта для SuperJob
      const experienceMap: {[key: string]: number} = {
        'noExperience': 1,
        'between1And3': 2, 
        'between3And6': 3,
        'moreThan6': 4
      };
      sjParams.experience = experienceMap[params.experience];
    }
    
    return sjParams;
  }

  sortVacancies(): void {
    const sortBy = this.searchForm.get('sortBy')?.value || 'relevance';
    
    this.sortedVacancies = [...this.vacancies].sort((a, b) => {
      switch (sortBy) {
        case 'date_desc':
          return new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime();
        case 'date_asc':
          return new Date(a.published_at || '').getTime() - new Date(b.published_at || '').getTime();
        case 'salary_desc':
          return (b.salary?.from || 0) - (a.salary?.from || 0);
        case 'salary_asc':
          return (a.salary?.from || 0) - (b.salary?.from || 0);
        case 'relevance':
        default:
          return new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime();
      }
    });
  
    this.applyPagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.vacancies.length / this.itemsPerPage);
    this.applyPagination();
  }

  applyPagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.sortedVacancies = this.sortedVacancies.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  resetFilters(): void {
    this.searchForm.reset({
      text: '',
      salary: '',
      area: '',
      experience: '',
      employment: '',
      schedule: '',
      platforms: ['hh', 'superjob'],
      only_with_salary: false,
      remote: false,
      sortBy: 'relevance'
    });
    
    this.vacancies = [];
    this.searchPerformed = false;
  }

  showVacancyDetails(vacancy: FavoriteVacancy): void {
    this.selectedVacancy = vacancy;
    this.showDetailsDialog = true;
  }

  closeDetailsDialog(): void {
    this.showDetailsDialog = false;
    this.selectedVacancy = null;
  }

  // Вспомогательные методы для работы с вакансиями
  getVacancyPlatform(vacancy: Vacancy): string {
    if (vacancy.alternate_url?.includes('hh.ru')) return 'hh';
    if (vacancy.alternate_url?.includes('superjob.ru')) return 'superjob';
    return 'unknown';
  }

  getPlatformLabel(platform: string): string {
    return this.platformOptions.find(p => p.value === platform)?.label || platform;
  }

  getSalaryText(vacancy: Vacancy): string {
    if (!vacancy.salary) return this.translate.instant('SALARY.NOT_SPECIFIED');
    
    const salary = vacancy.salary;
    let text = '';
    
    if (salary.from) text += `${this.translate.instant('SALARY.FROM')} ${salary.from} `;
    if (salary.to) text += `${this.translate.instant('SALARY.TO')} ${salary.to} `;
    
    return text.trim();
  }

  cleanHtml(text: string): string {
    if (!text) return '';
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  }

  formatDescription(description: string = ''): string {
    return this.cleanHtml(description)
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  getAddressText(address: any): string {
    if (!address) return '';
    
    const parts = [address.city, address.street, address.building].filter(Boolean);
    return parts.join(', ');
  }

  private exportVacancyToText(vacancy: Vacancy, format: string): string {
    if (format === 'json') {
      return JSON.stringify(vacancy, null, 2);
    }
  
    let text = `=== ${this.translate.instant('EXPORT.VACANCY_INFO')} ===\n\n`;
    text += `${this.translate.instant('EXPORT.TITLE')}: ${vacancy.name}\n`;
    text += `${this.translate.instant('EXPORT.COMPANY')}: ${vacancy.employer?.name || this.translate.instant('EXPORT.NOT_SPECIFIED')}\n`;
    text += `${this.translate.instant('EXPORT.PLATFORM')}: ${this.getVacancyPlatform(vacancy)}\n\n`;
    
    if (vacancy.salary) {
      text += `=== ${this.translate.instant('EXPORT.SALARY')} ===\n`;
      text += `${this.getSalaryText(vacancy)} ${vacancy.salary.currency || ''}\n\n`;
    }
    
    if (vacancy.address) {
      text += `=== ${this.translate.instant('EXPORT.LOCATION')} ===\n`;
      text += `${this.getAddressText(vacancy.address)}\n\n`;
    }
    
    text += `=== ${this.translate.instant('EXPORT.DESCRIPTION')} ===\n`;
    text += `${this.cleanHtml(vacancy.description || '')}\n\n`;
    
    if (vacancy.key_skills?.length > 0) {
      text += `=== ${this.translate.instant('EXPORT.SKILLS')} ===\n`;
      text += `${vacancy.key_skills.map(s => s.name).join(', ')}\n\n`;
    }
    
    if (vacancy.experience) {
      text += `${this.translate.instant('EXPORT.EXPERIENCE')}: ${vacancy.experience.name}\n`;
    }
    
    if (vacancy.employment) {
      text += `${this.translate.instant('EXPORT.EMPLOYMENT')}: ${vacancy.employment.name}\n`;
    }
    
    if (vacancy.published_at) {
      text += `${this.translate.instant('EXPORT.PUBLISHED')}: ${this.formatDate(vacancy.published_at)}\n`;
    }
    
    if (vacancy.alternate_url) {
      text += `\n${this.translate.instant('EXPORT.ORIGINAL_LINK')}: ${vacancy.alternate_url}\n`;
    }
    
    return text;
  }
  
  exportVacancy(vacancy: Vacancy, format: 'txt' | 'json' = 'txt'): void {
    const content = this.exportVacancyToText(vacancy, format);
    const filename = `vacancy_${this.getVacancyPlatform(vacancy)}_${vacancy.id}`;
    
    this.downloadFile(content, filename, format);
  
    this.messageService.add({
      severity: 'success',
      summary: this.translate.instant('MESSAGE.EXPORT_SUCCESS')
    });
  }

  private downloadFile(content: string, filename: string, format: string): void {
    const blob = new Blob([content], { 
      type: format === 'json' ? 'application/json' : 'text/plain' 
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  async loadVacancyFromUrl(): Promise<void> {
    if (this.urlForm.invalid) return;

    const url = this.urlForm.get('vacancyUrl')?.value;
    this.isLoading = true;

    try {
      const platform = this.detectPlatformFromUrl(url);
      const vacancyId = this.extractVacancyId(url, platform);
      
      if (!vacancyId) {
        throw new Error('Не удалось извлечь ID вакансии из ссылки');
      }

      let vacancy: Vacancy;
      if (platform === 'hh') {
        vacancy = await this.getHHVacancyDirectly(vacancyId);
      } else {
        vacancy = await this.getSuperJobVacancyDirectly(vacancyId);
      }

      // Преобразуем в FavoriteVacancy
      const favoriteVacancy: FavoriteVacancy = {
        ...vacancy,
        isFavorite: this.favoriteVacancies.some(fav => fav.id === vacancy.id),
        isGeneratingLetter: false,
        isSending: false
      };

      this.selectedVacancy = favoriteVacancy;
      this.showDetailsDialog = true;
      this.messageService.add({
        severity: 'success',
        summary: this.translate.instant('MESSAGE.VACANCY_LOADED')
      });
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('MESSAGE.LOAD_ERROR'),
        detail: error.message
      });
    } finally {
      this.isLoading = false;
    }
  }

  private detectPlatformFromUrl(url: string): string {
    if (url.includes('hh.ru') || url.includes('hh.') || /\/vacancy\//.test(url)) {
      return 'hh';
    } else if (url.includes('superjob.ru')) {
      return 'superjob';
    }
    return 'hh';
  }

  private extractVacancyId(url: string, platform: string): string | null {
    if (platform === 'hh') {
      const patterns = [
        /\/vacancy\/(\d+)/,
        /vacancy=(\d+)/,
        /hh\.ru\/vacancy\/(\d+)/,
        /(\d{5,10})/
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
    } else if (platform === 'superjob') {
      const patterns = [
        /superjob\.ru\/vakansii\/(\d+)\.html/,
        /superjob\.ru\/vacancy\/(\d+)\.html/,
        /(\d+)\.html/
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
    }
    
    return null;
  }

  private async getHHVacancyDirectly(vacancyId: string): Promise<Vacancy> {
    try {
      const response = await fetch(`https://api.hh.ru/vacancies/${vacancyId}`, {
        headers: {
          'User-Agent': 'RezulutionApp/1.0',
          'HH-User-Agent': 'RezulutionApp/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        id: data.id,
        name: data.name,
        description: data.description || '',
        key_skills: data.key_skills?.map((skill: any) => ({ name: skill.name })) || [],
        employer: {
          name: data.employer?.name,
          logo_urls: { original: data.employer?.logo_urls?.original }
        },
        salary: data.salary ? {
          from: data.salary.from,
          to: data.salary.to,
          currency: data.salary.currency
        } : null,
        address: data.address ? {
          city: data.address.city,
          street: data.address.street,
          building: data.address.building
        } : null,
        alternate_url: data.alternate_url,
        published_at: data.published_at
      };
    } catch (error) {
      throw new Error(`Ошибка получения вакансии HH.ru: ${error}`);
    }
  }

  private async searchHHVacanciesDirectly(params: any): Promise<Vacancy[]> {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (key !== 'platform' && params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key].toString());
      }
    });
  
    try {
      const response = await fetch(`https://api.hh.ru/vacancies?${queryParams}`, {
        headers: {
          'User-Agent': 'RezulutionApp/1.0',
          'HH-User-Agent': 'RezulutionApp/1.0'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      return data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.snippet?.requirement || '',
        key_skills: item.key_skills?.map((skill: any) => ({ name: skill.name })) || [],
        employer: {
          name: item.employer?.name,
          logo_urls: { original: item.employer?.logo_urls?.original }
        },
        salary: item.salary ? {
          from: item.salary.from,
          to: item.salary.to,
          currency: item.salary.currency
        } : null,
        address: item.address ? {
          city: item.address.city,
          street: item.address.street,
          building: item.address.building
        } : null,
        alternate_url: item.alternate_url,
        published_at: item.published_at
      }));
    } catch (error) {
      throw new Error(`Ошибка поиска на HH.ru: ${error}`);
    }
  }

  private async searchSuperJobVacanciesDirectly(params: any): Promise<Vacancy[]> {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(params).forEach(key => {
        if (key !== 'platform' && params[key] !== undefined && params[key] !== null && params[key] !== '') {
          queryParams.append(key, params[key].toString());
        }
      });
  
      const url = `https://api.superjob.ru/2.0/vacancies/?${queryParams}`;
      
      const response = await fetch('/api/cors-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          headers: {
            'X-Api-App-Id': this.superJobService.clientSecret
          }
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      return data.objects.map((item: any) => ({
        id: item.id.toString(),
        name: item.profession,
        description: item.vacancyRichText || '',
        key_skills: item.catalogues?.map((c: any) => ({ name: c.title })) || [],
        employer: {
          name: item.firm_name,
          logo_urls: { original: '' }
        },
        salary: (item.payment_from || item.payment_to) ? {
          from: item.payment_from,
          to: item.payment_to,
          currency: item.currency || 'RUR'
        } : null,
        address: item.town ? { city: item.town.title } : null,
        alternate_url: item.link || `https://www.superjob.ru/vacancy/${item.id}.html`,
        published_at: item.date_published ? new Date(item.date_published * 1000).toISOString() : undefined
      }));
    } catch (error) {
      console.error('SuperJob search error:', error);
      throw new Error(`Ошибка поиска на SuperJob: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  private async getSuperJobVacancyDirectly(vacancyId: string): Promise<Vacancy> {
    try {
      const url = `https://api.superjob.ru/2.0/vacancies/${vacancyId}/`;
      
      const response = await fetch('/api/cors-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          headers: {
            'X-Api-App-Id': this.superJobService.clientSecret
          }
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      return {
        id: data.id.toString(),
        name: data.profession,
        description: data.vacancyRichText || '',
        key_skills: data.catalogues?.map((c: any) => ({ name: c.title })) || [],
        employer: {
          name: data.firm_name,
          logo_urls: { original: '' }
        },
        salary: (data.payment_from || data.payment_to) ? {
          from: data.payment_from,
          to: data.payment_to,
          currency: data.currency || 'RUR'
        } : null,
        address: data.town ? { city: data.town.title } : null,
        alternate_url: data.link || `https://www.superjob.ru/vacancy/${data.id}.html`,
        published_at: data.date_published ? new Date(data.date_published * 1000).toISOString() : undefined
      };
    } catch (error) {
      throw new Error(`Ошибка получения вакансии SuperJob: ${error}`);
    }
  }
}