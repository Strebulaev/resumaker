/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ManagerAccount } from './ManagerAccount';
export type ErrorsSavedSearchForbiddenError = {
    /**
     * Список доступных для токена аккаунтов менеджера в случае, если используемый рабочий аккаунт заблокирован.
     * Актуально только в случае авторизации работодателя
     *
     */
    allowed_accounts?: Array<ManagerAccount>;
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsSavedSearchForbiddenError.type;
    /**
     * Возможные ошибки:
     * * `cant_send_to_yourself` — Нельзя передать сохраненный поиск самому себе
     * * `user_auth_expected` — Передана авторизация приложения, метод требует [авторизации пользователя](#section/Avtorizaciya/Avtorizaciya-polzovatelya)
     *
     */
    value?: ErrorsSavedSearchForbiddenError.value;
};
export namespace ErrorsSavedSearchForbiddenError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        SAVED_SEARCHES = 'saved_searches',
        FORBIDDEN = 'forbidden',
        OAUTH = 'oauth',
    }
    /**
     * Возможные ошибки:
     * * `cant_send_to_yourself` — Нельзя передать сохраненный поиск самому себе
     * * `user_auth_expected` — Передана авторизация приложения, метод требует [авторизации пользователя](#section/Avtorizaciya/Avtorizaciya-polzovatelya)
     *
     */
    export enum value {
        CANT_SEND_TO_YOURSELF = 'cant_send_to_yourself',
        USER_AUTH_EXPECTED = 'user_auth_expected',
    }
}

