/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ResumeObjectsPortfolioNoId = {
    /**
     * Описание изображения в портфолио
     */
    description?: string;
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

