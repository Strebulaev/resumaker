/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SuggestsProfessionalRoleItemWithName } from './SuggestsProfessionalRoleItemWithName';
export type SuggestsVacancyPositionItem = {
    /**
     * Идентификатор должности
     */
    id: string;
    /**
     * Информация о профессиональных ролях, соответствующих должности
     */
    professional_roles: Array<SuggestsProfessionalRoleItemWithName>;
    /**
     * Название должности
     */
    text: string;
};

