/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Информация о персональном менеджере для работодателя
 */
export type MeEmployerProfilePersonalManager = {
    /**
     * Email персонального менеджера
     */
    email: string;
    /**
     * Имя персонального менеджера
     */
    first_name: string;
    /**
     * Идентификатор персонального менеджера
     */
    id: string;
    /**
     * Доступен ли менеджер в данный момент
     */
    is_available: boolean;
    /**
     * Фамилия персонального менеджера
     */
    last_name: string;
    /**
     * Объект с фотографиями менеджера
     */
    photo_urls?: {
        /**
         * URL большой фотографии менеджера
         */
        big?: string | null;
        /**
         * URL маленькой фотографии менеджера
         */
        small?: string | null;
    } | null;
    /**
     * Информация об отсутствии менеджера, либо `null`, если менеджер доступен
     */
    unavailable?: {
        /**
         * Время, до которого менеджер недоступен для контакта
         */
        until?: string;
    } | null;
};

