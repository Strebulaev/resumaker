import { Injectable } from '@angular/core';
import { SuperJobAuthService } from './superjob-auth.service';
import { SuperJobResumeService } from './superjob-resume.service';
import { SuperJobVacancyService } from './superjob-vacancy.service';
import { SuperJobUserService } from './superjob-user.service';

@Injectable({ providedIn: 'root' })
export class SuperJobEmployerService {
  constructor(
    private superJobAuthService: SuperJobAuthService,
    private resumeService: SuperJobResumeService,
    private vacancyService: SuperJobVacancyService,
    private userService: SuperJobUserService
  ) {}

  // Управление вакансиями
  async createVacancy(vacancyData: any) {
    return this.vacancyService.createVacancy(vacancyData);
  }

  async getClientVacancies() {
    return this.vacancyService.getClientVacancies();
  }

  async updateVacancy(vacancyId: number, updates: any) {
    return this.vacancyService.updateVacancy(vacancyId, updates);
  }

  async archiveVacancy(vacancyId: number) {
    return this.vacancyService.archiveVacancy(vacancyId);
  }

  async republishVacancy(vacancyId: number) {
    return this.vacancyService.republishVacancy(vacancyId);
  }

  // Работа с резюме
  async searchResumes(params?: any) {
    return this.resumeService.searchResumes(params);
  }

  async getResume(resumeId: number) {
    return this.resumeService.getResume(resumeId);
  }

  async buyResumeContacts(resumeId: number) {
    return this.resumeService.buyResumeContacts(resumeId);
  }

  async getResumeContacts(resumeId: number) {
    return this.resumeService.getResumeContacts(resumeId);
  }

  async sendResumeByEmail(resumeId: number, emailData: any) {
    return this.resumeService.sendResumeByEmail(resumeId, emailData);
  }

  async sendMailToResume(resumeId: number, mailData: any) {
    return this.resumeService.sendMailToResume(resumeId, mailData);
  }

  async inviteResume(resumeId: number, invitationData: any) {
    return this.resumeService.inviteResume(resumeId, invitationData);
  }

  async rejectResume(resumeId: number, rejectionData: any) {
    return this.resumeService.rejectResume(resumeId, rejectionData);
  }

  async getResumeComments(resumeId: number) {
    return this.resumeService.getResumeComments(resumeId);
  }

  async addResumeComment(resumeId: number, comment: string) {
    return this.resumeService.addResumeComment(resumeId, comment);
  }

  async deleteResumeComment(commentId: number) {
    return this.resumeService.deleteResumeComment(commentId);
  }

  // Полученные резюме
  async getReceivedResumes() {
    return this.resumeService.getReceivedResumes();
  }

  async getReceivedResumesByClient() {
    return this.resumeService.getReceivedResumesByClient();
  }

  async getReceivedResumesCounter() {
    return this.resumeService.getReceivedResumesCounter();
  }

  async getReceivedResumesByVacancy(vacancyId: number) {
    return this.resumeService.getReceivedResumesByVacancy(vacancyId);
  }

  // Управление пользователями
  async getCompanyUsers() {
    return this.userService.getCompanyUsers();
  }

  async createUser(userData: any) {
    return this.userService.createUser(userData);
  }

  async updateUser(userId: number, updates: any) {
    return this.userService.updateUser(userId, updates);
  }

  async deleteUser(userId: number) {
    return this.userService.deleteUser(userId);
  }
}