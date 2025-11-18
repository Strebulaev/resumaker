/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AuthUserToken = {
    /**
     * Токен, который возвращается при условии, если у приложения есть права на создание долгоживущих или короткоживущих токенов
     *
     */
    access_token: string;
    /**
     * Время жизни токена в секундах
     */
    expires_in: number;
    /**
     * Токен, который можно использовать для продления срока жизни соответствующего access токена
     */
    refresh_token: string;
    /**
     * Тип выданного токена. Всегда принимает значение `bearer`
     */
    token_type: AuthUserToken.token_type;
};
export namespace AuthUserToken {
    /**
     * Тип выданного токена. Всегда принимает значение `bearer`
     */
    export enum token_type {
        BEARER = 'bearer',
    }
}

