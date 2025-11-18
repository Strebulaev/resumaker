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
import type { VacancyArea } from './VacancyArea';
import type { VacancyCustomEmployerName } from './VacancyCustomEmployerName';
import type { VacancyDepartment } from './VacancyDepartment';
import type { VacancyDraftAddress } from './VacancyDraftAddress';
import type { VacancyDraftAreas } from './VacancyDraftAreas';
import type { VacancyDraftAssignedManagerId } from './VacancyDraftAssignedManagerId';
import type { VacancyDraftBrandedTemplate } from './VacancyDraftBrandedTemplate';
import type { VacancyDraftCode } from './VacancyDraftCode';
import type { VacancyDraftContacts } from './VacancyDraftContacts';
import type { VacancyDraftDescription } from './VacancyDraftDescription';
import type { VacancyDraftEmployment } from './VacancyDraftEmployment';
import type { VacancyDraftKeySkills } from './VacancyDraftKeySkills';
import type { VacancyDraftName } from './VacancyDraftName';
import type { VacancyDraftProfessionalRoles } from './VacancyDraftProfessionalRoles';
import type { VacancyDraftResponseUrl } from './VacancyDraftResponseUrl';
import type { VacancyDraftScheduledAt } from './VacancyDraftScheduledAt';
import type { VacancyDraftTest } from './VacancyDraftTest';
import type { VacancyDraftWithZp } from './VacancyDraftWithZp';
import type { VacancyDriverLicenseTypes } from './VacancyDriverLicenseTypes';
import type { VacancyEmploymentForm } from './VacancyEmploymentForm';
import type { VacancyExperience } from './VacancyExperience';
import type { VacancyFlyInFlyOutDurationFlyInFlyOutDuration } from './VacancyFlyInFlyOutDurationFlyInFlyOutDuration';
import type { VacancyInternship } from './VacancyInternship';
import type { VacancyLanguages } from './VacancyLanguages';
import type { VacancyNightShifts } from './VacancyNightShifts';
import type { VacancyResponseLetterRequired } from './VacancyResponseLetterRequired';
import type { VacancyResponseNotifications } from './VacancyResponseNotifications';
import type { VacancySalary } from './VacancySalary';
import type { VacancySalaryRangeSalaryRange } from './VacancySalaryRangeSalaryRange';
import type { VacancySchedule } from './VacancySchedule';
import type { VacancyWorkFormatWorkFormat } from './VacancyWorkFormatWorkFormat';
import type { VacancyWorkingDays } from './VacancyWorkingDays';
import type { VacancyWorkingHoursWorkingHours } from './VacancyWorkingHoursWorkingHours';
import type { VacancyWorkingTimeIntervals } from './VacancyWorkingTimeIntervals';
import type { VacancyWorkingTimeModes } from './VacancyWorkingTimeModes';
import type { VacancyWorkScheduleByDaysWorkScheduleByDays } from './VacancyWorkScheduleByDaysWorkScheduleByDays';
export type VacancyDraftVacancyDraftBodyCommon = {
    accept_handicapped?: (VacancyAcceptHandicapped | _IncludesNullableObject);
    accept_incomplete_resumes?: (VacancyAcceptIncompleteResumes | _IncludesNullableObject);
    accept_kids?: (VacancyAcceptKids | _IncludesNullableObject);
    accept_temporary?: (VacancyAcceptTemporary | _IncludesNullableObject);
    address?: (VacancyDraftAddress | _IncludesNullableObject);
    allow_messages?: (VacancyAllowMessages | _IncludesNullableObject);
    /**
     * @deprecated
     */
    area?: (VacancyArea | _IncludesNullableObject);
    /**
     * Можно передать не более 50 элементов
     */
    areas?: (VacancyDraftAreas | _IncludesNullableObject);
    assigned_manager_id?: VacancyDraftAssignedManagerId;
    branded_template?: (VacancyDraftBrandedTemplate | _IncludesNullableObject);
    code?: (VacancyDraftCode | _IncludesNullableObject);
    contacts?: (VacancyDraftContacts | _IncludesNullableObject);
    custom_employer_name?: (VacancyCustomEmployerName | _IncludesNullableObject);
    department?: (VacancyDepartment | _IncludesNullableObject);
    description?: (VacancyDraftDescription | _IncludesNullableObject);
    driver_license_types?: (VacancyDriverLicenseTypes | _IncludesNullableObject);
    /**
     * @deprecated
     */
    employment?: (VacancyDraftEmployment | _IncludesNullableObject);
    employment_form?: (VacancyEmploymentForm | _IncludesNullableObject);
    experience?: (VacancyExperience | _IncludesNullableObject);
    /**
     * Список вариантов длительности вахты (в ближайшие полгода станет обязательным полем!)
     */
    fly_in_fly_out_duration?: (VacancyFlyInFlyOutDurationFlyInFlyOutDuration | _IncludesNullableObject);
    internship?: (VacancyInternship | _IncludesNullableObject);
    key_skills?: (VacancyDraftKeySkills | _IncludesNullableObject);
    languages?: (VacancyLanguages | _IncludesNullableObject);
    name?: (VacancyDraftName | _IncludesNullableObject);
    night_shifts?: (VacancyNightShifts | _IncludesNullableObject);
    professional_roles?: (VacancyDraftProfessionalRoles | _IncludesNullableObject);
    response_letter_required?: (VacancyResponseLetterRequired | _IncludesNullableObject);
    response_notifications?: (VacancyResponseNotifications | _IncludesNullableObject);
    response_url?: (VacancyDraftResponseUrl | _IncludesNullableObject);
    /**
     * @deprecated
     */
    salary?: (VacancySalary | _IncludesNullableObject);
    salary_range?: (VacancySalaryRangeSalaryRange | _IncludesNullableObject);
    /**
     * @deprecated
     */
    schedule?: (VacancySchedule | _IncludesNullableObject);
    scheduled_at?: (VacancyDraftScheduledAt | _IncludesNullableObject) | null;
    side_job?: _IncludesNullableObject;
    test?: (VacancyDraftTest | _IncludesNullableObject);
    with_zp?: (VacancyDraftWithZp | _IncludesNullableObject);
    work_format?: (VacancyWorkFormatWorkFormat | _IncludesNullableObject);
    work_schedule_by_days?: (VacancyWorkScheduleByDaysWorkScheduleByDays | _IncludesNullableObject);
    /**
     * @deprecated
     */
    working_days?: (VacancyWorkingDays | _IncludesNullableObject);
    working_hours?: (VacancyWorkingHoursWorkingHours | _IncludesNullableObject);
    /**
     * @deprecated
     */
    working_time_intervals?: (VacancyWorkingTimeIntervals | _IncludesNullableObject);
    /**
     * @deprecated
     */
    working_time_modes?: (VacancyWorkingTimeModes | _IncludesNullableObject);
};

