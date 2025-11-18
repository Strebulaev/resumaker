/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { ResumeObjectsAccess } from './ResumeObjectsAccess';
import type { ResumeResumeEmploymentTerms } from './ResumeResumeEmploymentTerms';
import type { ResumeResumeShortForOwner } from './ResumeResumeShortForOwner';
export type ResumesSuitableResumeItem = (ResumeResumeShortForOwner & ResumeResumeEmploymentTerms & {
    access: ResumeObjectsAccess;
    /**
     * Заполнено ли резюме
     */
    finished: boolean;
    /**
     * Принимает значение `true`, если резюме является неполным. Применимо только для вакансий, у которых не установлен флаг «принимать неполные резюме».
     *
     * При получении `true` в данном поле, соискатель должен заполнить обязательные поля (доступны в [выдаче полного резюме](#tag/Prosmotr-rezyume/operation/get-resume)) перед откликом на данную вакансию
     *
     */
    requires_completion: boolean;
    /**
     * Статус [резюме](#tag/Rezyume.-Prosmotr-informacii/Status-rezyume)
     *
     */
    status: _IncludesIdName;
});

