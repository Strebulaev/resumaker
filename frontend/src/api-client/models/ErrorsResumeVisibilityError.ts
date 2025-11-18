/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsResumeVisibilityError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsResumeVisibilityError.type;
    /**
     * Название поля с ошибкой:
     *
     * - `per_page` — передано невалидное количество элементов на странице (максимум 100).
     * - `unknown_employer` — передан неизвестный идентификатор работодателя.
     * - `limit_exceeded` — превышен лимит списка видимости.
     * - `too_many_employers` — передано слишком много работодателей.
     * - `id` — передан невалидный идентификатор работодателя
     *
     */
    value: ErrorsResumeVisibilityError.value;
};
export namespace ErrorsResumeVisibilityError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        BAD_ARGUMENT = 'bad_argument',
        RESUME_VISIBILITY_LIST = 'resume_visibility_list',
    }
    /**
     * Название поля с ошибкой:
     *
     * - `per_page` — передано невалидное количество элементов на странице (максимум 100).
     * - `unknown_employer` — передан неизвестный идентификатор работодателя.
     * - `limit_exceeded` — превышен лимит списка видимости.
     * - `too_many_employers` — передано слишком много работодателей.
     * - `id` — передан невалидный идентификатор работодателя
     *
     */
    export enum value {
        PER_PAGE = 'per_page',
        UNKNOWN_EMPLOYER = 'unknown_employer',
        LIMIT_EXCEEDED = 'limit_exceeded',
        TOO_MANY_EMPLOYERS = 'too_many_employers',
    }
}

