/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesLogoUrls } from './_IncludesLogoUrls';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
export type EmployersEmployersBlacklistedItem = {
    /**
     * Ссылка на представление компании на сайте
     */
    alternate_url?: string | null;
    /**
     * Идентификатор компании
     */
    id?: string | null;
    /**
     * Ссылки на логотипы работодателя разных размеров
     */
    logo_urls?: (_IncludesLogoUrls | _IncludesNullableObject) | null;
    /**
     * Название компании
     */
    name: string;
    /**
     * Количество открытых вакансий у работодателя
     */
    open_vacancies: number;
    /**
     * URL, на который нужно сделать GET-запрос, чтобы получить информацию о компании
     */
    url?: string | null;
    /**
     * Ссылка на поисковую выдачу вакансий данной компании
     */
    vacancies_url?: string | null;
};

