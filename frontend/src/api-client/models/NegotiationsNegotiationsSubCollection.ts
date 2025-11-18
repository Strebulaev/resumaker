/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NegotiationsNegotiationsOrderTypes } from './NegotiationsNegotiationsOrderTypes';
import type { NegotiationsObjectsEmployerCounters } from './NegotiationsObjectsEmployerCounters';
import type { NegotiationsObjectsSubCollections } from './NegotiationsObjectsSubCollections';
export type NegotiationsNegotiationsSubCollection = (NegotiationsObjectsSubCollections & {
    counters?: NegotiationsObjectsEmployerCounters;
    order_types: Array<NegotiationsNegotiationsOrderTypes>;
});

