/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsResumePhoneConfirmBadArgumentError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsResumePhoneConfirmBadArgumentError.type;
    /**
     * Значение ошибки
     */
    value: ErrorsResumePhoneConfirmBadArgumentError.value;
};
export namespace ErrorsResumePhoneConfirmBadArgumentError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        RESUME_PHONE_CONFIRM = 'resume_phone_confirm',
    }
    /**
     * Значение ошибки
     */
    export enum value {
        CONFIRMATION_CODE_EXPIRED = 'confirmation_code_expired',
    }
}

