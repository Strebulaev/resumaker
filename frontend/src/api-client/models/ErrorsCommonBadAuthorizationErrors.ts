/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonBadAuthorizationCommonAndEmployerError } from './ErrorsCommonBadAuthorizationCommonAndEmployerError';
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
/**
 * Информация о возникших ошибках
 */
export type ErrorsCommonBadAuthorizationErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsCommonBadAuthorizationCommonAndEmployerError>;
    /**
     * Ошибки авторизации:
     * * `token-revoked` — Токен отозван пользователем или сервером, приложению необходимо [запросить новую авторизацию](#tag/Avtorizaciya-rabotodatelya/operation/authorize)
     * * `token-expired` — Время жизни `access_token` завершилось, необходимо [получить `refresh_token`](#tag/Avtorizaciya-rabotodatelya/operation/authorize)
     * * `bad-auth-type` — Некорректный токен
     * * `client-id-deleted` — Приложение удалено. Токен не действителен
     *
     */
    oauth_error?: ErrorsCommonBadAuthorizationErrors.oauth_error;
});
export namespace ErrorsCommonBadAuthorizationErrors {
    /**
     * Ошибки авторизации:
     * * `token-revoked` — Токен отозван пользователем или сервером, приложению необходимо [запросить новую авторизацию](#tag/Avtorizaciya-rabotodatelya/operation/authorize)
     * * `token-expired` — Время жизни `access_token` завершилось, необходимо [получить `refresh_token`](#tag/Avtorizaciya-rabotodatelya/operation/authorize)
     * * `bad-auth-type` — Некорректный токен
     * * `client-id-deleted` — Приложение удалено. Токен не действителен
     *
     */
    export enum oauth_error {
        TOKEN_REVOKED = 'token-revoked',
        TOKEN_EXPIRED = 'token-expired',
        BAD_AUTH_TYPE = 'bad-auth-type',
        CLIENT_ID_DELETED = 'client-id-deleted',
    }
}

