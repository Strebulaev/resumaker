/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { WebhookActionVacancyOnlyMineSettings } from './WebhookActionVacancyOnlyMineSettings';
export type WebhookActionNegotiationEmployerStateChange = {
    settings?: (WebhookActionVacancyOnlyMineSettings | _IncludesNullableObject) | null;
    /**
     * Перемещение резюме кандидата на другой этап вакансии.
     *
     * Содержит следующую информацию:
     *
     * * кто переместил резюме;
     * * идентификатор резюме;
     * * исходный статус резюме;
     * * новый статус резюме
     *
     */
    type: WebhookActionNegotiationEmployerStateChange.type;
};
export namespace WebhookActionNegotiationEmployerStateChange {
    /**
     * Перемещение резюме кандидата на другой этап вакансии.
     *
     * Содержит следующую информацию:
     *
     * * кто переместил резюме;
     * * идентификатор резюме;
     * * исходный статус резюме;
     * * новый статус резюме
     *
     */
    export enum type {
        NEGOTIATION_EMPLOYER_STATE_CHANGE = 'NEGOTIATION_EMPLOYER_STATE_CHANGE',
    }
}

