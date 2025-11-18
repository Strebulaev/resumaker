/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacanciesArgumentItem } from './VacanciesArgumentItem';
export type VacanciesArguments = {
    /**
     * Массив параметров поиска, переданных в запросе.
     *
     * Возвращается только если в запросе передан параметр `describe_arguments=true`. В массиве выдаются только те параметры, которые влияют на поиск вакансий. Неизвестные параметры игнорируются. Элемент списка с одним значением `argument` может повторяться несколько раз, если параметр имеет несколько значений
     *
     */
    arguments?: Array<VacanciesArgumentItem> | null;
};

