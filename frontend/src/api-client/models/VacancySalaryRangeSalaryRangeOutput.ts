/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacancySalaryRangeSalaryRangeFrequencyOutput } from './VacancySalaryRangeSalaryRangeFrequencyOutput';
import type { VacancySalaryRangeSalaryRangeModeOutput } from './VacancySalaryRangeSalaryRangeModeOutput';
/**
 * Зарплата
 */
export type VacancySalaryRangeSalaryRangeOutput = {
    /**
     * Код валюты из [справочника currency](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    currency: string;
    frequency?: (VacancySalaryRangeSalaryRangeFrequencyOutput | _IncludesNullableObject) | null;
    /**
     * Нижняя граница зарплаты
     */
    from?: number | null;
    /**
     * Признак что границы зарплаты указаны до вычета налогов
     */
    gross: boolean;
    mode: VacancySalaryRangeSalaryRangeModeOutput;
    /**
     * Верхняя граница зарплаты
     */
    to?: number | null;
};

