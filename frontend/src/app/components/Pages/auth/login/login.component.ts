import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { SupabaseService } from '../../../../shared/db/supabase.service';

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
export class LoginComponent implements OnInit {
  loading = false;
  errorMessage: string | null = null;
  simpleAuthForm: FormGroup;

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.simpleAuthForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    if (this.supabase.currentUser) {
      this.router.navigate(['/']);
    }
  }

  async signInWithGoogle() {
    this.loading = true;
    this.errorMessage = null;
    
    try {
      const { error } = await this.supabase.signInWithGoogle();
      
      if (error) {
        console.error('Google sign-in error:', error);
        this.errorMessage = this.getErrorMessage(error);
        return;
      }
    } catch (error: unknown) {
      console.error('Unexpected error:', error);
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  async signInWithPassword() {
    if (this.simpleAuthForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;
    
    const { email, password } = this.simpleAuthForm.value;

    try {
      // Пытаемся войти
      const { error } = await this.supabase.signInWithPassword(email, password);
      
      if (error) {
        // Если пользователь не найден, регистрируем
        if (error.message?.includes('Invalid login credentials')) {
          await this.signUpWithPassword(email, password);
        } else {
          throw error;
        }
      }
    } catch (error: unknown) {
      console.error('Password auth error:', error);
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  private async signUpWithPassword(email: string, password: string) {
    try {
      const { error } = await this.supabase.signUpWithPassword(email, password);
      
      if (error) {
        throw error;
      }
      
      // После успешной регистрации автоматически входим
      const { error: signInError } = await this.supabase.signInWithPassword(email, password);
      
      if (signInError) {
        throw signInError;
      }
    } catch (error: unknown) {
      throw error;
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Неизвестная ошибка при аутентификации';
  }
}