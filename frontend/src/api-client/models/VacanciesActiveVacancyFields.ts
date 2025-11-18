/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesAddress } from './VacanciesAddress';
import type { VacancyCanUpgradeBillingType } from './VacancyCanUpgradeBillingType';
import type { VacancyCountersForActive } from './VacancyCountersForActive';
import type { VacancyExpiresAt } from './VacancyExpiresAt';
import type { VacancyHasUpdates } from './VacancyHasUpdates';
import type { VacancyManagerOutput } from './VacancyManagerOutput';
import type { VacancyVacancyProperties } from './VacancyVacancyProperties';
export type VacanciesActiveVacancyFields = {
    address?: (VacanciesAddress | _IncludesNullableObject) | null;
    can_upgrade_billing_type: VacancyCanUpgradeBillingType;
    counters: VacancyCountersForActive;
    /**
     * Дата и время публикации вакансии
     */
    created_at: string;
    expires_at: VacancyExpiresAt;
    has_updates: VacancyHasUpdates;
    manager: VacancyManagerOutput;
    /**
     * Расстояние в метрах между центром сортировки (заданной параметрами `sort_point_lat`, `sort_point_lng`) и указанным в вакансии адресом. В случае, если в адресе указаны только станции метро, выдается расстояние между центром сортировки и средней геометрической точкой указанных станций.
     * Значение `sort_point_distance` выдается только в случае, если заданы параметры `sort_point_lat`, `sort_point_lng`, `order_by=distance`
     *
     */
    sort_point_distance?: number | null;
    vacancy_properties?: VacancyVacancyProperties;
};

