/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesPagination } from './_IncludesPagination';
import type { VacanciesArguments } from './VacanciesArguments';
import type { VacanciesClusters } from './VacanciesClusters';
import type { VacanciesFixes } from './VacanciesFixes';
import type { VacanciesSuggests } from './VacanciesSuggests';
import type { VacanciesVacanciesItems } from './VacanciesVacanciesItems';
export type VacanciesVacanciesResponse = (VacanciesVacanciesItems & _IncludesPagination & VacanciesClusters & VacanciesArguments & {
    /**
     * Ссылка на вакансию
     */
    alternate_url?: string | null;
    fixes?: VacanciesFixes;
    suggests?: VacanciesSuggests;
});

