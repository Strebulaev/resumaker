/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ResumeProfileResumeProfileDictionaryCommunicationMethods = {
    /**
     * Список способов коммуникации профиля соискателя
     */
    items: Array<{
        /**
         * Описание способа коммуникации
         */
        description?: string | null;
        /**
         * Сообщение об ошибке
         */
        error_message?: string | null;
        /**
         * Плейсхолдер
         */
        placeholder?: string | null;
        /**
         * Место в списке
         */
        position?: number;
        /**
         * Паттерн для проверки данных
         */
        regexp?: string | null;
        /**
         * Название
         */
        title: string;
        /**
         * Тип
         */
        type: string;
    }>;
};

