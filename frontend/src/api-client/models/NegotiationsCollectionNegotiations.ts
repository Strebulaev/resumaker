/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { NegotiationsNegotiationCommonFields } from './NegotiationsNegotiationCommonFields';
import type { NegotiationsObjectsEmployerTopicResume } from './NegotiationsObjectsEmployerTopicResume';
import type { NegotiationsObjectsTopicItemCommon } from './NegotiationsObjectsTopicItemCommon';
export type NegotiationsCollectionNegotiations = {
    items: Array<(NegotiationsObjectsTopicItemCommon & NegotiationsNegotiationCommonFields & {
        /**
         * Короткое представление резюме
         */
        resume?: (NegotiationsObjectsEmployerTopicResume | _IncludesNullableObject) | null;
        /**
         * Ссылка на полную версию отклика
         */
        url: string;
    })>;
};

