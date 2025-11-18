/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { ResumesByStatusCounters } from './ResumesByStatusCounters';
import type { ResumesSuitableResumeItem } from './ResumesSuitableResumeItem';
export type ResumesByStatusResponse = {
    /**
     * Список резюме, уже использованных для отклика на данную вакансию
     */
    already_applied: Array<ResumesSuitableResumeItem>;
    counters?: (_IncludesNullableObject | ResumesByStatusCounters) | null;
    /**
     * Список неопубликованных резюме (в [статусе](#tag/Rezyume.-Prosmotr-informacii/Status-rezyume) `not_published` или `blocked`)
     */
    not_published: Array<ResumesSuitableResumeItem>;
    /**
     * Список резюме, которыми можно откликнуться на данную вакансию
     */
    suitable: Array<ResumesSuitableResumeItem>;
    /**
     * Список резюме, которыми невозможно откликнуться на данную вакансию (например, из-за конфликтующих настроек видимости)
     */
    unavailable: Array<ResumesSuitableResumeItem>;
};

