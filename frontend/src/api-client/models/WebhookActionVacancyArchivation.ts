/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { WebhookActionVacancyOnlyMineSettings } from './WebhookActionVacancyOnlyMineSettings';
export type WebhookActionVacancyArchivation = {
    settings?: (WebhookActionVacancyOnlyMineSettings | _IncludesNullableObject) | null;
    /**
     * Архивация вакансии
     */
    type: WebhookActionVacancyArchivation.type;
};
export namespace WebhookActionVacancyArchivation {
    /**
     * Архивация вакансии
     */
    export enum type {
        VACANCY_ARCHIVATION = 'VACANCY_ARCHIVATION',
    }
}

