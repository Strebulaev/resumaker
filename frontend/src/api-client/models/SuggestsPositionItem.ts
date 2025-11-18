/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SuggestsProfessionalRoleItemWithName } from './SuggestsProfessionalRoleItemWithName';
import type { SuggestsSpecializationsWithName } from './SuggestsSpecializationsWithName';
export type SuggestsPositionItem = {
    /**
     * Идентификатор должности
     */
    id: string;
    /**
     * Информация о профессиональных ролях, соответствующих должности
     */
    professional_roles: Array<SuggestsProfessionalRoleItemWithName>;
    /**
     * Информация о специализациях, соответствующих должности
     */
    specializations?: Array<SuggestsSpecializationsWithName>;
    /**
     * Название должности
     */
    text: string;
};

