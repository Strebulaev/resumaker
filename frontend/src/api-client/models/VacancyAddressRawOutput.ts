/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesMetroStation } from './_IncludesMetroStation';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
/**
 * Адрес
 */
export type VacancyAddressRawOutput = {
    /**
     * Дом
     */
    building?: string | null;
    /**
     * Город
     */
    city?: string | null;
    /**
     * Описание
     */
    description?: string | null;
    /**
     * Адрес из [списка доступных адресов работодателя](https://api.hh.ru/openapi/redoc#tag/Adresa-rabotodatelya/operation/get-employer-addresses)
     */
    id?: string | null;
    /**
     * Широта
     */
    lat?: number | null;
    /**
     * Долгота
     */
    lng?: number | null;
    metro?: (_IncludesNullableObject | _IncludesMetroStation) | null;
    metro_stations?: Array<_IncludesMetroStation>;
    /**
     * Полный адрес
     */
    raw?: string | null;
    /**
     * Улица
     */
    street?: string | null;
};

