/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AuthAppToken = {
    access_token: string;
    /**
     * Тип выданного токена. Всегда принимает значение `bearer`
     */
    token_type: AuthAppToken.token_type;
};
export namespace AuthAppToken {
    /**
     * Тип выданного токена. Всегда принимает значение `bearer`
     */
    export enum token_type {
        BEARER = 'bearer',
    }
}

