/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsResumeTooManyRequestsApplicantError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsResumeTooManyRequestsApplicantError.type;
    /**
     * Описание ошибки. Возможные значения:
     * * `touch_limit_exceeded` — Слишком частое изменение резюме
     *
     */
    value: ErrorsResumeTooManyRequestsApplicantError.value;
};
export namespace ErrorsResumeTooManyRequestsApplicantError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        RESUMES = 'resumes',
    }
    /**
     * Описание ошибки. Возможные значения:
     * * `touch_limit_exceeded` — Слишком частое изменение резюме
     *
     */
    export enum value {
        TOUCH_LIMIT_EXCEEDED = 'touch_limit_exceeded',
    }
}

