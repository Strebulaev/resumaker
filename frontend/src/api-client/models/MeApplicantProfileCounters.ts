/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Информация о счетчиках соискателя
 */
export type MeApplicantProfileCounters = {
    /**
     * Общее количество новых просмотров всех резюме текущего пользователя
     */
    new_resume_views: number;
    /**
     * Общее количество созданных резюме текущего пользователя
     */
    resumes_count: number;
    /**
     * Количество новых непрочитанных откликов (у которых `has_updates: true`)
     */
    unread_negotiations: number;
};

