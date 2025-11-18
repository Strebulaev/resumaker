/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CredsCredsUpdate } from './CredsCredsUpdate';
import type { ProfileProfileUpdate } from './ProfileProfileUpdate';
import type { ResumeEditResume } from './ResumeEditResume';
import type { ResumeProfileAdditionalProperties } from './ResumeProfileAdditionalProperties';
/**
 * Обновление резюме и профиля и получение в ответ схемы с полями резюме-профиля
 */
export type ResumeProfileResumeProfileUpdateRequestBody = {
    additional_properties?: ResumeProfileAdditionalProperties;
    creds?: CredsCredsUpdate;
    /**
     * Экран, который сейчас отображается в визарде
     */
    current_screen_id: string;
    profile?: ProfileProfileUpdate;
    resume: ResumeEditResume;
};

