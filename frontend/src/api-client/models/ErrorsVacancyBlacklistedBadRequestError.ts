/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsVacancyBlacklistedBadRequestError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsVacancyBlacklistedBadRequestError.type;
    /**
     * Название поля с ошибкой:
     *
     * * `limit_exceeded` — превышен лимит на количество вакансий в списке скрытых
     *
     */
    value?: ErrorsVacancyBlacklistedBadRequestError.value;
};
export namespace ErrorsVacancyBlacklistedBadRequestError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        VACANCIES_BLACKLIST = 'vacancies_blacklist',
    }
    /**
     * Название поля с ошибкой:
     *
     * * `limit_exceeded` — превышен лимит на количество вакансий в списке скрытых
     *
     */
    export enum value {
        LIMIT_EXCEEDED = 'limit_exceeded',
    }
}

