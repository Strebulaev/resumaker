import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { FavoriteVacancy } from '../../../shared/favorites/favorites.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-favorite-vacancy-card',
  templateUrl: './favorite-vacancy-card.component.html',
  styleUrls: ['./favorite-vacancy-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    MarkdownModule,
    ProgressSpinnerModule,
    TooltipModule
  ]
})
export class FavoriteVacancyCardComponent {
  @Input() vacancy!: FavoriteVacancy;
  @Input() selectedResume: any = null;
  @Output() generateCoverLetter = new EventEmitter<string>();
  @Output() generateDevelopmentPlan = new EventEmitter<string>();
  @Output() generateResume = new EventEmitter<string>();
  @Output() removeFromFavorites = new EventEmitter<string>();
  @Output() sendCoverLetter = new EventEmitter<string>();

  showCoverLetterDialog = false;
  showDevelopmentPlanDialog = false;
  showResumeDialog = false;

  getVacancyPlatform(vacancy: any): string {
    if (vacancy.platform) return vacancy.platform;
    if (vacancy.alternate_url?.includes('hh.ru')) return 'hh.ru';
    if (vacancy.alternate_url?.includes('superjob.ru')) return 'superjob.ru';
    return 'unknown';
  }

  getPlatformLabel(platform: string): string {
    const platformLabels: { [key: string]: string } = {
      'hh.ru': 'HH.ru',
      'superjob.ru': 'SuperJob'
    };
    return platformLabels[platform] || platform;
  }

  getSalaryText(vacancy: any): string {
    if (!vacancy.salary) return 'Не указана';
    
    const salary = vacancy.salary;
    let text = '';
    if (salary.from) text += `от ${salary.from} `;
    if (salary.to) text += `до ${salary.to} `;
    if (salary.currency) text += salary.currency;
    
    return text.trim();
  }

  onGenerateCoverLetter(): void {
    this.generateCoverLetter.emit(this.vacancy.id);
  }

  onGenerateDevelopmentPlan(): void {
    this.generateDevelopmentPlan.emit(this.vacancy.id);
  }

  onGenerateResume(): void {
    this.generateResume.emit(this.vacancy.id);
  }

  onRemoveFromFavorites(): void {
    this.removeFromFavorites.emit(this.vacancy.id);
  }

  onSendCoverLetter(): void {
    this.sendCoverLetter.emit(this.vacancy.id);
  }

  hasGeneratedContent(): boolean {
    return !!(this.vacancy.coverLetter || this.vacancy.developmentPlan || this.vacancy.generatedResume);
  }

  getLastGeneratedTime(): string {
    if (!this.vacancy.lastGenerated) return '';
    return new Date(this.vacancy.lastGenerated).toLocaleString();
  }
}