/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyAreaOutput } from './VacancyAreaOutput';
import type { VacancyBrandedTemplate } from './VacancyBrandedTemplate';
import type { VacancyCustomEmployerName } from './VacancyCustomEmployerName';
import type { VacancyDraftAddressOutput } from './VacancyDraftAddressOutput';
import type { VacancyDraftAssignedManager } from './VacancyDraftAssignedManager';
import type { VacancyDraftContactsWithFullPhone } from './VacancyDraftContactsWithFullPhone';
import type { VacancyDraftEmployer } from './VacancyDraftEmployer';
import type { VacancyDraftVacancyDraftBase } from './VacancyDraftVacancyDraftBase';
import type { VacancyDraftVacancyDraftCommon } from './VacancyDraftVacancyDraftCommon';
import type { VacancyDraftVacancyProperties } from './VacancyDraftVacancyProperties';
import type { VacancyDraftWithZp } from './VacancyDraftWithZp';
export type VacancyDraftVacancyDraftFull = (VacancyDraftVacancyDraftCommon & {
    address: VacancyDraftAddressOutput;
    /**
     * Коды и названия регионов (фед. округа, субъекты федерации, города)
     */
    areas: Array<VacancyAreaOutput>;
    assigned_manager?: VacancyDraftAssignedManager;
    branded_template?: VacancyBrandedTemplate;
    /**
     * Закрытая или открытая вакансия
     */
    closed_for_applicants?: boolean | null;
    contacts: VacancyDraftContactsWithFullPhone;
    custom_employer_name?: VacancyCustomEmployerName;
    employer: VacancyDraftEmployer;
    meta_info: VacancyDraftVacancyDraftBase;
    vacancy_properties?: VacancyDraftVacancyProperties;
    with_zp: VacancyDraftWithZp;
});

