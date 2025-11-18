/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonBadAuthorizationPaymentMethodError } from './ErrorsCommonBadAuthorizationPaymentMethodError';
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
/**
 * Информация о возникших ошибках
 */
export type ErrorsCommonBadAuthorizationPaymentMethodErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsCommonBadAuthorizationPaymentMethodError>;
});

