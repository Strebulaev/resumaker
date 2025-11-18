/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsResumeTooManyRequestsApplicantError } from './ErrorsResumeTooManyRequestsApplicantError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsResumeTooManyRequestsApplicantErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     * @deprecated
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsResumeTooManyRequestsApplicantError>;
});

