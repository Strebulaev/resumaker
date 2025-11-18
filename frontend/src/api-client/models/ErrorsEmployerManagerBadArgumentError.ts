/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsEmployerManagerBadArgumentError = {
    /**
     * Описание ошибки
     */
    reason?: string;
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsEmployerManagerBadArgumentError.type;
    /**
     * Название поля с ошибкой
     */
    value?: string;
};
export namespace ErrorsEmployerManagerBadArgumentError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        MANAGERS = 'managers',
    }
}

