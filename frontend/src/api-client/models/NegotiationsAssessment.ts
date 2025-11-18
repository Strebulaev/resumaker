/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { NegotiationsAction } from './NegotiationsAction';
/**
 * Тесты или опросники, предназначенные для прохождения соискателями
 */
export type NegotiationsAssessment = (_IncludesIdName & {
    /**
     * Инструменты оценки
     */
    actions: Array<NegotiationsAction>;
});

