/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyPhoneItem } from './VacancyPhoneItem';
/**
 * Контактная информация
 */
export type VacancyContactsOutput = {
    /**
     * Флаг подключения виртуального номера
     */
    call_tracking_enabled?: boolean | null;
    /**
     * Электронная почта. Значение поля должно соответствовать формату email
     */
    email?: string | null;
    /**
     * Имя контакта
     */
    name?: string | null;
    /**
     * Список телефонов для связи
     */
    phones?: Array<VacancyPhoneItem> | null;
};

