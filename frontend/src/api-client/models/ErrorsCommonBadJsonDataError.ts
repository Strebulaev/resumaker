/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsCommonBadJsonDataError = {
    /**
     * Описание ошибки
     */
    description?: string | null;
    /**
     * Путь до параметра, в котором возникла ошибка.
     *
     * Для указания параметра используется формат JsonPointer [RFC 6901](https://tools.ietf.org/html/rfc6901)
     *
     */
    pointer?: string;
    /**
     * Причина ошибки. Возможные значения:
     * * `required` — отсутствует обязательное поле;
     * * `invalid` — значение введено некорректно;
     * * `size_less_than_min` — пустой массив;
     * * `unexpected` — поле не ожидается;
     * * `greater_than_max` — значение больше максимума
     * * `deprecated` — значение устарело и больше не используется
     *
     */
    reason?: ErrorsCommonBadJsonDataError.reason;
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsCommonBadJsonDataError.type;
    /**
     * Название поля с ошибкой
     */
    value?: string;
};
export namespace ErrorsCommonBadJsonDataError {
    /**
     * Причина ошибки. Возможные значения:
     * * `required` — отсутствует обязательное поле;
     * * `invalid` — значение введено некорректно;
     * * `size_less_than_min` — пустой массив;
     * * `unexpected` — поле не ожидается;
     * * `greater_than_max` — значение больше максимума
     * * `deprecated` — значение устарело и больше не используется
     *
     */
    export enum reason {
        REQUIRED = 'required',
        INVALID = 'invalid',
        SIZE_LESS_THAN_MIN = 'size_less_than_min',
        GREATER_THAN_MAX = 'greater_than_max',
        UNEXPECTED = 'unexpected',
        DEPRECATED = 'deprecated',
    }
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        BAD_JSON_DATA = 'bad_json_data',
    }
}

