/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsCommonBadAuthorizationInvalidRequestError = {
    /**
     * Идентификатор типа ошибки, используются значения, описанные в [документе RFC 6749](http://tools.ietf.org/html/rfc6749#section-5.2)
     *
     */
    error: ErrorsCommonBadAuthorizationInvalidRequestError.error;
    /**
     * Дополнительное описание ошибки
     * * `account not found` Ошибка может возникнуть, если передана неправильная пара `client_id` и `client_secret`
     * * `account is locked` Пользовательский аккаунт заблокирован. Пользователь должен обратиться в службу поддержки сайта
     * * `password invalidated` Пароль от пользовательского аккаунта устарел. Пользователь должен восстановить пароль на сайте `https://hh.ru`
     * * `login not verified` Пользовательский аккаунт не подтвержден. Пользователь должен обратиться в службу поддержки сайта
     * * `bad redirect url` передан неправильный `redirect_url`
     * * `token is empty` Не передан `refresh_token`
     * * `token not found` передан не правильный `refresh_token`
     * * `code not found ` переданный `authorization_code` не найден
     *
     */
    error_description: ErrorsCommonBadAuthorizationInvalidRequestError.error_description;
};
export namespace ErrorsCommonBadAuthorizationInvalidRequestError {
    /**
     * Идентификатор типа ошибки, используются значения, описанные в [документе RFC 6749](http://tools.ietf.org/html/rfc6749#section-5.2)
     *
     */
    export enum error {
        INVALID_REQUEST = 'invalid_request',
    }
    /**
     * Дополнительное описание ошибки
     * * `account not found` Ошибка может возникнуть, если передана неправильная пара `client_id` и `client_secret`
     * * `account is locked` Пользовательский аккаунт заблокирован. Пользователь должен обратиться в службу поддержки сайта
     * * `password invalidated` Пароль от пользовательского аккаунта устарел. Пользователь должен восстановить пароль на сайте `https://hh.ru`
     * * `login not verified` Пользовательский аккаунт не подтвержден. Пользователь должен обратиться в службу поддержки сайта
     * * `bad redirect url` передан неправильный `redirect_url`
     * * `token is empty` Не передан `refresh_token`
     * * `token not found` передан не правильный `refresh_token`
     * * `code not found ` переданный `authorization_code` не найден
     *
     */
    export enum error_description {
        ACCOUNT_NOT_FOUND = 'account not found',
        ACCOUNT_IS_LOCKED = 'account is locked',
        PASSWORD_INVALIDATED = 'password invalidated',
        LOGIN_NOT_VERIFIED = 'login not verified',
        BAD_REDIRECT_URL = 'bad redirect url',
        TOKEN_IS_EMPTY = 'token is empty',
        TOKEN_NOT_FOUND = 'token not found',
        CODE_NOT_FOUND = 'code not found',
    }
}

