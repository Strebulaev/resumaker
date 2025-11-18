/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsVacancyError = {
    /**
     * Количество найденных дублей вакансии
     */
    found?: number;
    /**
     * Массив идентификаторов вакансий-дублей
     */
    items?: Array<{
        /**
         * Идентификатор вакансии
         */
        id: number;
    }>;
    /**
     * Причина ошибки
     */
    reason?: string;
    /**
     * Тип ошибки
     */
    type: string;
    /**
     * Наименование поля с ошибкой
     */
    value: string;
};

