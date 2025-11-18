/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsNegotiationNotFoundError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsNegotiationNotFoundError.type;
    /**
     * Уточнения по ошибке
     */
    value: ErrorsNegotiationNotFoundError.value;
};
export namespace ErrorsNegotiationNotFoundError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        NEGOTIATIONS = 'negotiations',
    }
    /**
     * Уточнения по ошибке
     */
    export enum value {
        TOPIC_NOT_FOUND = 'topic_not_found',
    }
}

