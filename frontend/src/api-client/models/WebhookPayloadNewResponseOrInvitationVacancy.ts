/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Новый отклик или приглашение на вакансии (в отличие от NEW_NEGOTIATION_VACANCY, данное событие будет вызываться как на отклик со стороны соискателя, так и на приглашение со стороны работодателя)
 */
export type WebhookPayloadNewResponseOrInvitationVacancy = {
    /**
     * Идентификатор работодателя
     */
    employer_id: string;
    /**
     * Дата отклика или приглашения в формате [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) с точностью до секунды: `YYYY-MM-DDThh:mm:ss±hhmm`
     */
    response_date: string;
    /**
     * Идентификатор резюме
     */
    resume_id: string | null;
    /**
     * Идентификатор топика
     */
    topic_id: string;
    /**
     * Идентификатор вакансии
     */
    vacancy_id: string | null;
};

