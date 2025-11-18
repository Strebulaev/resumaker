/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResumeObjectsSalaryProperties } from './ResumeObjectsSalaryProperties';
export type ResumeObjectsSalaryAddEdit = (ResumeObjectsSalaryProperties & {
    /**
     * Сумма
     */
    amount: number | null;
    /**
     * Идентификатор валюты. Возможные значения перечислены в массиве `currency` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    currency: string | null;
});

