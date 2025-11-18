/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
/**
 * Информация о заполненности резюме
 */
export type ResumeObjectsProgress = {
    /**
     * Список полей, которые обязательны, но еще не заполнены
     */
    mandatory: Array<_IncludesIdName>;
    /**
     * Процент заполненности резюме
     */
    percentage: number;
    /**
     * Список полей, которые рекомендованы к заполнению, но ещё не заполнены
     */
    recommended: Array<_IncludesIdName>;
};

