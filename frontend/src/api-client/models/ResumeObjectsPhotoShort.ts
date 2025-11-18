/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
/**
 * Значение может быть `null`, если у работодателя отсутствует брендирование страницы
 */
export type ResumeObjectsPhotoShort = (_IncludesNullableObject | {
    /**
     * Уникальный идентификатор изображения
     */
    id: string;
    /**
     * URL среднего по размеру изображения. Изображение по данному URL доступно ограниченное время после получения ответа. Приложение должно быть готово к тому, что на запрос изображения вернется ошибка `404 Not Found`
     */
    medium: string;
    /**
     * URL уменьшенного изображения. Изображение по данному URL доступно ограниченное время после получения ответа. Приложение должно быть готово к тому, что на запрос изображения вернется ошибка `404 Not Found`
     */
    small: string;
}) | null;

