/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesEducationLevel } from './_IncludesEducationLevel';
import type { ResumeObjectsEducationAdditional } from './ResumeObjectsEducationAdditional';
import type { ResumeObjectsEducationElementary } from './ResumeObjectsEducationElementary';
import type { ResumeObjectsEducationPrimary } from './ResumeObjectsEducationPrimary';
export type ResumeObjectsEducation = {
    /**
     * Список куров повышения квалификации
     */
    additional?: Array<ResumeObjectsEducationAdditional> | null;
    /**
     * Список пройденных тестов или экзаменов
     */
    attestation?: Array<ResumeObjectsEducationAdditional> | null;
    /**
     * Среднее образование. Обычно заполняется только при отсутствии высшего образования
     */
    elementary?: Array<ResumeObjectsEducationElementary> | null;
    /**
     * Уровень образования. Возможные значения приведены в поле `education_level` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    level: _IncludesEducationLevel;
    /**
     * Список образований выше среднего
     */
    primary?: Array<ResumeObjectsEducationPrimary> | null;
};

