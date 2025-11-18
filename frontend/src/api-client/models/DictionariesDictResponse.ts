/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesIdNameUid } from './_IncludesIdNameUid';
import type { DictionariesCurrencyItem } from './DictionariesCurrencyItem';
/**
 * Справочники полей и сущностей, используемых в API
 */
export type DictionariesDictResponse = {
    /**
     * Доступ к вакансии от 14 или 16 лет. Используется для поля age_restriction в вакансиях и черновиках
     */
    age_restriction?: Array<_IncludesIdName>;
    /**
     * Тип доступа для комментария к соискателю
     */
    applicant_comment_access_type: Array<_IncludesIdName>;
    /**
     * Типы сортировки [списка комментариев к соискателю](#tag/Kommentarii-k-soiskatelyu/operation/get-applicant-comments-list)
     */
    applicant_comments_order: Array<_IncludesIdName>;
    /**
     * Статусы откликов/приглашений
     */
    applicant_negotiation_status: Array<_IncludesIdName>;
    /**
     * Готовность к командировкам
     */
    business_trip_readiness: Array<_IncludesIdName>;
    /**
     * Справочник валют
     */
    currency: Array<DictionariesCurrencyItem>;
    /**
     * Категории водительских прав
     */
    driver_license_types: Array<_IncludesId>;
    /**
     * Образование в резюме
     */
    education_level: Array<_IncludesIdName>;
    /**
     * Тип сортировки списка опубликованных вакансий
     */
    employer_active_vacancies_order: Array<_IncludesIdName>;
    /**
     * Тип сортировки списка архивных вакансий
     */
    employer_archived_vacancies_order: Array<_IncludesIdName>;
    /**
     * Тип сортировки скрытых вакансий
     */
    employer_hidden_vacancies_order?: Array<_IncludesIdName>;
    /**
     * Типы связи компании с пользователем
     */
    employer_relation: Array<_IncludesIdName>;
    /**
     * Тип работодателя
     */
    employer_type: Array<_IncludesIdName>;
    /**
     * Тип занятости
     */
    employment: Array<_IncludesIdName>;
    /**
     * Тип занятости. Используется для поля employment_form в вакансиях и черновиках
     */
    employment_form?: Array<_IncludesIdName>;
    /**
     * Опыт работы
     */
    experience: Array<_IncludesIdName>;
    /**
     * Длительность вахты. Используется для поля fly_in_fly_out_duration в вакансиях и черновиках
     */
    fly_in_fly_out_duration?: Array<_IncludesIdName>;
    /**
     * Пол
     */
    gender: Array<_IncludesIdName>;
    /**
     * Статусы поиска соискателей для установки и отображения самому соискателю
     */
    job_search_statuses_applicant: Array<_IncludesIdName>;
    /**
     * Статусы поиска соискателей для отображения работодателям
     */
    job_search_statuses_employer: Array<_IncludesIdName>;
    /**
     * Уровень владения языком
     */
    language_level: Array<_IncludesIdName>;
    /**
     * Статус возможности отправки сообщения в переписке
     */
    messaging_status: Array<_IncludesIdName>;
    /**
     * Типы порядка отображения откликов
     */
    negotiations_order: Array<_IncludesIdName>;
    /**
     * Типы участников переписки
     */
    negotiations_participant_type: Array<_IncludesIdName>;
    /**
     * Типы состояний откликов
     */
    negotiations_state: Array<_IncludesIdName>;
    /**
     * Статус звонка, зафиксированного в системе кол-трекинг
     */
    phone_call_status: Array<_IncludesIdName>;
    /**
     * Предпочитаемый способ связи
     */
    preferred_contact_type: Array<_IncludesIdName>;
    /**
     * Готовность к переезду
     */
    relocation_type: Array<_IncludesIdName>;
    /**
     * Уровень доступа к резюме
     */
    resume_access_type: Array<_IncludesIdName>;
    /**
     * Тип сайта в поле «контакты»
     */
    resume_contacts_site_type: Array<_IncludesIdName>;
    /**
     * Тип занятости. Используется для поля employment_form в резюме
     */
    resume_employment_form: Array<_IncludesIdName>;
    /**
     * Поля резюме, которые могут быть [скрыты](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#hidden-fields)
     */
    resume_hidden_fields: Array<_IncludesIdName>;
    /**
     * Комментарий модератора
     */
    resume_moderation_note: Array<_IncludesIdName>;
    /**
     * Условие поиска по опыту работы
     */
    resume_search_experience_period?: Array<_IncludesIdName>;
    /**
     * Область поиска в резюме
     */
    resume_search_fields?: Array<_IncludesIdName>;
    /**
     * Метки поиска резюме
     */
    resume_search_label?: Array<_IncludesIdName>;
    /**
     * Условие поиска резюме
     */
    resume_search_logic?: Array<_IncludesIdName>;
    /**
     * Тип сортировки резюме
     */
    resume_search_order?: Array<_IncludesIdName>;
    /**
     * Условие поиска по проживанию в регионе и готовности к переезду
     */
    resume_search_relocation?: Array<_IncludesIdName>;
    /**
     * Статус резюме
     */
    resume_status: Array<_IncludesIdName>;
    /**
     * Формат работы. Используется для поля work_format в резюме
     */
    resume_work_format: Array<_IncludesIdName>;
    /**
     * График работы
     */
    schedule: Array<_IncludesIdNameUid>;
    /**
     * Время в пути
     */
    travel_time: Array<_IncludesIdName>;
    /**
     * Варианты размещения вакансии с точки зрения биллинга
     */
    vacancy_billing_type: Array<_IncludesIdName>;
    /**
     * Тип кластеров
     */
    vacancy_cluster: Array<_IncludesIdName>;
    /**
     * Метки вакансии
     */
    vacancy_label: Array<_IncludesIdName>;
    /**
     * Причины, из-за которых невозможно [продлить вакансию](#tag/Upravlenie-vakansiyami/operation/get-prolongation-vacancy-info)
     */
    vacancy_not_prolonged_reason: Array<_IncludesIdName>;
    /**
     * Типы связи вакансии с пользователем
     */
    vacancy_relation: Array<_IncludesIdName>;
    /**
     * Область поиска в вакансии
     */
    vacancy_search_fields: Array<_IncludesIdName>;
    /**
     * Тип сортировки вакансии
     */
    vacancy_search_order: Array<_IncludesIdName>;
    /**
     * Тип вакансии
     */
    vacancy_type: Array<_IncludesIdName>;
    /**
     * Формат работы. Используется для поля work_format в вакансиях и черновиках
     */
    work_format?: Array<_IncludesIdName>;
    /**
     * Расписание на неделю. Используется для поля work_schedule_by_days в вакансиях и черновиках
     */
    work_schedule_by_days?: Array<_IncludesIdName>;
    /**
     * Рабочие дни
     */
    working_days: Array<_IncludesIdName>;
    /**
     * Рабочие часы в сутки. Используется для поля working_hours в вакансиях и черновиках
     */
    working_hours?: Array<_IncludesIdName>;
    /**
     * Временные интервалы работы
     */
    working_time_intervals: Array<_IncludesIdName>;
    /**
     * Режимы времени работы
     */
    working_time_modes: Array<_IncludesIdName>;
};

