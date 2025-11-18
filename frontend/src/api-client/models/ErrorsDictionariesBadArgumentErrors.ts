/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsDictionariesBadArgumentError } from './ErrorsDictionariesBadArgumentError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsDictionariesBadArgumentErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsDictionariesBadArgumentError>;
});

