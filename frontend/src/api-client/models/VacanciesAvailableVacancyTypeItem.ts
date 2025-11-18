/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyBillingType } from './VacancyBillingType';
import type { VacancyPublications } from './VacancyPublications';
import type { VacancyTypes } from './VacancyTypes';
export type VacanciesAvailableVacancyTypeItem = {
    /**
     * Общее количество публикаций, доступных данному менеджеру
     */
    available_publications_count: number;
    /**
     * Описание типа публикации
     */
    description: string;
    /**
     * Название типа публикации
     */
    name: string;
    publications: VacancyPublications;
    vacancy_billing_type: (Record<string, any> & VacancyBillingType);
    vacancy_types: VacancyTypes;
};

