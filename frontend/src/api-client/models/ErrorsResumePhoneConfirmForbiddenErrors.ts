/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsResumePhoneConfirmForbiddenError } from './ErrorsResumePhoneConfirmForbiddenError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsResumePhoneConfirmForbiddenErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     * @deprecated
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsResumePhoneConfirmForbiddenError>;
});

