/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsResumeTooManyRequestsEmployerError } from './ErrorsResumeTooManyRequestsEmployerError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsResumeTooManyRequestsEmployerErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     * @deprecated
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsResumeTooManyRequestsEmployerError>;
});

