/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ManagerAccount } from './ManagerAccount';
/**
 * Информация о рабочих аккаунтах менеджера
 */
export type ManagerAccounts = {
    /**
     * Идентификатор текущего рабочего аккаунта менеджера. Совпадает со значением переданного в заголовке `X-Manager-Account-Id`
     *
     */
    current_account_id: string;
    /**
     * Заблокирован ли главный рабочий аккаунт менеджера
     */
    is_primary_account_blocked: boolean;
    /**
     * Список рабочих аккаунтов менеджера
     */
    items: Array<ManagerAccount>;
    /**
     * Идентификатор главного рабочего аккаунта менеджера
     */
    primary_account_id: string;
};

