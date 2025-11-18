/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ResumesAccessTypesItem = {
    /**
     * Выбран ли тип видимости
     */
    active?: boolean | null;
    /**
     * Идентификатор типа видимости
     */
    id: string;
    /**
     * Максимальное количество компаний в списке видимости. Возвращается только для типов `blacklist` и `whitelist`
     */
    limit?: number | null;
    /**
     * Ссылка на список видимости. Возвращается только для типов `blacklist` и `whitelist`
     */
    list_url?: string | null;
    /**
     * Имя типа видимости
     */
    name: string;
    /**
     * Количество компаний, добавленных в соответствующий список видимости. Возвращается только для типов `blacklist` и `whitelist`
     */
    total?: number | null;
};

