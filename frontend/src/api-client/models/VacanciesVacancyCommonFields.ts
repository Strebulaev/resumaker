/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesArea } from './_IncludesArea';
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesObjectsDepartment } from './VacanciesObjectsDepartment';
import type { VacanciesObjectsInsiderInterview } from './VacanciesObjectsInsiderInterview';
import type { VacanciesVacancyEmployer } from './VacanciesVacancyEmployer';
import type { VacancyAcceptHandicapped } from './VacancyAcceptHandicapped';
import type { VacancyAcceptIncompleteResumes } from './VacancyAcceptIncompleteResumes';
import type { VacancyAcceptKids } from './VacancyAcceptKids';
import type { VacancyAcceptTemporary } from './VacancyAcceptTemporary';
import type { VacancyAllowMessages } from './VacancyAllowMessages';
import type { VacancyAlternateUrl } from './VacancyAlternateUrl';
import type { VacancyApplyAlternateUrl } from './VacancyApplyAlternateUrl';
import type { VacancyApproved } from './VacancyApproved';
import type { VacancyArchived } from './VacancyArchived';
import type { VacancyBillingTypeOutput } from './VacancyBillingTypeOutput';
import type { VacancyBrandedDescription } from './VacancyBrandedDescription';
import type { VacancyCode } from './VacancyCode';
import type { VacancyContactsOutput } from './VacancyContactsOutput';
import type { VacancyCreatedAt } from './VacancyCreatedAt';
import type { VacancyDescription } from './VacancyDescription';
import type { VacancyDraftTest } from './VacancyDraftTest';
import type { VacancyDriverLicenseTypes } from './VacancyDriverLicenseTypes';
import type { VacancyEmploymentFormOutput } from './VacancyEmploymentFormOutput';
import type { VacancyEmploymentOutput } from './VacancyEmploymentOutput';
import type { VacancyExperienceOutput } from './VacancyExperienceOutput';
import type { VacancyFlyInFlyOutDurationFlyInFlyOutDurationOutput } from './VacancyFlyInFlyOutDurationFlyInFlyOutDurationOutput';
import type { VacancyHasTest } from './VacancyHasTest';
import type { VacancyId } from './VacancyId';
import type { VacancyInitialCreatedAt } from './VacancyInitialCreatedAt';
import type { VacancyInternship } from './VacancyInternship';
import type { VacancyKeySkills } from './VacancyKeySkills';
import type { VacancyLanguagesOutput } from './VacancyLanguagesOutput';
import type { VacancyName } from './VacancyName';
import type { VacancyNightShifts } from './VacancyNightShifts';
import type { VacancyPremium } from './VacancyPremium';
import type { VacancyProfessionalRolesOutput } from './VacancyProfessionalRolesOutput';
import type { VacancyPublicationVacancyProperties } from './VacancyPublicationVacancyProperties';
import type { VacancyRelations } from './VacancyRelations';
import type { VacancyResponseLetterRequired } from './VacancyResponseLetterRequired';
import type { VacancyResponseUrl } from './VacancyResponseUrl';
import type { VacancySalary } from './VacancySalary';
import type { VacancySalaryRangeSalaryRangeOutput } from './VacancySalaryRangeSalaryRangeOutput';
import type { VacancyScheduleOutput } from './VacancyScheduleOutput';
import type { VacancyShowContacts } from './VacancyShowContacts';
import type { VacancyVacancyConstructorTemplate } from './VacancyVacancyConstructorTemplate';
import type { VacancyVideoVacancyVideoVacancyItem } from './VacancyVideoVacancyVideoVacancyItem';
import type { VacancyWorkFormatWorkFormatOutput } from './VacancyWorkFormatWorkFormatOutput';
import type { VacancyWorkingDaysOutput } from './VacancyWorkingDaysOutput';
import type { VacancyWorkingHoursWorkingHoursOutput } from './VacancyWorkingHoursWorkingHoursOutput';
import type { VacancyWorkingTimeIntervalsOutput } from './VacancyWorkingTimeIntervalsOutput';
import type { VacancyWorkingTimeModesOutput } from './VacancyWorkingTimeModesOutput';
import type { VacancyWorkScheduleByDaysWorkScheduleByDaysOutput } from './VacancyWorkScheduleByDaysWorkScheduleByDaysOutput';
export type VacanciesVacancyCommonFields = {
    accept_handicapped: VacancyAcceptHandicapped;
    accept_incomplete_resumes: VacancyAcceptIncompleteResumes;
    accept_kids: VacancyAcceptKids;
    accept_temporary?: VacancyAcceptTemporary;
    allow_messages: VacancyAllowMessages;
    alternate_url: VacancyAlternateUrl;
    apply_alternate_url: VacancyApplyAlternateUrl;
    approved: VacancyApproved;
    archived: VacancyArchived;
    area: _IncludesArea;
    billing_type: VacancyBillingTypeOutput;
    /**
     * @deprecated
     */
    branded_description?: (VacancyBrandedDescription | _IncludesNullableObject) | null;
    /**
     * Закрытая или открытая вакансия
     */
    closed_for_applicants?: boolean | null;
    code?: VacancyCode;
    contacts?: VacancyContactsOutput;
    /**
     * @deprecated
     */
    created_at: VacancyCreatedAt;
    department?: VacanciesObjectsDepartment;
    description: VacancyDescription;
    driver_license_types: VacancyDriverLicenseTypes;
    employer?: (VacanciesVacancyEmployer | _IncludesNullableObject) | null;
    /**
     * @deprecated
     */
    employment?: VacancyEmploymentOutput;
    employment_form?: VacancyEmploymentFormOutput;
    experience: VacancyExperienceOutput;
    fly_in_fly_out_duration?: VacancyFlyInFlyOutDurationFlyInFlyOutDurationOutput;
    has_test: VacancyHasTest;
    id: VacancyId;
    initial_created_at: VacancyInitialCreatedAt;
    insider_interview?: VacanciesObjectsInsiderInterview;
    internship?: VacancyInternship;
    key_skills: VacancyKeySkills;
    languages?: (VacancyLanguagesOutput | _IncludesNullableObject);
    name: VacancyName;
    /**
     * Ссылка для получения списка откликов/приглашений
     */
    negotiations_url?: string | null;
    night_shifts?: VacancyNightShifts;
    premium: VacancyPremium;
    professional_roles: VacancyProfessionalRolesOutput;
    published_at: VacancyCreatedAt;
    relations?: VacancyRelations;
    response_letter_required: VacancyResponseLetterRequired;
    response_url?: VacancyResponseUrl;
    /**
     * @deprecated
     */
    salary?: VacancySalary;
    salary_range?: (VacancySalaryRangeSalaryRangeOutput | _IncludesNullableObject) | null;
    /**
     * @deprecated
     */
    schedule: VacancyScheduleOutput;
    show_contacts?: VacancyShowContacts;
    /**
     * Подходящие резюме на вакансию
     */
    suitable_resumes_url?: string | null;
    test?: VacancyDraftTest;
    /**
     * Идентификатор типа вакансии из справочника [`vacancy_type`](https://api.hh.ru/openapi/redoc#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    type: _IncludesIdName;
    /**
     * @deprecated
     */
    vacancy_constructor_template?: (VacancyVacancyConstructorTemplate | _IncludesNullableObject) | null;
    vacancy_properties?: VacancyPublicationVacancyProperties;
    video_vacancy?: (VacancyVideoVacancyVideoVacancyItem | _IncludesNullableObject) | null;
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

