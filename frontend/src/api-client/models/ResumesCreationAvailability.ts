/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ResumesCreationAvailability = {
    /**
     * Количество созданных резюме
     */
    created: number;
    /**
     * Доступно ли создание новых резюме для данного пользователя
     */
    is_creation_available: boolean;
    /**
     * Максимально возможное количество резюме
     */
    max: number;
    /**
     * Количество доступных для создания резюме
     */
    remaining: number;
};

