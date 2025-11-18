/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesEducationLevel } from './_IncludesEducationLevel';
export type ResumeObjectsEducationPrimary = {
    /**
     * Уровень образования. Возможные значения приведены в поле `education_level` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    education_level?: _IncludesEducationLevel;
    /**
     * Идентификатор
     */
    id?: string | null;
    /**
     * Название учебного заведения
     */
    name: string;
    /**
     * Идентификатор учебного заведения
     */
    name_id?: string | null;
    /**
     * Факультет
     */
    organization?: string | null;
    /**
     * Идентификатор факультета
     */
    organization_id?: string | null;
    /**
     * Специальность / специализация
     */
    result?: string | null;
    /**
     * Идентификатор специальности / специализации
     */
    result_id?: string | null;
    /**
     * Акроним учебного заведения
     */
    university_acronym?: string | null;
    /**
     * Год окончания
     */
    year: number;
};

