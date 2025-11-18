/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NegotiationsObjectsSubCollections = {
    /**
     * Идентификатор коллекции подстатуса
     */
    id: string;
    /**
     * Название коллекции подстатуса
     */
    name: string;
    /**
     * Является ли коллекция подстатуса обязательной. В коллекции всегда присутствует только одна обязательная коллекция подстатуса
     */
    root_collection: boolean;
    /**
     * URL, [GET-запрос на который](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations) возвращает список откликов/приглашений коллекции подстатуса
     *
     */
    url: string;
};

