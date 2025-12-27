import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Person } from '../../../../person-schema';
import { SupabaseService } from '../../../../shared/db/supabase.service';
import { ProfileService } from '../../../../shared/profile/profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
  standalone: false,
  providers: [MessageService]
})
export class ProfileViewComponent implements OnInit {
  userProfile: Person | null = null;
  loading = true;
  activeTab: 'info' | 'resumes' = 'info';
  
  constructor(
    public supabase: SupabaseService,
    private router: Router,
    private profileService: ProfileService,
    private translate: TranslateService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.supabase.initialized$.pipe(
      filter(initialized => initialized),
      take(1)
    ).subscribe(() => {
      if (!this.supabase.currentUser) {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: this.router.url }
        });
      } else {
        this.loadProfile();
        this.handleAuthCallback();
      }
    });
  }

  loadProfile(): void {
    this.loading = true;
    this.profileService.loadProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile as any;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.loading = false;
      }
    });
  }

  get userAvatar(): string {
    return this.supabase.currentUser?.user_metadata?.['avatar_url'] || 'default_avatar.jpg';
  }

  get userName(): string {
    return this.supabase.currentUser?.user_metadata?.['full_name'] || this.supabase.currentUser?.email || '';
  }

  getGenderLabel(gender: string): string {
    const genders = {
      'male': this.translate.instant('PROFILE.PERSONAL_INFO.GENDER_OPTIONS.MALE'),
      'female': this.translate.instant('PROFILE.PERSONAL_INFO.GENDER_OPTIONS.FEMALE'),
      'unknown': this.translate.instant('PROFILE.PERSONAL_INFO.GENDER_OPTIONS.UNKNOWN')
    };
    return genders[gender as keyof typeof genders] || this.translate.instant('PROFILE.PERSONAL_INFO.GENDER_OPTIONS.UNKNOWN');
  }

  async signOut() {
    await this.supabase.signOut();
    this.router.navigate(['/login']);
  }

  // Check if HH.ru is authorized
  isHHAuthorized(): boolean {
    return !!localStorage.getItem('hh_access_token');
  }

  // Check if SuperJob is authorized
  isSJAuthorized(): boolean {
    return !!localStorage.getItem('sj_access_token');
  }

  // Authorize with HH.ru
  authorizeHH(): void {
    window.location.href = '/api/hh/auth';
  }

  // Authorize with SuperJob
  authorizeSJ(): void {
    window.location.href = '/api/superjob/auth';
  }

  // Handle auth callback (called from ngOnInit if there are auth params)
  private handleAuthCallback(): void {
    const urlParams = new URLSearchParams(window.location.search);

    // Handle HH.ru auth
    const hhCode = urlParams.get('hh_code');
    const hhError = urlParams.get('hh_error');

    if (hhCode) {
      this.exchangeHHCode(hhCode);
    } else if (hhError) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка авторизации HH.ru',
        detail: `Ошибка: ${hhError}`
      });
    }

    // Handle SuperJob auth
    const sjCode = urlParams.get('sj_code');
    const sjError = urlParams.get('sj_error');

    if (sjCode) {
      this.exchangeSJCode(sjCode);
    } else if (sjError) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка авторизации SuperJob',
        detail: `Ошибка: ${sjError}`
      });
    }

    // Clean up URL
    if (hhCode || hhError || sjCode || sjError) {
      const url = new URL(window.location.href);
      url.searchParams.delete('hh_code');
      url.searchParams.delete('hh_error');
      url.searchParams.delete('sj_code');
      url.searchParams.delete('sj_error');
      window.history.replaceState({}, '', url.toString());
    }
  }

  private async exchangeHHCode(code: string): Promise<void> {
    try {
      const response = await fetch('/api/hh/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code,
          userId: this.supabase.currentUser?.id || 'current-user'
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('hh_access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('hh_refresh_token', data.refresh_token);
        }
        this.messageService.add({
          severity: 'success',
          summary: 'HH.ru подключен',
          detail: 'Теперь вы можете использовать автоматизацию для HH.ru'
        });
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка авторизации HH.ru',
        detail: error.message
      });
    }
  }

  private async exchangeSJCode(code: string): Promise<void> {
    try {
      const response = await fetch('/api/superjob/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code,
          userId: this.supabase.currentUser?.id || 'current-user'
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('sj_access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('sj_refresh_token', data.refresh_token);
        }
        this.messageService.add({
          severity: 'success',
          summary: 'SuperJob подключен',
          detail: 'Теперь вы можете использовать автоматизацию для SuperJob'
        });
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка авторизации SuperJob',
        detail: error.message
      });
    }
  }
}