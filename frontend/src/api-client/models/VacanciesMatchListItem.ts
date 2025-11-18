/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesMatchVacancyFields } from './VacanciesMatchVacancyFields';
import type { VacanciesVacancyShort } from './VacanciesVacancyShort';
import type { VacancyVacancyConstructorTemplate } from './VacancyVacancyConstructorTemplate';
import type { VacancyVacancyProperties } from './VacancyVacancyProperties';
export type VacanciesMatchListItem = (VacanciesVacancyShort & VacanciesMatchVacancyFields & {
    /**
     * @deprecated
     */
    vacancy_constructor_template?: (VacancyVacancyConstructorTemplate | _IncludesNullableObject) | null;
    vacancy_properties?: VacancyVacancyProperties;
});

