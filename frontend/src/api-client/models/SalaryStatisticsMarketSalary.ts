/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SalaryStatisticsMarketSalary = {
    /**
     * Среднее расчетное значение
     */
    average?: number;
    /**
     * Нижняя граница рыночного диапазона (25-й процентиль)
     */
    bottom: number;
    /**
     * Максимальные значения (90-й процентиль)
     */
    maximum?: number;
    /**
     * Медианное рыночное значение
     */
    median: number;
    /**
     * Минимальные значения (10-й процентиль)
     */
    minimum?: number;
    /**
     * Верхняя граница рыночного диапазона (75-й процентиль)
     */
    upper: number;
};

