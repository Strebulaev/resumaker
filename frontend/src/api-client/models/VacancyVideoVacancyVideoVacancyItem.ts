/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacancyVideoVacancyCoverPicture } from './VacancyVideoVacancyCoverPicture';
import type { VacancyVideoVacancySnippetPicture } from './VacancyVideoVacancySnippetPicture';
import type { VacancyVideoVacancyVideo } from './VacancyVideoVacancyVideo';
/**
 * Данные по видео вакансии, либо `null`, если она не подключена
 */
export type VacancyVideoVacancyVideoVacancyItem = {
    cover_picture?: (VacancyVideoVacancyCoverPicture | _IncludesNullableObject) | null;
    snippet_picture?: (VacancyVideoVacancySnippetPicture | _IncludesNullableObject) | null;
    /**
     * Ссылка на версию обложки для сниппета
     * @deprecated
     */
    snippet_picture_url?: string | null;
    snippet_video?: (VacancyVideoVacancyVideo | _IncludesNullableObject) | null;
    /**
     * Ссылка на версию видео для сниппета
     * @deprecated
     */
    snippet_video_url?: string | null;
    video?: VacancyVideoVacancyVideo;
    /**
     * Ссылка для скачивания видео
     * @deprecated
     */
    video_url?: string;
};

