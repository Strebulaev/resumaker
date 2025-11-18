/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsRequestEntityTooLargeError } from './ErrorsRequestEntityTooLargeError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsRequestEntityTooLargeErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsRequestEntityTooLargeError>;
});

