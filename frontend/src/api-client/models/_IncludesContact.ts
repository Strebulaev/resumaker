/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesContactProperties } from './_IncludesContactProperties';
import type { _IncludesIdName } from './_IncludesIdName';
export type _IncludesContact = (_IncludesContactProperties & {
    /**
     * Значение контакта
     */
    contact_value: string | null;
    /**
     * Тип контакта - Эл. почта, телефон, основной способ связи или дополнительный способ связи
     */
    kind: string;
    /**
     * Является ли предпочтительным способом связи
     */
    preferred: boolean;
    /**
     * Тип контакта
     */
    type: _IncludesIdName;
});

