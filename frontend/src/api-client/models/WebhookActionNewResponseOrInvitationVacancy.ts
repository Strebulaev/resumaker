/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { WebhookActionVacancyOnlyMineSettings } from './WebhookActionVacancyOnlyMineSettings';
export type WebhookActionNewResponseOrInvitationVacancy = {
    settings?: (WebhookActionVacancyOnlyMineSettings | _IncludesNullableObject) | null;
    /**
     * Новый отклик или приглашение на вакансию. Данное событие будет вызываться как на отклик со стороны соискателя, так и на приглашение со стороны работодателя
     */
    type: WebhookActionNewResponseOrInvitationVacancy.type;
};
export namespace WebhookActionNewResponseOrInvitationVacancy {
    /**
     * Новый отклик или приглашение на вакансию. Данное событие будет вызываться как на отклик со стороны соискателя, так и на приглашение со стороны работодателя
     */
    export enum type {
        NEW_RESPONSE_OR_INVITATION_VACANCY = 'NEW_RESPONSE_OR_INVITATION_VACANCY',
    }
}

