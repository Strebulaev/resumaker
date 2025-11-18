/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsNegotiationHideResponseError } from './ErrorsNegotiationHideResponseError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsNegotiationHideResponseErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsNegotiationHideResponseError>;
});

