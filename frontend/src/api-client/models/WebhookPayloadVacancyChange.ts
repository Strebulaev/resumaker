/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Изменение вакансии
 */
export type WebhookPayloadVacancyChange = {
    /**
     * Дата изменения вакансии в формате [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) с точностью до секунды: `YYYY-MM-DDThh:mm:ss±hhmm`
     */
    change_date: string;
    /**
     * Идентификатор вакансии
     */
    vacancy_id: string;
};

