/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VacanciesVacancyStatsItem = {
    /**
     * Дата в формате `YYYY-MM-DD`
     */
    date: string;
    /**
     * Количество откликов на вакансию. `null` если дата в будущем или данных на эту дату нет
     */
    responses?: number | null;
    /**
     * Количество просмотров вакансии. `null` если дата в будущем или данных на эту дату нет
     */
    views?: number | null;
};

