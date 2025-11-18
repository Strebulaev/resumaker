/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesAddress } from './VacanciesAddress';
import type { VacancyManagerOutput } from './VacancyManagerOutput';
import type { VacancyNegotiationActions } from './VacancyNegotiationActions';
import type { VacancyTemplates } from './VacancyTemplates';
export type VacanciesMatchVacancyFields = {
    address?: (VacanciesAddress | _IncludesNullableObject) | null;
    /**
     * Можно ли пригласить соискателя на данную вакансию
     */
    can_invite: boolean;
    /**
     * Дата и время публикации вакансии
     */
    created_at: string;
    /**
     * Работодательское состояние отклика/приглашения для этой вакансии с указанным резюме, либо `null` если отклика/приглашения не было. Возможные значения перечислены в поле `employer_states` в [списке работодательских состояний по вакансии](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations)
     */
    employer_negotiations_state: (_IncludesIdName | _IncludesNullableObject) | null;
    manager: VacancyManagerOutput;
    /**
     * Действия для [создания отклика](#tag/Otklikipriglasheniya-rabotodatelya/operation/invite-applicant-to-vacancy). Если создать отклик невозможно (например, нет нужных услуг), то вернется пустой массив
     */
    negotiations_actions: Array<VacancyNegotiationActions>;
    /**
     * Состояние отклика/приглашения для этой вакансии с указанным резюме, либо `null` если отклика/приглашения не было. Возможные значения перечислены в поле `negotiations_state` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    negotiations_state: (_IncludesIdName | _IncludesNullableObject) | null;
    /**
     * Расстояние в метрах между центром сортировки (заданной параметрами `sort_point_lat`, `sort_point_lng`) и указанным в вакансии адресом. В случае, если в адресе указаны только станции метро, выдается расстояние между центром сортировки и средней геометрической точкой указанных станций.
     * Значение `sort_point_distance` выдается только в случае, если заданы параметры `sort_point_lat`, `sort_point_lng`, `order_by=distance`
     *
     */
    sort_point_distance?: number | null;
    /**
     * Шаблоны писем
     */
    templates?: Array<VacancyTemplates>;
};

