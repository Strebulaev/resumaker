/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacancyArguments } from './VacancyArguments';
import type { VacancyNegotiationSubActions } from './VacancyNegotiationSubActions';
import type { VacancyTemplates } from './VacancyTemplates';
export type VacancyNegotiationActions = {
    /**
     * Обязательные и дополнительные аргументы для запроса
     */
    arguments: Array<VacancyArguments>;
    /**
     * Возможно ли совершить действие
     */
    enabled: boolean;
    /**
     * Является ли данная коллекция скрытой
     */
    hidden: boolean;
    /**
     * Идентификатор действия
     */
    id: string;
    /**
     * HTTP метод, который необходимо выполнить
     */
    method: string;
    /**
     * Название действия
     */
    name: string;
    /**
     * Документация [Работодательское состояние](#tag/Otklikipriglasheniya-rabotodatelya) по отклику/приглашению, которое будет установлено после совершения действия. Если действие не меняет состояние — `null`
     */
    resulting_employer_state?: (_IncludesIdName | _IncludesNullableObject) | null;
    /**
     * Действия для перевода отклика/приглашения в подстатус
     */
    sub_actions?: Array<VacancyNegotiationSubActions>;
    /**
     * Шаблоны писем
     */
    templates: Array<VacancyTemplates>;
    /**
     * URL, на который необходимо выполнить запрос
     */
    url: string;
};

