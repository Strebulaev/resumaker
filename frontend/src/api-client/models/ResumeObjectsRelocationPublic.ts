/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesArea } from './_IncludesArea';
import type { _IncludesIdName } from './_IncludesIdName';
export type ResumeObjectsRelocationPublic = {
    /**
     * Список городов, в которые возможен переезд. Имеет смысл только с соответствующим полем `type`
     */
    area?: Array<_IncludesArea>;
    /**
     * Список районов, в которые возможен переезд. Имеет смысл только с соответствующим полем `type`
     */
    district?: Array<_IncludesIdName>;
    /**
     * Готовность к переезду. Элемент справочника [relocation_type](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    type: _IncludesIdName;
};

