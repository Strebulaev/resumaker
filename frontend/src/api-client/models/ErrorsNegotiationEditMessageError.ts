/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsNegotiationEditMessageError = {
    /**
     * Описание
     */
    description?: string;
    /**
     * Тип ошибки
     */
    type: ErrorsNegotiationEditMessageError.type;
    /**
     * Причина ошибки:
     *
     * * `message_cannot_be_empty` — сообщение в переписке не может быть пустым.
     * * `message_already_viewed` — редактирование сообщения запрещено. Принимающая сторона уже успела прочитать сообщение.
     * * `vacancy_not_found` — вакансия, на которую совершался отклик, не найдена
     * * `resume_not_found` — резюме из отклика/приглашения было скрыто, либо удалено, либо не найдено
     * * `vacancy_archived` — вакансия, на которую совершался отклик, заархивирована
     *
     */
    value: ErrorsNegotiationEditMessageError.value;
};
export namespace ErrorsNegotiationEditMessageError {
    /**
     * Тип ошибки
     */
    export enum type {
        NEGOTIATIONS = 'negotiations',
    }
    /**
     * Причина ошибки:
     *
     * * `message_cannot_be_empty` — сообщение в переписке не может быть пустым.
     * * `message_already_viewed` — редактирование сообщения запрещено. Принимающая сторона уже успела прочитать сообщение.
     * * `vacancy_not_found` — вакансия, на которую совершался отклик, не найдена
     * * `resume_not_found` — резюме из отклика/приглашения было скрыто, либо удалено, либо не найдено
     * * `vacancy_archived` — вакансия, на которую совершался отклик, заархивирована
     *
     */
    export enum value {
        MESSAGE_CANNOT_BE_EMPTY = 'message_cannot_be_empty',
        MESSAGE_ALREADY_VIEWED = 'message_already_viewed',
        VACANCY_NOT_FOUND = 'vacancy_not_found',
        RESUME_NOT_FOUND = 'resume_not_found',
        VACANCY_ARCHIVED = 'vacancy_archived',
        DISABLED_BY_EMPLOYER = 'disabled_by_employer',
    }
}

