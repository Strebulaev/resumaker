/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesUpgradeFieldsAction } from './VacanciesUpgradeFieldsAction';
import type { VacanciesUpgradeFieldsBillingTypeFull } from './VacanciesUpgradeFieldsBillingTypeFull';
import type { VacanciesUpgradeFieldsWithoutAction } from './VacanciesUpgradeFieldsWithoutAction';
export type VacanciesVacancyUpgradeListItem = {
    /**
     * Список возможных действий
     */
    actions: Array<VacanciesUpgradeFieldsAction>;
    vacancy_billing_type: VacanciesUpgradeFieldsBillingTypeFull;
    /**
     * Объект с описанием причины, по которой невозможно улучшить вакансию до данного типа. `Null`, если массив `actions` не пустой
     */
    without_action?: Array<(VacanciesUpgradeFieldsWithoutAction | _IncludesNullableObject)> | null;
};

