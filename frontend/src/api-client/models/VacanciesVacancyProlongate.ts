/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacanciesVacancyProlongateAvailableActions } from './VacanciesVacancyProlongateAvailableActions';
import type { VacanciesVacancyProlongateUnavailableActions } from './VacanciesVacancyProlongateUnavailableActions';
export type VacanciesVacancyProlongate = {
    /**
     * Список действий, которые можно предпринять для продления вакансии
     */
    actions: Array<(VacanciesVacancyProlongateAvailableActions | VacanciesVacancyProlongateUnavailableActions)>;
    /**
     * Дата окончания публикации вакансии
     */
    expires_at: string;
    /**
     * Идентификатор вакансии
     */
    id: string;
};

