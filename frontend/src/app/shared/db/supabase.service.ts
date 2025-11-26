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
  avatar_url?: string; // Добавляем поле для аватарки
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
    private errorHandler: ErrorHandlerService
  ) {}
  
  private setupAuthStateHandling(): void {
    if (!this.supabase) return;
  
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      this.session = session;
      this.userSubject.next(session?.user || null);
      
      if (event === 'SIGNED_IN') {
        // Убрали использование appStateService здесь
        
        // После OAuth аутентификации проверяем и обновляем профиль
        if (session?.user) {
          this.handleUserSignIn(session.user);
        }
        
        // Используем сохраненный returnUrl или дефолтный
        const returnUrl = this.getReturnUrl() || '/';
        console.log('Redirecting to:', returnUrl);
        
        // Небольшая задержка для гарантии завершения инициализации
        setTimeout(() => {
          this.router.navigateByUrl(returnUrl);
        }, 100);
        
      } else if (event === 'SIGNED_OUT') {
        // Убрали использование appStateService здесь
        this.router.navigate(['/login']);
      } else if (event === 'USER_UPDATED') {
        this.userSubject.next(session?.user || null);
      }
    });
  }
  
  // Обновите метод getReturnUrl:
  private getReturnUrl(): string | null {
    try {
      // Пробуем получить из URL параметров
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get('returnUrl');
      
      if (returnUrl) {
        return returnUrl;
      }
      
      // Для production можно также проверить localStorage
      if (environment.production) {
        const storedReturnUrl = localStorage.getItem('auth_return_url');
        if (storedReturnUrl) {
          localStorage.removeItem('auth_return_url'); // очищаем после использования
          return storedReturnUrl;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error getting returnUrl:', error);
      return null;
    }
  }
  private async handleUserSignIn(user: User): Promise<void> {
    try {
      // Проверяем существующий профиль
      const existingProfile = await this.getFullProfile();
      
      if (existingProfile) {
        // Если профиль уже существует, сохраняем аватарку из первого провайдера
        await this.updateProfileAvatarIfNeeded(user, existingProfile);
      } else {
        // Создаем новый профиль с аватаркой из первого провайдера
        await this.createUserProfile(user);
      }
    } catch (error) {
      console.error('Error handling user sign-in:', error);
    }
  }

  private async updateProfileAvatarIfNeeded(user: User, existingProfile: UserProfile): Promise<void> {
    // Сохраняем аватарку только если ее еще нет в профиле
    if (!existingProfile.avatar_url && user.user_metadata?.['avatar_url']) {
      const updatedProfile = {
        ...existingProfile,
        avatar_url: user.user_metadata['avatar_url'],
        updated_at: new Date().toISOString()
      };
      
      await this.saveProfileToDatabase(updatedProfile);
      console.log('Avatar updated from OAuth provider');
    }
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
      const redirectTo = environment.production 
        ? 'https://rezulution.vercel.app'
        : `${window.location.origin}/`;

      const { error } = await this.supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) throw error;
      return { data: { user: null }, error: null };
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
    
    this.router.navigate(['/']);
    
    return { data: { user: userData.user, session: mockSession }, error: null };
  }
  
  private async mockOAuthSignIn(provider: 'google' | 'github'): Promise<{ data: any; error: any }> {
    console.log(`Mock ${provider} sign-in triggered`);
    
    const mockUser = {
      id: this.generateValidUUID(),
      email: `test.${provider}@example.com`,
      user_metadata: { 
        full_name: `${provider} User`, 
        avatar_url: `https://example.com/avatars/${provider}_user.jpg`,
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
    
    this.router.navigate(['/']);
    
    return { data: { user: mockUser }, error: null };
  }

  private createSafeStorage() {
    const isLockManagerError = (error: any): boolean => {
      return error && error.message && 
             error.message.includes('Navigator LockManager') ||
             error.message.includes('lock:sb-');
    };
  
    return {
      getItem: (key: string): Promise<string | null> => {
        return new Promise((resolve) => {
          try {
            if (key.includes('auth-token') && key.includes('sb-')) {
              console.log('Skipping potentially problematic auth token access');
              resolve(null);
            } else {
              const value = localStorage.getItem(key);
              resolve(value);
            }
          } catch (error) {
            if (isLockManagerError(error)) {
              console.warn('LockManager error in getItem, skipping:', key);
              resolve(null);
            } else {
              console.warn('Storage getItem failed:', error);
              resolve(null);
            }
          }
        });
      },
      setItem: (key: string, value: string): Promise<void> => {
        return new Promise((resolve) => {
          try {
            if (key.includes('auth-token') && key.includes('sb-')) {
              console.log('Skipping potentially problematic auth token storage');
              resolve();
            } else {
              localStorage.setItem(key, value);
              resolve();
            }
          } catch (error) {
            if (isLockManagerError(error)) {
              console.warn('LockManager error in setItem, skipping:', key);
              resolve();
            } else {
              console.warn('Storage setItem failed:', error);
              resolve();
            }
          }
        });
      },
      removeItem: (key: string): Promise<void> => {
        return new Promise((resolve) => {
          try {
            localStorage.removeItem(key);
            resolve();
          } catch (error) {
            if (isLockManagerError(error)) {
              console.warn('LockManager error in removeItem, skipping:', key);
              resolve();
            } else {
              console.warn('Storage removeItem failed:', error);
              resolve();
            }
          }
        });
      }
    };
  }

  private async initAuth(): Promise<void> {
    if (!this.supabase) return;
  
    try {
      // Проверяем, есть ли OAuth callback в URL
      await this.handleOAuthCallback();
      
      const { data: { session }, error } = await this.supabase.auth.getSession();
      
      if (error) {
        console.warn('Session error:', error);
        await this.tryRecoverSession();
      } else if (session) {
        this.session = session;
        this.userSubject.next(session.user);
      }
  
      // Настраиваем обработчик изменений состояния аутентификации
      this.setupAuthStateHandling();
  
      this.initializedSubject.next(true);
  
    } catch (error) {
      console.error('Auth initialization failed:', error);
      this.initializedSubject.next(true);
    }
  }

  private async handleOAuthCallback(): Promise<void> {
    // Проверяем, есть ли параметры OAuth callback в URL
    const urlParams = new URLSearchParams(window.location.search);
    const hasAuthParams = urlParams.has('code') || urlParams.has('error');
    
    if (hasAuthParams) {
      console.log('Handling OAuth callback...');
      
      const { data, error } = await this.supabase!.auth.getSession();
      
      if (error) {
        console.error('OAuth callback error:', error);
      } else if (data.session) {
        console.log('OAuth callback successful, user:', data.session.user.email);
        
        // Очищаем URL параметры после успешной аутентификации
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }

  private async tryRecoverSession(): Promise<void> {
    try {
      const storageKey = `sb-${environment.supabaseUrl?.split('//')[1]?.split('.')[0]}-auth-token`;
      const storedSession = localStorage.getItem(storageKey);
      
      if (storedSession) {
        const session = JSON.parse(storedSession);
        if (session?.access_token && session?.expires_at > Date.now() / 1000) {
          this.session = session;
          this.userSubject.next(session.user);
          console.log('Session recovered from localStorage');
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
      return 'https://rezulution.vercel.app';
    }
    return window.location.origin;
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
        avatar_url: profileData.avatar_url, // Сохраняем аватарку
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
  
      const { data, error } = await this.supabase!
        .from('user_profiles')
        .upsert(profile, { 
          onConflict: 'id'
        })
        .select();

      if (error) {
        console.error('Supabase error saving profile:', error);
        this.errorHandler.showError('Ошибка сохранения профиля', 'SupabaseService');
        // Пробуем сохранить локально
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
      console.error('Error loading profile:', error);
      this.errorHandler.showError('Ошибка загрузки профиля', 'SupabaseService');
      return this.createDefaultProfile();
    }
  }

  private createDefaultProfile(): UserProfile {
    // Используем аватарку из первого провайдера, если есть
    const avatarUrl = this.currentUser?.user_metadata?.['avatar_url'] || '';
    
    return {
      id: this.currentUser?.id || 'local-user',
      email: this.currentUser?.email || '',
      full_name: this.currentUser?.user_metadata?.['full_name'] || 'User',
      phone: '',
      gender: 'unknown',
      avatar_url: avatarUrl, // Сохраняем аватарку по умолчанию
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
      window.location.href = '/';
    } catch (error) {
      this.errorHandler.showError('Ошибка выхода из системы', 'SupabaseService');
      this.mockSignOut();
    }
  }

  async createUserProfile(userData: any) {
    try {
      // Сохраняем аватарку из первого провайдера
      const avatarUrl = userData.user_metadata?.['avatar_url'] || '';
      
      const profile = {
        id: userData.id,
        email: userData.email || '',
        full_name: userData.user_metadata?.['full_name'] || 'User',
        avatar_url: avatarUrl, // Сохраняем аватарку
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
        console.error('Error creating user profile:', error);
        this.errorHandler.showError('Ошибка создания профиля', 'SupabaseService');
        localStorage.setItem('sb-local-profile', JSON.stringify(profile));
        return { data: [profile], error: null };
      }
  
      return { data, error: null };
    } catch (error) {
      console.error('Error creating user profile:', error);
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
        avatar_url: this.currentUser?.user_metadata?.['avatar_url'] || '',
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

  // Метод для обновления аватарки
  async updateAvatar(avatarUrl: string): Promise<{ data: any; error: any }> {
    try {
      const userId = this.currentUser?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }
  
      const { data, error } = await this.supabase!
        .from('user_profiles')
        .update({ 
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select();
  
      if (error) {
        console.error('Error updating avatar:', error);
        return { data: null, error };
      }
  
      return { data: data ? data[0] : null, error: null };
    } catch (error) {
      console.error('Error updating avatar:', error);
      return { data: null, error: error as Error };
    }
  }

  private async saveProfileToDatabase(profile: UserProfile): Promise<void> {
    if (!environment.production) {
      localStorage.setItem('sb-local-profile', JSON.stringify(profile));
      return;
    }

    const { error } = await this.supabase!
      .from('user_profiles')
      .upsert(profile, { onConflict: 'id' });

    if (error) {
      console.error('Error saving profile to database:', error);
      throw error;
    }
  }

  clearProblematicStorage(): void {
    const keysToRemove = [
      'sb-lxlzpilbbnzriywuvcnf-auth-token',
      'sb-mock-session', 
      'sb-local-profile'
    ];
    
    const allKeys = Object.keys(localStorage);
    const authKeys = allKeys.filter(key => 
      key.includes('auth') || 
      key.includes('token') || 
      key.startsWith('sb-')
    );
    
    keysToRemove.push(...authKeys);
    
    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
        console.log('Removed storage key:', key);
      } catch (e) {
        console.warn(`Failed to remove ${key}:`, e);
      }
    });
  }
}