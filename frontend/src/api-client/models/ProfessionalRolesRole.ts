/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProfessionalRolesRole = {
    /**
     * На роль принимаются отклики неполным резюме
     */
    accept_incomplete_resumes: boolean;
    /**
     * Идентификатор профессиональной роли
     */
    id: string;
    /**
     * Дефолтная роль
     */
    is_default: boolean;
    /**
     * Имя профессиональной роли
     */
    name: string;
    /**
     * Наличие запрета на использование в поиске при составлении поискового запроса
     */
    search_deprecated?: boolean;
    /**
     * Время, с которого действует запрет на использование роли в поиске при составлении поискового запроса,
     * в формате [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) с точностью до секунды: `YYYY-MM-DDThh:mm:ss±hhmm`
     *
     */
    search_deprecated_datetime?: string | null;
    /**
     * Наличие запрета на использование при создании новых сущностей (резюме или вакансии)
     */
    select_deprecated?: boolean;
    /**
     * Время, с которого действует запрет на использование роли при создании новых сущностей,
     * в формате [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) с точностью до секунды: `YYYY-MM-DDThh:mm:ss±hhmm`
     *
     */
    select_deprecated_datetime?: string | null;
};

