/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesArea } from './_IncludesArea';
import type { _IncludesMetroStation } from './_IncludesMetroStation';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesEmployerPublic } from './VacanciesEmployerPublic';
import type { VacanciesObjectsDepartment } from './VacanciesObjectsDepartment';
import type { VacanciesObjectsInsiderInterview } from './VacanciesObjectsInsiderInterview';
import type { VacancyAcceptIncompleteResumes } from './VacancyAcceptIncompleteResumes';
import type { VacancyAcceptTemporary } from './VacancyAcceptTemporary';
import type { VacancyAddressRawOutput } from './VacancyAddressRawOutput';
import type { VacancyContactsOutput } from './VacancyContactsOutput';
import type { VacancyFlyInFlyOutDurationFlyInFlyOutDurationOutput } from './VacancyFlyInFlyOutDurationFlyInFlyOutDurationOutput';
import type { VacancyInternship } from './VacancyInternship';
import type { VacancyName } from './VacancyName';
import type { VacancyNightShifts } from './VacancyNightShifts';
import type { VacancyProfessionalRolesOutput } from './VacancyProfessionalRolesOutput';
import type { VacancyRelations } from './VacancyRelations';
import type { VacancyResponseLetterRequired } from './VacancyResponseLetterRequired';
import type { VacancyResponseUrl } from './VacancyResponseUrl';
import type { VacancySalary } from './VacancySalary';
import type { VacancySalaryRangeSalaryRangeOutput } from './VacancySalaryRangeSalaryRangeOutput';
import type { VacancyScheduleOutput } from './VacancyScheduleOutput';
import type { VacancyShowContacts } from './VacancyShowContacts';
import type { VacancySortPointDistance } from './VacancySortPointDistance';
import type { VacancyTypeOutput } from './VacancyTypeOutput';
import type { VacancyWorkFormatWorkFormatOutput } from './VacancyWorkFormatWorkFormatOutput';
import type { VacancyWorkingDaysOutput } from './VacancyWorkingDaysOutput';
import type { VacancyWorkingHoursWorkingHoursOutput } from './VacancyWorkingHoursWorkingHoursOutput';
import type { VacancyWorkingTimeIntervalsOutput } from './VacancyWorkingTimeIntervalsOutput';
import type { VacancyWorkingTimeModesOutput } from './VacancyWorkingTimeModesOutput';
import type { VacancyWorkScheduleByDaysWorkScheduleByDaysOutput } from './VacancyWorkScheduleByDaysWorkScheduleByDaysOutput';
export type VacanciesStandardVacancyFields = {
    accept_incomplete_resumes: VacancyAcceptIncompleteResumes;
    accept_temporary?: VacancyAcceptTemporary;
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
    archived?: boolean | null;
    area: _IncludesArea;
    contacts?: VacancyContactsOutput;
    /**
     * Дата и время публикации вакансии
     */
    created_at?: string;
    department: VacanciesObjectsDepartment;
    employer: VacanciesEmployerPublic;
    fly_in_fly_out_duration?: VacancyFlyInFlyOutDurationFlyInFlyOutDurationOutput;
    /**
     * Информация о наличии прикрепленного тестового задании к вакансии
     */
    has_test: boolean;
    /**
     * Идентификатор вакансии
     */
    id: string;
    insider_interview?: VacanciesObjectsInsiderInterview;
    internship?: VacancyInternship;
    metro_stations?: _IncludesMetroStation;
    name: VacancyName;
    night_shifts?: VacancyNightShifts;
    /**
     * Является ли данная вакансия премиум-вакансией
     */
    premium?: boolean | null;
    professional_roles: VacancyProfessionalRolesOutput;
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
    /**
     * @deprecated
     */
    schedule?: (VacancyScheduleOutput | _IncludesNullableObject) | null;
    show_contacts?: VacancyShowContacts;
    sort_point_distance?: VacancySortPointDistance;
    type: VacancyTypeOutput;
    /**
     * URL вакансии
     */
    url: string;
    work_format?: VacancyWorkFormatWorkFormatOutput;
    work_schedule_by_days?: VacancyWorkScheduleByDaysWorkScheduleByDaysOutput;
    /**
     * @deprecated
     */
    working_days?: VacancyWorkingDaysOutput;
    working_hours?: VacancyWorkingHoursWorkingHoursOutput;
    /**
     * @deprecated
     */
    working_time_intervals?: VacancyWorkingTimeIntervalsOutput;
    /**
     * @deprecated
     */
    working_time_modes?: VacancyWorkingTimeModesOutput;
};

