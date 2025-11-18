/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsResumePhoneGenerateCodeBadArgumentError } from './ErrorsResumePhoneGenerateCodeBadArgumentError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsResumePhoneGenerateCodeBadArgumentErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     * @deprecated
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsResumePhoneGenerateCodeBadArgumentError>;
});

