/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacancyPicture } from './VacancyPicture';
/**
 * Информация по примененному брендированному шаблону конструктора вакансии. Поддерживается только две картинки: верхняя — в шапке вакансии, нижняя — в самом низу
 */
export type VacancyVacancyConstructorTemplate = {
    /**
     * Информация по нижней картинке шаблона
     */
    bottom_picture?: (_IncludesNullableObject | VacancyPicture) | null;
    /**
     * ID шаблона
     */
    id?: number;
    /**
     * Название шаблона
     */
    name?: string;
    /**
     * Информация по верхней картинке шаблона
     */
    top_picture?: (_IncludesNullableObject | VacancyPicture) | null;
};

