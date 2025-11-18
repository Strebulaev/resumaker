/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Замечания модератора.
 *
 * В некоторых случаях замечания могут сопровождаться [блокировкой резюме](#tag/Rezyume.-Prosmotr-informacii/Status-rezyume).
 *
 * Полный список возможных замечаний доступен в поле `resume_moderation_note` [в справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
 *
 */
export type ResumeObjectsModerationNote = {
    /**
     * Поле резюме с которым связано замечание
     */
    field?: string;
    /**
     * Идентификатор замечания
     */
    id: string;
    /**
     * Описание замечания
     */
    name: string;
    /**
     * Путь до параметра, с которым связано замечание
     */
    pointer?: string;
};

