import { Injectable } from '@angular/core';
import { SupabaseService } from '../db/supabase.service';
import { HttpClient } from '@angular/common/http';
import { Observable, from, switchMap, of, forkJoin, catchError, map } from 'rxjs';
import * as yaml from 'js-yaml';
import { personSchema, type Person, type Experience, type Education, type Skill, type Language } from '../../person-schema';
import { format, parseISO } from 'date-fns';
import { environment } from '../../../environments/environment.prod';
import { ErrorToastComponent } from '../../components/Helpers/error-toast/error-toast.component';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(
    private supabase: SupabaseService,
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  transformSupabaseProfileToPerson(profileData: any): Person {
    if (!profileData) {
      return this.createEmptyProfile();
    }

    return {
      name: profileData.full_name || '',
      gender: profileData.gender || 'unknown',
      desiredPositions: profileData.profile_data?.desiredPositions || [],
      contact: {
        phone: profileData.phone || '',
        email: profileData.email || '',
        linkedin: profileData.profile_data?.contact?.['linkedin'] || '',
        github: profileData.profile_data?.contact?.['github'] || ''
      },
      location: {
        country: profileData.profile_data?.location?.country || '',
        city: profileData.profile_data?.location?.city || '',
        relocation: profileData.profile_data?.location?.relocation || false,
        remote: profileData.profile_data?.location?.remote || false,
        business_trips: profileData.profile_data?.location?.business_trips || false
      },
      languages: profileData.profile_data?.languages || [],
      skills: profileData.profile_data?.skills || [],
      education: profileData.profile_data?.education || [],
      experience: profileData.profile_data?.experience || [],
      hobby: profileData.profile_data?.hobby || [],
      literature: profileData.profile_data?.literature || []
    };
  }

  loadProfile(): Observable<Person | null> {
    return from(this.supabase.getFullProfile()).pipe(
      map((profileData: any) => {
        if (!profileData) return null;
        return this.transformSupabaseProfileToPerson(profileData);
      }),
      catchError(error => {
        this.errorHandler.showError('Ошибка загрузки профиля', 'ProfileService');
        return of(null);
      })
    );
  }
    
  saveProfile(person: Person): Observable<boolean> {
    const validation = personSchema.safeParse({ person });
    
    if (!validation.success) {
      console.warn('Validation warnings:', validation.error);
    }
  
    return from(this.supabase.saveFullProfile(person)).pipe(
      map(result => !result.error),
      catchError(error => {
        this.errorHandler.showError('Ошибка сохранения профиля', 'ProfileService');
        return of(false);
      })
    );
  }

  private transformToPerson(profileData: any): Person {
    if (!profileData) {
      return this.createEmptyProfile();
    }
  
    return {
      name: profileData.full_name || '',
      gender: profileData.gender || 'unknown',
      desiredPositions: profileData.profile_data?.desiredPositions || [],
      contact: {
        phone: profileData.phone || '',
        email: profileData.email || '',
        linkedin: profileData.profile_data?.contact?.['linkedin'] || '',
        github: profileData.profile_data?.contact?.['github'] || ''
      },
      location: {
        country: profileData.profile_data?.location?.country || '',
        city: profileData.profile_data?.location?.city || '',
        relocation: profileData.profile_data?.location?.relocation || false,
        remote: profileData.profile_data?.location?.remote || false,
        business_trips: profileData.profile_data?.location?.business_trips || false
      },
      languages: profileData.profile_data?.languages || [],
      skills: profileData.profile_data?.skills || [],
      education: profileData.profile_data?.education || [],
      experience: profileData.profile_data?.experience || [],
      hobby: profileData.profile_data?.hobby || [],
      literature: profileData.profile_data?.literature || []
    };
  }
  
  private createEmptyProfile(): Person {
    return {
      name: '',
      gender: 'unknown',
      desiredPositions: [],
      contact: {
        phone: '',
        email: '',
        linkedin: '',
        github: ''
      },
      location: {
        country: '',
        city: '',
        relocation: false,
        remote: false,
        business_trips: false
      },
      languages: [],
      skills: [],
      education: [],
      experience: [],
      hobby: [],
      literature: []
    };
  }
  exportToYaml(person: Person): string {
    return yaml.dump({ person }, { skipInvalid: true });
  }

  exportToTxt(person: Person): string {
    let txt = `=== Personal Information ===\n`;
    txt += `Name: ${person.name}\n`;
    txt += `Gender: ${person.gender}\n`;
    txt += `Desired Positions: ${person.desiredPositions?.join(', ') || 'Not specified'}\n\n`;

    txt += `=== Contact Information ===\n`;
    txt += `Email: ${person.contact.email}\n`;
    txt += `Phone: ${person.contact.phone || 'Not specified'}\n`;
    txt += `LinkedIn: ${person.contact['linkedin'] || 'Not specified'}\n`;
    txt += `GitHub: ${person.contact['github'] || 'Not specified'}\n\n`;

    txt += `=== Location ===\n`;
    txt += `Country: ${person.location.country || 'Not specified'}\n`;
    txt += `City: ${person.location.city}\n`;
    txt += `Relocation: ${person.location.relocation ? 'Yes' : 'No'}\n`;
    txt += `Remote work: ${person.location.remote ? 'Yes' : 'No'}\n`;
    txt += `Business trips: ${person.location.business_trips ? 'Yes' : 'No'}\n\n`;

    if (person.languages?.length) {
      txt += `=== Languages ===\n`;
      person.languages.forEach(lang => {
        txt += `- ${lang.language}: ${lang.level}\n`;
      });
      txt += `\n`;
    }

    if (person.skills?.length) {
      txt += `=== Skills ===\n`;
      person.skills.forEach(skill => {
        txt += `- ${skill.area}: ${skill.name} (${skill.level}/10)\n`;
      });
      txt += `\n`;
    }

    if (person.education?.length) {
      txt += `=== Education ===\n`;
      person.education.forEach(edu => {
        txt += `- ${edu.institution} (${edu.year}): ${edu.degree} in ${edu.specialty}\n`;
      });
      txt += `\n`;
    }

    if (person.experience?.length) {
      txt += `=== Work Experience ===\n`;
      person.experience.forEach(exp => {
        txt += `- ${exp.company} (${format(parseISO(exp.startDate), 'MMM yyyy')} - ${exp.endDate ? format(parseISO(exp.endDate), 'MMM yyyy') : 'Present'}\n`;
        txt += `  Position: ${exp.position}\n`;
        txt += `  Technologies: ${exp.stack.join(', ')}\n`;
        txt += `  Responsibilities:\n`;
        exp.tasks.forEach(task => txt += `    - ${task}\n`);
        
        if (exp.achievements?.length) {
          txt += `  Achievements:\n`;
          exp.achievements.forEach(ach => {
            txt += `    - ${ach.name}: ${ach.initial_value} → ${ach.final_value} ${ach.uom || ''} (${ach.type})\n`;
          });
        }
      });
    }

    if (person.hobby?.length) {
      txt += `\n=== Hobbies ===\n`;
      txt += person.hobby.map(h => `- ${h}`).join('\n');
    }

    if (person.literature?.length) {
      txt += `\n=== Favorite Literature ===\n`;
      txt += person.literature.map(l => `- ${l}`).join('\n');
    }

    return txt;
  }

  importFromYaml(yamlStr: string): Observable<Person | null> {
    try {
      console.log('Starting YAML import...');
      
      const cleanYamlStr = yamlStr.trim();
      
      const data = yaml.load(cleanYamlStr) as { person: Person };
      console.log('Parsed YAML data:', data);
      
      if (!data || !data.person) {
        throw new Error('Invalid YAML structure: missing "person" root element');
      }
  
      const validation = personSchema.safeParse(data);
      
      if (validation.success) {
        console.log('YAML validation successful');
        return of(validation.data.person);
      } else {
        console.error('YAML validation error:', validation.error);
        
        const fallbackProfile = this.createPartialProfile(data.person);
        return of(fallbackProfile);
      }
    } catch (e) {
      this.errorHandler.showError('Ошибка парсинга YAML', 'ProfileService');
      return of(null);
    }
  }
  
  private createPartialProfile(partialData: any): Person {
    return {
      name: partialData.name || '',
      gender: (partialData.gender || 'unknown') as 'unknown' | 'male' | 'female',
      desiredPositions: Array.isArray(partialData.desiredPositions) ? partialData.desiredPositions : [],
      contact: {
        phone: partialData.contact?.phone || '',
        email: partialData.contact?.email || '',
        linkedin: partialData.contact?.['linkedin'] || '',
        github: partialData.contact?.['github'] || ''
      },
      location: {
        country: partialData.location?.country || '',
        city: partialData.location?.city || '',
        relocation: Boolean(partialData.location?.relocation),
        remote: Boolean(partialData.location?.remote),
        business_trips: Boolean(partialData.location?.business_trips)
      },
      languages: Array.isArray(partialData.languages) ? partialData.languages : [],
      skills: Array.isArray(partialData.skills) ? partialData.skills : [],
      education: Array.isArray(partialData.education) ? partialData.education : [],
      experience: Array.isArray(partialData.experience) ? partialData.experience : [],
      hobby: Array.isArray(partialData.hobby) ? partialData.hobby : [],
      literature: Array.isArray(partialData.literature) ? partialData.literature : []
    };
  }

  private async saveProfileToSupabase(person: Person): Promise<boolean> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) return false;
  
      const profileData = {
        id: userId,
        email: person.contact.email,
        full_name: person.name,
        phone: person.contact.phone,
        gender: person.gender,
        profile_data: {
          desiredPositions: person.desiredPositions,
          contact: {
            linkedin: person.contact['linkedin'],
            github: person.contact['github']
          },
          location: person.location,
          languages: person.languages,
          skills: person.skills,
          education: person.education,
          experience: person.experience,
          hobby: person.hobby,
          literature: person.literature
        },
        updated_at: new Date().toISOString()
      };
  
      if (!environment.production) {
        localStorage.setItem('sb-local-profile', JSON.stringify(profileData));
        return true;
      }
  
      const { error } = await this.supabase.client
        .from('user_profiles')
        .upsert(profileData, { 
          onConflict: 'id',
        });
  
      if (error) {
        console.error('Supabase error:', error);
        localStorage.setItem('sb-local-profile', JSON.stringify(profileData));
      }
  
      return true;
      
    } catch (error) {
      this.errorHandler.showError('Ошибка сохранения профиля', 'ProfileService');
      return false;
    }
  }
}