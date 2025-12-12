import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GitHubService, GitHubAnalysisResponse } from '../../../shared/github/github.service';
import { SupabaseService } from '../../../shared/db/supabase.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-github-analyze',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './github-analyze.component.html',
  styleUrls: ['./github-analyze.component.scss']
})
export class GitHubAnalyzeComponent {
  analyzeForm: FormGroup;
  isAnalyzing = false;
  analysisResult: GitHubAnalysisResponse | null = null;
  showResult = false;

  constructor(
    private fb: FormBuilder,
    private githubService: GitHubService,
    private supabase: SupabaseService,
    private messageService: MessageService
  ) {
    this.analyzeForm = this.fb.group({
      repoUrl: ['', [Validators.required, Validators.pattern(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/)]]
    });
  }

  onSubmit(): void {
    if (this.analyzeForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Неверный URL',
        detail: 'Введите корректную ссылку на GitHub репозиторий',
        life: 5000
      });
      return;
    }

    const repoUrl = this.analyzeForm.value.repoUrl;
    const userId = this.supabase.currentUser?.id;

    if (!userId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка аутентификации',
        detail: 'Необходимо войти в систему',
        life: 5000
      });
      return;
    }

    this.isAnalyzing = true;
    this.analysisResult = null;
    this.showResult = false;

    this.githubService.analyzeRepository(repoUrl, userId).pipe(
      finalize(() => this.isAnalyzing = false)
    ).subscribe({
      next: (result) => {
        this.analysisResult = result;
        this.showResult = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Анализ завершен',
          detail: 'Описание проекта успешно сгенерировано',
          life: 3000
        });
      },
      error: (error) => {
        console.error('Analysis failed:', error);
        // Error handling is done in the service
      }
    });
  }

  addToProfile(): void {
    if (!this.analysisResult) return;

    // TODO: Implement adding to profile
    this.messageService.add({
      severity: 'info',
      summary: 'В разработке',
      detail: 'Функция добавления в профиль будет реализована в ближайшее время',
      life: 3000
    });
  }

  createFullResume(): void {
    if (!this.analysisResult) return;

    // TODO: Implement creating full resume
    this.messageService.add({
      severity: 'info',
      summary: 'В разработке',
      detail: 'Функция создания полного резюме будет реализована в ближайшее время',
      life: 3000
    });
  }

  regenerate(): void {
    this.onSubmit();
  }

  reset(): void {
    this.analyzeForm.reset();
    this.analysisResult = null;
    this.showResult = false;
  }

  get repoUrl() {
    return this.analyzeForm.get('repoUrl');
  }
}