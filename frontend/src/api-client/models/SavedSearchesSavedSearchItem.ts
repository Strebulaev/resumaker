/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesCountUrl } from './_IncludesCountUrl';
export type SavedSearchesSavedSearchItem = {
    /**
     * Дата и время создания
     */
    created_at: string;
    /**
     * Идентификатор поиска
     */
    id: string;
    items: (_IncludesCountUrl & Record<string, any>);
    /**
     * Название поиска
     */
    name: string;
    new_items: (_IncludesCountUrl & Record<string, any>);
    /**
     * Статус подписки
     */
    subscription: boolean;
};

