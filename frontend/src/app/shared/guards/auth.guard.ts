import { catchError, filter, map, Observable, of, switchMap, take } from "rxjs";
import { SupabaseService } from "../db/supabase.service";
import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AppStateService } from "../state/app-state.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private appStateService: AppStateService
  ) {}

  canActivate(): Observable<boolean> {
    return this.supabase.initialized$.pipe(
      filter(initialized => initialized),
      take(1),
      switchMap(() => {
        if (this.supabase.currentUser) {
          return of(true);
        } else {
          // Сохраняем текущий URL для редиректа после логина
          const currentUrl = this.router.url;
          this.appStateService.saveState({
            ...this.appStateService.getState(),
            returnUrl: currentUrl
          });
          
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: currentUrl }
          });
          return of(false);
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}