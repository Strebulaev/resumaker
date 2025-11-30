import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './db/supabase.service';

export interface PlatformToken {
  platform: 'hh' | 'superjob' | 'habr';
  access_token: string;
  refresh_token?: string;
  expires_at: number;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlatformTokensService {
  private tokensSubject = new BehaviorSubject<PlatformToken[]>([]);
  public tokens$ = this.tokensSubject.asObservable();

  constructor(private supabase: SupabaseService) {
    this.loadTokens();
  }

  private async loadTokens(): Promise<void> {
    // Сначала пробуем загрузить из базы
    const dbTokens = await this.loadTokensFromSupabase();
    
    if (dbTokens.length > 0) {
      this.tokensSubject.next(dbTokens);
      // Мигрируем из localStorage если есть
      this.migrateTokensFromLocalStorage();
    } else {
      // Fallback на localStorage
      this.loadTokensFromLocalStorage();
    }
  }

  private async loadTokensFromSupabase(): Promise<PlatformToken[]> {
    if (!this.supabase.currentUser?.id) return [];

    try {
      const { data, error } = await this.supabase.client
        .from('platform_tokens')
        .select('*')
        .eq('user_id', this.supabase.currentUser.id);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error loading tokens from Supabase:', error);
      return [];
    }
  }

  private loadTokensFromLocalStorage(): void {
    const tokens: PlatformToken[] = [];
    
    // HH.ru token
    const hhToken = localStorage.getItem('hh_access_token');
    if (hhToken) {
      tokens.push({
        platform: 'hh',
        access_token: hhToken,
        expires_at: Date.now() + 3600000, // Примерное время
        token_type: 'bearer'
      });
    }

    // SuperJob token
    const sjToken = localStorage.getItem('superjob_access_token');
    if (sjToken) {
      tokens.push({
        platform: 'superjob',
        access_token: sjToken,
        expires_at: Date.now() + 3600000,
        token_type: 'bearer'
      });
    }

    this.tokensSubject.next(tokens);
  }

  async getToken(platform: string): Promise<string | null> {
    const tokens = this.tokensSubject.value;
    const token = tokens.find(t => t.platform === platform);
    
    if (token && token.expires_at > Date.now()) {
      return token.access_token;
    }
    
    // Если токен устарел, пробуем обновить
    if (token && token.refresh_token) {
      const newToken = await this.refreshToken(platform, token.refresh_token);
      return newToken;
    }
    
    return null;
  }

  async saveToken(platform: string, tokenData: Partial<PlatformToken>): Promise<void> {
    if (!this.supabase.currentUser?.id) {
      // Fallback на localStorage
      localStorage.setItem(`${platform}_access_token`, tokenData.access_token!);
      return;
    }

    try {
      const token: PlatformToken = {
        platform: platform as any,
        access_token: tokenData.access_token!,
        refresh_token: tokenData.refresh_token,
        expires_at: tokenData.expires_at || Date.now() + 3600000,
        token_type: tokenData.token_type || 'bearer'
      };

      const { error } = await this.supabase.client
        .from('platform_tokens')
        .upsert({
          user_id: this.supabase.currentUser.id,
          ...token
        }, {
          onConflict: 'user_id,platform'
        });

      if (error) throw error;

      // Обновляем локальное состояние
      const tokens = this.tokensSubject.value.filter(t => t.platform !== platform);
      tokens.push(token);
      this.tokensSubject.next(tokens);

    } catch (error) {
      console.error('Error saving token to Supabase:', error);
      // Fallback на localStorage
      localStorage.setItem(`${platform}_access_token`, tokenData.access_token!);
    }
  }

  private async refreshToken(platform: string, refreshToken: string): Promise<string | null> {
    // Реализация обновления токена
    // Зависит от конкретной платформы
    return null;
  }

  private async migrateTokensFromLocalStorage(): Promise<void> {
    if (!this.supabase.currentUser?.id) return;

    const tokens: PlatformToken[] = [];
    
    // Мигрируем HH.ru токен
    const hhToken = localStorage.getItem('hh_access_token');
    if (hhToken) {
      await this.saveToken('hh', {
        access_token: hhToken,
        expires_at: Date.now() + 3600000,
        token_type: 'bearer'
      });
      localStorage.removeItem('hh_access_token');
    }

    // Мигрируем SuperJob токен
    const sjToken = localStorage.getItem('superjob_access_token');
    if (sjToken) {
      await this.saveToken('superjob', {
        access_token: sjToken,
        expires_at: Date.now() + 3600000,
        token_type: 'bearer'
      });
      localStorage.removeItem('superjob_access_token');
    }
  }
}