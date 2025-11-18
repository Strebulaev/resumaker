/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacanciesUpgradeFieldsPrice } from './VacanciesUpgradeFieldsPrice';
/**
 * Возможное действие
 */
export type VacanciesUpgradeFieldsAction = {
    /**
     * Идентификатор заказа, ожидающего активации. Возвращается только для действий с `actions.type=activate`
     */
    cart_id?: number | null;
    /**
     * Стоимость публикации. Возвращается только для действий с `actions.type=buy`
     */
    price?: (VacanciesUpgradeFieldsPrice | _IncludesNullableObject) | null;
    /**
     * Тип действия:
     *
     * * `direct_upgrade` — публикации вакансий данного типа есть на счету. Вы можете изменить тип вакансии.
     * * `activate` — публикации вакансий данного типа есть в неактивированных заказах. Перейдите по ссылке, указанной в поле `actions.url`, и активируйте заказ. После этого станет доступно улучшение вакансии.
     * * `buy` — нет доступных публикаций вакансий данного типа. Перейдите по ссылке, указанной в поле `actions.url`, чтобы перейти к покупке публикаций нужного типа
     *
     */
    type: string;
    /**
     * Ссылка на действие
     */
    url?: string | null;
};

