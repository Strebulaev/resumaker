/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsEmployerBlacklistedNotFoundError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsEmployerBlacklistedNotFoundError.type;
    /**
     * Название поля с ошибкой. Возможные значения:
     * * `not_found` — работодатель для добавления в список не найден
     *
     */
    value: ErrorsEmployerBlacklistedNotFoundError.value;
};
export namespace ErrorsEmployerBlacklistedNotFoundError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        EMPLOYERS_BLACKLIST = 'employers_blacklist',
    }
    /**
     * Название поля с ошибкой. Возможные значения:
     * * `not_found` — работодатель для добавления в список не найден
     *
     */
    export enum value {
        NOT_FOUND = 'not_found',
    }
}

