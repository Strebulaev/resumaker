import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, AuthSession, Session, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from '../config/config.service';
import { AppStateService } from '../state/app-state.service';
import { ErrorToastComponent } from '../../components/Helpers/error-toast/error-toast.component';
import { ErrorHandlerService } from '../error-handler.service';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  gender: 'male' | 'female' | 'unknown';
  profile_data: {
    desiredPositions: string[];
    contact: {
      linkedin?: string;
      github?: string;
      [key: string]: any;
    };
    location: {
      country?: string;
      city: string;
      relocation: boolean;
      remote: boolean;
      business_trips: boolean;
    };
    languages: any[];
    skills: any[];
    education: any[];
    experience: any[];
    hobby: string[];
    literature: string[];
  };
  created_at: string;
  updated_at: string;
}


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient | undefined;
  private session: AuthSession | null = null;
  private isLocalDev = !environment.production;
  private userSubject = new BehaviorSubject<User | null>(null);
  private _initialized = false;
  private initializedSubject = new BehaviorSubject<boolean>(false);
  public initialized$: Observable<boolean> = this.initializedSubject.asObservable();
  get initialized(): boolean {
    return this.initializedSubject.value;
  }
  constructor(private router: Router, private appStateService: AppStateService,
      private errorHandler: ErrorHandlerService) {
    this.setupAuthStateHandling();
  }

  private setupAuthStateHandling(): void {
    this.supabase?.auth.onAuthStateChange((event, session) => {
      this.session = session;
      this.userSubject.next(session?.user || null);
      
      if (event === 'SIGNED_IN') {
        // Сохраняем состояние при входе
        this.appStateService.saveState({
          ...this.appStateService.getState(),
          user: {
            id: session?.user?.id,
            email: session?.user?.email
          }
        });
        this.router.navigate(['/profile/view']);
      } else if (event === 'SIGNED_OUT') {
        this.appStateService.clearState();
        this.router.navigate(['/login']);
      }
    });
  }

  private async mockSignOut() {
    console.log('Mock sign-out triggered');
    
    localStorage.removeItem('sb-mock-session');
    localStorage.removeItem('sb-local-profile');
    this.session = null;
    this.userSubject.next(null);
    
    this.router.navigate(['/']);
  }

  get client(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized');
    }
    return this.supabase;
  }

  async initialize(config: AppConfig): Promise<void> {
    try {
      console.log('Initializing Supabase with config from:', 
        environment.production ? 'API endpoint' : 'environment.ts');

      // Если конфиг пустой, используем mock режим
      if (!config.supabaseUrl || !config.supabaseKey) {
        console.warn('Supabase configuration missing, using mock mode');
        this.setupMockAuth();
        return;
      }

      // Проверяем доступность Supabase
      try {
        const testResponse = await fetch(`${config.supabaseUrl}/rest/v1/`, {
          method: 'HEAD',
          headers: {
            'apikey': config.supabaseKey
          }
        });
        
        if (!testResponse.ok) {
          throw new Error(`Supabase not accessible: ${testResponse.status}`);
        }
        
        console.log('Supabase is accessible, initializing client');
        
      } catch (error) {
        console.warn('Supabase not accessible, using mock mode:', error);
        this.setupMockAuth();
        return;
      }

      // Инициализируем реальный клиент
      this.supabase = createClient(config.supabaseUrl, config.supabaseKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: 'pkce'
        }
      });

      await this.initAuth();

    } catch (error) {
      console.error('Supabase initialization failed, using mock mode:', error);
      this.setupMockAuth();
    }
  }

  private async initAuth(): Promise<void> {
    if (!this.supabase) return;
  
    try {
      const { data: { session }, error } = await this.supabase.auth.getSession();
      
      if (error) {
        console.warn('Session error:', error);
      } else if (session) {
        this.session = session;
        this.userSubject.next(session.user);
      }
  
      this.supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event);
        this.session = session;
        this.userSubject.next(session?.user || null);
  
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          this.appStateService.saveState({
            ...this.appStateService.getState(),
            user: {
              id: session?.user?.id,
              email: session?.user?.email
            }
          });
          // Редирект только если мы на странице логина или callback
          if (this.router.url.includes('/login') || this.router.url.includes('/auth/callback')) {
            this.router.navigate(['/profile/view']);
          }
        } else if (event === 'SIGNED_OUT') {
          this.appStateService.clearState();
          this.router.navigate(['/login']);
        }
      });
  
      this.initializedSubject.next(true);
  
    } catch (error) {
      console.error('Auth initialization failed:', error);
      this.initializedSubject.next(true);
    }
  }

  private setupMockAuth(): void {
    console.log('Setting up mock authentication');
    
    const savedSession = localStorage.getItem('sb-mock-session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        this.session = session;
        this.userSubject.next(session.user);
        console.log('Restored mock session from storage');
      } catch (e) {
        console.error('Error parsing saved session:', e);
      }
    }

    this.initializedSubject.next(true);
  }

  get currentUser(): User | null {
    if (!this.session && localStorage.getItem('sb-mock-session')) {
      try {
        this.session = JSON.parse(localStorage.getItem('sb-mock-session')!);
      } catch (e) {
        console.error('Error parsing saved session:', e);
      }
    }
    return this.session?.user || null;
  }

  get currentSession() {
    return this.session;
  }

  get isInitialized(): boolean {
    return this._initialized;
  }

  private async mockGoogleSignIn() {
    console.log('Mock Google sign-in triggered');
    
    const mockUser = {
      id: this.generateValidUUID(),
      email: 'test.user@example.com',
      user_metadata: { 
        full_name: 'Test User', 
        avatar_url: 'default_avatar.jpg',
        provider: 'google'
      },
      app_metadata: { provider: 'google' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      role: 'authenticated',
      updated_at: new Date().toISOString()
    };

    const mockSession = {
      user: mockUser,
      access_token: 'mock-access-token-' + Math.random().toString(36).substring(2),
      refresh_token: 'mock-refresh-token-' + Math.random().toString(36).substring(2),
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer'
    };

    localStorage.setItem('sb-mock-session', JSON.stringify(mockSession));
    this.session = mockSession;
    this.userSubject.next(mockUser);
    
    this.router.navigate(['/profile/view']);
    
    return { data: { user: mockUser }, error: null };
  }

  async signInWithGoogle() {
    // Если Supabase недоступен, используем мок
    if (!this.supabase) {
      return this.mockGoogleSignIn();
    }
  
    try {
      const { error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: this.getRedirectUri(),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
  
      if (error) throw error;
      return { data: { user: null }, error: null };
    } catch (error) {
      console.error('Google OAuth error, using mock:', error);
      return this.mockGoogleSignIn();
    }
  }

  private getRedirectUri(): string {
    if (environment.production) {
      return 'https://rezulution.vercel.app/auth/callback';
    }
    return window.location.origin + '/auth/callback';
  }

  async saveFullProfile(profileData: any): Promise<{ data: any; error: any }> {
    try {
      const userId = this.currentUser?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }
  
      // Убедитесь, что структура данных соответствует таблице
      const profile = {
        id: userId,
        email: profileData.contact?.email || this.currentUser?.email,
        full_name: profileData.name,
        phone: profileData.contact?.phone,
        gender: profileData.gender,
        profile_data: {
          desiredPositions: profileData.desiredPositions || [],
          contact: {
            linkedin: profileData.contact?.['linkedin'],
            github: profileData.contact?.['github']
          },
          location: profileData.location,
          languages: profileData.languages || [],
          skills: profileData.skills || [],
          education: profileData.education || [],
          experience: profileData.experience || [],
          hobby: profileData.hobby || [],
          literature: profileData.literature || []
        },
        updated_at: new Date().toISOString()
      };
  
      if (!environment.production) {
        localStorage.setItem('sb-local-profile', JSON.stringify(profile));
        return { data: profile, error: null };
      }
  
      // ИСПРАВЛЕННЫЙ КОД - используем правильный синтаксис upsert
      const { data, error } = await this.supabase!
        .from('user_profiles')
        .upsert(profile, { 
          onConflict: 'id'
        })
        .select(); // Добавляем select чтобы получить обновленные данные
  
      if (error) {
        this.errorHandler.showError('Ошибка Supabase', 'SupabaseService');
        // Fallback to local storage
        localStorage.setItem('sb-local-profile', JSON.stringify(profile));
        return { data: profile, error: null };
      }
  
      return { data: data ? data[0] : profile, error: null };
    } catch (error) {
      console.error('Error saving profile:', error);
      return { data: null, error: error as Error };
    }
  }

  async getFullProfile(): Promise<UserProfile | null> {
    try {
      if (!this.currentUser?.id) {
        return null;
      }
  
      if (!environment.production) {
        const profile = localStorage.getItem('sb-local-profile');
        return profile ? JSON.parse(profile) : this.createDefaultProfile();
      }
  
      const { data, error } = await this.supabase!
        .from('user_profiles')
        .select('*')
        .eq('id', this.currentUser.id)
        .single();
  
      if (error) {
        console.error('Supabase error loading profile:', error);
        
        if (error.code === 'PGRST116') {
          const defaultProfile = this.createDefaultProfile();
          return defaultProfile;
        }
        
        return this.createDefaultProfile();
      }
  
      return data || this.createDefaultProfile();
    } catch (error) {
      this.errorHandler.showError('Ошибка загрузки профиля', 'SupabaseService');
      return this.createDefaultProfile();
    }
  }

  private createDefaultProfile(): UserProfile {
    return {
      id: this.currentUser?.id || 'local-user',
      email: this.currentUser?.email || '',
      full_name: this.currentUser?.user_metadata?.['full_name'] || 'User',
      phone: '',
      gender: 'unknown',
      profile_data: {
        desiredPositions: [],
        contact: {
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
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  private generateValidUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async signOut() {
    if (!this.supabase) {
      return this.mockSignOut();
    }

    try {
      await this.supabase.auth.signOut();
      window.location.href = '/';
    } catch (error) {
      this.errorHandler.showError('Ошибка выхода из системы', 'SupabaseService');
      this.mockSignOut();
    }
  }

  async createUserProfile(userData: any) {
    try {
      const profile = {
        id: userData.id,
        email: userData.email || '',
        full_name: userData.user_metadata?.['full_name'] || 'User',
        avatar_url: userData.user_metadata?.['avatar_url'] || '',
        created_at: new Date().toISOString()
      };
  
      if (!environment.production) {
        localStorage.setItem('sb-local-profile', JSON.stringify(profile));
        return { data: [profile], error: null };
      }
  
      const { data, error } = await this.supabase!
        .from('user_profiles')
        .upsert(profile, { onConflict: 'id' });
  
      if (error) {
        this.errorHandler.showError('Ошибка Supabase', 'SupabaseService');
        localStorage.setItem('sb-local-profile', JSON.stringify(profile));
        return { data: [profile], error: null };
      }
  
      return { data, error: null };
    } catch (error) {
      this.errorHandler.showError('Ошибка создания профиля', 'SupabaseService'); 
      return { data: null, error: error as Error };
    }
  }

  async getProfile() {
    if (!environment.production) {
      const profile = localStorage.getItem('sb-local-profile');
      if (profile) {
        return JSON.parse(profile);
      }
      
      const mockProfile = {
        id: this.currentUser?.id || 'local-user-' + Math.random().toString(36).substring(2),
        email: this.currentUser?.email || 'local-user@example.com',
        full_name: this.currentUser?.user_metadata?.['full_name'] || 'Local User',
        phone: '',
        gender: 'unknown',
        profile_data: {}
      };
      
      localStorage.setItem('sb-local-profile', JSON.stringify(mockProfile));
      return mockProfile;
    }
    
    const { data, error } = await this.supabase!
      .from('user_profiles')
      .select('*')
      .eq('id', this.currentUser?.id)
      .single();
  
    if (error) {
      if (error.code === 'PGRST116') {
        return await this.createUserProfile(this.currentUser);
      }
      throw error;
    }
    return data;
  }
}
