import { Injectable } from '@angular/core';
import { SupabaseService } from '../db/supabase.service';
import { Profile, ProfileType, ApplicantProfile, EmployerProfile } from './profile.models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Person } from '../../person-schema';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private currentProfileSubject = new BehaviorSubject<Profile | null>(null);
  public currentProfile$ = this.currentProfileSubject.asObservable();

  constructor(private supabaseService: SupabaseService) {}

  async createProfile(type: ProfileType, name: string, data: any): Promise<Profile> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const profile: Partial<Profile> = {
      userId: user.id,
      type,
      name,
      data,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const { data: createdProfile, error } = await this.supabaseService.client
      .from('user_profiles')
      .insert(profile)
      .select()
      .single();

    if (error) throw error;
    return createdProfile;
  }

  async getProfiles(): Promise<Profile[]> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await this.supabaseService.client
      .from('user_profiles')
      .select('*')
      .eq('userId', user.id);

    if (error) throw error;
    return data || [];
  }

  async getProfile(id: string): Promise<Profile> {
    const { data, error } = await this.supabaseService.client
      .from('user_profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateProfile(id: string, updates: Partial<Profile>): Promise<Profile> {
    const { data, error } = await this.supabaseService.client
      .from('user_profiles')
      .update({ ...updates, updatedAt: new Date() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteProfile(id: string): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('user_profiles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async switchProfile(profile: Profile): Promise<void> {
    await this.updateProfile(profile.id, { isActive: true });
    await this.deactivateOtherProfiles(profile.id);
    this.currentProfileSubject.next(profile);
  }

  private async deactivateOtherProfiles(activeProfileId: string): Promise<void> {
    const user = this.supabaseService.currentUser;
    if (!user) return;

    await this.supabaseService.client
      .from('user_profiles')
      .update({ isActive: false })
      .eq('userId', user.id)
      .neq('id', activeProfileId);
  }

  async getCurrentProfile(): Promise<Profile | null> {
    const user = this.supabaseService.currentUser;
    if (!user) return null;

    const { data, error } = await this.supabaseService.client
      .from('user_profiles')
      .select('*')
      .eq('userId', user.id)
      .eq('isActive', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  async initializeCurrentProfile(): Promise<void> {
    const profile = await this.getCurrentProfile();
    this.currentProfileSubject.next(profile);
  }

  getApplicantData(profile: Profile): ApplicantProfile {
    return profile.data as ApplicantProfile;
  }

  getEmployerData(profile: Profile): EmployerProfile {
    return profile.data as EmployerProfile;
  }

  async updateApplicantData(profileId: string, data: Partial<ApplicantProfile>): Promise<void> {
    const profile = await this.getProfile(profileId);
    const updatedData = { ...profile.data, ...data };
    await this.updateProfile(profileId, { data: updatedData });
  }

  async updateEmployerData(profileId: string, data: Partial<EmployerProfile>): Promise<void> {
    const profile = await this.getProfile(profileId);
    const updatedData = { ...profile.data, ...data };
    await this.updateProfile(profileId, { data: updatedData });
  }

  loadProfile(): Observable<Person> {
    return of(this.getDefaultProfile());
  }

  saveProfile(profileData: Person): Observable<any> {
    return new Observable(observer => {
      (async () => {
        try {
          const user = this.supabaseService.currentUser;
          if (!user) throw new Error('User not authenticated');

          const profile = await this.getCurrentProfile();
          if (profile) {
            await this.updateProfile(profile.id, { data: profileData });
          } else {
            await this.createProfile(ProfileType.APPLICANT, 'Основной профиль', profileData);
          }

          observer.next({ success: true });
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }

  exportToYaml(profileData: Person): string {
    return `name: ${profileData.name}
email: ${profileData.contact?.email}
phone: ${profileData.contact?.phone}

experience:
${profileData.experience?.map(exp => `  - company: ${exp.company}
    position: ${exp.position}
    startDate: ${exp.startDate}
    endDate: ${exp.endDate || ''}
    tasks: ${exp.tasks?.join(', ')}`).join('\n') || ''}

skills:
${profileData.skills?.map(skill => `  - area: ${skill.area}
    name: ${skill.name}
    level: ${skill.level}`).join('\n') || ''}

education:
${profileData.education?.map(edu => `  - institution: ${edu.institution}
    degree: ${edu.degree}
    specialty: ${edu.specialty}
    year: ${edu.year}`).join('\n') || ''}
`;
  }

  exportToTxt(profileData: Person): string {
    let text = `${profileData.name}\n`;
    text += `Email: ${profileData.contact?.email}\n`;
    text += `Phone: ${profileData.contact?.phone}\n\n`;

    if (profileData.experience?.length) {
      text += 'ОПЫТ РАБОТЫ:\n';
      profileData.experience.forEach(exp => {
        text += `${exp.position} в ${exp.company}\n`;
        text += `${exp.startDate} - ${exp.endDate || 'настоящее время'}\n`;
        text += `Задачи: ${exp.tasks?.join(', ')}\n`;
        text += `Стек: ${exp.stack?.join(', ')}\n\n`;
      });
    }

    if (profileData.skills?.length) {
      text += 'НАВЫКИ:\n';
      profileData.skills.forEach(skill => {
        text += `${skill.name} (${skill.level}/10) - ${skill.area}\n`;
      });
      text += '\n';
    }

    if (profileData.education?.length) {
      text += 'ОБРАЗОВАНИЕ:\n';
      profileData.education.forEach(edu => {
        text += `${edu.degree} ${edu.specialty}\n`;
        text += `${edu.institution}, ${edu.year}\n\n`;
      });
    }

    return text;
  }

  importFromYaml(yamlContent: string): Observable<Person> {
    try {
      const profile = this.parseYamlToProfile(yamlContent);
      return of(profile);
    } catch (error) {
      throw new Error('Invalid YAML format');
    }
  }

  getUserProfiles(): Promise<Profile[]> {
    return this.getProfiles();
  }

  private getDefaultProfile(): Person {
    return {
      name: '',
      gender: 'unknown',
      desiredPositions: [],
      contact: { email: '', phone: '', linkedin: '', github: '', telegram: '' },
      location: { country: '', city: '', relocation: false, remote: false, business_trips: false },
      languages: [],
      skills: [],
      education: [],
      hobby: [],
      literature: [],
      experience: []
    };
  }

  private parseYamlToProfile(yamlContent: string): Person {
    const lines = yamlContent.split('\n');
    const profile: Person = this.getDefaultProfile();

    let currentSection = '';
    let currentItem: any = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      if (trimmed.includes(':')) {
        const [key, value] = trimmed.split(':').map(s => s.trim());

        switch (key) {
          case 'name':
            profile.name = value;
            break;
          case 'email':
            profile.contact = { ...profile.contact, email: value };
            break;
          case 'phone':
            profile.contact = { ...profile.contact, phone: value };
            break;
          case 'experience':
            currentSection = 'experience';
            break;
          case 'skills':
            currentSection = 'skills';
            break;
          case 'education':
            currentSection = 'education';
            break;
          case 'company':
            if (currentSection === 'experience') {
              currentItem = { company: value, tasks: [], stack: [], achievements: [] };
              profile.experience!.push(currentItem);
            }
            break;
          case 'position':
            if (currentSection === 'experience' && currentItem) {
              currentItem.position = value;
            }
            break;
          case 'startDate':
            if (currentSection === 'experience' && currentItem) {
              currentItem.startDate = value;
            }
            break;
          case 'endDate':
            if (currentSection === 'experience' && currentItem) {
              currentItem.endDate = value || null;
            }
            break;
          case 'tasks':
            if (currentSection === 'experience' && currentItem) {
              currentItem.tasks = value.split(',').map((s: string) => s.trim());
            }
            break;
        }
      }
    }

    return profile;
  }
}