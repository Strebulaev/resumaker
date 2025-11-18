/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacancyDescription } from './VacancyDescription';
import type { VacancyName } from './VacancyName';
/**
 * Поля, передаваемые в запросе на редактирование вакансии
 */
export type VacancyEditFields = {
    description?: (VacancyDescription | _IncludesNullableObject) | null;
    name?: (VacancyName | _IncludesNullableObject) | null;
};

