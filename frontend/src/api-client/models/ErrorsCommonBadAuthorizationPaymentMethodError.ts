/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsCommonBadAuthorizationPaymentMethodError = {
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsCommonBadAuthorizationPaymentMethodError.type;
    /**
     * Описание ошибки.
     *
     * Причина ошибки в том, что вы запрашиваете один из [платных методов](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access) без купленного доступа
     *
     */
    value: ErrorsCommonBadAuthorizationPaymentMethodError.value;
};
export namespace ErrorsCommonBadAuthorizationPaymentMethodError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        API_ACCESS_PAYMENT = 'api_access_payment',
    }
    /**
     * Описание ошибки.
     *
     * Причина ошибки в том, что вы запрашиваете один из [платных методов](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access) без купленного доступа
     *
     */
    export enum value {
        ACTION_MUST_BE_PAYED = 'action_must_be_payed',
    }
}

