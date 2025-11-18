import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupabaseService } from '../shared/db/supabase.service';
import { ConfigService } from '../shared/config/config.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private supabase: SupabaseService,
    private configService: ConfigService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('api.together.xyz')) {
      const config = this.configService.getConfig();
      if (!config?.togetherApiKey) {
        console.error('Together API key not configured');
        return next.handle(request);
      }
  
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${config.togetherApiKey}`
        }
      });
      return next.handle(authReq);
    }
  
    if (request.url.includes('/api/') && this.supabase.currentSession) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.supabase.currentSession.access_token}`
        }
      });
      return next.handle(authReq);
    }
  
    return next.handle(request);
  }
}