/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsCommonBadAuthorizationInvalidGrantError = {
    /**
     * Идентификатор типа ошибки, используются значения, описанные в [документе RFC 6749](http://tools.ietf.org/html/rfc6749#section-5.2)
     *
     */
    error: ErrorsCommonBadAuthorizationInvalidGrantError.error;
    /**
     * Дополнительное описание ошибки
     * * `token has already been refreshed` Ошибка возникает при попытке воспользоваться refresh-токеном второй раз
     * * `token not expired` Ошибка возникает при попытке обновить действующий access-токен. access-токен можно обновлять только после того, как он истек
     * * `token was revoked` Токен был отозван. Например, токен отзывается, если время действия пароля истекло
     * * `bad token ` Передано неправильное значение токена
     * * `code has already been used` `authorization_code` уже был использован (его можно использовать только один раз)
     * * `code expired` `authorization_code` истек
     * * `code was revoke` `authorization_code` был отозван (это происходит, если время действия пароля истекло)
     * * `token deactivated ` Токен был деактивирован. Токен деактивируется после того, как пользователь сменил пароль
     *
     */
    error_description: ErrorsCommonBadAuthorizationInvalidGrantError.error_description;
};
export namespace ErrorsCommonBadAuthorizationInvalidGrantError {
    /**
     * Идентификатор типа ошибки, используются значения, описанные в [документе RFC 6749](http://tools.ietf.org/html/rfc6749#section-5.2)
     *
     */
    export enum error {
        INVALID_GRANT = 'invalid_grant',
    }
    /**
     * Дополнительное описание ошибки
     * * `token has already been refreshed` Ошибка возникает при попытке воспользоваться refresh-токеном второй раз
     * * `token not expired` Ошибка возникает при попытке обновить действующий access-токен. access-токен можно обновлять только после того, как он истек
     * * `token was revoked` Токен был отозван. Например, токен отзывается, если время действия пароля истекло
     * * `bad token ` Передано неправильное значение токена
     * * `code has already been used` `authorization_code` уже был использован (его можно использовать только один раз)
     * * `code expired` `authorization_code` истек
     * * `code was revoke` `authorization_code` был отозван (это происходит, если время действия пароля истекло)
     * * `token deactivated ` Токен был деактивирован. Токен деактивируется после того, как пользователь сменил пароль
     *
     */
    export enum error_description {
        TOKEN_HAS_ALREADY_BEEN_REFRESHED = 'token has already been refreshed',
        TOKEN_NOT_EXPIRED = 'token not expired',
        TOKEN_WAS_REVOKED = 'token was revoked',
        BAD_TOKEN = 'bad token',
        CODE_HAS_ALREADY_BEEN_USED = 'code has already been used',
        CODE_EXPIRED = 'code expired',
        CODE_WAS_REVOKE = 'code was revoke',
        TOKEN_DEACTIVATED = 'token deactivated',
    }
}

