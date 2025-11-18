/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdNameLastChangeTime } from './_IncludesIdNameLastChangeTime';
import type { _IncludesUrl } from './_IncludesUrl';
import type { ResumeResumeShort } from './ResumeResumeShort';
export type NegotiationsObjectsEmployerTopicResume = (ResumeResumeShort & _IncludesUrl & {
    /**
     * Дата скрытия контактов резюме в формате `YYYY-MM-DD`
     */
    contacts_open_until_date?: string | null;
    /**
     * Для получения данных нужно передать параметр `with_job_search_status=true`.
     * Возможные значения перечислены в поле `job_search_statuses_employer` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     */
    job_search_status?: _IncludesIdNameLastChangeTime;
    /**
     * Ключевые навыки (список уникальных строк)
     */
    skill_set?: Array<string> | null;
});

