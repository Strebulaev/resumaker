/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdNameLastChangeTime } from './_IncludesIdNameLastChangeTime';
import type { ResumeObjectsActions } from './ResumeObjectsActions';
import type { ResumeObjectsEmployerPaidServices } from './ResumeObjectsEmployerPaidServices';
import type { ResumeObjectsNegotiationsHistoryForEmployer } from './ResumeObjectsNegotiationsHistoryForEmployer';
import type { ResumeObjectsOneOfPhotoNoId } from './ResumeObjectsOneOfPhotoNoId';
import type { ResumeObjectsOwner } from './ResumeObjectsOwner';
import type { ResumeObjectsPortfolioNoId } from './ResumeObjectsPortfolioNoId';
export type ResumeEmployerFields = {
    /**
     * Дополнительные действия
     */
    actions: ResumeObjectsActions;
    /**
     * Наличие права просмотра контактной информации в резюме
     */
    can_view_full_info?: boolean | null;
    /**
     * Дата скрытия контактов резюме в формате `YYYY-MM-DD`
     */
    contacts_open_until_date?: string | null;
    /**
     * Добавлено ли резюме в избранные
     */
    favorited: boolean;
    /**
     * Для получения данных нужно передать параметр `with_job_search_status=true`.
     * Возможные значения перечислены в поле `job_search_statuses_employer` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     */
    job_search_status?: _IncludesIdNameLastChangeTime;
    /**
     * Краткая история откликов/приглашений по резюме
     */
    negotiations_history?: ResumeObjectsNegotiationsHistoryForEmployer;
    /**
     * Информация о владельце резюме
     */
    owner: ResumeObjectsOwner;
    paid_services: ResumeObjectsEmployerPaidServices;
    photo?: ResumeObjectsOneOfPhotoNoId;
    /**
     * Список изображений в портфолио пользователя
     */
    portfolio: Array<ResumeObjectsPortfolioNoId>;
    /**
     * Причина скрытия контактов
     */
    view_without_contacts_reason?: string | null;
};

