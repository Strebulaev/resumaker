import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TranslatePipe } from '@ngx-translate/core';
import { HabrAuthService } from '../../../shared/job-platforms/habr/habr-auth.service';
import { HHAuthService } from '../../../shared/job-platforms/hh/hh-auth.service';
import { SuperJobAuthService } from '../../../shared/job-platforms/super-job/superjob-auth.service';

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
export class JobPlatformsComponent implements OnInit {
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isHHConnected = false;
  isSuperJobConnected = false;
  isHabrConnected = false;

  constructor(
    private hhAuthService: HHAuthService,
    private superJobAuthService: SuperJobAuthService,
    private habrAuthService: HabrAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        const platform = params['state']?.split('_')[0];
        if (platform === 'superjob') {
          this.handleSuperJobCallback(params['code'], params['state']);
        } else if (platform === 'habr') {
          this.handleHabrCallback(params['code'], params['state']);
        } else {
          this.handleHHCallback(params['code'], params['state']);
        }
      }
    });
    this.superJobAuthService.initializeConfig().catch(() => {
      console.warn('SuperJob config initialization failed');
    });    
    this.initializePlatforms();
  }
  
  private async initializePlatforms(): Promise<void> {
    try {
      // Ждем инициализации всех сервисов
      await Promise.allSettled([
        this.hhAuthService.initializeConfig(),
        this.superJobAuthService.initializeConfig(),
        this.habrAuthService.initializeConfig()
      ]);
      
      this.checkConnectionStatus();
    } catch (error) {
      console.error('Failed to initialize platform services:', error);
    }
  }
  
  ngOnInit() {
    this.checkConnectionStatus();
    
    this.cleanupOldStates();
  }
  private cleanupOldStates(): void {
    // Очищаем состояния, которым больше 1 часа
    const states = ['superjob_oauth_state', 'hh_oauth_state', 'habr_oauth_state'];
    
    states.forEach(key => {
      const state = localStorage.getItem(key);
      if (state) {
        const timestamp = state.split('_').pop();
        if (timestamp && Date.now() - parseInt(timestamp) > 3600000) {
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
      
      // Сохраняем в sessionStorage вместо localStorage
      sessionStorage.setItem('superjob_oauth_state', state);
      // Также сохраняем в localStorage как fallback
      localStorage.setItem('superjob_oauth_state', state);
      
      console.log('Initiating SuperJob auth with state:', state);
      console.log('Saved state to sessionStorage and localStorage');
      
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
    
    const state = `${platform}_${this.generateState()}`;
    
    try {
      const authUrl = authService.getAuthUrl(state);
      localStorage.setItem(`${platform}_oauth_state`, state);
      window.location.href = authUrl;
    } catch (error) {
      this.isLoading = false;
      this.errorMessage = `Ошибка инициализации OAuth для ${platform}`;
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
      
      let savedState = sessionStorage.getItem('superjob_oauth_state');
      if (!savedState) {
        savedState = localStorage.getItem('superjob_oauth_state');
      }
      
      console.log('SuperJob callback state check:', { 
        received: state, 
        sessionStorage: sessionStorage.getItem('superjob_oauth_state'),
        localStorage: localStorage.getItem('superjob_oauth_state'),
        saved: savedState
      });
      
      if (state !== savedState) {
        throw new Error('Invalid state parameter');
      }
  
      await this.superJobAuthService.exchangeCodeForToken(code);
      
      this.successMessage = 'Успешное подключение к SuperJob!';
      this.checkConnectionStatus();
      
      sessionStorage.removeItem('superjob_oauth_state');
      localStorage.removeItem('superjob_oauth_state');
      
      this.router.navigate([], { 
        queryParams: {},
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
      
      sessionStorage.removeItem('superjob_oauth_state');
      localStorage.removeItem('superjob_oauth_state');
      
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка подключения',
        detail: error.message || 'Не удалось подключиться к SuperJob'
      });
    } finally {
      this.isLoading = false;
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
      if (state !== savedState) {
        throw new Error('Invalid state parameter');
      }

      await authService.exchangeCodeForToken(code);
      
      this.successMessage = `Успешное подключение к ${platform.toUpperCase()}!`;
      this.checkConnectionStatus();
      
      this.router.navigate([], { 
        queryParams: {},
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