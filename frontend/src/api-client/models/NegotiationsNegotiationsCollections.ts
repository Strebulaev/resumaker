/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmployersEmployersState } from './EmployersEmployersState';
import type { NegotiationsNegotiationsCollection } from './NegotiationsNegotiationsCollection';
export type NegotiationsNegotiationsCollections = {
    /**
     * Коллекции откликов/приглашений для данной вакансии
     */
    collections: Array<NegotiationsNegotiationsCollection>;
    /**
     * Состояния [откликов/приглашений](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md#term-employer-state) вакансии для работодателя
     *
     */
    employer_states: Array<EmployersEmployersState>;
    /**
     * Сгенерированные коллекции откликов/приглашений для данной вакансии
     */
    generated_collections: Array<NegotiationsNegotiationsCollection>;
};

