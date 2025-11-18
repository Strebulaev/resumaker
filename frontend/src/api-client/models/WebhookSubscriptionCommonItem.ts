/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookActionNegotiationEmployerStateChange } from './WebhookActionNegotiationEmployerStateChange';
import type { WebhookActionNewNegotiationVacancy } from './WebhookActionNewNegotiationVacancy';
import type { WebhookActionNewResponseOrInvitationVacancy } from './WebhookActionNewResponseOrInvitationVacancy';
import type { WebhookActionVacancyArchivation } from './WebhookActionVacancyArchivation';
import type { WebhookActionVacancyChange } from './WebhookActionVacancyChange';
import type { WebhookActionVacancyProlongation } from './WebhookActionVacancyProlongation';
import type { WebhookActionVacancyPublicationForVacancyManager } from './WebhookActionVacancyPublicationForVacancyManager';
export type WebhookSubscriptionCommonItem = {
    /**
     * Cписок событий
     */
    actions: Array<(WebhookActionNewNegotiationVacancy | WebhookActionNewResponseOrInvitationVacancy | WebhookActionVacancyArchivation | WebhookActionVacancyChange | WebhookActionVacancyProlongation | WebhookActionVacancyPublicationForVacancyManager | WebhookActionNegotiationEmployerStateChange)>;
    /**
     * URL, на который будет отправляться POST запрос при наступлении события
     */
    url: string;
};

