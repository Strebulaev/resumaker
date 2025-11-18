/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsResumeAddEditConflictError } from './ErrorsResumeAddEditConflictError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsResumeAddEditConflictErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибок
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsResumeAddEditConflictError>;
});

