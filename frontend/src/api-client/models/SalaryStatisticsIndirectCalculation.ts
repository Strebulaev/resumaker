/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
export type SalaryStatisticsIndirectCalculation = {
    /**
     * Регионы, использованные при получении косвенной оценки
     */
    indirect_areas?: Array<_IncludesIdName> | null;
    /**
     * Уровни специалистов, включенные в выборку в регионе, использованном при получении косвенной оценки
     */
    indirect_employee_levels?: Array<_IncludesIdName> | null;
    /**
     * Региональный коэффициент, который был использован для получения косвенной оценки зарплат
     */
    indirect_regional_ratio: number;
};

