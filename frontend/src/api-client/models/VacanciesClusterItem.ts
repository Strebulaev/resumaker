/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacanciesItemsOfClusterItem } from './VacanciesItemsOfClusterItem';
export type VacanciesClusterItem = {
    /**
     * Идентификатор кластера
     */
    id: string;
    /**
     * Массив поисковых запросов в данном кластере с указанием дополнительных параметров
     */
    items: Array<VacanciesItemsOfClusterItem>;
    /**
     * Название типа кластера
     */
    name: string;
};

