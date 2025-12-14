import { Injectable } from '@angular/core';
import { HHAuthService } from './hh-auth.service';
import { HHNegotiationsService } from './hh-negotiations.service';
import { HHVacancyManagementService } from './hh-vacancy-management.service';
import { HHResumeSearchService } from './hh-resume-search.service';
import { HHResumeViewingService } from './hh-resume-viewing.service';
import { HHSavedSearchesResumesService } from './hh-saved-searches-resumes.service';
import { HHEmployersService } from './hh-employers.service';
import { HHDictionariesService } from './hh-dictionaries.service';
import { HHSuggestsService } from './hh-suggests.service';

@Injectable({ providedIn: 'root' })
export class HHEmployerService {
  constructor(
    private hhAuthService: HHAuthService,
    private negotiationsService: HHNegotiationsService,
    private vacancyManagementService: HHVacancyManagementService,
    private resumeSearchService: HHResumeSearchService,
    private resumeViewingService: HHResumeViewingService,
    private savedSearchesResumesService: HHSavedSearchesResumesService,
    private employersService: HHEmployersService,
    private dictionariesService: HHDictionariesService,
    private suggestsService: HHSuggestsService
  ) {}

  // Управление вакансиями
  async createVacancy(vacancyData: any) {
    return this.vacancyManagementService.createVacancy(vacancyData);
  }

  async getActiveVacancies(employerId: string, params?: any) {
    return this.vacancyManagementService.getActiveVacancies(employerId, params);
  }

  async getVacancy(vacancyId: string) {
    return this.vacancyManagementService.getVacancy(vacancyId);
  }

  async updateVacancy(vacancyId: string, updates: any) {
    return this.vacancyManagementService.updateVacancy(vacancyId, updates);
  }

  async archiveVacancy(employerId: string, vacancyId: string) {
    return this.vacancyManagementService.archiveVacancy(employerId, vacancyId);
  }

  async getVacancyStats(vacancyId: string) {
    return this.vacancyManagementService.getVacancyStats(vacancyId);
  }

  // Отклики и приглашения
  async getNegotiationsResponse(params?: any) {
    return this.negotiationsService.getNegotiationsResponse(params);
  }

  async getNegotiation(id: string) {
    return this.negotiationsService.getNegotiation(id);
  }

  async updateNegotiation(id: string, action: any) {
    return this.negotiationsService.updateNegotiation(id, action);
  }

  async markNegotiationsAsRead(data: any) {
    return this.negotiationsService.markNegotiationsAsRead(data);
  }

  async getNegotiationsStatistics(employerId: string) {
    return this.negotiationsService.getNegotiationsStatistics(employerId);
  }

  // Поиск резюме
  async searchResumes(params?: any) {
    return this.resumeSearchService.searchResumes(params);
  }

  async getResume(resumeId: string) {
    return this.resumeViewingService.getResume(resumeId);
  }

  async getResumeNegotiationsHistory(resumeId: string) {
    return this.resumeViewingService.getResumeNegotiationsHistory(resumeId);
  }

  // Сохраненные поиски
  async getSavedSearches() {
    return this.savedSearchesResumesService.getSavedSearches();
  }

  async createSavedSearch(searchData: any) {
    return this.savedSearchesResumesService.createSavedSearch(searchData);
  }

  async updateSavedSearch(id: string, updates: any) {
    return this.savedSearchesResumesService.updateSavedSearch(id, updates);
  }

  async deleteSavedSearch(id: string) {
    return this.savedSearchesResumesService.deleteSavedSearch(id);
  }

  // Справочники
  async getDictionaries() {
    return this.dictionariesService.getDictionaries();
  }

  async getProfessionalRoles() {
    return this.dictionariesService.getProfessionalRoles();
  }

  async getIndustries() {
    return this.dictionariesService.getIndustries();
  }

  // Подсказки
  async getPositionSuggestions(params?: any) {
    return this.suggestsService.getPositionSuggestions(params);
  }

  async getProfessionalRoleSuggestions(params?: any) {
    return this.suggestsService.getProfessionalRoleSuggestions(params);
  }

  async getSkillSetSuggestions(params?: any) {
    return this.suggestsService.getSkillSetSuggestions(params);
  }

  // Информация о работодателе
  async getEmployer(employerId: string) {
    return this.employersService.getEmployer(employerId);
  }
}