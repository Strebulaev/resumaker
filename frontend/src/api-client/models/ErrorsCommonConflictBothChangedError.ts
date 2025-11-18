/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsCommonConflictBothChangedError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsCommonConflictBothChangedError.type;
    /**
     * Имя конфликтующего аргумента
     */
    value: ErrorsCommonConflictBothChangedError.value;
};
export namespace ErrorsCommonConflictBothChangedError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        BAD_ARGUMENT = 'bad_argument',
    }
    /**
     * Имя конфликтующего аргумента
     */
    export enum value {
        NAME = 'name',
        SUBSCRIPTION = 'subscription',
        EMAIL_SUBSCRIPTION = 'email_subscription',
    }
}

