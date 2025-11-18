/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesLogoUrls } from './_IncludesLogoUrls';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
export type EmployersEmployerInfoShort = {
    /**
     * Ссылка на описание работодателя на сайте
     */
    alternate_url: string;
    /**
     * Идентификатор работодателя
     */
    id: string;
    /**
     * Ссылки на изображения логотипов работодателя разных размеров. `original` — это необработанный логотип, который может быть большого размера. Если изначально загруженный компанией логотип меньше, чем 240px и/или 90px по меньшей стороне, то в соответствующих ключах будут ссылки на изображения оригинального размера. Объект может быть `null`, если компания не загрузила логотип. Клиент должен предусмотреть возможность отсутствия логотипа по указанной ссылке (ответ с кодом `404 Not Found`). Логотипы 90 и 240 присутствуют не во всех компаниях
     */
    logo_urls?: (_IncludesLogoUrls | _IncludesNullableObject) | null;
    /**
     * Название работодателя
     */
    name: string;
    /**
     * URL для получения полного описания работодателя
     */
    url: string;
};

