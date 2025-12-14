import { Injectable } from '@angular/core';
import { HHAuthService } from './hh-auth.service';
import { HHApplicantNegotiationsService } from './hh-applicant-negotiations.service';
import { HHResumeManagementService } from './hh-resume-management.service';
import { HHResumeVisibilityService } from './hh-resume-visibility.service';
import { HHResumeSimilarVacanciesService } from './hh-resume-similar-vacancies.service';
import { HHHiddenVacanciesService } from './hh-hidden-vacancies.service';
import { HHFavoritedVacanciesService } from './hh-favorited-vacancies.service';
import { HHSavedSearchesVacanciesService } from './hh-saved-searches-vacancies.service';
import { HHUserService } from './hh-user.service';
import { HHArtifactsService } from './hh-artifacts.service';
import { HHResumeProfileService } from './hh-resume-profile.service';
import { HHDictionariesService } from './hh-dictionaries.service';
import { HHSuggestsService } from './hh-suggests.service';

@Injectable({ providedIn: 'root' })
export class HHApplicantService {
  constructor(
    private hhAuthService: HHAuthService,
    private applicantNegotiationsService: HHApplicantNegotiationsService,
    private resumeManagementService: HHResumeManagementService,
    private resumeVisibilityService: HHResumeVisibilityService,
    private resumeSimilarVacanciesService: HHResumeSimilarVacanciesService,
    private hiddenVacanciesService: HHHiddenVacanciesService,
    private favoritedVacanciesService: HHFavoritedVacanciesService,
    private savedSearchesVacanciesService: HHSavedSearchesVacanciesService,
    private userService: HHUserService,
    private artifactsService: HHArtifactsService,
    private resumeProfileService: HHResumeProfileService,
    private dictionariesService: HHDictionariesService,
    private suggestsService: HHSuggestsService
  ) {}

  // Управление резюме
  async createResume(resumeData: any) {
    return this.resumeManagementService.createResume(resumeData);
  }

  async updateResume(resumeId: string, updates: any) {
    return this.resumeManagementService.updateResume(resumeId, updates);
  }

  async deleteResume(resumeId: string) {
    return this.resumeManagementService.deleteResume(resumeId);
  }

  async publishResume(resumeId: string) {
    return this.resumeManagementService.publishResume(resumeId);
  }

  async getUserResumes() {
    return this.resumeManagementService.getUserResumes();
  }

  async getResumeStatus(resumeId: string) {
    return this.resumeManagementService.getResumeStatus(resumeId);
  }

  async getResumeViews(resumeId: string) {
    return this.resumeManagementService.getResumeViews(resumeId);
  }

  // Видимость резюме
  async getAccessTypes(resumeId: string) {
    return this.resumeVisibilityService.getAccessTypes(resumeId);
  }

  async getVisibilityList(resumeId: string, listType: string) {
    return this.resumeVisibilityService.getVisibilityList(resumeId, listType);
  }

  async addEmployersToList(resumeId: string, listType: string, employers: any[]) {
    return this.resumeVisibilityService.addEmployersToList(resumeId, listType, employers);
  }

  async removeEmployerFromList(resumeId: string, listType: string, employerId: string) {
    return this.resumeVisibilityService.removeEmployerFromList(resumeId, listType, employerId);
  }

  async clearVisibilityList(resumeId: string, listType: string) {
    return this.resumeVisibilityService.clearVisibilityList(resumeId, listType);
  }

  async searchEmployersForList(resumeId: string, listType: string, query: string) {
    return this.resumeVisibilityService.searchEmployersForList(resumeId, listType, query);
  }

  // Отклики и переписка
  async applyToVacancy(vacancyId: string, resumeId: string, message: string) {
    return this.applicantNegotiationsService.applyToVacancy(vacancyId, resumeId, message);
  }

  async getNegotiations(params?: any) {
    return this.applicantNegotiationsService.getNegotiations(params);
  }

  async sendNegotiationMessage(nid: string, message: string) {
    return this.applicantNegotiationsService.sendNegotiationMessage(nid, message);
  }

  async getNegotiationMessages(nid: string) {
    return this.applicantNegotiationsService.getNegotiationMessages(nid);
  }

  async editNegotiationMessage(nid: string, mid: string, message: string) {
    return this.applicantNegotiationsService.editNegotiationMessage(nid, mid, message);
  }

  async hideNegotiation(nid: string, declineMessage?: boolean) {
    return this.applicantNegotiationsService.hideNegotiation(nid, declineMessage);
  }

  // Похожие вакансии
  async getSimilarVacancies(resumeId: string) {
    return this.resumeSimilarVacanciesService.getSimilarVacancies(resumeId);
  }

  // Скрытые вакансии
  async getBlacklistedVacancies() {
    return this.hiddenVacanciesService.getBlacklistedVacancies();
  }

  async addVacancyToBlacklist(vacancyId: string) {
    return this.hiddenVacanciesService.addVacancyToBlacklist(vacancyId);
  }

  async removeVacancyFromBlacklist(vacancyId: string) {
    return this.hiddenVacanciesService.removeVacancyFromBlacklist(vacancyId);
  }

  // Избранные вакансии
  async getFavoritedVacancies() {
    return this.favoritedVacanciesService.getFavoritedVacancies();
  }

  async addVacancyToFavorites(vacancyId: string) {
    return this.favoritedVacanciesService.addVacancyToFavorites(vacancyId);
  }

  async removeVacancyFromFavorites(vacancyId: string) {
    return this.favoritedVacanciesService.removeVacancyFromFavorites(vacancyId);
  }

  // Сохраненные поиски вакансий
  async getSavedSearches() {
    return this.savedSearchesVacanciesService.getSavedSearches();
  }

  async createSavedSearch(searchData: any) {
    return this.savedSearchesVacanciesService.createSavedSearch(searchData);
  }

  async updateSavedSearch(id: string, updates: any) {
    return this.savedSearchesVacanciesService.updateSavedSearch(id, updates);
  }

  async deleteSavedSearch(id: string) {
    return this.savedSearchesVacanciesService.deleteSavedSearch(id);
  }

  // Информация о пользователе
  async getCurrentUser() {
    return this.userService.getCurrentUser();
  }

  async updateCurrentUser(userData: any) {
    return this.userService.updateCurrentUser(userData);
  }

  // Артефакты (фото, портфолио)
  async uploadArtifact(artifactData: FormData) {
    return this.artifactsService.uploadArtifact(artifactData);
  }

  async getPhotos() {
    return this.artifactsService.getPhotos();
  }

  async getPortfolio() {
    return this.artifactsService.getPortfolio();
  }

  async getPhotoConditions() {
    return this.artifactsService.getPhotoConditions();
  }

  async getPortfolioConditions() {
    return this.artifactsService.getPortfolioConditions();
  }

  async updateArtifact(id: string, updates: any) {
    return this.artifactsService.updateArtifact(id, updates);
  }

  async deleteArtifact(id: string) {
    return this.artifactsService.deleteArtifact(id);
  }

  // Резюме-профиль
  async createResumeProfile(profileData: any) {
    return this.resumeProfileService.createResumeProfile(profileData);
  }

  async getResumeProfileSchema(resumeId: string) {
    return this.resumeProfileService.getResumeProfileSchema(resumeId);
  }

  async updateResumeProfile(resumeId: string, updates: any) {
    return this.resumeProfileService.updateResumeProfile(resumeId, updates);
  }

  async getResumeProfileDictionaries() {
    return this.resumeProfileService.getResumeProfileDictionaries();
  }

  // Справочники
  async getDictionaries() {
    return this.dictionariesService.getDictionaries();
  }

  async getLanguages() {
    return this.dictionariesService.getLanguages();
  }

  async getSkills() {
    return this.dictionariesService.getSkills();
  }

  async getEducationalInstitutions() {
    return this.dictionariesService.getEducationalInstitutions();
  }

  async getAreas() {
    return this.dictionariesService.getAreas();
  }

  async getCountries() {
    return this.dictionariesService.getCountries();
  }

  async getMetro() {
    return this.dictionariesService.getMetro();
  }

  async getDistricts() {
    return this.dictionariesService.getDistricts();
  }

  // Подсказки
  async getPositionSuggestions(params?: any) {
    return this.suggestsService.getPositionSuggestions(params);
  }

  async getVacancyPositionSuggestions(params?: any) {
    return this.suggestsService.getVacancyPositionSuggestions(params);
  }

  async getSkillSetSuggestions(params?: any) {
    return this.suggestsService.getSkillSetSuggestions(params);
  }

  async getEducationalInstitutionsSuggestions(params?: any) {
    return this.suggestsService.getEducationalInstitutionsSuggestions(params);
  }

  async getCompaniesSuggestions(params?: any) {
    return this.suggestsService.getCompaniesSuggestions(params);
  }

  async getAreasSuggestions(params?: any) {
    return this.suggestsService.getAreasSuggestions(params);
  }

  async getAreaLeavesSuggestions(params?: any) {
    return this.suggestsService.getAreaLeavesSuggestions(params);
  }
}