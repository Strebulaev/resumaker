import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { Vacancy } from '../../../vacancy-schema';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { VacancyService } from '../../../shared/vacancy/vacancy.service';
import { VacancySelectorComponent } from "../vacancy-selector/vacancy-selector.component";
import { FavoritesService } from '../../../shared/favorites/favorites.service';
import { ResumeGenerationService } from '../../../shared/resume/resume-generation.service';
import { FavoriteVacancyCardComponent } from "../favorite-vacancy-card/favorite-vacancy-card.component";
import { SuperJobAuthService } from '../../../shared/job-platforms/super-job/superjob-auth.service';
import { PlatformTokensService } from '../../../shared/platform-tokens.service';

interface FavoriteVacancy extends Vacancy {
  isFavorite: boolean;
  coverLetter?: string;
  isGeneratingLetter?: boolean;
  isSending?: boolean;
  platform?: string;
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
    CheckboxModule,
    VacancySelectorComponent,
    FavoriteVacancyCardComponent
  ]
})
export class VacancySearchComponent implements OnInit {
  @ViewChild('scrollTrigger') scrollTrigger!: ElementRef;
  isLoadingMore = false;
  hasMoreVacancies = true;
  private observer!: IntersectionObserver;
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

  experienceOptions: any[] = [];
  employmentOptions: any[] = [];
  scheduleOptions: any[] = [];
  platformOptions: any[] = [];
  sortOptions: any[] = [];
  showVacancySelector = false;

  constructor(
    private fb: FormBuilder,
    private superJobService: SuperJobAuthService,
    private hhAuthService: HHAuthService,
    private favoritesService: FavoritesService,
    private coverLetterService: CoverLetterService,
    private messageService: MessageService,
    private translate: TranslateService,
    private platformTokensService: PlatformTokensService,
    private errorHandler: ErrorHandlerService,
    private vacancyService: VacancyService,
    private resumeService: ResumeGenerationService,
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
    this.setupInfiniteScroll();
  }
  private setupInfiniteScroll(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && this.hasMoreVacancies && !this.isLoadingMore) {
          this.loadMoreVacancies();
        }
      });
    });
  
    // Начнем наблюдение после инициализации представления
    setTimeout(() => {
      if (this.scrollTrigger) {
        this.observer.observe(this.scrollTrigger.nativeElement);
      }
    }, 1000);
  }
  
  private async loadMoreVacancies(): Promise<void> {
    if (this.isLoadingMore || !this.hasMoreVacancies) return;
  
    this.isLoadingMore = true;
    this.currentPage++;
  
    try {
      const params = {
        ...this.searchForm.value,
        page: this.currentPage,
        per_page: this.itemsPerPage
      };
  
      const searchResults = await this.vacancyService.searchVacancies(params).toPromise();
      
      if (searchResults && searchResults.length > 0) {
        const newVacancies = searchResults.flatMap((result: { platform: string; results: any }) => {
          if (result.results && result.results.items) {
            return result.results.items.map((vacancy: any) => {
              const isFavorite = this.favoriteVacancies.some(fav => fav.id === vacancy.id);
              return {
                ...vacancy,
                platform: result.platform,
                isFavorite: isFavorite,
                isGeneratingLetter: false,
                isSending: false
              } as FavoriteVacancy;
            });
          }
          return [];
        });
  
        this.vacancies = [...this.vacancies, ...newVacancies];
        this.sortVacancies();
        
        // Проверяем, есть ли еще вакансии
        this.hasMoreVacancies = newVacancies.length === this.itemsPerPage;
      } else {
        this.hasMoreVacancies = false;
      }
    } catch (error) {
      console.error('Error loading more vacancies:', error);
      this.currentPage--; // Откатываем страницу при ошибке
    } finally {
      this.isLoadingMore = false;
    }
  }
  
  // Обновите метод searchVacancies
  async searchVacancies(): Promise<void> {
    if (this.isLoading) return;
  
    this.isLoading = true;
    this.searchPerformed = true;
    this.vacancies = [];
    this.currentPage = 1;
    this.hasMoreVacancies = true;
  
    const params = {
      ...this.searchForm.value,
      page: this.currentPage,
      per_page: this.itemsPerPage
    };
    
    try {
      const searchResults = await this.vacancyService.searchVacancies(params).toPromise();
      
      if (searchResults) {
        this.vacancies = searchResults.flatMap((result: { platform: string; results: any }) => {
          if (result.results && result.results.items) {
            return result.results.items.map((vacancy: any) => {
              const isFavorite = this.favoriteVacancies.some(fav => fav.id === vacancy.id);
              return {
                ...vacancy,
                platform: result.platform,
                isFavorite: isFavorite,
                isGeneratingLetter: false,
                isSending: false
              } as FavoriteVacancy;
            });
          }
          return [];
        });
        
        this.sortVacancies();
        this.hasMoreVacancies = this.vacancies.length === this.itemsPerPage;
      }
  
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
  
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
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

  private loadFavorites(): void {
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favoriteVacancies = favorites;
    });
  }

  toggleFavorite(vacancy: any): void {
    if (this.favoritesService.isFavorite(vacancy.id)) {
      this.favoritesService.removeFromFavorites(vacancy.id);
    } else {
      this.favoritesService.addToFavorites(vacancy);
    }
  }

  removeFromFavorites(vacancyId: string): void {
    this.favoritesService.removeFromFavorites(vacancyId);
  }

  async generateCoverLetterForFavorite(vacancyId: string): Promise<void> {
    const vacancy = this.favoritesService.getFavoriteById(vacancyId);
    if (!vacancy || !this.selectedResume) return;

    try {
      const request = {
        resume_id: this.selectedResume.id,
        vacancy_id: vacancy.id,
        style: 'formal',
        tone: 'professional',
        selected_resume: this.selectedResume
      };

      const response = await this.coverLetterService.generateCoverLetter(request).toPromise();
      
      // Обновляем через сервис
      await this.favoritesService.updateFavorite(vacancyId, {
        coverLetter: response.content,
        lastGenerated: new Date().toISOString()
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Сопроводительное письмо сгенерировано'
      });
    } catch (error) {
      this.errorHandler.showError('Ошибка генерации письма', 'VacancySearchComponent');
    }
  }

  async generateDevelopmentPlanForFavorite(vacancyId: string): Promise<void> {
    const vacancy = this.favoritesService.getFavoriteById(vacancyId);
    if (!vacancy) return;

    try {
      const developmentPlan = await this.generateDevelopmentPlan(vacancy);
      
      // Обновляем через сервис
      await this.favoritesService.updateFavorite(vacancyId, {
        developmentPlan: developmentPlan,
        lastGenerated: new Date().toISOString()
      });

      this.messageService.add({
        severity: 'success',
        summary: 'План развития сгенерирован'
      });
    } catch (error) {
      this.errorHandler.showError('Ошибка генерации плана развития', 'VacancySearchComponent');
    }
  }

  async generateResumeForFavorite(vacancyId: string): Promise<void> {
    const vacancy = this.favoritesService.getFavoriteById(vacancyId);
    if (!vacancy) return;
  
    try {
      // Устанавливаем текущую вакансию в сервисе для контекста генерации
      this.resumeService.setCurrentVacancy(vacancy);
      
      // Генерируем резюме с контекстом вакансии
      const resume = await this.resumeService.generateResume(vacancyId).toPromise();
      
      // Обновляем избранную вакансию через сервис с сгенерированным резюме
      await this.favoritesService.updateFavorite(vacancyId, {
        generatedResume: resume,
        lastGenerated: new Date().toISOString()
      });
  
      this.messageService.add({
        severity: 'success',
        summary: 'Резюме сгенерировано'
      });
    } catch (error) {
      this.errorHandler.showError('Ошибка генерации резюме', 'VacancySearchComponent');
    }
  }

  showSection(section: 'search' | 'favorites'): void {
    this.activeSection = section;
  }

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
            
            // Сохраняем в Supabase через сервис
            await this.favoritesService.updateFavorite(vacancy.id, {
              coverLetter: coverLetter,
              lastGenerated: new Date().toISOString()
            });

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
      
      // Сохраняем в Supabase через сервис
      await this.favoritesService.updateFavorite(vacancy.id, {
        coverLetter: coverLetter,
        lastGenerated: new Date().toISOString()
      });
      
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

  getSalaryText(vacancy: Vacancy): string {
    if (!vacancy.salary) return this.translate.instant('SALARY.NOT_SPECIFIED');
    
    const salary = vacancy.salary;
    let text = '';
    
    if (salary.from) text += `${this.translate.instant('SALARY.FROM')} ${salary.from} `;
    if (salary.to) text += `${this.translate.instant('SALARY.TO')} ${salary.to} `;
    
    return text.trim();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  }


  cleanHtml(text: string): string {
    if (!text) return '';
    
    const safeText = text || '';
    
    return safeText
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  formatDescription(description: string = ''): string {
    const safeDescription = description || '';
    const cleanDesc = this.cleanHtml(safeDescription);
    return cleanDesc
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
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
    // Безопасная проверка description
    const description = vacancy.description || '';
    const cleanDescription = this.cleanHtml(description);
    const truncatedDescription = cleanDescription.substring(0, 500);
    text += `${truncatedDescription}${cleanDescription.length > 500 ? '...' : ''}\n\n`;
    
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

  getAddressText(address: any): string {
    if (!address) return '';
    
    const parts = [address.city, address.street, address.building].filter(Boolean);
    return parts.join(', ');
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
      console.log('Loading vacancy from URL:', url);
      
      const vacancy = await this.vacancyService.getVacancyWithCache(url);
      
      console.log('Loaded vacancy:', vacancy);
      
      if (vacancy) {
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
          summary: 'Вакансия загружена',
          detail: `Платформа: ${vacancy.platform || 'Неизвестно'}`
        });
      }
    } catch (error: any) {
      console.error('Error loading vacancy:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка загрузки вакансии',
        detail: error.message
      });
    } finally {
      this.isLoading = false;
    }
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
      'superjob.ru': 'SuperJob',
      'hh': 'HH.ru', 
      'superjob': 'SuperJob'
    };
    return platformLabels[platform] || platform;
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

  onVacancySelected(vacancy: any): void {
    this.selectedVacancy = vacancy;
    this.showDetailsDialog = true;
    
    if (!vacancy.isFavorite) {
      this.toggleFavorite(vacancy);
    }
  }

  openVacancySelector(): void {
    this.showVacancySelector = true;
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

  private async generateDevelopmentPlan(vacancy: FavoriteVacancy): Promise<string> {
    return `
    # План профессионального развития
    ## Для вакансии: ${vacancy.name}

    ### 1. Технические навыки
    ${vacancy.key_skills?.map(skill => `- Изучить/улучшить: ${skill.name}`).join('\n') || 'Навыки не указаны'}

    ### 2. Проектная практика
    - Реализовать pet-проект с использованием требуемых технологий
    - Участвовать в open-source проектах

    ### 3. Подготовка к собеседованию
    - Изучить компанию: ${vacancy.employer?.name}
    - Подготовить ответы на типовые вопросы
    - Практиковать технические задачи
    `;
  }

  async generateAllContent(): Promise<void> {
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

    // Временно отключаем кнопку через локальную переменную
    const generateButton = document.querySelector('.generate-all-button') as HTMLButtonElement;
    if (generateButton) {
      generateButton.disabled = true;
    }

    try {
      for (const vacancy of this.favoriteVacancies) {
        await this.generateCoverLetterForFavorite(vacancy.id);
        // Добавьте задержку между запросами
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      this.messageService.add({
        severity: 'success',
        summary: 'Генерация завершена для всех вакансий'
      });
    } catch (error) {
      this.errorHandler.showError('Ошибка массовой генерации', 'VacancySearchComponent');
    } finally {
      if (generateButton) {
        generateButton.disabled = false;
      }
    }
  }

  async sendCoverLetter(vacancyId: string): Promise<void> {
    const vacancy = this.favoritesService.getFavoriteById(vacancyId);
    if (!vacancy?.coverLetter || !this.selectedResume) {
      this.messageService.add({
        severity: 'error',
        summary: 'Сначала сгенерируйте сопроводительное письмо'
      });
      return;
    }

    try {
      // Используем сервис токенов вместо localStorage
      const hhToken = await this.platformTokensService.getToken('hh');
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

      await this.favoritesService.removeFromFavorites(vacancy.id);
    } catch (error: any) {
      this.errorHandler.showError('Ошибка отправки письма', 'VacancySearchComponent');
    }
  }

  private loadUserResumes(): void {
    this.platformTokensService.getToken('hh').then(hhToken => {
      if (hhToken && this.hhAuthService.isTokenValid()) {
        this.hhAuthService.getUserResumes().then(resumes => {
          this.userResumes = resumes;
        }).catch(error => {
          console.error('Error loading resumes:', error);
        });
      }
    });
  }
}