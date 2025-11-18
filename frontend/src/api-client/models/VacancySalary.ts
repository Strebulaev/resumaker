/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Зарплата
 * @deprecated
 */
export type VacancySalary = {
    /**
     * Код валюты из [справочника currency](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    currency?: string | null;
    /**
     * Нижняя граница зарплаты
     */
    from?: number | null;
    /**
     * Признак что границы зарплаты указаны до вычета налогов
     */
    gross?: boolean | null;
    /**
     * Верхняя граница зарплаты
     */
    to?: number | null;
};

