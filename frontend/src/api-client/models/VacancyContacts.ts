/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyPhoneItem } from './VacancyPhoneItem';
/**
 * Контактная информация. В случае, если параметр используется, необходимо наличие атрибута phones или email
 */
export type VacancyContacts = {
    /**
     * Электронная почта. Значение поля должно соответствовать формату email
     */
    email?: string | null;
    /**
     * Имя контакта
     */
    name: string;
    /**
     * Список телефонов для связи
     */
    phones?: Array<VacancyPhoneItem> | null;
};

