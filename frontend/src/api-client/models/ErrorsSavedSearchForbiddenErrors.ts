/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsSavedSearchForbiddenError } from './ErrorsSavedSearchForbiddenError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsSavedSearchForbiddenErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsSavedSearchForbiddenError>;
});

