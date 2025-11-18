/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AuthCode = {
    /**
     * Идентификатор, полученный при [создании приложения](https://dev.hh.ru/admin)
     */
    client_id: string;
    /**
     * Защищенный ключ, полученный при [создании приложения](https://dev.hh.ru/admin)
     */
    client_secret: string;
    /**
     * Значение `authorization_code`, полученное при [перенаправлении пользователя](#get-authorization_code)
     *
     */
    code: string;
    /**
     * Способ запроса токена
     */
    grant_type: AuthCode.grant_type;
    /**
     * Uri для перенаправления пользователя после авторизации. Если не указать, используется из настроек приложения. При наличии происходит валидация значения. Вероятнее всего, потребуется сделать urlencode значения параметра
     *
     */
    redirect_uri: string;
};
export namespace AuthCode {
    /**
     * Способ запроса токена
     */
    export enum grant_type {
        AUTHORIZATION_CODE = 'authorization_code',
    }
}

