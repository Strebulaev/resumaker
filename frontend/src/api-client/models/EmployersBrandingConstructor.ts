/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { EmployersBrandingConstructorGalleryWidget } from './EmployersBrandingConstructorGalleryWidget';
import type { EmployersBrandingConstructorHeaderPicture } from './EmployersBrandingConstructorHeaderPicture';
export type EmployersBrandingConstructor = {
    constructor: {
        header_picture: (EmployersBrandingConstructorHeaderPicture | _IncludesNullableObject) | null;
        /**
         * Ссылка на webview версию бренд страницы
         */
        url: string;
        /**
         * Список виджетов на странице
         */
        widgets: Array<EmployersBrandingConstructorGalleryWidget>;
    };
};

