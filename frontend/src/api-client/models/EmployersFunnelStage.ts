/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { EmployersEmployersState } from './EmployersEmployersState';
import type { EmployersFunnelSubstate } from './EmployersFunnelSubstate';
export type EmployersFunnelStage = {
    /**
     * Идентификатор этапа воронки
     */
    id: string;
    state: EmployersEmployersState;
    /**
     * Информация о подстатусе воронки найма
     */
    substate?: (EmployersFunnelSubstate | _IncludesNullableObject) | null;
};

