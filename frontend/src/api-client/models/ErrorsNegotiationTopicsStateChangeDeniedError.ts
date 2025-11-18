/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsNegotiationTopicsStateChangeDeniedError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsNegotiationTopicsStateChangeDeniedError.type;
    /**
     * Ошибки при переводе откликов по вакансии:
     * * `application_denied` — ошибка доступа к отклику. Может возникнуть в случае перевода нескольких откликов в другой статус, если,
     * как минимум один из откликов принадлежит другой вакансии
     *
     */
    value: ErrorsNegotiationTopicsStateChangeDeniedError.value;
};
export namespace ErrorsNegotiationTopicsStateChangeDeniedError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        NEGOTIATIONS = 'negotiations',
    }
    /**
     * Ошибки при переводе откликов по вакансии:
     * * `application_denied` — ошибка доступа к отклику. Может возникнуть в случае перевода нескольких откликов в другой статус, если,
     * как минимум один из откликов принадлежит другой вакансии
     *
     */
    export enum value {
        APPLICATION_DENIED = 'application_denied',
    }
}

