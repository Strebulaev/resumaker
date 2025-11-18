/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdNameLastChangeTime } from './_IncludesIdNameLastChangeTime';
import type { ResumeObjectsLastNegotiations } from './ResumeObjectsLastNegotiations';
import type { ResumeResumeShort } from './ResumeResumeShort';
import type { ResumesSearchForResumesPrivateFields } from './ResumesSearchForResumesPrivateFields';
export type ResumesSearchForEmployerAndApplicant = (ResumeResumeShort & ResumeObjectsLastNegotiations & ResumesSearchForResumesPrivateFields & {
    /**
     * Дата скрытия контактов резюме в формате `YYYY-MM-DD`
     */
    contacts_open_until_date?: string | null;
    /**
     * Для получения данных нужно передать параметр `with_job_search_status=true`
     *
     */
    job_search_status?: _IncludesIdNameLastChangeTime;
    /**
     * Ссылка на резюме
     */
    url?: string;
});

