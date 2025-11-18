/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Превышено максимальное количество резюме
 */
export type ErrorsResumeTooManyResumesError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsResumeTooManyResumesError.type;
    /**
     * Значение ошибки
     */
    value: ErrorsResumeTooManyResumesError.value;
};
export namespace ErrorsResumeTooManyResumesError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        RESUMES = 'resumes',
    }
    /**
     * Значение ошибки
     */
    export enum value {
        TOTAL_LIMIT_EXCEEDED = 'total_limit_exceeded',
    }
}

