import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { CoverLetterGenerateComponent } from './components/Generation/cover-letter-generate/cover-letter-generate.component';
import { InterviewPrepComponent } from './components/Generation/interview-prep/interview-prep.component';
import { ResumeGenerationComponent } from './components/Generation/resume-generation/resume-generation.component';
import { VacancySearchComponent } from './components/Helpers/vacancy-search/vacancy-search.component';
import { LoginComponent } from './components/Pages/auth/login/login.component';
import { HomeComponent } from './components/Pages/home/home.component';
import { NotFoundComponent } from './components/Pages/not-found/not-found.component';
import { JobPlatformsComponent } from './components/Platforms/job-platforms/job-platforms.component';

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
    path: 'auth/callback', 
    component: JobPlatformsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'auth/superjob-callback', 
    component: JobPlatformsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'auth/habr-callback', 
    component: JobPlatformsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    component: NotFoundComponent 
  }
];
