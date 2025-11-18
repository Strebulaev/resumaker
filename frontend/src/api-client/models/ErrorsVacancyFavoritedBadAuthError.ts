/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsVacancyFavoritedBadAuthError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsVacancyFavoritedBadAuthError.type;
    /**
     * Возможные ошибки:
     * * `vacancy_archived` — Вакансия уже в архиве и не может быть добавлена в отобранное
     * * `limit_exceeded` — Превышен лимит количества отобранных вакансий
     *
     */
    value: ErrorsVacancyFavoritedBadAuthError.value;
};
export namespace ErrorsVacancyFavoritedBadAuthError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        VACANCIES_FAVORITED = 'vacancies_favorited',
    }
    /**
     * Возможные ошибки:
     * * `vacancy_archived` — Вакансия уже в архиве и не может быть добавлена в отобранное
     * * `limit_exceeded` — Превышен лимит количества отобранных вакансий
     *
     */
    export enum value {
        VACANCY_ARCHIVED = 'vacancy_archived',
        LIMIT_EXCEEDED = 'limit_exceeded',
    }
}

