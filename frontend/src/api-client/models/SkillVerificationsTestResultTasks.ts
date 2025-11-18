/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { SkillVerificationsOpenedAnswer } from './SkillVerificationsOpenedAnswer';
export type SkillVerificationsTestResultTasks = {
    /**
     * Варианты ответов на закрытые вопросы
     */
    closed_answers: Array<{
        /**
         * Является ли вариант ответа правильным
         */
        correct?: boolean;
        /**
         * Выбран ли вариант ответа
         */
        selected?: boolean;
        /**
         * Вариант ответа на вопрос
         */
        value?: string;
    }>;
    /**
     * Вариант ответа на открытый вопрос
     */
    opened_answer?: (SkillVerificationsOpenedAnswer | _IncludesNullableObject) | null;
    /**
     * Текст вопроса
     */
    question: string;
};

