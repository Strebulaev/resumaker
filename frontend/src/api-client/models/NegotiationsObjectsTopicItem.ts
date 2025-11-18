/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { NegotiationsObjectsTopicItemCommon } from './NegotiationsObjectsTopicItemCommon';
import type { NegotiationsPhoneCalls } from './NegotiationsPhoneCalls';
import type { VacanciesNegotiationsVacancyShort } from './VacanciesNegotiationsVacancyShort';
export type NegotiationsObjectsTopicItem = (NegotiationsObjectsTopicItemCommon & {
    /**
     * Можно ли [скрыть отклик](#tag/Perepiska-(otklikipriglasheniya)-dlya-soiskatelya/operation/hide-active-response) вместе с сообщением работодателю об отказе
     */
    decline_allowed: boolean;
    /**
     * Скрыт ли текущий отклик от соискателя
     */
    hidden: boolean;
    /**
     * Статус поиска работы кандидатом. Для получения данных передайте параметр `with_job_search_status=true`
     */
    job_search_status?: (_IncludesIdName | _IncludesNullableObject) | null;
    /**
     * Представление истории звонков по вакансии
     */
    phone_calls?: (NegotiationsPhoneCalls | _IncludesNullableObject) | null;
    /**
     * Теги к соискательскому отклику
     */
    tags?: Array<_IncludesId>;
    /**
     * Короткое представление вакансии
     */
    vacancy?: (_IncludesNullableObject | VacanciesNegotiationsVacancyShort) | null;
});

