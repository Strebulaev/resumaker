/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsResumePhoneConfirmForbiddenError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsResumePhoneConfirmForbiddenError.type;
    /**
     * Значение ошибки
     */
    value: ErrorsResumePhoneConfirmForbiddenError.value;
};
export namespace ErrorsResumePhoneConfirmForbiddenError {
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
        PHONE_TEMPORARILY_BLOCKED = 'phone_temporarily_blocked',
    }
}

