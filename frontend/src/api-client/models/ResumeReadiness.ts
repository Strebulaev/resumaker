/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResumeObjectsModerationNote } from './ResumeObjectsModerationNote';
import type { ResumeObjectsProgress } from './ResumeObjectsProgress';
export type ResumeReadiness = {
    /**
     * Замечания модератора.
     * В некоторых случаях замечания могут сопровождаться [блокировкой резюме](#tag/Rezyume.-Prosmotr-informacii/Status-rezyume).
     * Полный список возможных замечаний доступен в поле `resume_moderation_note` [в справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     */
    moderation_note: Array<ResumeObjectsModerationNote>;
    progress: ResumeObjectsProgress;
    /**
     * URL для публикации или обновления резюме
     */
    publish_url: string;
};

