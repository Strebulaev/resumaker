/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { ResumeObjectsAccess } from './ResumeObjectsAccess';
import type { ResumeObjectsCertificate } from './ResumeObjectsCertificate';
import type { ResumeObjectsDriverLicenseTypes } from './ResumeObjectsDriverLicenseTypes';
import type { ResumeObjectsEmploymentFormEmploymentForm } from './ResumeObjectsEmploymentFormEmploymentForm';
import type { ResumeObjectsPhoto } from './ResumeObjectsPhoto';
import type { ResumeObjectsPortfolio } from './ResumeObjectsPortfolio';
import type { ResumeObjectsRecommendation } from './ResumeObjectsRecommendation';
import type { ResumeObjectsRelocationPublic } from './ResumeObjectsRelocationPublic';
import type { ResumeObjectsSalaryAddEdit } from './ResumeObjectsSalaryAddEdit';
import type { ResumeObjectsSite } from './ResumeObjectsSite';
import type { ResumeObjectsTotalExperience } from './ResumeObjectsTotalExperience';
import type { ResumeObjectsWorkFormatWorkFormat } from './ResumeObjectsWorkFormatWorkFormat';
/**
 * Необязательные поля при создании резюме
 */
export type ResumeNullableFields = {
    access?: (ResumeObjectsAccess | _IncludesNullableObject) | null;
    /**
     * День рождения (в формате `ГГГГ-ММ-ДД`)
     */
    birth_date?: string | null;
    /**
     * Готовность к командировкам. Элемент справочника [business_trip_readiness](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    business_trip_readiness?: (_IncludesId | _IncludesNullableObject) | null;
    /**
     * Список сертификатов соискателя
     */
    certificate?: Array<ResumeObjectsCertificate> | null;
    /**
     * Список категорий водительских прав соискателя
     */
    driver_license_types?: Array<ResumeObjectsDriverLicenseTypes> | null;
    employment_form?: (ResumeObjectsEmploymentFormEmploymentForm | _IncludesNullableObject);
    /**
     * Список подходящих соискателю типов занятостей. Элементы справочника [employment](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    employments?: Array<_IncludesIdName> | null;
    /**
     * Имя
     */
    first_name?: string | null;
    /**
     * Наличие личного автомобиля у соискателя
     */
    has_vehicle?: boolean | null;
    /**
     * Документация [Список скрытых полей](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#hidden-fields). Возможные значения элементов приведены в поле `resume_hidden_fields` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    hidden_fields?: Array<_IncludesIdName> | null;
    /**
     * Фамилия
     */
    last_name?: string | null;
    /**
     * Ближайшая станция метро. Элемент справочника [metro](#tag/Obshie-spravochniki/operation/get-metro-stations).
     * Если передать метро, не принадлежащее переданной area, поле проигнорируется. Имеет смысл указывать только для `area` с метро
     *
     */
    metro?: (_IncludesId | _IncludesNullableObject) | null;
    /**
     * Отчество
     */
    middle_name?: string | null;
    /**
     * Фотография пользователя (см. [Артефакты](#tag/Rabota-s-artefaktami))
     */
    photo?: (ResumeObjectsPhoto | _IncludesNullableObject) | null;
    /**
     * Список изображений в портфолио пользователя
     */
    portfolio?: Array<ResumeObjectsPortfolio> | null;
    /**
     * Массив объектов профролей. Элемент справочника [professional_roles](#tag/Obshie-spravochniki/operation/get-professional-roles-dictionary)
     */
    professional_roles?: Array<_IncludesId>;
    /**
     * Список рекомендаций
     */
    recommendation?: Array<ResumeObjectsRecommendation> | null;
    /**
     * Информация о возможности переезда в другой город
     */
    relocation?: (ResumeObjectsRelocationPublic | _IncludesNullableObject) | null;
    /**
     * Язык, на котором составлено резюме (локаль). Элемент справочника [локали резюме](#tag/Obshie-spravochniki/operation/get-locales)
     */
    resume_locale?: (_IncludesIdName | _IncludesNullableObject) | null;
    salary?: (ResumeObjectsSalaryAddEdit | _IncludesNullableObject) | null;
    /**
     * Список подходящих соискателю графиков работы. Элементы справочника [schedule](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    schedules?: Array<_IncludesIdName> | null;
    /**
     * Профили в соц. сетях и других сервисах
     */
    site?: Array<ResumeObjectsSite> | null;
    /**
     * Ключевые навыки (список уникальных строк)
     */
    skill_set?: Array<string> | null;
    /**
     * Дополнительная информация, описание навыков в свободной форме
     */
    skills?: string | null;
    /**
     * Желаемая должность
     */
    title?: string | null;
    total_experience?: (ResumeObjectsTotalExperience | _IncludesNullableObject) | null;
    /**
     * Желательное время в пути до работы. Элемент справочника [travel_time](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    travel_time?: (_IncludesId | _IncludesNullableObject);
    work_format?: (ResumeObjectsWorkFormatWorkFormat | _IncludesNullableObject);
    /**
     * Список регионов, в который соискатель имеет разрешение на работу. Элементы [справочника регионов](#tag/Obshie-spravochniki/operation/get-areas)
     *
     */
    work_ticket?: Array<_IncludesId> | null;
};

