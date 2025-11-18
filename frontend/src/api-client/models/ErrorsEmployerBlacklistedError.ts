/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsEmployerBlacklistedError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsEmployerBlacklistedError.type;
    /**
     * Название поля с ошибкой:
     * * `limit_exceeded` — превышен лимит на количество работодателей в списке скрытых
     *
     */
    value?: ErrorsEmployerBlacklistedError.value;
};
export namespace ErrorsEmployerBlacklistedError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        EMPLOYERS_BLACKLIST = 'employers_blacklist',
    }
    /**
     * Название поля с ошибкой:
     * * `limit_exceeded` — превышен лимит на количество работодателей в списке скрытых
     *
     */
    export enum value {
        LIMIT_EXCEEDED = 'limit_exceeded',
    }
}

