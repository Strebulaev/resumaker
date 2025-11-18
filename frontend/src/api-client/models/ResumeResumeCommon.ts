/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
import type { _IncludesIdName } from './_IncludesIdName';
import type { ResumeObjectsArea } from './ResumeObjectsArea';
import type { ResumeObjectsCertificate } from './ResumeObjectsCertificate';
import type { ResumeObjectsDownload } from './ResumeObjectsDownload';
import type { ResumeObjectsEducation } from './ResumeObjectsEducation';
import type { ResumeObjectsGender } from './ResumeObjectsGender';
import type { ResumeObjectsSalaryProperties } from './ResumeObjectsSalaryProperties';
import type { ResumeObjectsTotalExperience } from './ResumeObjectsTotalExperience';
import type { ResumeResumeEmploymentTerms } from './ResumeResumeEmploymentTerms';
import type { ResumeResumeNano } from './ResumeResumeNano';
export type ResumeResumeCommon = (ResumeResumeNano & ResumeResumeEmploymentTerms & {
    /**
     * Возраст
     */
    age?: number | null;
    area?: ResumeObjectsArea;
    /**
     * Доступен ли просмотр контактной информации в резюме текущему работодателю
     */
    can_view_full_info?: boolean | null;
    /**
     * Список сертификатов соискателя
     */
    certificate: Array<ResumeObjectsCertificate>;
    /**
     * Дата и время создания резюме
     */
    created_at: string;
    /**
     * Ссылки для скачивания резюме в разных форматах
     */
    download: ResumeObjectsDownload;
    /**
     * Образование соискателя.
     *
     * Особенности сохранения образования:
     *
     * * Если передать и высшее и среднее образование и уровень образования "средний", то сохранится только среднее образование.
     * * Если передать и высшее и среднее образование и уровень образования "высшее", то сохранится только высшее образование
     *
     */
    education: ResumeObjectsEducation;
    /**
     * Имя
     */
    first_name?: string | null;
    gender?: ResumeObjectsGender;
    /**
     * Справочник [Список скрытых полей](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#hidden-fields). Возможные значения элементов приведены в поле `resume_hidden_fields` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    hidden_fields: Array<_IncludesIdName>;
    /**
     * Фамилия
     */
    last_name?: string | null;
    /**
     * Выделено ли резюме в поиске
     */
    marked?: boolean;
    /**
     * Отчество
     */
    middle_name?: string | null;
    /**
     * Ресурс, на котором было размещено резюме
     */
    platform?: _IncludesId;
    /**
     * Уникальный идентификатор резюме
     */
    real_id: string;
    salary?: ResumeObjectsSalaryProperties;
    total_experience?: ResumeObjectsTotalExperience;
    /**
     * Дата и время обновления резюме
     */
    updated_at: string;
});

