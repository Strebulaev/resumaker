/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EmployersVacancyBrandedTemplatesList = {
    /**
     * Список доступных брендированных шаблонов вакансий
     */
    items: Array<{
        /**
         * Идентификатор брендированного шаблона вакансий
         */
        id: string;
        /**
         * Название брендированного шаблона вакансий
         */
        name: string;
        /**
         * Идентификатор активной версии брендированного шаблона.
         * Равен null в случае шаблонов-конструкторов
         *
         */
        version_id: string | null;
    }>;
};

