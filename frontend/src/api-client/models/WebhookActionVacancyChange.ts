/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { WebhookActionVacancyOnlyMineSettings } from './WebhookActionVacancyOnlyMineSettings';
export type WebhookActionVacancyChange = {
    settings?: (WebhookActionVacancyOnlyMineSettings | _IncludesNullableObject) | null;
    /**
     * Изменение вакансии. Аккумулирует изменения, внесенные за несколько последних секунд, и отправляет вебхук, содержащий время последнего изменения.
     *
     * Если вы внесете два изменения с разницей в одну секунду, сервис отправит только один вебхук, который будет содержать время последнего изменения. Если изменение одно, сервис отправит вебхук с задержкой в несколько секунд
     *
     */
    type: WebhookActionVacancyChange.type;
};
export namespace WebhookActionVacancyChange {
    /**
     * Изменение вакансии. Аккумулирует изменения, внесенные за несколько последних секунд, и отправляет вебхук, содержащий время последнего изменения.
     *
     * Если вы внесете два изменения с разницей в одну секунду, сервис отправит только один вебхук, который будет содержать время последнего изменения. Если изменение одно, сервис отправит вебхук с задержкой в несколько секунд
     *
     */
    export enum type {
        VACANCY_CHANGE = 'VACANCY_CHANGE',
    }
}

