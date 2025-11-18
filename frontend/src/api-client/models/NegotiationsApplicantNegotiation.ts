/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { NegotiationsObjectsTopicItem } from './NegotiationsObjectsTopicItem';
import type { NegotiationsObjectsTopicResume } from './NegotiationsObjectsTopicResume';
export type NegotiationsApplicantNegotiation = (NegotiationsObjectsTopicItem & {
    /**
     * Короткое представление резюме
     */
    resume?: (NegotiationsObjectsTopicResume | _IncludesNullableObject) | null;
    /**
     * Ссылка на полную версию отклика
     */
    url: string;
});

