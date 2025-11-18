/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResumeProfileAdditionalProperties } from './ResumeProfileAdditionalProperties';
import type { ResumeProfileResumeProfileCreateRequestBaseBody } from './ResumeProfileResumeProfileCreateRequestBaseBody';
export type ResumeProfileResumeProfileCreateRequestBody = (ResumeProfileResumeProfileCreateRequestBaseBody & {
    additional_properties?: ResumeProfileAdditionalProperties;
    /**
     * Идентификатор(хеш) резюме, которое клонируется
     */
    clone_resume_id?: string;
    /**
     * Обновлять ли профиль (на данный момент ФИО)
     */
    update_profile?: boolean;
});

