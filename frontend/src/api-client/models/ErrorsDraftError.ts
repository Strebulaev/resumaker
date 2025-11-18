/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsDraftError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsDraftError.type;
    /**
     * Значение ошибки
     */
    value: ErrorsDraftError.value;
};
export namespace ErrorsDraftError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        VACANCY = 'vacancy',
    }
    /**
     * Значение ошибки
     */
    export enum value {
        VACANCY_DRAFT_LIMIT_EXCEEDED = 'vacancy_draft_limit_exceeded',
    }
}

