/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsArtifactUploadError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsArtifactUploadError.type;
    /**
     * Название поля с ошибкой. Возможные значения:
     * * `file` — не указан файл, либо указано несколько.
     * * `type` — некорректное значение параметра `type`.
     * * `description` — слишком длинное описание.
     * * `limit_exceeded` — превышено количество артефактов.
     * * `unknown_format` — неизвестный формат файла
     *
     */
    value: ErrorsArtifactUploadError.value;
};
export namespace ErrorsArtifactUploadError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        ARTIFACTS = 'artifacts',
    }
    /**
     * Название поля с ошибкой. Возможные значения:
     * * `file` — не указан файл, либо указано несколько.
     * * `type` — некорректное значение параметра `type`.
     * * `description` — слишком длинное описание.
     * * `limit_exceeded` — превышено количество артефактов.
     * * `unknown_format` — неизвестный формат файла
     *
     */
    export enum value {
        FILE = 'file',
        TYPE = 'type',
        DESCRIPTION = 'description',
        LIMIT_EXCEEDED = 'limit_exceeded',
        UNKNOWN_FORMAT = 'unknown_format',
    }
}

