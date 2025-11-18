/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesArea } from './_IncludesArea';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesEmployerPublic } from './VacanciesEmployerPublic';
import type { VacanciesObjectsInsiderInterview } from './VacanciesObjectsInsiderInterview';
import type { VacancyAddress } from './VacancyAddress';
import type { VacancyDepartment } from './VacancyDepartment';
import type { VacancyName } from './VacancyName';
import type { VacancyRelations } from './VacancyRelations';
import type { VacancyResponseLetterRequired } from './VacancyResponseLetterRequired';
import type { VacancyResponseUrl } from './VacancyResponseUrl';
import type { VacancySalary } from './VacancySalary';
import type { VacancySalaryRangeSalaryRangeOutput } from './VacancySalaryRangeSalaryRangeOutput';
import type { VacancyShowContactsNotNull } from './VacancyShowContactsNotNull';
import type { VacancySortPointDistance } from './VacancySortPointDistance';
import type { VacancyTypeOutput } from './VacancyTypeOutput';
export type VacanciesVacanciesBlacklistedItem = {
    address?: VacancyAddress;
    /**
     * URL для регистрации нажатия кнопки отклика
     */
    adv_response_url?: string;
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
    /**
     * Дата и время публикации вакансии
     */
    created_at?: string;
    department: VacancyDepartment;
    employer: VacanciesEmployerPublic;
    /**
     * Информация о наличии прикрепленного тестового задании к вакансии
     */
    has_test: boolean;
    /**
     * Идентификатор вакансии
     */
    id: string;
    insider_interview?: VacanciesObjectsInsiderInterview;
    name: VacancyName;
    /**
     * Является ли данная вакансия премиум-вакансией
     */
    premium: boolean;
    /**
     * Дата и время публикации вакансии
     */
    published_at: string;
    relations: VacancyRelations;
    response_letter_required: VacancyResponseLetterRequired;
    response_url?: VacancyResponseUrl;
    /**
     * @deprecated
     */
    salary: VacancySalary;
    salary_range: (VacancySalaryRangeSalaryRangeOutput | _IncludesNullableObject) | null;
    show_contacts?: VacancyShowContactsNotNull;
    sort_point_distance?: VacancySortPointDistance;
    type: VacancyTypeOutput;
    /**
     * URL вакансии
     */
    url: string;
};

