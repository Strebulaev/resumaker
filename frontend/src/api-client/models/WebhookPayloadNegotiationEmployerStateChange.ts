/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Изменение этапа, на котором находится кандидат на вакансии. Содержит информацию о том кто, какое резюме с какого на какой
 * статус перевел
 *
 */
export type WebhookPayloadNegotiationEmployerStateChange = {
    /**
     * Идентификатор менеджера, совершившего перевод
     */
    employer_manager_id: string;
    /**
     * С какого статуса перевели
     */
    from_state: string;
    /**
     * Идентификатор резюме
     */
    resume_id: string;
    /**
     * На какой статус перевели
     */
    to_state: string;
    /**
     * Идентификатор топика
     */
    topic_id: string;
    /**
     * Время перевода на новый этап
     */
    transferred_at: string;
    /**
     * Идентификатор вакансии
     */
    vacancy_id: string;
};

