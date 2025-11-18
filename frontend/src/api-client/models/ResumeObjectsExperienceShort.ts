/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { ResumeObjectsExperiencePropertiesShort } from './ResumeObjectsExperiencePropertiesShort';
export type ResumeObjectsExperienceShort = (ResumeObjectsExperiencePropertiesShort & {
    /**
     * Список отраслей компании. Возможные значения приведены в [справочнике индустрий](#tag/Obshie-spravochniki/operation/get-industries)
     */
    industries: Array<_IncludesIdName>;
    /**
     * Должность
     */
    position: string;
    /**
     * Начало работы (дата в формате `ГГГГ-ММ-ДД`)
     */
    start: string;
});

