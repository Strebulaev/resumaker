/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesClusterMetroLine } from './_IncludesClusterMetroLine';
import type { _IncludesClusterMetroStation } from './_IncludesClusterMetroStation';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
export type VacanciesItemsOfClusterItem = {
    /**
     * Количество вакансий в данном элементе кластера
     */
    count: number;
    metro_line?: (_IncludesNullableObject | _IncludesClusterMetroLine) | null;
    metro_station?: (_IncludesNullableObject | _IncludesClusterMetroStation) | null;
    /**
     * Название элемента кластера
     */
    name: string;
    /**
     * Тип значения, связанного с группой
     */
    type?: VacanciesItemsOfClusterItem.type | null;
    /**
     * Ссылка на поисковую выдачу по данному элементу кластера
     */
    url: string;
};
export namespace VacanciesItemsOfClusterItem {
    /**
     * Тип значения, связанного с группой
     */
    export enum type {
        METRO_STATION = 'metro_station',
        METRO_LINE = 'metro_line',
    }
}

