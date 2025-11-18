/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { WebhookActionVacancyOnlyMineSettings } from './WebhookActionVacancyOnlyMineSettings';
export type WebhookActionVacancyProlongation = {
    settings?: (WebhookActionVacancyOnlyMineSettings | _IncludesNullableObject) | null;
    /**
     * Продление вакансии
     */
    type: WebhookActionVacancyProlongation.type;
};
export namespace WebhookActionVacancyProlongation {
    /**
     * Продление вакансии
     */
    export enum type {
        VACANCY_PROLONGATION = 'VACANCY_PROLONGATION',
    }
}

