/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsResumePhoneGenerateCodeForbiddenError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsResumePhoneGenerateCodeForbiddenError.type;
    /**
     * Описание ошибки. Возможные значения:
     * * `too_early` — Не закончилось время до следующей возможной генерации кода
     *
     */
    value: ErrorsResumePhoneGenerateCodeForbiddenError.value;
};
export namespace ErrorsResumePhoneGenerateCodeForbiddenError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        RESUME_PHONE_GENERATE = 'resume_phone_generate',
    }
    /**
     * Описание ошибки. Возможные значения:
     * * `too_early` — Не закончилось время до следующей возможной генерации кода
     *
     */
    export enum value {
        TOO_EARLY = 'too_early',
    }
}

