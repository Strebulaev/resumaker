/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsCommonBadArgumentError = {
    /**
     * Причина ошибки. Возможные значения:
     * * `too_long_value` — слишком длинное значение
     * * `too_many_arguments` — слишком много аргументов
     * * `invalid` — значение введено некорректно
     *
     */
    reason?: string;
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsCommonBadArgumentError.type;
    /**
     * Название поля с ошибкой
     *
     */
    value?: string;
};
export namespace ErrorsCommonBadArgumentError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        BAD_ARGUMENT = 'bad_argument',
    }
}

