/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsNegotiationForbiddenError } from './ErrorsNegotiationForbiddenError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsNegotiationForbiddenErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsNegotiationForbiddenError>;
    /**
     * Ошибки авторизации:
     * * `token-revoked` — Токен отозван пользователем или сервером, приложению необходимо [запросить новую авторизацию](#tag/Avtorizaciya-rabotodatelya/operation/authorize)
     * * `token-expired` — Время жизни `access_token` завершилось, необходимо [получить `refresh_token`](#tag/Avtorizaciya-rabotodatelya/operation/authorize)
     *
     */
    oauth_error?: ErrorsNegotiationForbiddenErrors.oauth_error;
});
export namespace ErrorsNegotiationForbiddenErrors {
    /**
     * Ошибки авторизации:
     * * `token-revoked` — Токен отозван пользователем или сервером, приложению необходимо [запросить новую авторизацию](#tag/Avtorizaciya-rabotodatelya/operation/authorize)
     * * `token-expired` — Время жизни `access_token` завершилось, необходимо [получить `refresh_token`](#tag/Avtorizaciya-rabotodatelya/operation/authorize)
     *
     */
    export enum oauth_error {
        TOKEN_REVOKED = 'token-revoked',
        TOKEN_EXPIRED = 'token-expired',
    }
}

