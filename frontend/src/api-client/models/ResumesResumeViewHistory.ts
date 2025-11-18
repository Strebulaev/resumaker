/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesUrl } from './_IncludesUrl';
import type { ResumeResumeNano } from './ResumeResumeNano';
import type { ResumesResumeViewHistoryItem } from './ResumesResumeViewHistoryItem';
export type ResumesResumeViewHistory = {
    /**
     * Список просмотров резюме
     */
    items: Array<ResumesResumeViewHistoryItem>;
    /**
     * Короткое представление резюме
     */
    resume: (ResumeResumeNano & _IncludesUrl);
};

