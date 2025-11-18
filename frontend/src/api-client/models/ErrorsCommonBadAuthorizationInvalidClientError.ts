/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsCommonBadAuthorizationInvalidClientError = {
    /**
     * Идентификатор типа ошибки, используются значения, описанные в [документе RFC 6749](http://tools.ietf.org/html/rfc6749#section-5.2)
     *
     */
    error: ErrorsCommonBadAuthorizationInvalidClientError.error;
    /**
     * Дополнительное описание ошибки
     * * `client_id or client_secret not found` Ошибка может возникнуть в случае, если данный `client_id` не найден или был удален, передан неправильный `client_secret`
     *
     */
    error_description: ErrorsCommonBadAuthorizationInvalidClientError.error_description;
};
export namespace ErrorsCommonBadAuthorizationInvalidClientError {
    /**
     * Идентификатор типа ошибки, используются значения, описанные в [документе RFC 6749](http://tools.ietf.org/html/rfc6749#section-5.2)
     *
     */
    export enum error {
        INVALID_CLIENT = 'invalid_client',
        FORBIDDEN = 'forbidden',
    }
    /**
     * Дополнительное описание ошибки
     * * `client_id or client_secret not found` Ошибка может возникнуть в случае, если данный `client_id` не найден или был удален, передан неправильный `client_secret`
     *
     */
    export enum error_description {
        CLIENT_ID_OR_CLIENT_SECRET_NOT_FOUND = 'client_id or client_secret not found',
        APP_TOKEN_REFRESH_TOO_EARLY = 'app token refresh too early',
    }
}

