import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, AuthSession, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from '../config/config.service';
import { AppStateService } from '../state/app-state.service';
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
  private userSubject = new BehaviorSubject<User | null>(null);
  private _initialized = false;
  private initializedSubject = new BehaviorSubject<boolean>(false);
  public initialized$: Observable<boolean> = this.initializedSubject.asObservable();
  
  get initialized(): boolean {
    return this.initializedSubject.value;
  }

  constructor(
    private router: Router, 
    private appStateService: AppStateService,
    private errorHandler: ErrorHandlerService
  ) {
    this.setupAuthStateHandling();
  }

  private setupAuthStateHandling(): void {
    if (!this.supabase) return;
    
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
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
        
        // После OAuth входа мы попадаем на /login?returnUrl=...
        // Нужно перенаправить на главную или профиль
        const currentUrl = this.router.url;
        if (currentUrl.includes('/login') || currentUrl.includes('/auth/callback')) {
          console.log('Redirecting after sign in to /profile/view');
          this.router.navigate(['/profile/view']);
        }
      } else if (event === 'SIGNED_OUT') {
        this.appStateService.clearState();
        this.router.navigate(['/login']);
      } else if (event === 'USER_UPDATED') {
        this.userSubject.next(session?.user || null);
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

      if (!config.supabaseUrl || !config.supabaseKey) {
        console.warn('Supabase configuration missing, using mock mode');
        this.setupMockAuth();
        return;
      }

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
          flowType: 'pkce',
          storage: this.createSafeStorage()
        }
      });

      await this.initAuth();

    } catch (error) {
      console.error('Supabase initialization failed, using mock mode:', error);
      this.setupMockAuth();
    }
  }

  async signUpWithPassword(email: string, password: string): Promise<{ data: any; error: any }> {
    if (!this.supabase) {
      return this.mockSignUpWithPassword(email, password);
    }
  
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: this.getRedirectUri(),
          data: {
            email: email,
            full_name: email.split('@')[0]
          }
        }
      });
  
      if (error) throw error;
      
      // Создаем профиль пользователя после успешной регистрации
      if (data.user) {
        await this.createUserProfile(data.user);
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Password sign-up error, using mock:', error);
      return this.mockSignUpWithPassword(email, password);
    }
  }
  
  async signInWithPassword(email: string, password: string): Promise<{ data: any; error: any }> {
    if (!this.supabase) {
      return this.mockSignInWithPassword(email, password);
    }
  
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });
  
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Password sign-in error, using mock:', error);
      return this.mockSignInWithPassword(email, password);
    }
  }
  
  async signInWithOAuth(provider: 'google' | 'github'): Promise<{ data: any; error: any }> {
    if (!this.supabase) {
      return this.mockOAuthSignIn(provider);
    }
  
    try {
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: this.getRedirectUri(),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
  
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error(`${provider} OAuth error, using mock:`, error);
      return this.mockOAuthSignIn(provider);
    }
  }
  
  private async mockSignUpWithPassword(email: string, password: string): Promise<{ data: any; error: any }> {
    console.log('Mock password sign-up triggered for:', email);
    
    const existingUsers = JSON.parse(localStorage.getItem('sb-mock-users') || '{}');
    if (existingUsers[email]) {
      return { 
        data: null, 
        error: { message: 'User already exists' } 
      };
    }
  
    const mockUser = {
      id: this.generateValidUUID(),
      email: email,
      user_metadata: { 
        full_name: email.split('@')[0], 
        avatar_url: 'default_avatar.jpg',
        provider: 'email'
      },
      app_metadata: { provider: 'email' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      role: 'authenticated',
      updated_at: new Date().toISOString()
    };
  
    existingUsers[email] = {
      user: mockUser,
      password: password
    };
    
    localStorage.setItem('sb-mock-users', JSON.stringify(existingUsers));
    
    await this.createUserProfile(mockUser);
    
    return { 
      data: { user: mockUser }, 
      error: null 
    };
  }
  
  private async mockSignInWithPassword(email: string, password: string): Promise<{ data: any; error: any }> {
    console.log('Mock password sign-in triggered for:', email);
    
    const existingUsers = JSON.parse(localStorage.getItem('sb-mock-users') || '{}');
    const userData = existingUsers[email];
    
    if (!userData) {
      return { 
        data: null, 
        error: { message: 'Invalid login credentials' } 
      };
    }
  
    if (userData.password !== password) {
      return { 
        data: null, 
        error: { message: 'Invalid login credentials' } 
      };
    }
  
    const mockSession: any = {
      user: userData.user,
      access_token: 'mock-access-token-' + Math.random().toString(36).substring(2),
      refresh_token: 'mock-refresh-token-' + Math.random().toString(36).substring(2),
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer' as const
    };
  
    localStorage.setItem('sb-mock-session', JSON.stringify(mockSession));
    this.session = mockSession;
    this.userSubject.next(userData.user);
    
    this.router.navigate(['/profile/view']);
    
    return { data: { user: userData.user, session: mockSession }, error: null };
  }
  
  private async mockOAuthSignIn(provider: 'google' | 'github'): Promise<{ data: any; error: any }> {
    console.log(`Mock ${provider} sign-in triggered`);
    
    const mockUser = {
      id: this.generateValidUUID(),
      email: `test.${provider}@example.com`,
      user_metadata: { 
        full_name: `${provider} User`, 
        avatar_url: 'default_avatar.jpg',
        provider: provider
      },
      app_metadata: { provider: provider },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      role: 'authenticated',
      updated_at: new Date().toISOString()
    };
  
    const mockSession: any = {
      user: mockUser,
      access_token: 'mock-access-token-' + Math.random().toString(36).substring(2),
      refresh_token: 'mock-refresh-token-' + Math.random().toString(36).substring(2),
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer' as const
    };
  
    localStorage.setItem('sb-mock-session', JSON.stringify(mockSession));
    this.session = mockSession;
    this.userSubject.next(mockUser);
    
    await this.createUserProfile(mockUser);
    
    this.router.navigate(['/profile/view']);
    
    return { data: { user: mockUser }, error: null };
  }

  private createSafeStorage() {
    return {
      getItem: (key: string): Promise<string | null> => {
        return new Promise((resolve) => {
          try {
            const value = localStorage.getItem(key);
            resolve(value);
          } catch (error) {
            console.warn('Storage getItem failed:', error);
            resolve(null);
          }
        });
      },
      setItem: (key: string, value: string): Promise<void> => {
        return new Promise((resolve) => {
          try {
            localStorage.setItem(key, value);
            resolve();
          } catch (error) {
            console.warn('Storage setItem failed:', error);
            resolve();
          }
        });
      },
      removeItem: (key: string): Promise<void> => {
        return new Promise((resolve) => {
          try {
            localStorage.removeItem(key);
            resolve();
          } catch (error) {
            console.warn('Storage removeItem failed:', error);
            resolve();
          }
        });
      }
    };
  }

  private async initAuth(): Promise<void> {
    if (!this.supabase) return;
  
    try {
      // Получаем текущую сессию
      const { data: { session }, error } = await this.supabase.auth.getSession();
      
      if (error) {
        console.warn('Session error:', error);
        await this.tryRecoverSession();
      } else if (session) {
        this.session = session;
        this.userSubject.next(session.user);
        console.log('Session found for user:', session.user.email);
      }

      // Обрабатываем OAuth callback если мы на странице логина с токенами
      await this.handleOAuthCallback();
  
      // Настраиваем обработчик изменений состояния аутентификации
      this.setupAuthStateHandling();
  
      this.initializedSubject.next(true);
  
    } catch (error) {
      console.error('Auth initialization failed:', error);
      this.initializedSubject.next(true);
    }
  }

  private async handleOAuthCallback(): Promise<void> {
    // Проверяем, есть ли OAuth токены в URL
    const hash = window.location.hash;
    const search = window.location.search;
    
    if (hash.includes('access_token') || search.includes('access_token')) {
      console.log('OAuth callback detected, processing...');
      
      try {
        const { data, error } = await this.supabase!.auth.getSession();
        if (error) {
          console.error('OAuth callback error:', error);
        } else if (data.session) {
          console.log('OAuth callback successful for user:', data.session.user.email);
          // Сессия автоматически установится через auth state change
        }
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
      }
    }
  }

  private async tryRecoverSession(): Promise<void> {
    try {
      // Пробуем найти сессию в localStorage
      const allKeys = Object.keys(localStorage);
      const sessionKey = allKeys.find(key => key.includes('supabase.auth.token'));
      
      if (sessionKey) {
        const storedSession = localStorage.getItem(sessionKey);
        if (storedSession) {
          const session = JSON.parse(storedSession);
          if (session?.access_token && session?.expires_at > Date.now() / 1000) {
            this.session = session;
            this.userSubject.next(session.user);
            console.log('Session recovered from localStorage');
          }
        }
      }
    } catch (error) {
      console.warn('Session recovery failed:', error);
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
  
      // Используем upsert без .select() чтобы избежать ошибок
      const { error } = await this.supabase!
        .from('user_profiles')
        .upsert(profile, { 
          onConflict: 'id'
        });

      if (error) {
        console.error('Supabase error saving profile:', error);
        // Сохраняем локально как fallback
        localStorage.setItem('sb-local-profile', JSON.stringify(profile));
        return { data: profile, error: null };
      }
  
      return { data: profile, error: null };
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
      this.clearProblematicStorage();
      await this.supabase.auth.signOut();
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
  
      const { error } = await this.supabase!
        .from('user_profiles')
        .upsert(profile, { onConflict: 'id' });
  
      if (error) {
        console.error('Supabase error creating profile:', error);
        localStorage.setItem('sb-local-profile', JSON.stringify(profile));
        return { data: [profile], error: null };
      }
  
      return { data: [profile], error: null };
    } catch (error) {
      console.error('Error creating profile:', error);
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

  clearProblematicStorage(): void {
    const keysToRemove = [
      'sb-mock-session', 
      'sb-local-profile'
    ];
    
    // Добавляем поиск всех ключей Supabase
    const allKeys = Object.keys(localStorage);
    const supabaseKeys = allKeys.filter(key => key.startsWith('sb-'));
    keysToRemove.push(...supabaseKeys);
    
    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key);
        console.log('Removed storage key:', key);
      } catch (e) {
        console.warn(`Failed to remove ${key}:`, e);
      }
    });
  }
}