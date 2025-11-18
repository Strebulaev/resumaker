/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyDraftPhoneItemWithFullPhone } from './VacancyDraftPhoneItemWithFullPhone';
/**
 * Контактная информация
 */
export type VacancyDraftContactsWithFullPhone = {
    /**
     * Email
     */
    email: string | null;
    /**
     * Имя менеджера
     */
    name: string | null;
    /**
     * Список телефонов для связи
     */
    phones: Array<VacancyDraftPhoneItemWithFullPhone> | null;
};

