import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';
import { BillingService } from '../../../shared/billing/billing.service';
import { UsageService } from '../../../shared/billing/usage.service';
import { TariffPlan, UserSubscription } from '../../../shared/billing/billing.models';
import { ProgressSpinner } from "primeng/progressspinner";

@Component({
  selector: 'app-subscription-management',
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ProgressBarModule,
    ProgressSpinner,
    TranslatePipe
  ]
})
export class SubscriptionManagementComponent implements OnInit, OnDestroy {
  currentSubscription: UserSubscription | null = null;
  currentPlan: TariffPlan | null = null;
  usageStats: any[] = [];
  isLoading = true;

  constructor(
    private billingService: BillingService,
    private usageService: UsageService,
    private messageService: MessageService,
    private router: Router
  ) {
    console.log('SubscriptionManagementComponent constructor');
  }

  async ngOnInit() {
    console.log('SubscriptionManagementComponent ngOnInit');
    try {
      await this.loadSubscriptionData();
    } catch (error) {
      console.error('Error in ngOnInit:', error);
      this.isLoading = false;
    }
  }

  async loadSubscriptionData() {
    try {
      console.log('Loading subscription data...');
      
      this.currentSubscription = await this.billingService.getUserSubscription();
      console.log('Current subscription:', this.currentSubscription);
      
      this.currentPlan = this.billingService.getCurrentPlan();
      console.log('Current plan:', this.currentPlan);
      
      this.usageStats = await this.usageService.getUsageStats();
      console.log('Usage stats:', this.usageStats);
      
    } catch (error) {
      console.error('Error loading subscription data:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось загрузить данные подписки'
      });
    } finally {
      this.isLoading = false;
    }
  }

  getProgressPercentage(used: number, limit: number): number {
    if (limit === -1) return 0;
    if (used >= limit) return 100;
    return (used / limit) * 100;
  }

  getProgressSeverity(used: number, limit: number): string {
    if (limit === -1) return 'success';
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warn';
    return 'success';
  }

  upgradePlan() {
    this.router.navigate(['/billing/pricing']);
  }

  getDaysRemaining(): number {
    if (!this.currentSubscription) return 0;
    const end = new Date(this.currentSubscription.currentPeriodEnd);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  isTrial(): boolean {
    return this.currentPlan?.id === 'free';
  }

  ngOnDestroy() {
    console.log('SubscriptionManagementComponent destroyed');
  }
}