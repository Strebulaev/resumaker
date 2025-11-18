/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Фотография пользователя (см. [Артефакты](#tag/Rabota-s-artefaktami))
 */
export type ProfilePhoto = {
    /**
     * @deprecated
     */
    '40'?: string;
    /**
     * @deprecated
     */
    '100'?: string;
    /**
     * @deprecated
     */
    '500'?: string;
    /**
     * Уникальный идентификатор изображения
     */
    id: string;
    /**
     * URL среднего по размеру изображения. Изображение по данному url доступно ограниченное время, после получения ответа. Приложение должно быть готово к тому, что на запрос изображения вернётся `404 Not Found`
     *
     */
    medium: string;
    /**
     * URL уменьшенного изображения. Изображение по данному url доступно ограниченное время, после получения ответа. Приложение должно быть готово к тому, что на запрос изображения вернётся `404 Not Found`
     *
     */
    small: string;
};

