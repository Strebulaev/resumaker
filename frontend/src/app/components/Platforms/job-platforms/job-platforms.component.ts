import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TranslatePipe } from '@ngx-translate/core';
import { HabrAuthService } from '../../../shared/job-platforms/habr/habr-auth.service';
import { HHAuthService } from '../../../shared/job-platforms/hh/hh-auth.service';
import { SuperJobAuthService } from '../../../shared/job-platforms/super-job/superjob-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-platforms',
  templateUrl: './job-platforms.component.html',
  styleUrls: ['./job-platforms.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    TranslatePipe
  ]
})
export class JobPlatformsComponent implements OnInit, OnDestroy {
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isHHConnected = false;
  isSuperJobConnected = false;
  isHabrConnected = false;
  
  private queryParamsSubscription: Subscription | null = null;
  private isProcessingCallback = false;

  constructor(
    private hhAuthService: HHAuthService,
    private superJobAuthService: SuperJobAuthService,
    private habrAuthService: HabrAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initializeComponent();
  }

  ngOnDestroy() {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  private async initializeComponent(): Promise<void> {
    try {
      this.isLoading = true;
      
      // Сначала инициализируем платформы
      await this.initializePlatforms();
      
      // Затем подписываемся на параметры
      this.setupQueryParamsListener();
      
      // Проверяем статус подключения
      this.checkConnectionStatus();
      
      // Очищаем старые состояния
      this.cleanupOldStates();
      
    } catch (error) {
      console.error('Component initialization error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private setupQueryParamsListener(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      // Проверяем, что это callback и мы еще не обрабатываем его
      if (params['code'] && !this.isProcessingCallback) {
        this.isProcessingCallback = true;
        
        const platform = params['state']?.split('_')[0];
        console.log('Processing OAuth callback for platform:', platform);
        
        if (platform === 'superjob') {
          this.handleSuperJobCallback(params['code'], params['state']);
        } else if (platform === 'habr') {
          this.handleHabrCallback(params['code'], params['state']);
        } else if (platform === 'hh') {
          this.handleHHCallback(params['code'], params['state']);
        } else {
          console.warn('Unknown platform in callback:', platform);
          this.isProcessingCallback = false;
        }
      }
    });
  }
  
  private async initializePlatforms(): Promise<void> {
    try {
      // Инициализируем все сервисы параллельно
      await Promise.allSettled([
        this.hhAuthService.initializeConfig(),
        this.superJobAuthService.initializeConfig(),
        this.habrAuthService.initializeConfig()
      ]);
      
      console.log('Platform services initialized');
    } catch (error) {
      console.error('Failed to initialize platform services:', error);
      throw error;
    }
  }
  
  private cleanupOldStates(): void {
    // Очищаем состояния, которым больше 1 часа
    const states = ['superjob_oauth_state', 'hh_oauth_state', 'habr_oauth_state'];
    const oneHourAgo = Date.now() - 3600000;
    
    states.forEach(key => {
      const state = localStorage.getItem(key);
      if (state) {
        const timestamp = state.split('_').pop();
        if (timestamp && parseInt(timestamp) < oneHourAgo) {
          localStorage.removeItem(key);
          sessionStorage.removeItem(key);
        }
      }
    });
  }
  
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15) +
           '_' + Date.now();
  }

  checkConnectionStatus(): void {
    this.isHHConnected = this.hhAuthService.isTokenValid();
    this.isSuperJobConnected = this.superJobAuthService.isTokenValid();
    this.isHabrConnected = this.habrAuthService.isTokenValid();
    
    console.log('Connection status:', {
      hh: this.isHHConnected,
      superjob: this.isSuperJobConnected,
      habr: this.isHabrConnected
    });
  }

  closeMessage(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  async connectToHH(): Promise<void> {
    try {
      await this.initiateAuth(this.hhAuthService, 'hh');
    } catch (error: any) {
      console.error('HH.ru connection error:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка подключения к HH.ru',
        detail: error.message
      });
    }
  }
  
  async connectToHabr(): Promise<void> {
    try {
      await this.initiateAuth(this.habrAuthService, 'habr');
    } catch (error: any) {
      console.error('Habr connection error:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка подключения к Habr Career',
        detail: error.message
      });
    }
  }

  async connectToSuperJob(): Promise<void> {
    try {
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;
      
      await this.superJobAuthService.waitForConfig();
      
      if (!this.superJobAuthService.clientId || !this.superJobAuthService.clientSecret) {
        throw new Error('Конфигурация SuperJob не настроена');
      }
      
      const state = `superjob_${this.generateState()}`;
      
      // Сохраняем в sessionStorage и localStorage
      sessionStorage.setItem('superjob_oauth_state', state);
      localStorage.setItem('superjob_oauth_state', state);
      
      console.log('Initiating SuperJob auth with state:', state);
      
      const authUrl = this.superJobAuthService.getAuthUrl(state);
      console.log('Redirecting to:', authUrl);
      
      window.location.href = authUrl;
      
    } catch (error: any) {
      console.error('SuperJob connection error:', error);
      this.isLoading = false;
      this.errorMessage = error.message;
      
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка подключения к SuperJob',
        detail: error.message
      });
    }
  }

  private async initiateAuth(authService: any, platform: string): Promise<void> {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;
    
    try {
      await authService.initializeConfig();
      
      const state = `${platform}_${this.generateState()}`;
      const authUrl = authService.getAuthUrl(state);
      
      // Сохраняем состояние
      localStorage.setItem(`${platform}_oauth_state`, state);
      
      console.log(`Initiating ${platform} OAuth with state:`, state);
      console.log('Redirecting to:', authUrl);
      
      window.location.href = authUrl;
      
    } catch (error: any) {
      this.isLoading = false;
      console.error(`${platform} OAuth init error:`, error);
      throw error;
    }
  }

  private async handleHHCallback(code: string, state: string | null): Promise<void> {
    await this.handleAuthCallback(code, state, 'hh', this.hhAuthService);
  }

  private async handleSuperJobCallback(code: string, state: string | null): Promise<void> {
    try {
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;
      
      // Получаем сохраненное состояние из sessionStorage или localStorage
      let savedState = sessionStorage.getItem('superjob_oauth_state');
      if (!savedState) {
        savedState = localStorage.getItem('superjob_oauth_state');
      }
      
      console.log('SuperJob callback state verification:', { 
        receivedState: state, 
        savedState: savedState 
      });
      
      if (!state || state !== savedState) {
        throw new Error('Неверный параметр state. Возможно, сессия устарела.');
      }
  
      // Обмениваем код на токен
      await this.superJobAuthService.exchangeCodeForToken(code);
      
      this.successMessage = 'Успешное подключение к SuperJob!';
      this.checkConnectionStatus();
      
      // Очищаем состояние
      sessionStorage.removeItem('superjob_oauth_state');
      localStorage.removeItem('superjob_oauth_state');
      
      // Очищаем URL
      this.router.navigate(['/job-platforms'], { 
        replaceUrl: true 
      });
  
      this.messageService.add({
        severity: 'success',
        summary: 'Успешное подключение',
        detail: 'Аккаунт SuperJob успешно подключен'
      });
  
    } catch (error: any) {
      console.error('SuperJob Auth error:', error);
      this.errorMessage = error.message || 'Ошибка подключения к SuperJob';
      
      // Всегда очищаем состояние при ошибке
      sessionStorage.removeItem('superjob_oauth_state');
      localStorage.removeItem('superjob_oauth_state');
      
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка подключения',
        detail: error.message || 'Не удалось подключиться к SuperJob'
      });
    } finally {
      this.isLoading = false;
      this.isProcessingCallback = false;
    }
  }

  private async handleHabrCallback(code: string, state: string | null): Promise<void> {
    await this.handleAuthCallback(code, state, 'habr', this.habrAuthService);
  }

  private async handleAuthCallback(code: string, state: string | null, platform: string, authService: any): Promise<void> {
    try {
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;
      
      const savedState = localStorage.getItem(`${platform}_oauth_state`);
      
      console.log(`${platform} callback state verification:`, { 
        receivedState: state, 
        savedState: savedState 
      });
      
      if (!state || state !== savedState) {
        throw new Error('Неверный параметр state. Возможно, сессия устарела.');
      }

      // Обмениваем код на токен
      await authService.exchangeCodeForToken(code);
      
      this.successMessage = `Успешное подключение к ${platform.toUpperCase()}!`;
      this.checkConnectionStatus();
      
      // Очищаем URL
      this.router.navigate(['/job-platforms'], { 
        replaceUrl: true 
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Успешное подключение',
        detail: `Аккаунт ${platform.toUpperCase()} успешно подключен`
      });

    } catch (error: any) {
      console.error(`${platform} Auth error:`, error);
      this.errorMessage = error.message || `Ошибка подключения к ${platform.toUpperCase()}`;
      
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка подключения',
        detail: error.message || `Не удалось подключиться к ${platform.toUpperCase()}`
      });
    } finally {
      this.isLoading = false;
      localStorage.removeItem(`${platform}_oauth_state`);
      this.isProcessingCallback = false;
    }
  }

  disconnectFromHH(): void {
    this.disconnectPlatform(this.hhAuthService, 'HH.ru');
  }

  disconnectFromSuperJob(): void {
    this.disconnectPlatform(this.superJobAuthService, 'SuperJob');
  }

  disconnectFromHabr(): void {
    this.disconnectPlatform(this.habrAuthService, 'Habr Career');
  }

  private disconnectPlatform(authService: any, platformName: string): void {
    authService.clearTokens();
    this.checkConnectionStatus();
    this.successMessage = `Отключено от ${platformName}`;
    
    this.messageService.add({
      severity: 'info',
      summary: 'Отключено',
      detail: `Соединение с ${platformName} разорвано`
    });
  }
}