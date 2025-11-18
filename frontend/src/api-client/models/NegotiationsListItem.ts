/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { NegotiationsObjectsTopicItem } from './NegotiationsObjectsTopicItem';
import type { ResumeResumeNanoWithUrl } from './ResumeResumeNanoWithUrl';
export type NegotiationsListItem = (NegotiationsObjectsTopicItem & {
    interview_review?: _IncludesId;
    /**
     * Короткое представление резюме
     */
    resume?: (ResumeResumeNanoWithUrl | _IncludesNullableObject) | null;
    /**
     * Ссылка на полную версию отклика
     */
    url: string;
});

