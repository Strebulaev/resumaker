/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
/**
 * Поле, передаваемое в запросе при смене менеджера вакансии
 */
export type VacancyEditManager = {
    /**
     * Идентификатор менеджера, которому надо передать автопоиск из ([списка менеджеров компании](#tag/Menedzhery-rabotodatelya/operation/get-employer-managers))
     */
    manager: _IncludesId | null;
};

