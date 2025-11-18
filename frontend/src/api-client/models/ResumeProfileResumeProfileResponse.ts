/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CredsCreds } from './CredsCreds';
import type { ProfileProfileConditions } from './ProfileProfileConditions';
import type { ProfileProfileResumeConditions } from './ProfileProfileResumeConditions';
import type { ProfileProfileResumes } from './ProfileProfileResumes';
import type { ProfileProfileView } from './ProfileProfileView';
import type { ResumeProfileAdditionalProperties } from './ResumeProfileAdditionalProperties';
import type { ResumeProfileScreen } from './ResumeProfileScreen';
import type { ResumeViewApplicantResume } from './ResumeViewApplicantResume';
import type { SkillVerificationsSkill } from './SkillVerificationsSkill';
/**
 * Схема по которой определяется набор полей, вид визарда заполнения резюме и профиля и текущие заполненные данные
 */
export type ResumeProfileResumeProfileResponse = {
    additional_properties?: ResumeProfileAdditionalProperties;
    conditions: ProfileProfileResumeConditions;
    creds?: CredsCreds;
    /**
     * Экран, который нужно отобразить следующим
     */
    next_incomplete_screen_id?: string | null;
    profile: ProfileProfileView;
    profile_conditions: ProfileProfileConditions;
    resume: ResumeViewApplicantResume;
    resumes: ProfileProfileResumes;
    /**
     * Упорядоченные экраны для отображения
     */
    screens: Array<ResumeProfileScreen>;
    /**
     * Все навыки пользователя с уровнями и подтверждениями
     */
    skills_with_levels?: Array<SkillVerificationsSkill>;
};

