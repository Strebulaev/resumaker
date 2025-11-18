/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ManagerAccount } from './ManagerAccount';
export type ErrorsCommonBadAuthorizationEmployerError = {
    /**
     * Список доступных для токена аккаунтов менеджера в случае, если используемый рабочий аккаунт заблокирован.
     * Актуально только в случае авторизации работодателя
     *
     */
    allowed_accounts?: Array<ManagerAccount>;
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsCommonBadAuthorizationEmployerError.type;
    /**
     * Общие ошибки:
     * * `bad_authorization` — Токен авторизации не существует или не валидный
     * * `token_expired` — Время жизни access_token завершилось, необходимо [выполнить обновление access_token](#refresh_token)
     * * `token_revoked` — Токен отозван пользователем или сервером, приложению необходимо [запросить новую авторизацию](#section/Tipy-avtorizacij)
     * * `application_not_found` — Ваше приложение было удалено
     * * `used_manager_account_forbidden` — [Рабочий аккаунт заблокирован](https://github.com/hhru/api/blob/master/docs/errors.md#manager-accounts-blocked)
     * * `manager_extra_account_not_found` — В заголовке передан некорректный id аккаунта
     * * `user_auth_expected` — Передана авторизация приложения, метод требует [авторизации пользователя](#get-auth)
     * * `application_auth_expected` — Передана авторизация пользователя, метод требует [авторизации приложения](#get-client-auth)
     * * `employer_on_additional_check_restricted` — Работодатель находится на доп.проверке
     *
     */
    value?: ErrorsCommonBadAuthorizationEmployerError.value;
};
export namespace ErrorsCommonBadAuthorizationEmployerError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        FORBIDDEN = 'forbidden',
        OAUTH = 'oauth',
        MANAGER_EXTRA_ACCOUNTS = 'manager_extra_accounts',
        MANAGER_ACCOUNTS = 'manager_accounts',
        NEGOTIATIONS = 'negotiations',
    }
    /**
     * Общие ошибки:
     * * `bad_authorization` — Токен авторизации не существует или не валидный
     * * `token_expired` — Время жизни access_token завершилось, необходимо [выполнить обновление access_token](#refresh_token)
     * * `token_revoked` — Токен отозван пользователем или сервером, приложению необходимо [запросить новую авторизацию](#section/Tipy-avtorizacij)
     * * `application_not_found` — Ваше приложение было удалено
     * * `used_manager_account_forbidden` — [Рабочий аккаунт заблокирован](https://github.com/hhru/api/blob/master/docs/errors.md#manager-accounts-blocked)
     * * `manager_extra_account_not_found` — В заголовке передан некорректный id аккаунта
     * * `user_auth_expected` — Передана авторизация приложения, метод требует [авторизации пользователя](#get-auth)
     * * `application_auth_expected` — Передана авторизация пользователя, метод требует [авторизации приложения](#get-client-auth)
     * * `employer_on_additional_check_restricted` — Работодатель находится на доп.проверке
     *
     */
    export enum value {
        BAD_AUTHORIZATION = 'bad_authorization',
        TOKEN_EXPIRED = 'token_expired',
        TOKEN_REVOKED = 'token_revoked',
        APPLICATION_NOT_FOUND = 'application_not_found',
        MANAGER_EXTRA_ACCOUNT_NOT_FOUND = 'manager_extra_account_not_found',
        USED_MANAGER_ACCOUNT_FORBIDDEN = 'used_manager_account_forbidden',
        USER_AUTH_EXPECTED = 'user_auth_expected',
        APPLICATION_AUTH_EXPECTED = 'application_auth_expected',
        EMPLOYER_ON_ADDITIONAL_CHECK_RESTRICTED = 'employer_on_additional_check_restricted',
    }
}

