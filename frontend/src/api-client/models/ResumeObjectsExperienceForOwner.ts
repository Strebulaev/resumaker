/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesIdNameUrl } from './_IncludesIdNameUrl';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { EmployersEmployerInfoShort } from './EmployersEmployerInfoShort';
import type { ResumeObjectsIndustry } from './ResumeObjectsIndustry';
export type ResumeObjectsExperienceForOwner = {
    /**
     * Регион расположения организации. Элемент [справочника регионов](#tag/Obshie-spravochniki/operation/get-areas)
     */
    area?: (_IncludesIdNameUrl | _IncludesNullableObject) | null;
    /**
     * Название организации
     */
    company?: string | null;
    /**
     * Уникальный идентификатор организации
     */
    company_id?: string | null;
    /**
     * Сайт компании
     */
    company_url?: string | null;
    /**
     * Работодатель
     */
    employer?: (EmployersEmployerInfoShort | _IncludesNullableObject) | null;
    /**
     * Окончание работы (дата в формате `ГГГГ-ММ-ДД`)
     */
    end?: string | null;
    /**
     * Список отраслей компании. Возможные значения приведены в [справочнике индустрий](#tag/Obshie-spravochniki/operation/get-industries)
     */
    industries: Array<_IncludesIdName>;
    /**
     * Отрасль компании
     */
    industry?: (ResumeObjectsIndustry | _IncludesNullableObject) | null;
    /**
     * Должность
     */
    position: string;
    /**
     * Начало работы (дата в формате `ГГГГ-ММ-ДД`)
     */
    start: string;
};

