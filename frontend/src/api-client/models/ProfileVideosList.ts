/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Список видео профиля для текущего или запрашиваемого соискателя
 */
export type ProfileVideosList = {
    items: Array<{
        download_url: {
            /**
             * Дата и время, до которых действительна ссылка
             */
            expires_at: string;
            /**
             * Ссылка на скачивание видео
             */
            url: string;
        };
        /**
         * Идентификатор видео
         */
        id: string;
    }>;
};

