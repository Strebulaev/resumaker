/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesArea } from './_IncludesArea';
import type { _IncludesId } from './_IncludesId';
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesLanguageLevel } from './_IncludesLanguageLevel';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { MetroLineStation } from './MetroLineStation';
import type { ProfileFieldsAddressCoordinates } from './ProfileFieldsAddressCoordinates';
import type { ProfileFieldsArea } from './ProfileFieldsArea';
import type { ProfileFieldsCommunicationMethod } from './ProfileFieldsCommunicationMethod';
import type { ProfileFieldsEducation } from './ProfileFieldsEducation';
import type { ProfileFieldsOtherCommunicationMethod } from './ProfileFieldsOtherCommunicationMethod';
import type { ProfileFieldsPreferredWorkArea } from './ProfileFieldsPreferredWorkArea';
import type { ResumeObjectsRelocation } from './ResumeObjectsRelocation';
/**
 * Информация о профиле для соискателя
 */
export type ProfileProfileView = {
    /**
     * Координаты проживания
     */
    address_coordinates?: (ProfileFieldsAddressCoordinates | _IncludesNullableObject) | null;
    /**
     * Город проживания
     */
    area?: (ProfileFieldsArea | _IncludesNullableObject) | null;
    /**
     * Дата рождения
     */
    birth_date?: string | null;
    /**
     * Список гражданств
     */
    citizenship?: Array<_IncludesArea>;
    /**
     * Способы коммуникации
     */
    communication_methods?: Record<string, ProfileFieldsCommunicationMethod> | null;
    /**
     * Список категорий прав на вождение ТС
     */
    driver_license_types?: Array<_IncludesId>;
    /**
     * Образование соискателя.
     *
     * Особенности сохранения образования:
     *
     * * Если передать и высшее и среднее образование и уровень образования "среднее", то сохранится только среднее образование.
     * * Если передать и высшее и среднее образование и уровень образования "высшее", то сохранится только высшее образование
     *
     */
    education?: ProfileFieldsEducation;
    /**
     * Имя
     */
    first_name?: string | null;
    /**
     * Пол. Элемент справочника [gender](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    gender?: (_IncludesIdName | _IncludesNullableObject) | null;
    /**
     * Есть ли личный автомобиль
     */
    has_vehicle?: boolean | null;
    /**
     * Список уровней владения языками
     */
    language?: Array<_IncludesLanguageLevel>;
    /**
     * Фамилия
     */
    last_name?: string | null;
    /**
     * Станция метро
     */
    metro?: (MetroLineStation | _IncludesNullableObject) | null;
    /**
     * Отчество
     */
    middle_name?: string | null;
    /**
     * Другие способы коммуникации
     */
    other_communication_methods?: Array<ProfileFieldsOtherCommunicationMethod> | null;
    /**
     * Выбор всех регионов в районах поиска работы
     */
    preferred_work_all_areas?: boolean | null;
    /**
     * Предпочтительные районы поиска работы
     */
    preferred_work_areas?: Array<ProfileFieldsPreferredWorkArea> | null;
    /**
     * Возможность переезда
     */
    relocation?: ResumeObjectsRelocation;
    /**
     * Раздел [Статус профиля](#tag/Rezyume.-Prosmotr-informacii/Status-rezyume)
     *
     */
    status?: _IncludesIdName;
    /**
     * Список стран, в которых есть разрешение на работу
     */
    work_ticket?: Array<_IncludesArea>;
};

