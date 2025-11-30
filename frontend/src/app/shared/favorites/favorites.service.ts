import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, map, catchError, of } from 'rxjs';
import { Vacancy } from '../../vacancy-schema';
import { SupabaseService } from '../db/supabase.service';

export interface FavoriteVacancy extends Vacancy {
  isFavorite: boolean;
  coverLetter?: string;
  developmentPlan?: string;
  generatedResume?: string;
  lastGenerated?: string;
}

export interface FavoriteVacancyDB {
  id: string;
  user_id: string;
  vacancy_data: FavoriteVacancy;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly FAVORITES_KEY = 'favorite_vacancies';
  private favoritesSubject = new BehaviorSubject<FavoriteVacancy[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor(private supabase: SupabaseService) {
    this.loadFavorites();
  }

  private async loadFavorites(): Promise<void> {
    // Сначала пробуем загрузить из Supabase
    const dbFavorites = await this.loadFavoritesFromSupabase();
    
    if (dbFavorites.length > 0) {
      this.favoritesSubject.next(dbFavorites);
      // Мигрируем данные из localStorage если есть
      this.migrateLocalToSupabase();
    } else {
      // Fallback на localStorage
      this.loadFavoritesFromLocalStorage();
    }
  }

  private async loadFavoritesFromSupabase(): Promise<FavoriteVacancy[]> {
    if (!this.supabase.currentUser?.id) {
      return [];
    }

    try {
      const { data, error } = await this.supabase.client
        .from('favorite_vacancies')
        .select('*')
        .eq('user_id', this.supabase.currentUser.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(item => ({
        ...item.vacancy_data,
        isFavorite: true
      }));
    } catch (error) {
      console.error('Error loading favorites from Supabase:', error);
      return [];
    }
  }

  private loadFavoritesFromLocalStorage(): void {
    const favorites = localStorage.getItem(this.FAVORITES_KEY);
    if (favorites) {
      try {
        const parsedFavorites = JSON.parse(favorites);
        this.favoritesSubject.next(parsedFavorites);
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        this.favoritesSubject.next([]);
      }
    }
  }

  private async migrateLocalToSupabase(): Promise<void> {
    const localFavorites = localStorage.getItem(this.FAVORITES_KEY);
    if (!localFavorites || !this.supabase.currentUser?.id) return;

    try {
      const favorites: FavoriteVacancy[] = JSON.parse(localFavorites);
      
      for (const favorite of favorites) {
        await this.saveFavoriteToSupabase(favorite);
      }
      
      // Очищаем localStorage после успешной миграции
      localStorage.removeItem(this.FAVORITES_KEY);
      console.log('Favorites migrated from localStorage to Supabase');
    } catch (error) {
      console.error('Error migrating favorites to Supabase:', error);
    }
  }

  private async saveFavoriteToSupabase(vacancy: FavoriteVacancy): Promise<boolean> {
    if (!this.supabase.currentUser?.id) return false;

    try {
      const favoriteData = {
        user_id: this.supabase.currentUser.id,
        vacancy_data: vacancy,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await this.supabase.client
        .from('favorite_vacancies')
        .upsert(favoriteData, {
          onConflict: 'user_id,vacancy_data->>id'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving favorite to Supabase:', error);
      return false;
    }
  }

  private saveFavoriteToLocalStorage(favorites: FavoriteVacancy[]): void {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  // Публичные методы (интерфейс остается прежним)
  getFavorites(): FavoriteVacancy[] {
    return this.favoritesSubject.value;
  }

  async addToFavorites(vacancy: Vacancy): Promise<void> {
    const favorites = this.getFavorites();
    const existingIndex = favorites.findIndex(fav => fav.id === vacancy.id);
    
    if (existingIndex === -1) {
      const favoriteVacancy: FavoriteVacancy = {
        ...vacancy,
        isFavorite: true,
        lastGenerated: new Date().toISOString()
      };

      // Пробуем сохранить в Supabase
      const dbSuccess = await this.saveFavoriteToSupabase(favoriteVacancy);
      
      if (dbSuccess) {
        favorites.push(favoriteVacancy);
        this.favoritesSubject.next(favorites);
      } else {
        // Fallback на localStorage
        favorites.push(favoriteVacancy);
        this.saveFavoriteToLocalStorage(favorites);
      }
    }
  }

  async removeFromFavorites(vacancyId: string): Promise<void> {
    const favorites = this.getFavorites().filter(fav => fav.id !== vacancyId);
    
    // Пробуем удалить из Supabase
    if (this.supabase.currentUser?.id) {
      try {
        const { error } = await this.supabase.client
          .from('favorite_vacancies')
          .delete()
          .eq('user_id', this.supabase.currentUser.id)
          .eq('vacancy_data->>id', vacancyId);

        if (error) throw error;
      } catch (error) {
        console.error('Error removing favorite from Supabase:', error);
        // Fallback на localStorage
        this.saveFavoriteToLocalStorage(favorites);
        return;
      }
    }

    this.favoritesSubject.next(favorites);
    
    // Также обновляем localStorage для consistency
    this.saveFavoriteToLocalStorage(favorites);
  }

  async updateFavorite(vacancyId: string, updates: Partial<FavoriteVacancy>): Promise<void> {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(fav => fav.id === vacancyId);
    
    if (index !== -1) {
      const updatedFavorite = { ...favorites[index], ...updates };
      favorites[index] = updatedFavorite;

      // Пробуем обновить в Supabase
      const dbSuccess = await this.saveFavoriteToSupabase(updatedFavorite);
      
      if (!dbSuccess) {
        // Fallback на localStorage
        this.saveFavoriteToLocalStorage(favorites);
      } else {
        this.favoritesSubject.next(favorites);
      }
    }
  }

  isFavorite(vacancyId: string): boolean {
    return this.getFavorites().some(fav => fav.id === vacancyId);
  }

  async clearGeneratedContent(vacancyId: string, contentType: 'coverLetter' | 'developmentPlan' | 'resume'): Promise<void> {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(fav => fav.id === vacancyId);
    
    if (index !== -1) {
      const updates: Partial<FavoriteVacancy> = {};
      
      switch (contentType) {
        case 'coverLetter':
          updates.coverLetter = undefined;
          break;
        case 'developmentPlan':
          updates.developmentPlan = undefined;
          break;
        case 'resume':
          updates.generatedResume = undefined;
          break;
      }

      await this.updateFavorite(vacancyId, updates);
    }
  }

  getFavoriteById(vacancyId: string): FavoriteVacancy | undefined {
    return this.getFavorites().find(fav => fav.id === vacancyId);
  }

  // Новый метод для массовых операций
  async syncWithSupabase(): Promise<void> {
    if (!this.supabase.currentUser?.id) return;

    try {
      const { data, error } = await this.supabase.client
        .from('favorite_vacancies')
        .select('*')
        .eq('user_id', this.supabase.currentUser.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const favorites = (data || []).map(item => ({
        ...item.vacancy_data,
        isFavorite: true
      }));

      this.favoritesSubject.next(favorites);
      
      this.saveFavoriteToLocalStorage(favorites);
      
    } catch (error) {
      console.error('Error syncing favorites with Supabase:', error);
    }
  }
}