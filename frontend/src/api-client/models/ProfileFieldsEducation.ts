/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesEducationLevel } from './_IncludesEducationLevel';
import type { ProfileFieldsEducationAdditional } from './ProfileFieldsEducationAdditional';
import type { ProfileFieldsEducationElementary } from './ProfileFieldsEducationElementary';
import type { ProfileFieldsEducationPrimary } from './ProfileFieldsEducationPrimary';
export type ProfileFieldsEducation = {
    /**
     * Список куров повышения квалификации
     */
    additional?: Array<ProfileFieldsEducationAdditional> | null;
    /**
     * Список пройденных тестов или экзаменов
     */
    attestation?: Array<ProfileFieldsEducationAdditional> | null;
    /**
     * Среднее образование. Обычно заполняется только при отсутствии высшего образования
     */
    elementary?: Array<ProfileFieldsEducationElementary> | null;
    /**
     * Уровень образования. Возможные значения приведены в поле `education_level` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    level: _IncludesEducationLevel;
    /**
     * Список образований выше среднего
     */
    primary?: Array<ProfileFieldsEducationPrimary> | null;
};

