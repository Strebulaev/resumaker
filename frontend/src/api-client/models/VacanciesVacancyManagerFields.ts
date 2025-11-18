/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesAddress } from './VacanciesAddress';
import type { VacancyArchivedAt } from './VacancyArchivedAt';
import type { VacancyBrandedTemplate } from './VacancyBrandedTemplate';
import type { VacancyCanUpgradeBillingType } from './VacancyCanUpgradeBillingType';
import type { VacancyCountersOutput } from './VacancyCountersOutput';
import type { VacancyExpiresAt } from './VacancyExpiresAt';
import type { VacancyHidden } from './VacancyHidden';
import type { VacancyManager } from './VacancyManager';
import type { VacancyResponseNotifications } from './VacancyResponseNotifications';
import type { VacancyVacancyProperties } from './VacancyVacancyProperties';
export type VacanciesVacancyManagerFields = {
    address: VacanciesAddress;
    archived_at?: (VacancyArchivedAt | _IncludesNullableObject) | null;
    branded_template: VacancyBrandedTemplate;
    can_upgrade_billing_type: VacancyCanUpgradeBillingType;
    counters?: VacancyCountersOutput;
    expires_at: VacancyExpiresAt;
    hidden: VacancyHidden;
    manager: VacancyManager;
    response_notifications: VacancyResponseNotifications;
    vacancy_properties?: VacancyVacancyProperties;
};

