/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { NegotiationsNegotiationCommonFields } from './NegotiationsNegotiationCommonFields';
import type { NegotiationsObjectsEmployerTopicResume } from './NegotiationsObjectsEmployerTopicResume';
import type { NegotiationsObjectsTopicItemCommon } from './NegotiationsObjectsTopicItemCommon';
import type { VacanciesNegotiationsVacancyShort } from './VacanciesNegotiationsVacancyShort';
export type NegotiationsEmployerNegotiation = (NegotiationsObjectsTopicItemCommon & NegotiationsNegotiationCommonFields & {
    /**
     * Короткое представление резюме
     */
    resume?: (_IncludesNullableObject | NegotiationsObjectsEmployerTopicResume) | null;
    /**
     * Короткое представление вакансии
     */
    vacancy?: (VacanciesNegotiationsVacancyShort | _IncludesNullableObject) | null;
});

