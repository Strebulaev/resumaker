/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsVacancyApplyBadRequestError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsVacancyApplyBadRequestError.type;
    /**
     * Название поля с ошибкой:
     *
     * * `vacancy_not_found` — вакансия не найдена.
     * * `resume_not_found` — резюме из отклика/приглашения скрыто, удалено или не найдено.
     * * `limit_exceeded` — превышен лимит количества откликов/приглашений
     * * `resource_policy_violation` — отклик нарушает правила пользования сервисом
     * * `inappropriate_language` — отклик содержит нецензурную лексику
     *
     */
    value: ErrorsVacancyApplyBadRequestError.value;
};
export namespace ErrorsVacancyApplyBadRequestError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        NEGOTIATIONS = 'negotiations',
    }
    /**
     * Название поля с ошибкой:
     *
     * * `vacancy_not_found` — вакансия не найдена.
     * * `resume_not_found` — резюме из отклика/приглашения скрыто, удалено или не найдено.
     * * `limit_exceeded` — превышен лимит количества откликов/приглашений
     * * `resource_policy_violation` — отклик нарушает правила пользования сервисом
     * * `inappropriate_language` — отклик содержит нецензурную лексику
     *
     */
    export enum value {
        VACANCY_NOT_FOUND = 'vacancy_not_found',
        RESUME_NOT_FOUND = 'resume_not_found',
        LIMIT_EXCEEDED = 'limit_exceeded',
        RESOURCE_POLICY_VIOLATION = 'resource_policy_violation',
        INAPPROPRIATE_LANGUAGE = 'inappropriate_language',
    }
}

