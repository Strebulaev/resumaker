/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsEmployerManagerBadArgumentError } from './ErrorsEmployerManagerBadArgumentError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsEmployerManagerBadArgumentErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsEmployerManagerBadArgumentError>;
});

