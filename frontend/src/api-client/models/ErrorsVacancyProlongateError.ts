/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsVacancyProlongateError = {
    /**
     * Тип ошибки
     */
    type: ErrorsVacancyProlongateError.type;
    /**
     * Причина ошибки:
     *
     * * `not_enough_purchased_services` — купленных услуг недостаточно для продления данного типа вакансии.
     * * `quota_exceeded` — квота менеджера на публикацию данного типа вакансии закончилась.
     * * `prolongation_forbidden` — продление вакансий недоступно текущему менеджеру.
     * * `unavailable_for_archived` — продление недоступно для архивной вакансии.
     * * `too_early` — продление раньше времени
     *
     */
    value: ErrorsVacancyProlongateError.value;
};
export namespace ErrorsVacancyProlongateError {
    /**
     * Тип ошибки
     */
    export enum type {
        VACANCIES = 'vacancies',
    }
    /**
     * Причина ошибки:
     *
     * * `not_enough_purchased_services` — купленных услуг недостаточно для продления данного типа вакансии.
     * * `quota_exceeded` — квота менеджера на публикацию данного типа вакансии закончилась.
     * * `prolongation_forbidden` — продление вакансий недоступно текущему менеджеру.
     * * `unavailable_for_archived` — продление недоступно для архивной вакансии.
     * * `too_early` — продление раньше времени
     *
     */
    export enum value {
        NOT_ENOUGH_PURCHASED_SERVICES = 'not_enough_purchased_services',
        QUOTA_EXCEEDED = 'quota_exceeded',
        PROLONGATION_FORBIDDEN = 'prolongation_forbidden',
        UNAVAILABLE_FOR_ARCHIVED = 'unavailable_for_archived',
        TOO_EARLY = 'too_early',
    }
}

