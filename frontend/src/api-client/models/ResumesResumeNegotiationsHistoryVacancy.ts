/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResumesResumeNegotiationsHistoryVacancyItem } from './ResumesResumeNegotiationsHistoryVacancyItem';
export type ResumesResumeNegotiationsHistoryVacancy = {
    /**
     * Признак того, что вакансия находится в архиве
     */
    archived: boolean;
    /**
     * Признак того, что менеджер может редактировать данные вакансии, а также работать с информацией об откликах/приглашениях по этой вакансии
     */
    can_edit: boolean;
    /**
     * Уникальный идентификатор вакансии
     */
    id: string;
    /**
     * Список последних изменений состояний откликов/приглашений по указанному резюме и данной вакансии
     */
    items: Array<ResumesResumeNegotiationsHistoryVacancyItem>;
    /**
     * URL, на который необходимо делать GET-запрос для получения [списка сообщений в отклике/приглашении](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-messages). Если `can_edit` равно `false`, значение поля должно игнорироваться
     */
    messages_url: string;
    /**
     * Название вакансии
     */
    name: string;
    /**
     * URL, на который необходимо делать GET-запрос для получения [данных об отклике/приглашении](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-item). Если `can_edit` равно `false`, значение поля должно игнорироваться
     */
    negotiations_url: string;
    /**
     * URL, на который необходимо делать GET-запрос для [получения данных о вакансии](#tag/Vakansii/operation/get-vacancy)
     */
    url: string;
};

