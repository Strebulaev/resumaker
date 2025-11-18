/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Новый отклик на вакансию
 */
export type WebhookPayloadNewNegotiationVacancy = {
    /**
     * Идентификатор работодателя
     */
    employer_id: string;
    /**
     * Дата отклика в формате [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) с точностью до секунды: `YYYY-MM-DDThh:mm:ss±hhmm`
     */
    negotiation_date: any;
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

