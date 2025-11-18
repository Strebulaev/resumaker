/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsCommonBadAuthorizationUnsupportedGrantTypeError = {
    /**
     * Идентификатор типа ошибки, используются значения, описанные в [документе RFC 6749](http://tools.ietf.org/html/rfc6749#section-5.2)
     *
     */
    error: ErrorsCommonBadAuthorizationUnsupportedGrantTypeError.error;
    /**
     * Дополнительное описание ошибки
     * * `unsupported grant_type` Возникает, если передать неправильное значение в поле `grant_type`
     *
     */
    error_description: ErrorsCommonBadAuthorizationUnsupportedGrantTypeError.error_description;
};
export namespace ErrorsCommonBadAuthorizationUnsupportedGrantTypeError {
    /**
     * Идентификатор типа ошибки, используются значения, описанные в [документе RFC 6749](http://tools.ietf.org/html/rfc6749#section-5.2)
     *
     */
    export enum error {
        UNSUPPORTED_GRANT_TYPE = 'unsupported_grant_type',
    }
    /**
     * Дополнительное описание ошибки
     * * `unsupported grant_type` Возникает, если передать неправильное значение в поле `grant_type`
     *
     */
    export enum error_description {
        UNSUPPORTED_GRANT_TYPE = 'unsupported grant_type',
    }
}

