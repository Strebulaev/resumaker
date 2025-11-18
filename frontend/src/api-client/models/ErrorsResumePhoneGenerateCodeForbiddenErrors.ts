/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsResumePhoneGenerateCodeForbiddenError } from './ErrorsResumePhoneGenerateCodeForbiddenError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsResumePhoneGenerateCodeForbiddenErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     * @deprecated
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsResumePhoneGenerateCodeForbiddenError>;
});

