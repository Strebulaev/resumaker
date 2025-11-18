/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Создание резюме и профиля и получение в ответ схемы с полями резюме-профиля
 */
export type ResumeProfileResumeProfileCreateRequestBaseBody = {
    /**
     * Точка входа (default - по умолчанию; vacancy_response - отклик на вакансию; onboarding_short - онбординг; onboarding_area_creds - онбординг с кредами; возможны другие варианты)
     */
    entry_point?: ResumeProfileResumeProfileCreateRequestBaseBody.entry_point;
    /**
     * Широта
     */
    lat?: number;
    /**
     * Долгота
     */
    lng?: number;
    /**
     * Id вакансии на которую откликаемся, заполняется для точки входа "vacancy_response"
     */
    vacancy_id?: number;
};
export namespace ResumeProfileResumeProfileCreateRequestBaseBody {
    /**
     * Точка входа (default - по умолчанию; vacancy_response - отклик на вакансию; onboarding_short - онбординг; onboarding_area_creds - онбординг с кредами; возможны другие варианты)
     */
    export enum entry_point {
        DEFAULT = 'default',
        VACANCY_RESPONSE = 'vacancy_response',
        ONBOARDING_SHORT = 'onboarding_short',
        ONBOARDING_AREA_CREDS = 'onboarding_area_creds',
    }
}

