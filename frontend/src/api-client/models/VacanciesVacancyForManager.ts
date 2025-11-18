/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacanciesVacancyCommonFields } from './VacanciesVacancyCommonFields';
import type { VacanciesVacancyManagerFields } from './VacanciesVacancyManagerFields';
import type { VacancyBillingTypeObject } from './VacancyBillingTypeObject';
export type VacanciesVacancyForManager = (VacanciesVacancyCommonFields & VacancyBillingTypeObject & VacanciesVacancyManagerFields & {
    /**
     * Идентификатор архивной вакансии, на основе которой была опубликована текущая вакансия. Если вакансия была создана самостоятельно - null
     */
    previous_id?: string | null;
});

