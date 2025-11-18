/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsRequestEntityTooLargeError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsRequestEntityTooLargeError.type;
    /**
     * Краткое текстовое описание причины ошибки
     */
    value: ErrorsRequestEntityTooLargeError.value;
};
export namespace ErrorsRequestEntityTooLargeError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        ARTIFACTS = 'artifacts',
    }
    /**
     * Краткое текстовое описание причины ошибки
     */
    export enum value {
        IMAGE_TOO_LARGE = 'image_too_large',
    }
}

