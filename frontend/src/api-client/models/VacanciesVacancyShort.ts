/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesArea } from './_IncludesArea';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesObjectsDepartment } from './VacanciesObjectsDepartment';
import type { VacanciesObjectsEmployer } from './VacanciesObjectsEmployer';
import type { VacancyAddressRawOutput } from './VacancyAddressRawOutput';
import type { VacancyRelationItem } from './VacancyRelationItem';
import type { VacancySalary } from './VacancySalary';
import type { VacancySalaryRangeSalaryRangeOutput } from './VacancySalaryRangeSalaryRangeOutput';
import type { VacancyShowContacts } from './VacancyShowContacts';
import type { VacancyTypeOutput } from './VacancyTypeOutput';
export type VacanciesVacancyShort = {
    address?: VacancyAddressRawOutput;
    /**
     * Ссылка на представление вакансии на сайте
     */
    alternate_url: string;
    /**
     * Ссылка на отклик на вакансию на сайте
     */
    apply_alternate_url: string;
    /**
     * Находится ли данная вакансия в архиве
     */
    archived: boolean;
    area: _IncludesArea;
    department: VacanciesObjectsDepartment;
    employer: VacanciesObjectsEmployer;
    /**
     * Информация о наличии прикрепленного тестового задании к вакансии
     */
    has_test: boolean;
    /**
     * Идентификатор вакансии
     */
    id: string;
    /**
     * Название вакансии
     */
    name: string;
    /**
     * Является ли данная вакансия премиум-вакансией
     */
    premium: boolean;
    /**
     * Дата и время публикации вакансии
     */
    published_at: string;
    /**
     * Возвращает связи соискателя с вакансией. Значения из поля `vacancy_relation` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    relations: Array<VacancyRelationItem>;
    /**
     * Обязательно ли заполнять сообщение при отклике на вакансию
     */
    response_letter_required: boolean;
    /**
     * URL отклика для прямых вакансий (`type.id=direct`)
     */
    response_url?: string | null;
    /**
     * @deprecated
     */
    salary: VacancySalary;
    salary_range: (VacancySalaryRangeSalaryRangeOutput | _IncludesNullableObject) | null;
    show_contacts?: VacancyShowContacts;
    /**
     * Отображать ли лого для вакансии в поисковой выдаче
     */
    show_logo_in_search?: boolean | null;
    type: VacancyTypeOutput;
    /**
     * URL вакансии
     */
    url: string;
};

