/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsNegotiationHideResponseError = {
    /**
     * Тип ошибки
     */
    type: ErrorsNegotiationHideResponseError.type;
    /**
     * Причина ошибки:
     * * `wrong_state` — действие по отклику/приглашению в данном статусе невозможно
     * * `no_invitation` — переписка недоступна, так как в отклике ещё не было приглашения
     * * `disabled_by_employer` — возможность переписки по отклику отключена работодателем
     * * `chat_is_not_ready` — чат отклика/приглашения еще не готов
     *
     */
    value: ErrorsNegotiationHideResponseError.value;
};
export namespace ErrorsNegotiationHideResponseError {
    /**
     * Тип ошибки
     */
    export enum type {
        NEGOTIATIONS = 'negotiations',
    }
    /**
     * Причина ошибки:
     * * `wrong_state` — действие по отклику/приглашению в данном статусе невозможно
     * * `no_invitation` — переписка недоступна, так как в отклике ещё не было приглашения
     * * `disabled_by_employer` — возможность переписки по отклику отключена работодателем
     * * `chat_is_not_ready` — чат отклика/приглашения еще не готов
     *
     */
    export enum value {
        WRONG_STATE = 'wrong_state',
        NO_INVITATION = 'no_invitation',
        DISABLED_BY_EMPLOYER = 'disabled_by_employer',
        CHAT_IS_NOT_READY = 'chat_is_not_ready',
    }
}

