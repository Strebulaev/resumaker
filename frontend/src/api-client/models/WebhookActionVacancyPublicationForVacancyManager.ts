/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WebhookActionVacancyPublicationForVacancyManager = {
    /**
     * Публикация вакансии. Событие присылается только для менеджера-владельца вакансии при создании вакансии, отложенной публикации или публикации из черновика
     */
    type: WebhookActionVacancyPublicationForVacancyManager.type;
};
export namespace WebhookActionVacancyPublicationForVacancyManager {
    /**
     * Публикация вакансии. Событие присылается только для менеджера-владельца вакансии при создании вакансии, отложенной публикации или публикации из черновика
     */
    export enum type {
        VACANCY_PUBLICATION_FOR_VACANCY_MANAGER = 'VACANCY_PUBLICATION_FOR_VACANCY_MANAGER',
    }
}

