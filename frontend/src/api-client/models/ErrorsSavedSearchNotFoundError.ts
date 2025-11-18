/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsSavedSearchNotFoundError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsSavedSearchNotFoundError.type;
    /**
     * Название поля запроса с ошибкой. Возможные значения:
     * * `saved_search_not_found` — автопоиск не найден или не принадлежит текущему пользователю.
     * * `manager_not_found` — менеджер не найден
     *
     */
    value?: ErrorsSavedSearchNotFoundError.value;
};
export namespace ErrorsSavedSearchNotFoundError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        SAVED_SEARCHES = 'saved_searches',
        NOT_FOUND = 'not_found',
    }
    /**
     * Название поля запроса с ошибкой. Возможные значения:
     * * `saved_search_not_found` — автопоиск не найден или не принадлежит текущему пользователю.
     * * `manager_not_found` — менеджер не найден
     *
     */
    export enum value {
        SAVED_SEARCH_NOT_FOUND = 'saved_search_not_found',
        MANAGER_NOT_FOUND = 'manager_not_found',
    }
}

