/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Информация о телефоне соискателя
 */
export type ResumeShouldSendSmsPhone = {
    /**
     * Префикс города номера телефона
     */
    city: string;
    /**
     * Префикс страны номера телефона
     */
    country: string;
    /**
     * Номер телефона отформатированный
     */
    formatted: string;
    /**
     * Нужно ли верифицировать номер телефона
     */
    need_verification: boolean;
    /**
     * Номер телефона без префиксов
     */
    number: string;
    /**
     * Находится ли номер телефона в черном списке по отправке смс
     */
    restricted_country: boolean;
    /**
     * Верифицирован ли номер телефона пользователем
     */
    verified: boolean;
};

