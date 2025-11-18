/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NegotiationsNegotiationsSubCollection } from './NegotiationsNegotiationsSubCollection';
export type NegotiationsObjectsStates = {
    /**
     * Описание коллекции
     */
    description: string;
    /**
     * Является ли данная коллекция скрытой
     */
    hidden?: boolean;
    /**
     * Идентификатор коллекции
     */
    id: string;
    /**
     * Название коллекции
     */
    name: string;
    /**
     * Коллекция подстатусов откликов/приглашений для данной вакансии
     */
    sub_collections?: Array<NegotiationsNegotiationsSubCollection>;
    /**
     * URL, [GET-запрос на который](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations) возвращает список откликов/приглашений коллекции
     *
     */
    url: string;
};

