/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacancyAcceptHandicapped } from './VacancyAcceptHandicapped';
import type { VacancyAcceptIncompleteResumes } from './VacancyAcceptIncompleteResumes';
import type { VacancyAcceptKids } from './VacancyAcceptKids';
import type { VacancyAcceptTemporary } from './VacancyAcceptTemporary';
import type { VacancyAllowMessages } from './VacancyAllowMessages';
import type { VacancyBillingTypeOutput } from './VacancyBillingTypeOutput';
import type { VacancyCode } from './VacancyCode';
import type { VacancyDepartmentOutput } from './VacancyDepartmentOutput';
import type { VacancyDescription } from './VacancyDescription';
import type { VacancyDraftTest } from './VacancyDraftTest';
import type { VacancyDriverLicenseTypes } from './VacancyDriverLicenseTypes';
import type { VacancyEmploymentFormOutput } from './VacancyEmploymentFormOutput';
import type { VacancyEmploymentOutput } from './VacancyEmploymentOutput';
import type { VacancyExperienceOutput } from './VacancyExperienceOutput';
import type { VacancyFlyInFlyOutDurationFlyInFlyOutDurationOutput } from './VacancyFlyInFlyOutDurationFlyInFlyOutDurationOutput';
import type { VacancyInternship } from './VacancyInternship';
import type { VacancyKeySkills } from './VacancyKeySkills';
import type { VacancyLanguagesOutput } from './VacancyLanguagesOutput';
import type { VacancyManager } from './VacancyManager';
import type { VacancyName } from './VacancyName';
import type { VacancyNightShifts } from './VacancyNightShifts';
import type { VacancyProfessionalRolesOutput } from './VacancyProfessionalRolesOutput';
import type { VacancyResponseLetterRequired } from './VacancyResponseLetterRequired';
import type { VacancyResponseNotifications } from './VacancyResponseNotifications';
import type { VacancyResponseUrl } from './VacancyResponseUrl';
import type { VacancySalary } from './VacancySalary';
import type { VacancySalaryRangeSalaryRangeOutput } from './VacancySalaryRangeSalaryRangeOutput';
import type { VacancyScheduleOutput } from './VacancyScheduleOutput';
import type { VacancyTypeOutput } from './VacancyTypeOutput';
import type { VacancyWorkFormatWorkFormatOutput } from './VacancyWorkFormatWorkFormatOutput';
import type { VacancyWorkingDaysOutput } from './VacancyWorkingDaysOutput';
import type { VacancyWorkingHoursWorkingHoursOutput } from './VacancyWorkingHoursWorkingHoursOutput';
import type { VacancyWorkingTimeIntervalsOutput } from './VacancyWorkingTimeIntervalsOutput';
import type { VacancyWorkingTimeModesOutput } from './VacancyWorkingTimeModesOutput';
import type { VacancyWorkScheduleByDaysWorkScheduleByDaysOutput } from './VacancyWorkScheduleByDaysWorkScheduleByDaysOutput';
export type VacancyDraftVacancyDraftCommon = {
    accept_handicapped: VacancyAcceptHandicapped;
    accept_incomplete_resumes: VacancyAcceptIncompleteResumes;
    accept_kids: VacancyAcceptKids;
    accept_temporary?: VacancyAcceptTemporary;
    allow_messages: VacancyAllowMessages;
    billing_type: VacancyBillingTypeOutput;
    code?: VacancyCode;
    department?: VacancyDepartmentOutput;
    description: VacancyDescription;
    driver_license_types: VacancyDriverLicenseTypes;
    /**
     * @deprecated
     */
    employment?: VacancyEmploymentOutput;
    employment_form?: VacancyEmploymentFormOutput;
    experience: VacancyExperienceOutput;
    fly_in_fly_out_duration?: VacancyFlyInFlyOutDurationFlyInFlyOutDurationOutput;
    /**
     * Информация о наличии прикрепленного тестового задании к вакансии
     */
    has_test: boolean;
    internship?: VacancyInternship;
    key_skills: VacancyKeySkills;
    languages: VacancyLanguagesOutput;
    manager: VacancyManager;
    name: VacancyName;
    night_shifts?: VacancyNightShifts;
    professional_roles: VacancyProfessionalRolesOutput;
    response_letter_required: VacancyResponseLetterRequired;
    response_notifications: VacancyResponseNotifications;
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
    test?: VacancyDraftTest;
    type: VacancyTypeOutput;
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

