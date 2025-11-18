/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesAdditionalVacancyFields } from './VacanciesAdditionalVacancyFields';
import type { VacanciesStandardVacancyFields } from './VacanciesStandardVacancyFields';
import type { VacancyVideoVacancyVideoVacancyItem } from './VacancyVideoVacancyVideoVacancyItem';
export type VacanciesVacanciesItem = (VacanciesStandardVacancyFields & VacanciesAdditionalVacancyFields & {
    /**
     * Отображать ли лого для вакансии в поисковой выдаче
     */
    show_logo_in_search?: boolean | null;
    video_vacancy?: (VacancyVideoVacancyVideoVacancyItem | _IncludesNullableObject) | null;
});

