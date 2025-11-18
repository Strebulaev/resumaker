/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Информация о пользователе, как о менеджере компании
 */
export type MeEmployerProfileManager = {
    /**
     * Обладает ли текущий менеджер правами администратора
     */
    has_admin_rights: boolean;
    /**
     * Существует ли у пользователя несколько [рабочих аккаунтов](#tag/Menedzhery-rabotodatelya/operation/get-manager-accounts)
     */
    has_multiple_manager_accounts: boolean;
    /**
     * Идентификатор менеджера
     */
    id: string;
    /**
     * Является ли текущий менеджер главным контактным лицом компании
     */
    is_main_contact_person: boolean;
    /**
     * URL, на который нужно сделать GET запрос, чтобы получить [предпочтения менеджера](#tag/Menedzhery-rabotodatelya/operation/get-manager-settings)
     */
    manager_settings_url: string;
};

