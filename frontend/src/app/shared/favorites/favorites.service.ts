import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vacancy } from '../../vacancy-schema';

export interface FavoriteVacancy extends Vacancy {
  isFavorite: boolean;
  coverLetter?: string;
  developmentPlan?: string;
  generatedResume?: string;
  lastGenerated?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly FAVORITES_KEY = 'favorite_vacancies';
  private favoritesSubject = new BehaviorSubject<FavoriteVacancy[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const favorites = localStorage.getItem(this.FAVORITES_KEY);
    if (favorites) {
      try {
        const parsedFavorites = JSON.parse(favorites);
        this.favoritesSubject.next(parsedFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
        this.favoritesSubject.next([]);
      }
    }
  }

  getFavorites(): FavoriteVacancy[] {
    return this.favoritesSubject.value;
  }

  addToFavorites(vacancy: Vacancy): void {
    const favorites = this.getFavorites();
    const existingIndex = favorites.findIndex(fav => fav.id === vacancy.id);
    
    if (existingIndex === -1) {
      const favoriteVacancy: FavoriteVacancy = {
        ...vacancy,
        isFavorite: true,
        lastGenerated: new Date().toISOString()
      };
      favorites.push(favoriteVacancy);
      this.saveFavorites(favorites);
    }
  }

  removeFromFavorites(vacancyId: string): void {
    const favorites = this.getFavorites().filter(fav => fav.id !== vacancyId);
    this.saveFavorites(favorites);
  }

  updateFavorite(vacancyId: string, updates: Partial<FavoriteVacancy>): void {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(fav => fav.id === vacancyId);
    
    if (index !== -1) {
      favorites[index] = { ...favorites[index], ...updates };
      this.saveFavorites(favorites);
    }
  }

  isFavorite(vacancyId: string): boolean {
    return this.getFavorites().some(fav => fav.id === vacancyId);
  }

  private saveFavorites(favorites: FavoriteVacancy[]): void {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  clearGeneratedContent(vacancyId: string, contentType: 'coverLetter' | 'developmentPlan' | 'resume'): void {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(fav => fav.id === vacancyId);
    
    if (index !== -1) {
      switch (contentType) {
        case 'coverLetter':
          favorites[index].coverLetter = undefined;
          break;
        case 'developmentPlan':
          favorites[index].developmentPlan = undefined;
          break;
        case 'resume':
          favorites[index].generatedResume = undefined;
          break;
      }
      this.saveFavorites(favorites);
    }
  }

  getFavoriteById(vacancyId: string): FavoriteVacancy | undefined {
    return this.getFavorites().find(fav => fav.id === vacancyId);
  }
}