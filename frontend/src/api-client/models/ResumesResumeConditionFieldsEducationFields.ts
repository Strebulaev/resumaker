/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { ResumesResumeConditionFieldsEducationElementaryCondition } from './ResumesResumeConditionFieldsEducationElementaryCondition';
import type { ResumesResumeConditionFieldsEducationPrimaryCondition } from './ResumesResumeConditionFieldsEducationPrimaryCondition';
import type { ResumesResumeConditionFieldsRequiredWithTitle } from './ResumesResumeConditionFieldsRequiredWithTitle';
export type ResumesResumeConditionFieldsEducationFields = {
    additional?: (_IncludesNullableObject | ResumesResumeConditionFieldsEducationPrimaryCondition) | null;
    attestation?: (_IncludesNullableObject | ResumesResumeConditionFieldsEducationPrimaryCondition) | null;
    elementary?: (_IncludesNullableObject | ResumesResumeConditionFieldsEducationElementaryCondition) | null;
    level?: (_IncludesNullableObject | ResumesResumeConditionFieldsRequiredWithTitle) | null;
    primary?: (_IncludesNullableObject | ResumesResumeConditionFieldsEducationPrimaryCondition) | null;
};

