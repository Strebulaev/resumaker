/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResumeObjectsAccess } from './ResumeObjectsAccess';
import type { ResumeObjectsActionsForOwner } from './ResumeObjectsActionsForOwner';
import type { ResumeObjectsPaidServices } from './ResumeObjectsPaidServices';
export type ResumeApplicantFields = {
    access: ResumeObjectsAccess;
    /**
     * Дополнительные действия
     */
    actions: ResumeObjectsActionsForOwner;
    /**
     * Число новых просмотров. Данный счетчик сбрасывается при получении [детальной истории просмотров](#tag/Rezyume.-Prosmotr-informacii/operation/get-resume-view-history)
     *
     */
    new_views: number;
    /**
     * Дата и время следующей возможной публикации/обновления. Для неопубликованных резюме возвращается `null`
     */
    next_publish_at?: string | null;
    /**
     * Платные услуги по резюме для автора
     */
    paid_services: Array<ResumeObjectsPaidServices>;
    /**
     * Число просмотров резюме
     */
    total_views: number;
    /**
     * URL, по которому необходимо сделать GET-запрос для получения [детальной истории просмотров](#tag/Rezyume.-Prosmotr-informacii/operation/get-resume-view-history)
     *
     */
    views_url: string;
};

