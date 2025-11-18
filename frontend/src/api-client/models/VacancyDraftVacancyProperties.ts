/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyPublicPropertyTypes } from './VacancyPublicPropertyTypes';
import type { VacancyVacancyPropertiesAppearance } from './VacancyVacancyPropertiesAppearance';
/**
 * В пропертях хранятся только признаки наличия фичи, т.е. является ли вакансия рекламной, анонимной и т.д
 */
export type VacancyDraftVacancyProperties = {
    appearance?: VacancyVacancyPropertiesAppearance;
    /**
     * Идентификатор активн(ой/ых) проперти
     */
    id?: string;
    /**
     * Список активн(ой/ых) проперти
     */
    properties?: Array<{
        /**
         * Дополнительные параметры проперти
         */
        parameters?: Array<string>;
        property_type?: VacancyPublicPropertyTypes;
    }>;
};

