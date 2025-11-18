/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsSavedSearchNotFoundError } from './ErrorsSavedSearchNotFoundError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsSavedSearchNotFoundErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsSavedSearchNotFoundError>;
});

