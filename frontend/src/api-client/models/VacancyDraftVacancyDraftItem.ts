/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyAreaOutput } from './VacancyAreaOutput';
import type { VacancyBillingTypeOutput } from './VacancyBillingTypeOutput';
import type { VacancyDraftAssignedManager } from './VacancyDraftAssignedManager';
import type { VacancyDraftVacancyDraftBase } from './VacancyDraftVacancyDraftBase';
import type { VacancyDraftVacancyProperties } from './VacancyDraftVacancyProperties';
export type VacancyDraftVacancyDraftItem = (VacancyDraftVacancyDraftBase & {
    /**
     * Коды и названия регионов (фед. округа, субъекты федерации, города)
     */
    areas: Array<VacancyAreaOutput>;
    assigned_manager?: VacancyDraftAssignedManager;
    billing_type: VacancyBillingTypeOutput;
    /**
     * Название вакансии
     */
    name?: string;
    /**
     * Тип публикации (справочник [vacancy_billing_type](#tag/Obshie-spravochniki/operation/get-dictionaries))
     * @deprecated
     */
    publication_type: string;
    /**
     * Url для запроса полной информации черновика
     */
    url: string;
    vacancy_properties?: VacancyDraftVacancyProperties;
    /**
     * Тип вакансии (справочник [vacancy_type](#tag/Obshie-spravochniki/operation/get-dictionaries))
     */
    vacancy_type: string | null;
});

