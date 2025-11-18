/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { SuggestsArea } from './SuggestsArea';
import type { SuggestsEmployerItem } from './SuggestsEmployerItem';
export type SuggestsCompanyItem = (SuggestsEmployerItem & {
    area: SuggestsArea;
    /**
     * Сферы деятельности
     */
    industries?: Array<_IncludesIdName>;
});

