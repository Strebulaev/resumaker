/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProfessionalRolesRole } from './ProfessionalRolesRole';
export type ProfessionalRolesCategory = {
    /**
     * Идентификатор категории профессиональной роли
     */
    id: string;
    /**
     * Имя категории профессиональной роли
     */
    name: string | null;
    /**
     * Список профессиональных ролей, входящих в эту категорию
     *
     */
    roles: Array<ProfessionalRolesRole>;
};

