/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacancyAcceptHandicapped } from './VacancyAcceptHandicapped';
import type { VacancyAcceptIncompleteResumes } from './VacancyAcceptIncompleteResumes';
import type { VacancyAcceptKids } from './VacancyAcceptKids';
import type { VacancyAcceptTemporary } from './VacancyAcceptTemporary';
import type { VacancyAddress } from './VacancyAddress';
import type { VacancyAllowMessages } from './VacancyAllowMessages';
import type { VacancyBrandedTemplate } from './VacancyBrandedTemplate';
import type { VacancyCode } from './VacancyCode';
import type { VacancyContacts } from './VacancyContacts';
import type { VacancyCustomEmployerName } from './VacancyCustomEmployerName';
import type { VacancyDepartment } from './VacancyDepartment';
import type { VacancyDraftTest } from './VacancyDraftTest';
import type { VacancyDriverLicenseTypes } from './VacancyDriverLicenseTypes';
import type { VacancyEmployment } from './VacancyEmployment';
import type { VacancyEmploymentForm } from './VacancyEmploymentForm';
import type { VacancyExperience } from './VacancyExperience';
import type { VacancyFlyInFlyOutDurationFlyInFlyOutDuration } from './VacancyFlyInFlyOutDurationFlyInFlyOutDuration';
import type { VacancyInternship } from './VacancyInternship';
import type { VacancyKeySkills } from './VacancyKeySkills';
import type { VacancyLanguages } from './VacancyLanguages';
import type { VacancyNightShifts } from './VacancyNightShifts';
import type { VacancyProfessionalRoles } from './VacancyProfessionalRoles';
import type { VacancyResponseLetterRequired } from './VacancyResponseLetterRequired';
import type { VacancyResponseNotifications } from './VacancyResponseNotifications';
import type { VacancyResponseUrl } from './VacancyResponseUrl';
import type { VacancySalary } from './VacancySalary';
import type { VacancySalaryRangeSalaryRange } from './VacancySalaryRangeSalaryRange';
import type { VacancySchedule } from './VacancySchedule';
import type { VacancyShowContacts } from './VacancyShowContacts';
import type { VacancyWorkFormatWorkFormat } from './VacancyWorkFormatWorkFormat';
import type { VacancyWorkingDays } from './VacancyWorkingDays';
import type { VacancyWorkingHoursWorkingHours } from './VacancyWorkingHoursWorkingHours';
import type { VacancyWorkingTimeIntervals } from './VacancyWorkingTimeIntervals';
import type { VacancyWorkingTimeModes } from './VacancyWorkingTimeModes';
import type { VacancyWorkScheduleByDaysWorkScheduleByDays } from './VacancyWorkScheduleByDaysWorkScheduleByDays';
/**
 * Поля, передаваемые в запросах на создание и редактирование вакансии
 */
export type VacancyCommonFields = {
    accept_handicapped?: (VacancyAcceptHandicapped | _IncludesNullableObject) | null;
    accept_incomplete_resumes?: (VacancyAcceptIncompleteResumes | _IncludesNullableObject) | null;
    accept_kids?: (VacancyAcceptKids | _IncludesNullableObject) | null;
    accept_temporary?: VacancyAcceptTemporary;
    address?: VacancyAddress;
    allow_messages?: (VacancyAllowMessages | _IncludesNullableObject) | null;
    branded_template?: VacancyBrandedTemplate;
    code?: VacancyCode;
    contacts?: VacancyContacts;
    custom_employer_name?: VacancyCustomEmployerName;
    department?: VacancyDepartment;
    driver_license_types?: (VacancyDriverLicenseTypes | _IncludesNullableObject);
    /**
     * @deprecated
     */
    employment?: VacancyEmployment;
    employment_form?: VacancyEmploymentForm;
    experience?: VacancyExperience;
    fly_in_fly_out_duration?: VacancyFlyInFlyOutDurationFlyInFlyOutDuration;
    internship?: VacancyInternship;
    key_skills?: (VacancyKeySkills | _IncludesNullableObject);
    languages?: (VacancyLanguages | _IncludesNullableObject);
    night_shifts?: VacancyNightShifts;
    professional_roles?: VacancyProfessionalRoles;
    response_letter_required?: (VacancyResponseLetterRequired | _IncludesNullableObject) | null;
    response_notifications?: (VacancyResponseNotifications | _IncludesNullableObject) | null;
    response_url?: VacancyResponseUrl;
    /**
     * @deprecated
     */
    salary?: VacancySalary;
    salary_range?: (VacancySalaryRangeSalaryRange | _IncludesNullableObject) | null;
    /**
     * @deprecated
     */
    schedule?: VacancySchedule;
    show_contacts?: VacancyShowContacts;
    test?: VacancyDraftTest;
    work_format?: VacancyWorkFormatWorkFormat;
    work_schedule_by_days?: VacancyWorkScheduleByDaysWorkScheduleByDays;
    /**
     * @deprecated
     */
    working_days?: VacancyWorkingDays;
    working_hours?: VacancyWorkingHoursWorkingHours;
    /**
     * @deprecated
     */
    working_time_intervals?: VacancyWorkingTimeIntervals;
    /**
     * @deprecated
     */
    working_time_modes?: VacancyWorkingTimeModes;
};

