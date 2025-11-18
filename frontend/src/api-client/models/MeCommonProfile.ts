/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Содержит флаги, актуальные для любого типа авторизации: соискатель, работодатель, приложение
 *
 */
export type MeCommonProfile = {
    /**
     * Тип авторизации
     */
    auth_type: string | null;
    /**
     * Является ли текущий пользователь администратором сайта
     */
    is_admin: boolean;
    /**
     * Является ли текущий пользователь соискателем
     */
    is_applicant: boolean;
    /**
     * Является ли авторизованный клиент приложением
     */
    is_application: boolean;
    /**
     * Является ли текущий пользователь менеджером
     */
    is_employer: boolean;
    /**
     * Является ли текущий пользователь работодателем
     */
    is_employer_integration: boolean;
};

