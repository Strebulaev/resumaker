/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VacancyDraftEmployer = {
    /**
     * Url для просмотра работодателя на сайте
     */
    alternate_url: string;
    /**
     * Идентификатор работодателя
     */
    id: string;
    /**
     * Ссылки на логотипы работодателя разных размеров
     */
    logo_urls: {
        '90': string;
        '240': string;
        original?: string;
    };
    /**
     * Название работодателя
     */
    name: string;
    /**
     * Url для просмотра работодателя
     */
    url: string;
};

