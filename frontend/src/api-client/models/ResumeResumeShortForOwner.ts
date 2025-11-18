/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesIdNameUrl } from './_IncludesIdNameUrl';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { ProfilePhoto } from './ProfilePhoto';
import type { ResumeObjectsActionsForOwner } from './ResumeObjectsActionsForOwner';
import type { ResumeObjectsAutoHideTime } from './ResumeObjectsAutoHideTime';
import type { ResumeObjectsCertificate } from './ResumeObjectsCertificate';
import type { ResumeObjectsDownload } from './ResumeObjectsDownload';
import type { ResumeObjectsEducation } from './ResumeObjectsEducation';
import type { ResumeObjectsExperienceForOwner } from './ResumeObjectsExperienceForOwner';
import type { ResumeObjectsSalaryProperties } from './ResumeObjectsSalaryProperties';
import type { ResumeObjectsTotalExperience } from './ResumeObjectsTotalExperience';
export type ResumeResumeShortForOwner = {
    /**
     * Дополнительные действия
     */
    actions: ResumeObjectsActionsForOwner;
    /**
     * Возраст
     */
    age?: number | null;
    /**
     * URL резюме на сайте
     */
    alternate_url: string;
    /**
     * Город проживания. Элемент справочника [areas](#tag/Obshie-spravochniki/operation/get-areas)
     */
    area?: (_IncludesIdNameUrl | _IncludesNullableObject) | null;
    auto_hide_time?: ResumeObjectsAutoHideTime;
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
     * Опыт работы
     */
    experience: Array<ResumeObjectsExperienceForOwner>;
    /**
     * Имя
     */
    first_name?: string | null;
    /**
     * Пол соискателя. Возможные значения перечислены в поле `gender` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    gender?: (_IncludesIdName | _IncludesNullableObject) | null;
    /**
     * Документация [Список скрытых полей](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#hidden-fields). Возможные значения элементов приведены в поле `resume_hidden_fields` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    hidden_fields: Array<_IncludesIdName>;
    /**
     * Идентификатор резюме
     */
    id: string;
    /**
     * Фамилия
     */
    last_name?: string | null;
    /**
     * Выделено ли резюме в поиске
     */
    marked: boolean;
    /**
     * Отчество
     */
    middle_name?: string | null;
    /**
     * Фотография пользователя
     */
    photo?: (_IncludesNullableObject | ProfilePhoto) | null;
    /**
     * Ресурс, на котором было размещено резюме
     */
    platform?: _IncludesId;
    /**
     * Уникальный идентификатор резюме
     */
    real_id: string;
    /**
     * Желаемая зарплата
     */
    salary?: ResumeObjectsSalaryProperties;
    /**
     * Желаемая должность
     */
    title?: string | null;
    /**
     * Общий опыт работы
     */
    total_experience?: ResumeObjectsTotalExperience;
    /**
     * Дата и время обновления резюме
     */
    updated_at: string;
    /**
     * URL резюме на сайте
     */
    url: string;
};

