/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyCountersForArchivedOrHidden } from './VacancyCountersForArchivedOrHidden';
import type { VacancyVacancyProperties } from './VacancyVacancyProperties';
export type VacanciesVacancyArchivedFields = {
    /**
     * Дата и время архивации вакансии
     */
    archived_at: string;
    /**
     * Является ли вакансия скрытой от соискателей
     */
    closed_for_applicants: boolean;
    counters: VacancyCountersForArchivedOrHidden;
    /**
     * Дата и время публикации вакансии
     */
    created_at: string;
    /**
     * Расстояние в метрах между центром сортировки (заданной параметрами `sort_point_lat`, `sort_point_lng`) и указанным в вакансии адресом. В случае, если в адресе указаны только станции метро, выдается расстояние между центром сортировки и средней геометрической точкой указанных станций.
     *
     * Значение `sort_point_distance` выдается только в случае, если заданы параметры `sort_point_lat`, `sort_point_lng`, `order_by=distance`
     *
     */
    sort_point_distance?: number | null;
    vacancy_properties: VacancyVacancyProperties;
};

