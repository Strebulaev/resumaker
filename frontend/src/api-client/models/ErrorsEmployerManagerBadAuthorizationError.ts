/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ManagerAccount } from './ManagerAccount';
export type ErrorsEmployerManagerBadAuthorizationError = {
    /**
     * Список доступных для токена аккаунтов менеджера в случае, если используемый рабочий аккаунт заблокирован.
     * Актуально только в случае авторизации работодателя
     *
     */
    allowed_accounts?: Array<ManagerAccount>;
    /**
     * Ошибки при создании или редактировании менеджера работодателя:
     * * `already_exist` — Менеджер с такой почтой уже существует
     * * `creation_limit_exceeded` — Достигнут лимит на создание менеджеров
     * * `not_editable` — Поле *field_name* недоступно для редактирования
     *
     */
    reason?: ErrorsEmployerManagerBadAuthorizationError.reason;
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsEmployerManagerBadAuthorizationError.type;
    /**
     * Общие ошибки:
     * * `bad_authorization` — Токен авторизации не существует или не валидный
     * * `token_expired` — Время жизни access_token завершилось, необходимо [выполнить обновление access_token](#section/Avtorizaciya/Obnovlenie-pary-access-i-refresh-tokenov)
     * * `token_revoked` — Токен отозван пользователем или сервером, приложению необходимо [запросить новую авторизацию](#section/Tipy-avtorizacij)
     * * `application_not_found` — Ваше приложение было удалено
     * * `used_manager_account_forbidden` — [Рабочий аккаунт заблокирован](https://github.com/hhru/api/blob/master/docs/errors.md#manager-accounts-blocked)
     * * `manager_extra_account_not_found` — В заголовке передан некорректный id аккаунта
     * * `email` — Менеджер с такой почтой уже существует
     * * `user_auth_expected` — Ожидается авторизация пользователя, передана авторизация приложения
     * * `manager_type` — Поле manager_type недоступно для редактирования
     * * `area` — Поле area недоступно для редактирования
     * * `last_name` — Поле lastName недоступно для редактирования
     * * `first_name` — Поле firstName недоступно для редактирования
     * * `middle_name` — Поле middleName недоступно для редактирования
     *
     */
    value?: ErrorsEmployerManagerBadAuthorizationError.value;
};
export namespace ErrorsEmployerManagerBadAuthorizationError {
    /**
     * Ошибки при создании или редактировании менеджера работодателя:
     * * `already_exist` — Менеджер с такой почтой уже существует
     * * `creation_limit_exceeded` — Достигнут лимит на создание менеджеров
     * * `not_editable` — Поле *field_name* недоступно для редактирования
     *
     */
    export enum reason {
        ALREADY_EXIST = 'already_exist',
        CREATION_LIMIT_EXCEEDED = 'creation_limit_exceeded',
        NOT_EDITABLE = 'not_editable',
    }
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        FORBIDDEN = 'forbidden',
        OAUTH = 'oauth',
        MANAGER_EXTRA_ACCOUNTS = 'manager_extra_accounts',
        MANAGER_ACCOUNTS = 'manager_accounts',
        MANAGERS = 'managers',
    }
    /**
     * Общие ошибки:
     * * `bad_authorization` — Токен авторизации не существует или не валидный
     * * `token_expired` — Время жизни access_token завершилось, необходимо [выполнить обновление access_token](#section/Avtorizaciya/Obnovlenie-pary-access-i-refresh-tokenov)
     * * `token_revoked` — Токен отозван пользователем или сервером, приложению необходимо [запросить новую авторизацию](#section/Tipy-avtorizacij)
     * * `application_not_found` — Ваше приложение было удалено
     * * `used_manager_account_forbidden` — [Рабочий аккаунт заблокирован](https://github.com/hhru/api/blob/master/docs/errors.md#manager-accounts-blocked)
     * * `manager_extra_account_not_found` — В заголовке передан некорректный id аккаунта
     * * `email` — Менеджер с такой почтой уже существует
     * * `user_auth_expected` — Ожидается авторизация пользователя, передана авторизация приложения
     * * `manager_type` — Поле manager_type недоступно для редактирования
     * * `area` — Поле area недоступно для редактирования
     * * `last_name` — Поле lastName недоступно для редактирования
     * * `first_name` — Поле firstName недоступно для редактирования
     * * `middle_name` — Поле middleName недоступно для редактирования
     *
     */
    export enum value {
        BAD_AUTHORIZATION = 'bad_authorization',
        TOKEN_EXPIRED = 'token_expired',
        TOKEN_REVOKED = 'token_revoked',
        APPLICATION_NOT_FOUND = 'application_not_found',
        MANAGER_EXTRA_ACCOUNT_NOT_FOUND = 'manager_extra_account_not_found',
        USED_MANAGER_ACCOUNT_FORBIDDEN = 'used_manager_account_forbidden',
        EMAIL = 'email',
        USER_AUTH_EXPECTED = 'user_auth_expected',
        MANAGER_TYPE = 'manager_type',
        AREA = 'area',
        LAST_NAME = 'last_name',
        FIRST_NAME = 'first_name',
        MIDDLE_NAME = 'middle_name',
    }
}

