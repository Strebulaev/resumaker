/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { NegotiationsObjectsCounters } from './NegotiationsObjectsCounters';
import type { VacancyHasUpdates } from './VacancyHasUpdates';
import type { VacancyProfessionalRoles } from './VacancyProfessionalRoles';
export type NegotiationsObjectsTopicItemCommon = {
    /**
     * Является ли вопросом до отклика
     */
    applicant_question_state?: boolean;
    counters?: NegotiationsObjectsCounters;
    /**
     * Дата и время создания отклика/приглашения
     */
    created_at: string;
    has_updates: VacancyHasUpdates;
    /**
     * Идентификатор отклика/приглашения
     */
    id: string;
    /**
     * URL, на который необходимо делать GET-запрос для получения [списка сообщений в отклике/приглашении](#tag/Perepiska-(otklikipriglasheniya)-dlya-soiskatelya/operation/get-negotiation-messages). Если `can_edit` равно `false`, значение поля должно игнорироваться
     * @deprecated
     */
    messages_url?: string;
    /**
     * Текущий статус переписки.
     *
     * Возможные значения приведены в поле `messaging_status` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     */
    messaging_status: string;
    professional_roles?: (VacancyProfessionalRoles | _IncludesNullableObject);
    /**
     * Источник отклика/приглашения
     */
    source?: NegotiationsObjectsTopicItemCommon.source;
    /**
     * Текущее состояние отклика/приглашения.
     *
     * Возможные значения приведены в поле `negotiations_state` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     */
    state: _IncludesIdName;
    /**
     * Дата и время последнего обновления отклика/приглашения
     */
    updated_at: string;
    /**
     * Был ли отклик/приглашение просмотрен получателем
     */
    viewed_by_opponent: boolean;
};
export namespace NegotiationsObjectsTopicItemCommon {
    /**
     * Источник отклика/приглашения
     */
    export enum source {
        NEGOTIATION = 'NEGOTIATION',
        PHONE_CALL = 'PHONE_CALL',
        CHAT = 'CHAT',
        VR = 'VR',
        AUTO_INVITE = 'AUTO_INVITE',
        APPLICANT_QUESTIONS = 'APPLICANT_QUESTIONS',
        AUTO_RESPONSE = 'AUTO_RESPONSE',
        AUTO_RESPONSE_HH_PRO = 'AUTO_RESPONSE_HH_PRO',
        CLICKME_CPA = 'CLICKME_CPA',
        REGISTRATION = 'REGISTRATION',
    }
}

