/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { SalaryStatisticsIndirectCalculation } from './SalaryStatisticsIndirectCalculation';
/**
 * Набор параметров, по которым происходил расчет
 */
export type SalaryStatisticsResultingParameters = {
    /**
     * Коды регионов
     */
    areas: Array<_IncludesIdName>;
    /**
     * Уровни специалистов
     */
    employee_levels?: Array<_IncludesIdName> | null;
    /**
     * Количество работодателей, позиции которых участвуют в выборке
     */
    employers_count: number;
    /**
     * Исключенные коды регионов
     */
    excluded_areas?: Array<_IncludesIdName> | null;
    /**
     * Параметры косвенной оценки зарплат
     */
    indirect_calculation?: (SalaryStatisticsIndirectCalculation | _IncludesNullableObject) | null;
    /**
     * Отрасли
     */
    industries?: Array<_IncludesIdName> | null;
    /**
     * Количество позиций, по которым построена выборка
     */
    positions_count: number;
    /**
     * Источники данных. Возможные значения:
     *
     * * `SALARIES` — данные из банка зарплат;
     * * `RESUMES` — данные из резюме;
     * * `VACANCIES` — данные из вакансий
     *
     */
    sources: Array<'SALARIES' | 'RESUMES' | 'VACANCIES'>;
    /**
     * Профессиональные области и специализаций
     */
    specialities?: Array<_IncludesIdName> | null;
};

