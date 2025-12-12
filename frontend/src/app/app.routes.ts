import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { CoverLetterGenerateComponent } from './components/Generation/cover-letter-generate/cover-letter-generate.component';
import { InterviewPrepComponent } from './components/Generation/interview-prep/interview-prep.component';
import { ResumeGenerationComponent } from './components/Generation/resume-generation/resume-generation.component';
import { GitHubAnalyzeComponent } from './components/Generation/github-analyze/github-analyze.component';
import { VacancySearchComponent } from './components/Helpers/vacancy-search/vacancy-search.component';
import { LoginComponent } from './components/Pages/auth/login/login.component';
import { HomeComponent } from './components/Pages/home/home.component';
import { NotFoundComponent } from './components/Pages/not-found/not-found.component';
import { JobPlatformsComponent } from './components/Platforms/job-platforms/job-platforms.component';
import { PricingPlansComponent } from './components/Billing/pricing-plans/pricing-plans.component';
import { SubscriptionManagementComponent } from './components/Billing/subscription-management/subscription-management.component';
import { PaymentSuccessComponent } from './components/Billing/payment-success/payment-success.component';
import { RequisitesPageComponent } from './components/Pages/requisites-page/requisites-page.component';
import { TermsOfServiceComponent } from './components/Pages/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './components/Pages/privacy-policy/privacy-policy.component';
import { PublicOfferComponent } from './components/Pages/public-offer/public-offer.component';
import { NotificationSettingsComponent } from './components/Notifications/notification-settings/notification-settings.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/Pages/profile/profile-module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./components/Pages/about/about-module').then(m => m.AboutModule),
  },
  {
    path: 'interview-prep',
    component: InterviewPrepComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vacancy-search',
    component: VacancySearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'resume-generation',
    component: ResumeGenerationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cover-letter/generate',
    component: CoverLetterGenerateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'github/analyze',
    component: GitHubAnalyzeComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'auth/callback', 
    component: JobPlatformsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/hh-callback', 
    component: JobPlatformsComponent,
  },
  { 
    path: 'auth/superjob-callback', 
    component: JobPlatformsComponent,
  },
  { 
    path: 'auth/habr-callback', 
    component: JobPlatformsComponent,
  },
  {
    path: 'billing/pricing',
    component: PricingPlansComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'billing/subscription',
    component: SubscriptionManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment/success',
    component: PaymentSuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'requisites-page',
    component: RequisitesPageComponent,
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent
  },
  {
    path: 'privacy-policy', 
    component: PrivacyPolicyComponent
  },
  {
    path: 'public-offer',
    component: PublicOfferComponent
  },
  {
    path: 'notifications/settings',
    component: NotificationSettingsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    component: NotFoundComponent 
  }
];