/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SuggestsArea } from './SuggestsArea';
export type _IncludesEducationalInstitutionItem = {
    /**
     * Сокращенное название учебного заведения
     */
    acronym?: string | null;
    /**
     * Регион
     */
    area: (SuggestsArea & Record<string, any>);
    /**
     * Идентификатор учебного заведения
     */
    id: string;
    /**
     * Альтернативное название учебного заведения
     */
    synonyms?: string | null;
    /**
     * Полное название учебного заведения
     */
    text: string;
};

