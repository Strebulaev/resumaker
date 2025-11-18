/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Содержит информацию об общем количестве резюме у соискателя
 */
export type ResumesSuitableResumeOverall = {
    /**
     * Количество резюме, которыми пользователь уже откликался на эту вакансию
     */
    already_applied: number;
    /**
     * Количество неопубликованных резюме
     */
    not_published: number;
    /**
     * Количество резюме, которыми невозможно откликнуться на данную вакансию по другим причинам (конфликтующие настройки видимости резюме и т.п.)
     */
    unavailable: number;
};

