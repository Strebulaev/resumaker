import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { SupabaseService } from '../../../../shared/db/supabase.service';
import { filter, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  errorMessage: string | null = null;
  isRegisterMode = false;
  returnUrl: string = '/';
  
  loginForm: FormGroup;
  registerForm: FormGroup;

  private authSubscription?: Subscription;

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }
  ngOnInit() {
    console.log('LoginComponent initialized');
    
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/about';
      console.log('Return URL:', this.returnUrl);
    });
  
    this.supabase.initialized$.pipe(
      filter(initialized => initialized),
      take(1)
    ).subscribe(() => {
      console.log('Supabase initialized, current user:', this.supabase.currentUser?.email);
      
      if (this.supabase.currentUser) {
        console.log('User already logged in, redirecting to:', this.returnUrl);
        this.router.navigate([this.returnUrl]);
        return;
      }
      
      this.checkOAuthCallback();
    });
  }

  private checkOAuthCallback(): void {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('code')) {
      console.log('🔄 OAuth callback detected in LoginComponent');
      this.loading = true;
      this.errorMessage = 'Завершаем аутентификацию...';
      
      // Ждем завершения аутентификации
      const subscription = this.supabase.initialized$.pipe(
        filter(initialized => initialized),
        take(1)
      ).subscribe(() => {
        setTimeout(() => {
          if (this.supabase.currentUser) {
            console.log('✅ OAuth successful in LoginComponent');
            this.handleSuccessfulAuth();
          } else {
            console.log('❌ OAuth failed in LoginComponent');
            this.loading = false;
            this.errorMessage = 'Ошибка аутентификации. Попробуйте снова.';
            
            // Очищаем URL даже при ошибке
            window.history.replaceState({}, '', window.location.pathname);
          }
          subscription.unsubscribe();
        }, 2000);
      });
    }
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private handleSuccessfulAuth(): void {
    this.loading = false;
    this.errorMessage = null;
    
    // Даем небольшой таймаут для завершения инициализации
    setTimeout(() => {
      this.router.navigate([this.returnUrl]);
    }, 500);
  }

  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  switchToRegister() {
    this.isRegisterMode = true;
    this.errorMessage = null;
    this.loginForm.reset();
  }

  switchToLogin() {
    this.isRegisterMode = false;
    this.errorMessage = null;
    this.registerForm.reset();
  }

  async signInWithGoogle() {
    await this.signInWithOAuth('google');
  }

  async signInWithGitHub() {
    await this.signInWithOAuth('github');
  }

  private async signInWithOAuth(provider: 'google' | 'github') {
    this.loading = true;
    this.errorMessage = null;
    
    try {
      const { error } = await this.supabase.signInWithOAuth(provider);
      
      if (error) {
        console.error(`${provider} sign-in error:`, error);
        this.errorMessage = this.getErrorMessage(error);
        this.loading = false;
        return;
      }
      
      // OAuth редирект произойдет автоматически
      console.log(`OAuth ${provider} flow initiated`);
      
    } catch (error: unknown) {
      console.error('Unexpected error:', error);
      this.errorMessage = this.getErrorMessage(error);
      this.loading = false;
    }
  }

  async signInWithPassword() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;
    
    const { email, password } = this.loginForm.value;

    try {
      const { error } = await this.supabase.signInWithPassword(email, password);
      
      if (error) {
        throw error;
      }
      
      // Успешный вход - редирект выполнится через auth state change
      console.log('Password sign-in successful');
      
    } catch (error: unknown) {
      console.error('Password sign-in error:', error);
      this.errorMessage = this.getErrorMessage(error);
      this.loading = false;
    }
  }

  async signUpWithPassword() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;
    
    const { email, password } = this.registerForm.value;

    try {
      const { error } = await this.supabase.signUpWithPassword(email, password);
      
      if (error) {
        throw error;
      }
      
      // После успешной регистрации показываем сообщение
      this.errorMessage = 'Регистрация успешна! Проверьте вашу почту для подтверждения аккаунта.';
      this.isRegisterMode = false;
      this.registerForm.reset();
      
    } catch (error: unknown) {
      console.error('Password sign-up error:', error);
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('invalid login credentials')) {
        return 'Неверный email или пароль';
      }
      if (errorMessage.includes('email not confirmed')) {
        return 'Email не подтвержден. Проверьте вашу почту';
      }
      if (errorMessage.includes('user already registered')) {
        return 'Пользователь с таким email уже зарегистрирован';
      }
      if (errorMessage.includes('password should be at least')) {
        return 'Пароль должен содержать минимум 6 символов';
      }
      if (errorMessage.includes('invalid email')) {
        return 'Неверный формат email';
      }
      if (errorMessage.includes('email link is invalid or has expired')) {
        return 'Ссылка для подтверждения устарела или недействительна';
      }
      
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Неизвестная ошибка при аутентификации';
  }
}