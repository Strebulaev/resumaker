import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private readonly STATE_KEY = 'app_state';

  constructor(private router: Router) {
    this.setupRouterListener();
  }

  private setupRouterListener(): void {
    // Сохраняем URL при каждой навигации
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.saveState({
        ...this.getState(),
        currentUrl: event.url
      });
    });
  }

  saveState(state: any): void {
    try {
      localStorage.setItem(this.STATE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving app state:', error);
    }
  }

  getState(): any {
    try {
      const state = localStorage.getItem(this.STATE_KEY);
      return state ? JSON.parse(state) : {};
    } catch (error) {
      console.error('Error loading app state:', error);
      return {};
    }
  }

  clearState(): void {
    try {
      localStorage.removeItem(this.STATE_KEY);
    } catch (error) {
      console.error('Error clearing app state:', error);
    }
  }

  getLastUrl(): string | null {
    const state = this.getState();
    return state.currentUrl || null;
  }

  // Сохраняем состояние конкретного компонента
  saveComponentState(componentId: string, state: any): void {
    const appState = this.getState();
    appState.components = appState.components || {};
    appState.components[componentId] = state;
    this.saveState(appState);
  }

  // Получаем состояние конкретного компонента
  getComponentState(componentId: string): any {
    const appState = this.getState();
    return appState.components?.[componentId] || null;
  }
}