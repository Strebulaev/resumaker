/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsCommonBadAuthorizationError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsCommonBadAuthorizationError.type;
    /**
     * Общие ошибки:
     * * `bad_authorization` — Токен авторизации не существует или не валидный
     * * `token_expired` — Время жизни access_token завершилось, необходимо [выполнить обновление access_token](#section/Avtorizaciya/Obnovlenie-pary-access-i-refresh-tokenov)
     * * `token_revoked` — Токен отозван пользователем или сервером, приложению необходимо [запросить новую авторизацию](#section/Tipy-avtorizacij)
     * * `application_not_found` — Ваше приложение было удалено
     * * `user_auth_expected` — Передана авторизация приложения, метод требует [авторизации пользователя](#get-auth)
     * * `application_auth_expected` — Передана авторизация пользователя, метод требует [авторизации приложения](#get-client-auth)
     * * `used_manager_account_forbidden` — [Рабочий аккаунт заблокирован](https://github.com/hhru/api/blob/master/docs/errors.md#manager-accounts-blocked)
     * * `manager_extra_account_not_found` — В заголовке передан некорректный id аккаунта
     * * `user_auth_expected` — Передана авторизация приложения, метод требует [авторизации пользователя](#section/Avtorizaciya/Avtorizaciya-polzovatelya)
     * * `application_auth_expected` — Передана авторизация пользователя, метод требует [авторизации приложения](##section/Avtorizaciya/Avtorizaciya-prilozheniya)
     *
     */
    value?: ErrorsCommonBadAuthorizationError.value;
};
export namespace ErrorsCommonBadAuthorizationError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        FORBIDDEN = 'forbidden',
        OAUTH = 'oauth',
    }
    /**
     * Общие ошибки:
     * * `bad_authorization` — Токен авторизации не существует или не валидный
     * * `token_expired` — Время жизни access_token завершилось, необходимо [выполнить обновление access_token](#section/Avtorizaciya/Obnovlenie-pary-access-i-refresh-tokenov)
     * * `token_revoked` — Токен отозван пользователем или сервером, приложению необходимо [запросить новую авторизацию](#section/Tipy-avtorizacij)
     * * `application_not_found` — Ваше приложение было удалено
     * * `user_auth_expected` — Передана авторизация приложения, метод требует [авторизации пользователя](#get-auth)
     * * `application_auth_expected` — Передана авторизация пользователя, метод требует [авторизации приложения](#get-client-auth)
     * * `used_manager_account_forbidden` — [Рабочий аккаунт заблокирован](https://github.com/hhru/api/blob/master/docs/errors.md#manager-accounts-blocked)
     * * `manager_extra_account_not_found` — В заголовке передан некорректный id аккаунта
     * * `user_auth_expected` — Передана авторизация приложения, метод требует [авторизации пользователя](#section/Avtorizaciya/Avtorizaciya-polzovatelya)
     * * `application_auth_expected` — Передана авторизация пользователя, метод требует [авторизации приложения](##section/Avtorizaciya/Avtorizaciya-prilozheniya)
     *
     */
    export enum value {
        BAD_AUTHORIZATION = 'bad_authorization',
        TOKEN_EXPIRED = 'token_expired',
        TOKEN_REVOKED = 'token_revoked',
        APPLICATION_NOT_FOUND = 'application_not_found',
        USER_AUTH_EXPECTED = 'user_auth_expected',
        APPLICATION_AUTH_EXPECTED = 'application_auth_expected',
    }
}

