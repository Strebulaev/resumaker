import { catchError, filter, map, Observable, of, switchMap, take } from "rxjs";
import { SupabaseService } from "../db/supabase.service";
import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.supabase.initialized$.pipe(
      filter(initialized => initialized),
      take(1),
      switchMap(() => {
        if (this.supabase.currentUser) {
          return of(true);
        } else {
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: this.router.url }
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