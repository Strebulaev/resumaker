/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
export type VacanciesArgumentItem = {
    /**
     * Параметр поиска вакансии
     */
    argument: string;
    /**
     * Группа кластеров, которая связана с данным параметром
     */
    cluster_group?: (_IncludesIdName | _IncludesNullableObject) | null;
    /**
     * URL поиска вакансий, который получится, если перестать учитывать в поиске данный параметр
     */
    disable_url: string;
    /**
     * Цвет линии в HEX-формате `RRGGBB` (от `000000` до `FFFFFF`). Возвращается только для аргумента `metro`
     */
    hex_color?: string | null;
    /**
     * Станция или линия метро (`station`/`line`). Возвращается только для аргумента `metro`
     */
    metro_type?: string | null;
    /**
     * Название значения
     */
    name?: string | null;
    /**
     * Значение параметра
     */
    value: string;
    /**
     * Описание параметра
     */
    value_description?: string | null;
};

