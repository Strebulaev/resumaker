/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Виджет галереи
 */
export type EmployersBrandingConstructorGalleryWidget = {
    /**
     * Список изображений в галерее
     */
    items: Array<{
        /**
         * Идентификатор изображения
         */
        picture_id: number;
        /**
         * Путь к изображению на cdn хранилище
         */
        resized_path: string;
    }>;
    /**
     * Для галереи это значение равно 'gallery'
     */
    type: EmployersBrandingConstructorGalleryWidget.type;
};
export namespace EmployersBrandingConstructorGalleryWidget {
    /**
     * Для галереи это значение равно 'gallery'
     */
    export enum type {
        GALLERY = 'gallery',
    }
}

