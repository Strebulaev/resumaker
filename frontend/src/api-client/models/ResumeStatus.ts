/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
export type ResumeStatus = {
    /**
     * Заблокировано ли резюме ([подробнее](#tag/Rezyume.-Prosmotr-informacii/Status-rezyume))
     */
    blocked: boolean;
    /**
     * Можно ли опубликовать или обновить данное резюме
     */
    can_publish_or_update?: boolean | null;
    /**
     * Заполнено ли резюме
     */
    finished: boolean;
    /**
     * [Статус резюме](#tag/Rezyume.-Prosmotr-informacii/Status-rezyume)
     *
     */
    status: _IncludesIdName;
};

