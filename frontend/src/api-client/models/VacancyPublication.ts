/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VacancyPublication = {
    /**
     * URL на список регионов, в которых можно опубликовать вакансию данного типа. Список возвращается в древовидной структуре и публикация вакансий возможна только в конечных (листовых) узлах дерева. Они помечены флагом `can_publish=true`
     */
    areas_url: string;
    /**
     * Количество публикаций в регионе, доступных работодателю
     */
    count: number;
    /**
     * Название региона
     */
    name: string;
};

