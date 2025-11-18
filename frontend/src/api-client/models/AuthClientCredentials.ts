/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AuthClientCredentials = {
    /**
     * Идентификатор, полученный при [создании приложения](https://dev.hh.ru/admin)
     */
    client_id: string;
    /**
     * Защищенный ключ, полученный при [создании приложения](https://dev.hh.ru/admin)
     */
    client_secret: string;
    /**
     * Cпособ запроса токена
     */
    grant_type: AuthClientCredentials.grant_type;
};
export namespace AuthClientCredentials {
    /**
     * Cпособ запроса токена
     */
    export enum grant_type {
        CLIENT_CREDENTIALS = 'client_credentials',
    }
}

