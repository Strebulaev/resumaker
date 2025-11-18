/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesLogoUrls90 } from './_IncludesLogoUrls90';
export type ResumesGetResumeVisibilityListItem = {
    /**
     * Ссылка на описание работодателя на сайте
     */
    alternate_url: string;
    /**
     * Идентификатор работодателя
     */
    id: string;
    /**
     * Ссылка на логотип работодателя. Клиент должен предусмотреть вероятность отсутствия ресурса по указанной ссылке
     */
    logo_urls: _IncludesLogoUrls90;
    /**
     * Название работодателя
     */
    name: string;
    /**
     * Ссылка на детальное описание работодателя
     */
    url: string;
};

