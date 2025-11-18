/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WebhookPayloadVacancyPublicationForVacancyManager = {
    /**
     * Дата создания вакансии в формате [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) с точностью до секунды: `YYYY-MM-DDThh:mm:ss±hhmm
     */
    creation_date: string;
    /**
     * Идентификатор модератора вакансии
     */
    employer_manager_id: string;
    /**
     * Идентификатор вакансии
     */
    vacancy_id: string;
};

