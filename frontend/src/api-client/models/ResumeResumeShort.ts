/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
import type { ResumeObjectsActions } from './ResumeObjectsActions';
import type { ResumeObjectsExperienceShort } from './ResumeObjectsExperienceShort';
import type { ResumeObjectsNegotiationsHistoryUrl } from './ResumeObjectsNegotiationsHistoryUrl';
import type { ResumeObjectsOneOfPhotoNoId } from './ResumeObjectsOneOfPhotoNoId';
import type { ResumeObjectsOwner } from './ResumeObjectsOwner';
import type { ResumeResumeCommon } from './ResumeResumeCommon';
export type ResumeResumeShort = (ResumeResumeCommon & {
    actions: ResumeObjectsActions;
    /**
     * Опыт работы. В объекте опыта отсутствует описание (поле description), а также должность (поле position) доступна только в последнем опыте
     */
    experience: Array<ResumeObjectsExperienceShort>;
    /**
     * Добавлено ли резюме в избранные
     */
    favorited: boolean;
    /**
     * Выделено ли резюме в поиске
     */
    marked?: boolean;
    /**
     * Краткая история откликов/приглашений по резюме
     */
    negotiations_history: ResumeObjectsNegotiationsHistoryUrl;
    /**
     * Информация о владельце резюме
     */
    owner: ResumeObjectsOwner;
    photo?: ResumeObjectsOneOfPhotoNoId;
    /**
     * Теги к резюме
     */
    tags?: Array<_IncludesId>;
    /**
     * Было ли резюме уже просмотрено работодателем
     */
    viewed?: boolean;
});

