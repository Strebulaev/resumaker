/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesContact } from './_IncludesContact';
import type { _IncludesId } from './_IncludesId';
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesIdNameUrl } from './_IncludesIdNameUrl';
import type { _IncludesLanguageLevel } from './_IncludesLanguageLevel';
import type { CredsResumeCreds } from './CredsResumeCreds';
import type { ResumeObjectsDriverLicenseTypes } from './ResumeObjectsDriverLicenseTypes';
import type { ResumeObjectsOneOfMetroStation } from './ResumeObjectsOneOfMetroStation';
import type { ResumeObjectsPaidServices } from './ResumeObjectsPaidServices';
import type { ResumeObjectsRecommendation } from './ResumeObjectsRecommendation';
import type { ResumeObjectsRelocationPublic } from './ResumeObjectsRelocationPublic';
import type { ResumeObjectsSite } from './ResumeObjectsSite';
import type { ResumeResume } from './ResumeResume';
export type ResumeResumeFull = (ResumeResume & {
    /**
     * День рождения (в формате `ГГГГ-ММ-ДД`)
     */
    birth_date?: string | null;
    /**
     * Готовность к командировкам. Элемент справочника [business_trip_readiness](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    business_trip_readiness: _IncludesIdName;
    /**
     * Список гражданств соискателя. Элементы [справочника регионов](#tag/Obshie-spravochniki/operation/get-areas)
     */
    citizenship: Array<_IncludesIdNameUrl>;
    /**
     * Список контактов соискателя
     */
    contact: Array<_IncludesContact>;
    creds?: CredsResumeCreds;
    /**
     * Список категорий водительских прав соискателя
     */
    driver_license_types: Array<ResumeObjectsDriverLicenseTypes>;
    /**
     * @deprecated
     */
    employment?: _IncludesIdName;
    /**
     * Список подходящих соискателю типов занятостей. Элементы справочника [employment](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    employments: Array<_IncludesIdName>;
    /**
     * Наличие личного автомобиля у соискателя
     */
    has_vehicle?: boolean | null;
    /**
     * Список языков, которыми владеет соискатель. Элементы справочника [languages](#tag/Obshie-spravochniki/operation/get-languages)
     */
    language: Array<_IncludesLanguageLevel>;
    metro?: ResumeObjectsOneOfMetroStation;
    /**
     * Платные услуги по резюме
     */
    paid_services: Array<ResumeObjectsPaidServices>;
    /**
     * Массив объектов профролей
     */
    professional_roles?: Array<_IncludesIdName> | null;
    /**
     * Список рекомендаций
     */
    recommendation: Array<ResumeObjectsRecommendation>;
    /**
     * Возможность переезда
     */
    relocation: ResumeObjectsRelocationPublic;
    /**
     * Язык, на котором составлено резюме (локаль). Элемент справочника [локали резюме](#tag/Obshie-spravochniki/operation/get-locales)
     */
    resume_locale: _IncludesIdName;
    /**
     * @deprecated
     */
    schedule: _IncludesIdName;
    /**
     * Список подходящих соискателю графиков работы. Элементы справочника [schedule](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    schedules: Array<_IncludesIdName>;
    /**
     * Профили в соц. сетях и других сервисах
     */
    site: Array<ResumeObjectsSite>;
    /**
     * Ключевые навыки (список уникальных строк)
     */
    skill_set: Array<string>;
    /**
     * Дополнительная информация, описание навыков в свободной форме
     */
    skills?: string | null;
    /**
     * Теги к резюме
     */
    tags?: Array<_IncludesId>;
    /**
     * Желательное время в пути до работы. Элемент справочника [travel_time](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    travel_time: _IncludesIdName;
    /**
     * Список регионов, в которых соискатель имеет разрешение на работу. Элементы [справочника регионов](#tag/Obshie-spravochniki/operation/get-areas)
     *
     */
    work_ticket: Array<_IncludesIdNameUrl>;
});

