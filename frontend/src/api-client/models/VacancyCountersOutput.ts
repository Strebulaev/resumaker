/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VacancyCountersOutput = {
    /**
     * Общее количество звонков
     */
    calls: number;
    /**
     * Количество приглашений на вакансию
     */
    invitations: number;
    /**
     * Количество откликнувшихся и приглашенных соискателей на вакансию
     */
    invitations_and_responses: number;
    /**
     * Общее количество новых пропущенных звонков
     */
    new_missed_calls: number;
    /**
     * Количество откликов на вакансию
     */
    responses: number;
    /**
     * Количество резюме в работе на вакансию
     */
    resumes_in_progress: number;
    /**
     * Количество непросмотренных откликов на вакансию
     */
    unread_responses: number;
    /**
     * Количество просмотров вакансии
     */
    views: number;
};

