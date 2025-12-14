import { Injectable } from '@angular/core';
import { SuperJobAuthService } from './superjob-auth.service';
import { SuperJobResumeService } from './superjob-resume.service';
import { SuperJobVacancyService } from './superjob-vacancy.service';

@Injectable({ providedIn: 'root' })
export class SuperJobApplicantService {
  constructor(
    private superJobAuthService: SuperJobAuthService,
    private resumeService: SuperJobResumeService,
    private vacancyService: SuperJobVacancyService
  ) {}

  // Управление резюме
  async publishResume(resumeData: any) {
    return this.superJobAuthService.publishResume(resumeData);
  }

  async getUserResumes() {
    return this.superJobAuthService.getUserResumes();
  }

  async deleteResume(resumeId: number) {
    return this.superJobAuthService.deleteResume(resumeId);
  }

  // Поиск вакансий
  async searchVacancies(params?: any) {
    return this.superJobAuthService.getVacancies(params);
  }

  async getVacancyDetails(vacancyId: number) {
    return this.superJobAuthService.getVacancyDetails(vacancyId);
  }

  // Отклики на вакансии
  async sendApplication(vacancyId: number, resumeId: number, message: string) {
    return this.superJobAuthService.sendApplication(vacancyId, resumeId, message);
  }
}