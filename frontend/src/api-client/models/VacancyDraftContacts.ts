/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyDraftPhoneItem } from './VacancyDraftPhoneItem';
/**
 * Контактная информация
 */
export type VacancyDraftContacts = {
    /**
     * Email
     */
    email?: string | null;
    /**
     * Имя менеджера
     */
    name?: string | null;
    /**
     * Список телефонов для связи
     */
    phones?: Array<VacancyDraftPhoneItem> | null;
};

