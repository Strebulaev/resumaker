/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
import type { Id } from './Id';
import type { ResumeObjectsEmploymentFormEmploymentForm } from './ResumeObjectsEmploymentFormEmploymentForm';
import type { ResumeObjectsWorkFormatWorkFormat } from './ResumeObjectsWorkFormatWorkFormat';
import type { ResumeViewPlatform } from './ResumeViewPlatform';
/**
 * Информация о резюме
 */
export type ResumeEditResume = {
    /**
     * Раздел [Видимость резюме](#tag/Rezyume.-Spiski-vidimosti/operation/get-resume-access-types)
     *
     */
    access?: {
        /**
         * Тип видимости. Элемент справочника [resume_access_type](#tag/Obshie-spravochniki/operation/get-dictionaries)
         */
        type: _IncludesId;
    };
    /**
     * Город проживания. Элемент справочника [areas](#tag/Obshie-spravochniki/operation/get-areas)
     */
    area?: Id;
    /**
     * День рождения (в формате `ГГГГ-ММ-ДД`)
     */
    birth_date?: string;
    /**
     * Готовность к командировкам. Элемент справочника [business_trip_readiness](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    business_trip_readiness?: _IncludesId;
    /**
     * Список сертификатов соискателя
     */
    certificate?: Array<{
        /**
         * Дата получения (в формате `ГГГГ-ММ-ДД`)
         */
        achieved_at: string;
        /**
         * На кого выдан сертификат, актуально только для сертификатов с `type = microsoft`
         */
        owner?: string;
        /**
         * Название сертификата
         */
        title: string;
        /**
         * Тип сертификата. Доступные значения: `custom`, `microsoft`
         *
         */
        type: string;
        /**
         * Ссылка на страницу с описанием сертификата
         */
        url?: string;
    }>;
    /**
     * Список гражданств соискателя. Элементы [справочника регионов](#tag/Obshie-spravochniki/operation/get-areas)
     */
    citizenship?: Array<_IncludesId>;
    /**
     * Список контактов соискателя
     */
    contact?: Array<{
        /**
         * Комментарий к контакту
         */
        comment?: string;
        /**
         * Является ли данный способ связи предпочитаемым (обязательно указать один контакт как предпочитаемый `"preferred": true`, в случае если preferred не передан, считаем, что передано значение `false`)
         *
         */
        preferred: boolean;
        /**
         * Тип контакта. Элемент справочника [preferred_contact_type](#tag/Obshie-spravochniki/operation/get-dictionaries)
         */
        type: _IncludesId;
        /**
         * Значение контакта
         */
        value?: ({
            /**
             * Код города (при указании телефона)
             */
            city: string;
            /**
             * Код страны (при указании телефона)
             */
            country: string;
            /**
             * Отформатированный номер телефона (при указании телефона)
             */
            formatted: string;
            /**
             * Номер (при указании телефона)
             */
            number: string;
        } | string);
    }>;
    /**
     * Список категорий водительских прав соискателя
     */
    driver_license_types?: Array<{
        /**
         * Категория водительских прав соискателя. Элемент справочника [тип водительских прав](#tag/Obshie-spravochniki/operation/get-dictionaries)
         */
        id: string;
    }>;
    /**
     * Образование
     *
     * Особенности сохранения образования:
     *
     * - Если передать и высшее и среднее образование и уровень образования "средний", то сохранится только среднее образование.
     * - Если передать и высшее и среднее образование и уровень образования "высшее", то сохранится только высшее образование
     *
     */
    education?: {
        /**
         * Список курсов повышения квалификации
         */
        additional: Array<{
            /**
             * Название курса / теста
             */
            name: string;
            /**
             * Организация, проводившая курс / тест
             */
            organization: string;
            /**
             * Специальность / специализация
             */
            result?: string;
            /**
             * Год окончания / сдачи
             */
            year: number;
        }>;
        /**
         * Список пройденных тестов или экзаменов
         */
        attestation: Array<{
            /**
             * Название курса / теста
             */
            name: string;
            /**
             * Организация, проводившая курс / тест
             */
            organization: string;
            /**
             * Специальность / специализация
             */
            result?: string;
            /**
             * Год окончания / сдачи
             */
            year: number;
        }>;
        /**
         * Среднее образование. Обычно заполняется только при отсутствии высшего образования
         */
        elementary: Array<{
            /**
             * Название учебного заведения
             */
            name: string;
            /**
             * Год окончания
             */
            year: number;
        }>;
        /**
         * Уровень образования. Элемент справочника [education_level](#tag/Obshie-spravochniki/operation/get-dictionaries)
         */
        level: _IncludesId;
        /**
         * Список образований выше среднего
         */
        primary: Array<{
            /**
             * Название учебного заведения
             */
            name: string;
            /**
             * Идентификатор учебного заведения, можно получить из
             * [подсказок по названиям вузов](#tag/Podskazki/operation/get-educational-institutions-suggests)
             *
             */
            name_id?: string;
            /**
             * Факультет
             */
            organization?: string;
            /**
             * Идентификатор факультета, можно получить из [справочника факультетов](#tag/Obshie-spravochniki/operation/get-faculties)
             */
            organization_id?: string;
            /**
             * Специальность / специализация
             */
            result?: string;
            /**
             * Идентификатор специальности / специализации, можно получить из [подсказок по специализациям](#tag/Podskazki/operation/get-fields-of-study-suggestions)
             */
            result_id?: string;
            /**
             * Год окончания
             */
            year: number;
        }>;
    };
    employment_form?: ResumeObjectsEmploymentFormEmploymentForm;
    /**
     * Список подходящих соискателю типов занятостей. Элементы справочника [employment](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    employments?: Array<_IncludesId>;
    /**
     * Опыт работы
     */
    experience?: Array<{
        /**
         * Регион расположения организации. Элемент [справочника регионов](#tag/Obshie-spravochniki/operation/get-areas)
         */
        area?: _IncludesId;
        /**
         * Организация
         */
        company?: string;
        /**
         * Уникальный идентификатор организации, можно получить из [подсказок по организациям](#tag/Podskazki/operation/get-registered-companies-suggests)
         */
        company_id?: string | null;
        /**
         * Сайт компании
         */
        company_url?: string;
        /**
         * Обязанности, функции, достижения
         */
        description: string;
        /**
         * Окончание работы (дата в формате `ГГГГ-ММ-ДД`)
         */
        end?: string | null;
        /**
         * Cписок отраслей компании. Элементы [справочника отраслей компаний](#tag/Obshie-spravochniki/operation/get-industries)
         */
        industries: Array<_IncludesId>;
        /**
         * @deprecated
         */
        industry?: {
            /**
             * Идентификатор поля
             */
            id: string;
            /**
             * Название поля
             */
            name: string;
        };
        /**
         * Должность
         */
        position: string;
        /**
         * Начало работы (дата в формате `ГГГГ-ММ-ДД`)
         */
        start: string;
    }>;
    /**
     * Имя
     */
    first_name?: string;
    /**
     * Пол. Элемент справочника [gender](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    gender?: Id;
    /**
     * Наличие личного автомобиля у соискателя
     */
    has_vehicle?: boolean;
    /**
     * Список скрытых полей. Элемент справочника [resume_hidden_fields](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     */
    hidden_fields?: Array<_IncludesId>;
    /**
     * Список языков, которыми владеет соискатель
     */
    language?: Array<{
        /**
         * Идентификатор языка. Элемент справочника [languages](#tag/Obshie-spravochniki/operation/get-languages)
         */
        id: string;
        /**
         * Уровень знания языка. Элемент справочника [language_level](#tag/Obshie-spravochniki/operation/get-dictionaries)
         */
        level: _IncludesId;
    }>;
    /**
     * Фамилия
     */
    last_name?: string;
    /**
     * Ближайшая станция метро. Элемент справочника [metro](#tag/Obshie-spravochniki/operation/get-metro-stations).
     * Если передать метро, не принадлежащее переданной area, поле проигнорируется. Имеет смысл указывать только для `area` с метро
     *
     */
    metro?: _IncludesId;
    /**
     * Отчество
     */
    middle_name?: string;
    /**
     * Фотография пользователя (см. [Артефакты](#tag/Rabota-s-artefaktami))
     */
    photo?: _IncludesId;
    platform?: ResumeViewPlatform;
    /**
     * Список изображений в портфолио пользователя
     */
    portfolio?: Array<_IncludesId>;
    /**
     * Массив объектов профролей. Элемент справочника [professional_roles](/openapi/redoc#tag/Obshie-spravochniki/operation/get-professional-roles-dictionary)
     */
    professional_roles?: Array<_IncludesId>;
    /**
     * Список рекомендаций
     */
    recommendation?: Array<{
        /**
         * Имя выдавшего рекомендацию
         */
        name: string;
        /**
         * Организация
         */
        organization: string;
        /**
         * Должность
         */
        position: string;
    }>;
    /**
     * Информация о возможности переезда в другой город
     */
    relocation?: {
        /**
         * Список городов, в которые возможен переезд. Содержит элементы [справочника регионов](#tag/Obshie-spravochniki/operation/get-areas). Имеет смысл только с соответствующим полем `type`
         *
         */
        area: Array<_IncludesId>;
        /**
         * Готовность к переезду. Элемент справочника [relocation_type](#tag/Obshie-spravochniki/operation/get-dictionaries)
         */
        type: _IncludesId;
    };
    /**
     * Язык, на котором составлено резюме (локаль). Элемент справочника [локали резюме](#tag/Obshie-spravochniki/operation/get-locales)
     */
    resume_locale?: _IncludesId;
    /**
     * Желаемая зарплата
     */
    salary?: {
        /**
         * Сумма
         */
        amount: number;
        /**
         * Идентификатор валюты
         */
        currency: string;
    };
    /**
     * Список подходящих соискателю графиков работы. Элементы справочника [schedule](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    schedules?: Array<_IncludesId>;
    /**
     * Профили в соц. сетях и других сервисах
     */
    site?: Array<{
        /**
         * Тип профиля. Элемент справочника [resume_contacts_site_type](#tag/Obshie-spravochniki/operation/get-dictionaries)
         */
        type: _IncludesId;
        /**
         * Ссылка на профиль или идентификатор
         */
        url?: string;
    }>;
    /**
     * Ключевые навыки (список уникальных строк)
     */
    skill_set?: Array<string>;
    /**
     * Дополнительная информация, описание навыков в свободной форме
     */
    skills?: string;
    /**
     * Специализации соискателя. Элементы справочника [specializations](https://github.com/hhru/api/blob/461b16c0b96291bda8db22d3364f42b7fa34eba6/docs/specializations.md)
     */
    specialization?: Array<_IncludesId>;
    /**
     * Желаемая должность
     */
    title?: string;
    /**
     * Желательное время в пути до работы. Элемент справочника [travel_time](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    travel_time?: _IncludesId;
    work_format?: ResumeObjectsWorkFormatWorkFormat;
    /**
     * Список регионов, в который соискатель имеет разрешение на работу. Элементы [справочника регионов](#tag/Obshie-spravochniki/operation/get-areas)
     *
     */
    work_ticket?: Array<_IncludesId>;
};

