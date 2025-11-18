/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonCaptchaError } from './ErrorsCommonCaptchaError';
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
/**
 * Информация о возникших ошибках
 */
export type ErrorsCommonCaptchaErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsCommonCaptchaError>;
});

