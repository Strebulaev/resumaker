/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Число откликов на вакансию.
 * Доступно для соискательской авторизации и авторизации приложения при использовании параметра `responses_count_enabled=true`
 *
 */
export type VacancyCounters = {
    /**
     * Количество откликов на вакансию с момента публикации
     */
    responses?: number;
    /**
     * Количество откликов на вакансию с момента создания
     */
    total_responses?: number;
};

