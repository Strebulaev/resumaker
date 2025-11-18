/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ManagerSettingsCurrency } from './ManagerSettingsCurrency';
import type { VacancyBrandedTemplate } from './VacancyBrandedTemplate';
/**
 * Информация о предпочтениях менеджера
 */
export type ManagerSettings = {
    default_currency: ManagerSettingsCurrency;
    default_vacancy_branded_template?: VacancyBrandedTemplate;
    /**
     * Предпочтение по использованию флага `send_sms`
     * при [приглашении соискателя](#tag/Otklikipriglasheniya-rabotodatelya/operation/invite-applicant-to-vacancy)
     *
     */
    use_sms_notification: boolean;
};

