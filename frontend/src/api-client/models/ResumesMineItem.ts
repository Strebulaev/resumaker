/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesContact } from './_IncludesContact';
import type { _IncludesId } from './_IncludesId';
import type { ResumeApplicantFields } from './ResumeApplicantFields';
import type { ResumeObjectsSimilarVacancies } from './ResumeObjectsSimilarVacancies';
import type { ResumeResumeEmploymentTerms } from './ResumeResumeEmploymentTerms';
import type { ResumeResumeShortForOwner } from './ResumeResumeShortForOwner';
import type { ResumeStatus } from './ResumeStatus';
export type ResumesMineItem = (ResumeResumeShortForOwner & ResumeResumeEmploymentTerms & ResumeStatus & ResumeApplicantFields & {
    /**
     * Список контактов соискателя
     */
    contact: Array<_IncludesContact>;
    /**
     * Дата и время создания резюме
     * @deprecated
     */
    created: string;
    similar_vacancies: ResumeObjectsSimilarVacancies;
    /**
     * Теги к резюме
     */
    tags?: Array<_IncludesId>;
    /**
     * Дата и время обновления резюме
     * @deprecated
     */
    updated: string;
    /**
     * Видно ли резюме в поиске
     * @deprecated
     */
    visible: boolean;
});

