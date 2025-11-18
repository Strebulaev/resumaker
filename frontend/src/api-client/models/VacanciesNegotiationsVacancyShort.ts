/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesArea } from './_IncludesArea';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesObjectsDepartment } from './VacanciesObjectsDepartment';
import type { VacanciesObjectsEmployer } from './VacanciesObjectsEmployer';
import type { VacanciesObjectsInsiderInterview } from './VacanciesObjectsInsiderInterview';
import type { VacancyAddressRawOutput } from './VacancyAddressRawOutput';
import type { VacancyProfessionalRolesOutput } from './VacancyProfessionalRolesOutput';
import type { VacancySalary } from './VacancySalary';
import type { VacancySalaryRangeSalaryRangeOutput } from './VacancySalaryRangeSalaryRangeOutput';
import type { VacancyShowContactsNotNull } from './VacancyShowContactsNotNull';
import type { VacancyTypeOutput } from './VacancyTypeOutput';
export type VacanciesNegotiationsVacancyShort = {
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
    /**
     * Дата и время публикации вакансии
     */
    created_at?: string;
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
    insider_interview?: VacanciesObjectsInsiderInterview;
    /**
     * Название вакансии
     */
    name: string;
    /**
     * Является ли данная вакансия премиум-вакансией
     */
    premium: boolean;
    professional_roles?: VacancyProfessionalRolesOutput;
    /**
     * Дата и время публикации вакансии
     */
    published_at: string;
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
    show_contacts: VacancyShowContactsNotNull;
    /**
     * Отображать ли лого для вакансии в поисковой выдаче
     */
    show_logo_in_search?: boolean | null;
    /**
     * Расстояние в метрах между центром сортировки (заданной параметрами `sort_point_lat`, `sort_point_lng`) и указанным в вакансии адресом. В случае, если в адресе указаны только станции метро, выдается расстояние между центром сортировки и средней геометрической точкой указанных станций.
     * Значение `sort_point_distance` выдается только в случае, если заданы параметры `sort_point_lat`, `sort_point_lng`, `order_by=distance`
     *
     */
    sort_point_distance?: number | null;
    type: VacancyTypeOutput;
    /**
     * URL вакансии
     */
    url: string;
};

