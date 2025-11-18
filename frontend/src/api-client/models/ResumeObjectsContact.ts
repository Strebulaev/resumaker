/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesContactEmailValue } from './_IncludesContactEmailValue';
import type { _IncludesContactPhoneValue } from './_IncludesContactPhoneValue';
import type { _IncludesContactProperties } from './_IncludesContactProperties';
import type { _IncludesIdName } from './_IncludesIdName';
export type ResumeObjectsContact = (_IncludesContactProperties & {
    /**
     * Тип контакта
     */
    type: _IncludesIdName;
    /**
     * Поле устаревшее, необходимо использовать contact_value. Значение контакта. Для телефона - объект, для email - строка
     * @deprecated
     */
    value: (_IncludesContactEmailValue | _IncludesContactPhoneValue);
});

