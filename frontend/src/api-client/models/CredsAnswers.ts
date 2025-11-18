/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CredsAnswers = {
    /**
     * Группа данного ответа, positive, negative, neutral
     */
    answer_group?: string;
    /**
     * Идентификатор ответа (совпадает с ключом объекта)
     */
    answer_id?: string;
    /**
     * Вопросы которые нужно задать после использования пользователем данного ответа
     */
    ask_questions_after?: Array<string>;
    /**
     * Описание ответа
     */
    description?: string | null;
    /**
     * Текст ответа который можно использовать для отображения без самого вопроса
     */
    positive_title?: string;
    /**
     * Нужно ли пропускать данный ответ на форме с отображением кредов пользователя
     */
    skip_at_result?: boolean;
    /**
     * Текст ответа который нужно отрисовать для сбора ответов от пользователя
     */
    title?: string;
};

