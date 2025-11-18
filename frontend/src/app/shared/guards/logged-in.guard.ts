import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../db/supabase.service';

@Injectable
({ 
  providedIn: 'root' 
})

export class LoggedInGuard implements CanActivate {
  constructor
  (
    private supabase: SupabaseService, 
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.supabase.currentUser) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}