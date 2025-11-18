/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsNegotiationEditMessageError } from './ErrorsNegotiationEditMessageError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsNegotiationEditMessageErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибок
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsNegotiationEditMessageError>;
});

