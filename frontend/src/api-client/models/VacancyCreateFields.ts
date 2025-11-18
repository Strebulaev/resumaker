/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacancyArea } from './VacancyArea';
import type { VacancyBillingType } from './VacancyBillingType';
import type { VacancyDescription } from './VacancyDescription';
import type { VacancyDriverLicenseTypes } from './VacancyDriverLicenseTypes';
import type { VacancyManager } from './VacancyManager';
import type { VacancyName } from './VacancyName';
import type { VacancyType } from './VacancyType';
/**
 * Поля, передаваемые в запросе на создание вакансии
 */
export type VacancyCreateFields = {
    area: VacancyArea;
    billing_type: VacancyBillingType;
    description: VacancyDescription;
    driver_license_types?: (VacancyDriverLicenseTypes | _IncludesNullableObject);
    manager?: (VacancyManager | _IncludesNullableObject) | null;
    name: VacancyName;
    /**
     * Если этот параметр передан, то у новой вакансии дополнительно будет создана связь с предыдущей вакансией (поле previous_id). Этот параметр не влияет на другие и не связан с ними, их всё равно необходимо передавать.
     * Должен быть равен только ID архивной вакансии. ID архивной вакансии можно получить, запросив [список архивных вакансий](#tag/Upravlenie-vakansiyami/operation/get-archived-vacancies) <a name='previous_id'></a>
     *
     */
    previous_id?: string | null;
    type: VacancyType;
};

