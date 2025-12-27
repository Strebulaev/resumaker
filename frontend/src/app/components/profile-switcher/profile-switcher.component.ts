import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../shared/profile/profile.service';
import { Profile, ProfileType } from '../../shared/profile/profile.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-switcher.component.html',
  styleUrls: ['./profile-switcher.component.scss']
})
export class ProfileSwitcherComponent implements OnInit {
  profiles: Profile[] = [];
  currentProfile$: Observable<Profile | null>;
  showCreateDialog = false;
  newProfileName = '';
  newProfileType: ProfileType = ProfileType.APPLICANT;
  profileTypeOptions = [
    { label: 'Соискатель', value: ProfileType.APPLICANT },
    { label: 'Работодатель', value: ProfileType.EMPLOYER }
  ];

  constructor(private profileService: ProfileService) {
    this.currentProfile$ = this.profileService.currentProfile$;
  }

  ngOnInit(): void {
    this.loadProfiles();
  }

  async loadProfiles(): Promise<void> {
    try {
      this.profiles = await this.profileService.getProfiles();
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  }

  async switchProfile(profile: Profile): Promise<void> {
    try {
      await this.profileService.switchProfile(profile);
    } catch (error) {
      console.error('Error switching profile:', error);
    }
  }

  async createProfile(): Promise<void> {
    if (!this.newProfileName.trim()) return;

    try {
      const initialData = this.newProfileType === ProfileType.APPLICANT
        ? this.getInitialApplicantData()
        : this.getInitialEmployerData();

      await this.profileService.createProfile(this.newProfileType, this.newProfileName, initialData);
      this.showCreateDialog = false;
      this.newProfileName = '';
      await this.loadProfiles();
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  }

  private getInitialApplicantData() {
    return {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: {
          country: '',
          city: '',
          remoteWork: false,
          relocation: false
        }
      },
      experience: [],
      projects: [],
      education: [],
      skills: [],
      careerGoals: {
        positions: [],
        industries: [],
        salaryRange: {
          min: 0,
          max: 0,
          currency: 'RUB'
        },
        employmentType: 'FULL_TIME',
        availabilityDate: new Date()
      },
      settings: {
        visibility: 'PUBLIC',
        notifications: {
          newVacancies: true,
          profileViews: true,
          messages: true,
          recommendations: true
        },
        automation: {
          autoApply: false,
          autoReject: false,
          autoUpdate: false
        }
      }
    };
  }

  private getInitialEmployerData() {
    return {
      companyInfo: {
        name: '',
        description: '',
        industry: '',
        size: 'SMALL',
        founded: new Date().getFullYear(),
        location: {
          country: '',
          city: '',
          remoteWork: false,
          relocation: false
        }
      },
      team: [],
      vacancies: [],
      candidates: [],
      settings: {
        notifications: {
          newVacancies: true,
          profileViews: true,
          messages: true,
          recommendations: true
        },
        integrations: {
          googleCalendar: false,
          slack: false,
          ats: ''
        },
        security: {
          twoFactor: false,
          ipWhitelist: [],
          sessionTimeout: 480
        }
      }
    };
  }

  async deleteProfile(profile: Profile): Promise<void> {
    if (confirm(`Удалить профиль "${profile.name}"?`)) {
      try {
        await this.profileService.deleteProfile(profile.id);
        await this.loadProfiles();
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  }

  getProfileTypeLabel(type: ProfileType): string {
    return type === ProfileType.APPLICANT ? 'Соискатель' : 'Работодатель';
  }

  getProfileTypeIcon(type: ProfileType): string {
    return type === ProfileType.APPLICANT ? '👤' : '🏢';
  }
}