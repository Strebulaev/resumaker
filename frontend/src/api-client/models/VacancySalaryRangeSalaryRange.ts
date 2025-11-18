/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacancySalaryRangeSalaryRangeFrequency } from './VacancySalaryRangeSalaryRangeFrequency';
import type { VacancySalaryRangeSalaryRangeMode } from './VacancySalaryRangeSalaryRangeMode';
/**
 * Зарплата
 */
export type VacancySalaryRangeSalaryRange = {
    /**
     * Код валюты из [справочника currency](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    currency: string;
    frequency?: (VacancySalaryRangeSalaryRangeFrequency | _IncludesNullableObject) | null;
    /**
     * Нижняя граница зарплаты
     */
    from?: number | null;
    /**
     * Признак что границы зарплаты указаны до вычета налогов
     */
    gross: boolean;
    mode: VacancySalaryRangeSalaryRangeMode;
    /**
     * Верхняя граница зарплаты
     */
    to?: number | null;
};

