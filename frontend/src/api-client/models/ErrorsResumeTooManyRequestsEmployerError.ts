/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsResumeTooManyRequestsEmployerError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsResumeTooManyRequestsEmployerError.type;
    /**
     * Описание ошибки. Возможные значения:
     * * `view_limit_exceeded` — Закончились лимиты менеджера
     *
     */
    value: ErrorsResumeTooManyRequestsEmployerError.value;
};
export namespace ErrorsResumeTooManyRequestsEmployerError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        RESUMES = 'resumes',
    }
    /**
     * Описание ошибки. Возможные значения:
     * * `view_limit_exceeded` — Закончились лимиты менеджера
     *
     */
    export enum value {
        VIEW_LIMIT_EXCEEDED = 'view_limit_exceeded',
    }
}

