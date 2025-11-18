/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { NegotiationsObjectsPoliteness } from './NegotiationsObjectsPoliteness';
export type NegotiationsNegotiationsStatistics = {
    /**
     * Среднее время (в днях) между получением отклика и отправкой сообщения
     */
    average_reply_time?: number | null;
    /**
     * Индекс вежливости
     */
    politeness?: (NegotiationsObjectsPoliteness | _IncludesNullableObject) | null;
    /**
     * Количество откликов на вакансии, полученных за период (последние 30 дней)
     */
    received: number;
    /**
     * Процент откликов на вакансии, перемещенных в любую другую [коллекцию](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md#term-collection) с отправкой сообщения, за период
     *
     */
    replied_percent?: number | null;
    /**
     * Процент прочитанных откликов за период
     */
    viewed_percent?: number | null;
};

