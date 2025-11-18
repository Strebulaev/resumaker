/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsEmployerManagerBadAuthorizationError } from './ErrorsEmployerManagerBadAuthorizationError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsEmployerManagerBadAuthorizationErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsEmployerManagerBadAuthorizationError>;
});

