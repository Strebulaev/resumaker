/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesContactEmailValue } from './_IncludesContactEmailValue';
import type { _IncludesContactPhoneValue } from './_IncludesContactPhoneValue';
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesLinks } from './_IncludesLinks';
export type _IncludesContactProperties = {
    /**
     * Комментарий к контакту
     */
    comment?: string | null;
    /**
     * Значение контакта
     */
    contact_value?: string | null;
    /**
     * Тип контакта - Эл. почта, телефон, основной способ связи или дополнительный способ связи
     */
    kind?: string;
    /**
     * Ссылки для открытия методов коммуникации по платформам
     */
    links?: _IncludesLinks | null;
    /**
     * Требуется ли подтверждение телефона
     */
    need_verification?: boolean | null;
    /**
     * Является ли предпочтительным способом связи
     */
    preferred?: boolean;
    /**
     * Тип контакта
     */
    type?: _IncludesIdName;
    /**
     * Поле устаревшее, необходимо использовать contact_value. Значение контакта. Для телефона - объект, для email - строка
     * @deprecated
     */
    value?: (_IncludesContactEmailValue | _IncludesContactPhoneValue);
    /**
     * Является ли телефон подтвержденным
     */
    verified?: boolean | null;
};

