/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResumeObjectsOneOfPhoto } from './ResumeObjectsOneOfPhoto';
import type { ResumeObjectsPortfolio } from './ResumeObjectsPortfolio';
export type ResumePhotoPortfolio = {
    photo?: ResumeObjectsOneOfPhoto;
    /**
     * Список изображений в портфолио пользователя
     */
    portfolio: Array<ResumeObjectsPortfolio>;
};

