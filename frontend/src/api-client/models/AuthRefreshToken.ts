/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AuthRefreshToken = {
    /**
     * Cпособ запроса токена
     */
    grant_type: AuthRefreshToken.grant_type;
    /**
     * Refresh-токен, полученный ранее при [получении пары токенов](#section/Avtorizaciya/Obnovlenie-pary-access-i-refresh-tokenov) или прошлом обновлении пары
     */
    refresh_token: string;
};
export namespace AuthRefreshToken {
    /**
     * Cпособ запроса токена
     */
    export enum grant_type {
        REFRESH_TOKEN = 'refresh_token',
    }
}

