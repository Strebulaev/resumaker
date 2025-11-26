import { Component, inject, Inject, Injector, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MarkdownModule } from 'ngx-markdown';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { SupabaseService } from './shared/db/supabase.service';
import { AvatarModule } from 'primeng/avatar';
import { TranslateService, TranslatePipe } from "@ngx-translate/core";
import { TooltipModule } from 'primeng/tooltip';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { AppStateService } from './shared/state/app-state.service';
import { LanguageService } from './shared/utils/language.service';
import { SelectModule } from "primeng/select";
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'primeng/popover';
import { HostListener } from '@angular/core';
import { ErrorToastComponent } from "./components/Helpers/error-toast/error-toast.component";
import { ErrorHandlerService } from './shared/error-handler.service';
import { DialogModule } from "primeng/dialog";
import { AiConfigModalComponent } from "./components/Pages/ai-config-modal/ai-config-modal.component";
import { AIGuardService } from './shared/ai/ai-guard.service';
import { PersonalDataConsentComponent } from "./components/Pages/personal-data-consent/personal-data-consent.component";
import { CookiesConsentComponent } from "./components/Pages/cookies-consent/cookies-consent.component";
import { AnalyticsService } from './shared/analytics.service';
import { NotificationBellComponent } from './components/Notifications/notification-bell/notification-bell.component';
import { ConfigService } from './shared/config/config.service';
import { ProgressSpinnerModule } from "primeng/progressspinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    RouterModule,
    MarkdownModule,
    MenubarModule,
    ButtonModule,
    AvatarModule,
    TooltipModule,
    TranslatePipe,
    SelectModule,
    PopoverModule,
    AiConfigModalComponent,
    DialogModule,
    ErrorToastComponent,
    PersonalDataConsentComponent,
    CookiesConsentComponent,
    NotificationBellComponent,
    ProgressSpinnerModule
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  @ViewChild(ErrorToastComponent) errorToast!: ErrorToastComponent;
  private translate = inject(TranslateService);
  private appStateService = inject(AppStateService);
  protected title = 'resume';
  items: MenuItem[] = [];
  private languageService = inject(LanguageService);
  currentLang: string = 'en';
  availableLanguages: any[] = [];
  showLanguageDropdown: boolean = false;
  showAIConfigModal = false;
  currentAIProvider: string = 'Не настроен';
  private destroy$ = new Subject<void>();
  isLoading = true;

  constructor(
    public supabase: SupabaseService,
    private configService: ConfigService,
    private analyticsService: AnalyticsService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private errorHandler: ErrorHandlerService,
    public aiGuard: AIGuardService,
    private injector: Injector
  ) {
    this.setupNavigationHandling();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => {
      if (event instanceof NavigationError) {
        console.error('Navigation Error:', event.error);
        this.errorHandler.showError(`Ошибка навигации: ${event.error.message}`, 'Router');
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const languageSelector = document.querySelector('.language-selector');
    
    if (languageSelector && !languageSelector.contains(target)) {
      this.showLanguageDropdown = false;
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  ngOnInit(): void {
    this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    try {
      this.isLoading = true;
      
      // Инициализируем языки
      this.initializeLanguages();
      this.currentLang = this.translate.currentLang || this.languageService.getLanguage();
      
      // Загружаем конфиг и инициализируем Supabase
      const config = await this.configService.loadConfig();
      await this.supabase.initialize(config);

      // Подписываемся на события после инициализации
      this.setupSubscriptions();
      
      this.restoreAppState();
      
    } catch (error) {
      console.error('App initialization failed:', error);
      this.errorHandler.showError('Ошибка инициализации приложения', 'AppComponent');
    } finally {
      this.isLoading = false;
    }
  }

  private setupSubscriptions(): void {
    // Перенесите сюда все подписки из ngOnInit
    this.aiGuard.getCurrentProviderNameObservable().pipe(
      takeUntil(this.destroy$)
    ).subscribe(provider => {
      this.currentAIProvider = provider;
    });
    
    this.translate.onLangChange.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.items = this.buildMenu();
      this.currentLang = this.translate.currentLang;
    });
    
    this.supabase.initialized$.pipe(
      filter(initialized => initialized),
      take(1),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.items = this.buildMenu();
      this.restoreNavigation();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: NavigationEnd) => {
      this.analyticsService.trackPageView(
        this.getPageTitle(event.url),
        event.url
      );
    });
  }
  private getPageTitle(url: string): string {
    const routes: {[key: string]: string} = {
      '/': 'Главная',
      '/resume-generation': 'Генерация резюме',
      '/cover-letter/generate': 'Сопроводительное письмо',
      '/interview-prep': 'Подготовка к собеседованию',
      '/vacancy-search': 'Поиск вакансий',
      '/billing/pricing': 'Тарифы',
      '/profile/view': 'Профиль'
    };
    return routes[url] || 'Rezulution';
  }
  
  getAIStatusTooltip(): string {
    if (this.currentAIProvider === 'Не настроен') {
      return this.translate.instant('AI_CONFIG.NOT_CONFIGURED_TOOLTIP');
    }
    return this.translate.instant('AI_CONFIG.CURRENT_PROVIDER_TOOLTIP', { 
      provider: this.currentAIProvider 
    });
  }

  getAIIconColor(): string {
    return this.aiGuard.checkAIConfigured() ? 'var(--green-500)' : 'var(--red-500)';
  }

  // Остальные методы без изменений...
  private initializeLanguages(): void {
    this.availableLanguages = [
      {
        code: 'en',
        name: 'English',
        flag: 'pi pi-flag-fill',
        countryCode: 'US',
        countryName: 'United States',
        tooltip: 'EN - English'
      },
      {
        code: 'ru', 
        name: 'Русский',
        flag: 'pi pi-flag-fill',
        countryCode: 'RU',
        countryName: 'Russia',
        tooltip: 'RU - Русский'
      },
    ];
  }

  toggleLanguageDropdown(): void {
    this.showLanguageDropdown = !this.showLanguageDropdown;
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.languageService.setLanguage(lang);
    this.currentLang = lang;
    this.showLanguageDropdown = false;
  }

  getCurrentLanguage(): any {
    return this.availableLanguages.find(lang => lang.code === this.currentLang);
  }

  private setupNavigationHandling(): void {
    this.router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.saveAppState();
      }
    });
  }

  private saveAppState(): void {
    const state = {
      menuItems: this.items,
      user: this.supabase.currentUser ? {
        id: this.supabase.currentUser.id,
        email: this.supabase.currentUser.email
      } : null
    };
    
    this.appStateService.saveState(state);
  }

  private restoreAppState(): void {
    const savedState = this.appStateService.getState();
    if (savedState) {
      this.items = savedState.menuItems || [];
    }
  }

  private restoreNavigation(): void {
    const savedState = this.appStateService.getState();
    const lastUrl = this.appStateService.getLastUrl();
    
    if (this.supabase.currentUser && lastUrl && this.router.url === '/') {
      const allowedRoutes = [
        '/resume-generation',
        '/cover-letter',
        '/interview-prep', 
        '/vacancy-search',
        '/job-platforms',
        '/about',
        '/profile'
      ];
      
      if (lastUrl && allowedRoutes.some(route => lastUrl.startsWith(route))) {
        setTimeout(() => {
          this.router.navigateByUrl(lastUrl, { replaceUrl: true }).catch(error => {
            console.error('Failed to restore navigation:', error);
            this.router.navigate(['/profile/view']);
          });
        }, 100);
      }
    }
  }

  private buildMenu(): MenuItem[] {
    return [
      {
        label: this.translate.instant('MAIN_MENU.PROFILE.name'),
        items: [
          { 
            label: this.translate.instant('MAIN_MENU.PROFILE.VIEW'), 
            routerLink: '/profile/view'
          },
          { 
            label: this.translate.instant('MAIN_MENU.PROFILE.EDIT'), 
            routerLink: '/profile/edit'
          },
          {
            label: this.translate.instant('BILLING.MANAGE_SUBSCRIPTION'),
            routerLink: '/billing/subscription',
          }
        ]
      },
      {
        label: this.translate.instant('MAIN_MENU.RESUME.name'),
        items: [
          { 
            label: this.translate.instant('MAIN_MENU.RESUME.GENERATE_RESUME'), 
            routerLink: '/resume-generation'
          },
          { 
            label: this.translate.instant('MAIN_MENU.PROFILE.GENERATE_COVER_LETTER'), 
            routerLink: '/cover-letter/generate'
          }
        ]
      },
      {
        label: this.translate.instant('MAIN_MENU.JOB_PLATFORMS.name'),
        routerLink: '/auth/callback'
      },
      {
        label: this.translate.instant('MAIN_MENU.VACANCY_SEARCH.name'),
        routerLink: '/vacancy-search'
      },
      {
        label: this.translate.instant('MAIN_MENU.INTERVIEW.name'),
        routerLink: '/interview-prep'
      },
      {
        label: this.translate.instant('MAIN_MENU.ABOUT.name'),
        routerLink: '/about'
      },
      {
        label: this.translate.instant('BILLING.TARIFS'),
        routerLink: '/billing/pricing',
      },
      // {
      //   label: 'Избранное',
      //   icon: 'pi pi-heart',
      //   routerLink: '/vacancy-search',
      //   queryParams: { section: 'favorites' }
      // }
    ];
  }

  get userAvatar(): string {
    return this.supabase.currentUser?.user_metadata?.['avatar_url'] || 'default_avatar.jpg';
  }

  get userName(): string {
    return this.supabase.currentUser?.user_metadata?.['full_name'] || this.supabase.currentUser?.email || '';
  }
  
  async signOut() {
    this.appStateService.clearState();
    await this.supabase.signOut();
    this.items = [];
  }

  ngAfterViewInit() {
    console.log('Registering ErrorToastComponent...');
    this.errorHandler.registerErrorToast(this.errorToast);
  }
}