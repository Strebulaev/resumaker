/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { EmployersEmployersState } from './EmployersEmployersState';
import type { EmployersFunnelStage } from './EmployersFunnelStage';
import type { SkillVerificationsTestResultWithUrl } from './SkillVerificationsTestResultWithUrl';
import type { VacancyNegotiationActions } from './VacancyNegotiationActions';
import type { VacancyTemplates } from './VacancyTemplates';
export type NegotiationsNegotiationCommonFields = {
    /**
     * Возможные [действия по отклику/приглашению](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md#actions-info)
     *
     */
    actions?: Array<VacancyNegotiationActions>;
    employer_state?: EmployersEmployersState;
    /**
     * Информация об этапе воронки найма
     */
    funnel_stage?: (EmployersFunnelStage | _IncludesNullableObject) | null;
    /**
     * Теги к работадательскому отклику
     */
    tags?: Array<_IncludesId>;
    /**
     * Шаблоны писем
     */
    templates?: Array<VacancyTemplates>;
    /**
     * Результат выполнения [теста](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-test-results), прикрепленного к вакансии
     *
     */
    test_result?: (_IncludesNullableObject | SkillVerificationsTestResultWithUrl) | null;
};

