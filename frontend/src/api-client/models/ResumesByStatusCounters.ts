/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Количество резюме в списках
 */
export type ResumesByStatusCounters = {
    /**
     * Количество резюме, уже использованных для отклика на данную вакансию
     */
    already_applied: number;
    /**
     * Количество неопубликованных резюме (в [статусе](#tag/Rezyume.-Prosmotr-informacii/Status-rezyume) `not_published` или `blocked`)
     */
    not_published: number;
    /**
     * Количество резюме, которыми можно откликнуться на данную вакансию
     */
    suitable: number;
    /**
     * Количество резюме, которыми невозможно откликнуться на данную вакансию (например, из-за конфликтующих настроек видимости)
     */
    unavailable: number;
};

