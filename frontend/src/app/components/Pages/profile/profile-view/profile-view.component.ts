import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Person } from '../../../../person-schema';
import { SupabaseService } from '../../../../shared/db/supabase.service';
import { ProfileService } from '../../../../shared/profile/profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
  standalone: false,
})
export class ProfileViewComponent implements OnInit {
  userProfile: Person | null = null;
  loading = true;
  activeTab: 'info' | 'resumes' = 'info';
  
  constructor(
    public supabase: SupabaseService,
    private router: Router,
    private profileService: ProfileService,
    private translate: TranslateService
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
      }
    });
  }

  loadProfile(): void {
    this.loading = true;
    this.profileService.loadProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
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
}