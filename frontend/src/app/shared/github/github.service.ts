import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError, from, switchMap } from 'rxjs';
import { UsageService } from '../billing/usage.service';
import { MessageService } from 'primeng/api';

export interface GitHubAnalysisRequest {
  repoUrl: string;
  userId: string;
}

export interface GitHubAnalysisResponse {
  success: boolean;
  content: string;
  repoInfo: {
    owner: string;
    name: string;
    url: string;
  };
}

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private readonly API_BASE_URL = '/api';

  constructor(
    private http: HttpClient,
    private usageService: UsageService,
    private messageService: MessageService
  ) {}

  analyzeRepository(repoUrl: string, userId: string): Observable<GitHubAnalysisResponse> {
    return from(this.usageService.checkLimit('githubAnalyses')).pipe(
      switchMap(limitCheck => {
        if (!limitCheck.allowed) {
          const errorMsg = `Достигнут лимит анализов GitHub репозиториев. Доступно: ${limitCheck.remaining} из ${limitCheck.limit}. Обновите тариф для увеличения лимитов.`;
          this.messageService.add({
            severity: 'warn',
            summary: 'Лимит исчерпан',
            detail: errorMsg,
            life: 5000
          });
          throw new Error(errorMsg);
        }

        const request: GitHubAnalysisRequest = { repoUrl, userId };
        return this.http.post<GitHubAnalysisResponse>(`${this.API_BASE_URL}/github/analyze`, request);
      }),
      switchMap(response => {
        // Increment usage on successful analysis
        return from(this.usageService.incrementUsage('githubAnalyses')).pipe(
          map(() => response)
        );
      }),
      catchError(error => {
        console.error('GitHub analysis error:', error);
        if (error.status === 400) {
          this.messageService.add({
            severity: 'error',
            summary: 'Неверный URL',
            detail: 'Проверьте корректность ссылки на GitHub репозиторий',
            life: 5000
          });
        } else if (error.status === 404) {
          this.messageService.add({
            severity: 'error',
            summary: 'Репозиторий не найден',
            detail: 'Убедитесь, что репозиторий существует и доступен публично',
            life: 5000
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка анализа',
            detail: 'Не удалось проанализировать репозиторий. Попробуйте позже.',
            life: 5000
          });
        }
        return throwError(() => error);
      })
    );
  }

  validateGitHubUrl(url: string): boolean {
    const githubRegex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/;
    return githubRegex.test(url);
  }

  extractRepoInfo(url: string): { owner: string; name: string } | null {
    const githubRegex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/;
    const match = url.match(githubRegex);
    if (match) {
      return { owner: match[1], name: match[2] };
    }
    return null;
  }
}