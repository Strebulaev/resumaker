/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookPayloadNegotiationEmployerStateChange } from './WebhookPayloadNegotiationEmployerStateChange';
import type { WebhookPayloadNewNegotiationVacancy } from './WebhookPayloadNewNegotiationVacancy';
import type { WebhookPayloadNewResponseOrInvitationVacancy } from './WebhookPayloadNewResponseOrInvitationVacancy';
import type { WebhookPayloadVacancyArchivation } from './WebhookPayloadVacancyArchivation';
import type { WebhookPayloadVacancyChange } from './WebhookPayloadVacancyChange';
import type { WebhookPayloadVacancyProlongation } from './WebhookPayloadVacancyProlongation';
import type { WebhookPayloadVacancyPublicationForVacancyManager } from './WebhookPayloadVacancyPublicationForVacancyManager';
export type WebhookSendObjectBaseUser = {
    /**
     * Тип экшена
     */
    action_type: string;
    /**
     * Идентификатор сообщения
     */
    id: string;
    payload: (WebhookPayloadNewNegotiationVacancy | WebhookPayloadNewResponseOrInvitationVacancy | WebhookPayloadVacancyArchivation | WebhookPayloadVacancyPublicationForVacancyManager | WebhookPayloadVacancyProlongation | WebhookPayloadVacancyChange | WebhookPayloadNegotiationEmployerStateChange);
    /**
     * Идентификатор подписки
     */
    subscription_id: string;
    /**
     * Идентификатор пользователя
     */
    user_id: string;
};

