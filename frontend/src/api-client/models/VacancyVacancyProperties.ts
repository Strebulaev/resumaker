/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyPublicPropertyTypes } from './VacancyPublicPropertyTypes';
import type { VacancyVacancyPropertiesAppearance } from './VacancyVacancyPropertiesAppearance';
export type VacancyVacancyProperties = {
    appearance?: VacancyVacancyPropertiesAppearance;
    /**
     * Свойства вакансии.
     * Доступны только менеджерам работодателя-владельца вакансии
     *
     */
    properties: Array<{
        /**
         * Время окончания действия свойства
         */
        end_time?: string;
        /**
         * Параметры свойства
         */
        parameters: Array<{
            /**
             * Имя параметра
             */
            key?: string;
            /**
             * Значение параметра
             */
            value?: string;
        }>;
        property_type: VacancyPublicPropertyTypes;
        /**
         * Время начала действия свойства
         */
        start_time?: string;
    }>;
};

