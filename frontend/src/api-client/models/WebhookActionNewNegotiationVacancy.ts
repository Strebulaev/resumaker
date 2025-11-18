/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { WebhookActionVacancyOnlyMineSettings } from './WebhookActionVacancyOnlyMineSettings';
export type WebhookActionNewNegotiationVacancy = {
    settings?: (WebhookActionVacancyOnlyMineSettings | _IncludesNullableObject) | null;
    /**
     * Новый отклик на вакансию. Данное событие будет вызываться только на отклик со стороны соискателя
     */
    type: WebhookActionNewNegotiationVacancy.type;
};
export namespace WebhookActionNewNegotiationVacancy {
    /**
     * Новый отклик на вакансию. Данное событие будет вызываться только на отклик со стороны соискателя
     */
    export enum type {
        NEW_NEGOTIATION_VACANCY = 'NEW_NEGOTIATION_VACANCY',
    }
}

