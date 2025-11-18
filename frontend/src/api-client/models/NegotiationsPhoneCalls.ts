/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NegotiationsPhoneCallItem } from './NegotiationsPhoneCallItem';
export type NegotiationsPhoneCalls = {
    /**
     * Список звонков
     */
    items: Array<NegotiationsPhoneCallItem>;
    /**
     * Ответил ли абонент соискателю хотя бы один раз
     */
    picked_up_phone_by_opponent: boolean;
};

