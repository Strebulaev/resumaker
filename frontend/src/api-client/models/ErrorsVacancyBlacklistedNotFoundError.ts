/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsVacancyBlacklistedNotFoundError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsVacancyBlacklistedNotFoundError.type;
    /**
     * Название поля с ошибкой. Возможные значения:
     * * `not_found` — вакансия для добавления в список не найдена
     *
     */
    value: ErrorsVacancyBlacklistedNotFoundError.value;
};
export namespace ErrorsVacancyBlacklistedNotFoundError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        VACANCIES_BLACKLIST = 'vacancies_blacklist',
    }
    /**
     * Название поля с ошибкой. Возможные значения:
     * * `not_found` — вакансия для добавления в список не найдена
     *
     */
    export enum value {
        NOT_FOUND = 'not_found',
    }
}

