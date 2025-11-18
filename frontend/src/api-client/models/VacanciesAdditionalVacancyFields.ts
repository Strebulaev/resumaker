/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyCounters } from './VacancyCounters';
import type { VacancyEmploymentFormOutput } from './VacancyEmploymentFormOutput';
import type { VacancyEmploymentOutput } from './VacancyEmploymentOutput';
import type { VacancyExperienceOutput } from './VacancyExperienceOutput';
import type { VacancySnippet } from './VacancySnippet';
import type { VacancySortPointDistance } from './VacancySortPointDistance';
export type VacanciesAdditionalVacancyFields = {
    counters?: VacancyCounters;
    /**
     * @deprecated
     */
    employment?: VacancyEmploymentOutput;
    employment_form?: VacancyEmploymentFormOutput;
    experience?: VacancyExperienceOutput;
    /**
     * Дополнительные текстовые снипеты (отрывки) по найденной вакансии. Если в тексте снипета встретилась поисковая фраза (параметр `text`), она будет подсвечена тегом `highlighttext`
     */
    snippet: VacancySnippet;
    sort_point_distance?: VacancySortPointDistance;
};

