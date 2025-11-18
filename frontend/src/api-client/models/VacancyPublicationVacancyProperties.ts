/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyPublicPropertyTypes } from './VacancyPublicPropertyTypes';
import type { VacancyVacancyPropertiesAppearance } from './VacancyVacancyPropertiesAppearance';
/**
 * В пропертях хранятся только признаки наличия фичи, т.е. является ли вакансия рекламной, анонимной и т.д
 */
export type VacancyPublicationVacancyProperties = {
    appearance?: VacancyVacancyPropertiesAppearance;
    /**
     * Список активн(ой/ых) проперти
     */
    properties?: Array<{
        /**
         * Время окончания действия свойства
         */
        end_time?: string;
        /**
         * Дополнительные параметры проперти
         */
        parameters?: Array<string>;
        property_type?: VacancyPublicPropertyTypes;
        /**
         * Время начала действия свойства
         */
        start_time?: string;
    }>;
};

