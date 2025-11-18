/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VacancyDuplicates = {
    /**
     * Общее количество дубликатов вакансии
     */
    found: number;
    /**
     * Существуют ли дубликаты вакансии
     */
    has_duplicates: boolean;
    /**
     * Список идентификаторов дубликатов вакансии
     */
    items: Array<number>;
};

