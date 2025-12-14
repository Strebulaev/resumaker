import { Injectable } from '@angular/core';
import { UserRoleService } from '../auth/user-role.service';
import { UserRole } from '../auth/user-role.model';

// HH сервисы
import { HHEmployerService } from './hh/hh-employer.service';
import { HHApplicantService } from './hh/hh-applicant.service';

// SuperJob сервисы
import { SuperJobEmployerService } from './super-job/superjob-employer.service';
import { SuperJobApplicantService } from './super-job/superjob-applicant.service';

@Injectable({ providedIn: 'root' })
export class JobPlatformService {
  constructor(
    private userRoleService: UserRoleService,
    private hhEmployerService: HHEmployerService,
    private hhApplicantService: HHApplicantService,
    private superJobEmployerService: SuperJobEmployerService,
    private superJobApplicantService: SuperJobApplicantService
  ) {}

  // Получить соответствующий сервис для HH.ru
  async getHHService() {
    const isEmployer = await this.userRoleService.isEmployer();

    if (isEmployer) {
      return this.hhEmployerService;
    } else {
      return this.hhApplicantService;
    }
  }

  // Получить соответствующий сервис для SuperJob
  async getSuperJobService() {
    const isEmployer = await this.userRoleService.isEmployer();

    if (isEmployer) {
      return this.superJobEmployerService;
    } else {
      return this.superJobApplicantService;
    }
  }

  // Универсальные методы для работы с платформами
  async getHHEmployerService(): Promise<HHEmployerService> {
    const isEmployer = await this.userRoleService.isEmployer();
    if (!isEmployer) {
      throw new Error('Доступно только для работодателей');
    }
    return this.hhEmployerService;
  }

  async getHHApplicantService(): Promise<HHApplicantService> {
    const isApplicant = await this.userRoleService.isApplicant();
    if (!isApplicant) {
      throw new Error('Доступно только для соискателей');
    }
    return this.hhApplicantService;
  }

  async getSuperJobEmployerService(): Promise<SuperJobEmployerService> {
    const isEmployer = await this.userRoleService.isEmployer();
    if (!isEmployer) {
      throw new Error('Доступно только для работодателей');
    }
    return this.superJobEmployerService;
  }

  async getSuperJobApplicantService(): Promise<SuperJobApplicantService> {
    const isApplicant = await this.userRoleService.isApplicant();
    if (!isApplicant) {
      throw new Error('Доступно только для соискателей');
    }
    return this.superJobApplicantService;
  }

  // Проверка ролей
  async getCurrentUserRole(): Promise<UserRole | null> {
    const profile = await this.userRoleService.getCurrentUserProfile();
    return profile?.role || null;
  }

  async isEmployer(): Promise<boolean> {
    return this.userRoleService.isEmployer();
  }

  async isApplicant(): Promise<boolean> {
    return this.userRoleService.isApplicant();
  }
}