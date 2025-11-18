/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNameDescription } from './_IncludesNameDescription';
import type { ErrorsCommonConflictBothChangedError } from './ErrorsCommonConflictBothChangedError';
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
/**
 * Информация о возникших ошибках
 */
export type ErrorsCommonConflictBothChangedErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Имя аргумента, с которым связана ошибка
     */
    bad_argument?: ErrorsCommonConflictBothChangedErrors.bad_argument;
    /**
     * Список аргументов, с которыми связаны ошибки
     */
    bad_arguments?: Array<_IncludesNameDescription>;
    /**
     * Описание причины ошибки
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsCommonConflictBothChangedError>;
});
export namespace ErrorsCommonConflictBothChangedErrors {
    /**
     * Имя аргумента, с которым связана ошибка
     */
    export enum bad_argument {
        NAME = 'name',
        SUBSCRIPTION = 'subscription',
    }
}

