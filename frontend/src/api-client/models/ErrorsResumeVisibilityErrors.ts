/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsResumeVisibilityError } from './ErrorsResumeVisibilityError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsResumeVisibilityErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsResumeVisibilityError>;
});

