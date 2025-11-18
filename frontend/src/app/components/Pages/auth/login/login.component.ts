import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SupabaseService } from '../../../../shared/db/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe
  ]
})
export class LoginComponent implements OnInit {
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

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

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Неизвестная ошибка при входе через Google';
  }
}
