/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsNegotiationNotFoundError } from './ErrorsNegotiationNotFoundError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsNegotiationNotFoundErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание типа ошибки
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsNegotiationNotFoundError>;
});

