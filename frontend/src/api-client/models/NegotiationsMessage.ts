/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { NegotiationsAuthor } from './NegotiationsAuthor';
/**
 * Сообщение в отклике
 */
export type NegotiationsMessage = {
    author: NegotiationsAuthor;
    /**
     * Дата и время создания сообщения
     */
    created_at: string;
    /**
     * Можно ли редактировать текст сообщения
     */
    editable: boolean;
    /**
     * Идентификатор сообщения
     */
    id: string;
    /**
     * Можно ли прочитать сообщение
     */
    read?: boolean;
    /**
     * Состояние сообщения
     */
    state: _IncludesIdName;
    /**
     * Текст сообщения
     */
    text: string | null;
    /**
     * Прочитано ли сообщение смотрящим (для сообщений отправленных соискателем - всегда true)
     */
    viewed_by_me: boolean;
    /**
     * Прочитано ли сообщение работодателем (для сообщений работодателя - true)
     */
    viewed_by_opponent: boolean;
};

