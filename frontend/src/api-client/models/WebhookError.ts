/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WebhookError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: string;
    /**
     * Описание ошибки:
     * * already_exist - У текущего пользователя/компании уже есть подписка для данного приложения (включая подписку на резюме)
     *
     */
    value: WebhookError.value;
};
export namespace WebhookError {
    /**
     * Описание ошибки:
     * * already_exist - У текущего пользователя/компании уже есть подписка для данного приложения (включая подписку на резюме)
     *
     */
    export enum value {
        ALREADY_EXIST = 'already_exist',
    }
}

