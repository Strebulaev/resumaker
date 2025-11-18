/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsVacancyBlacklistedBadRequestError } from './ErrorsVacancyBlacklistedBadRequestError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsVacancyBlacklistedBadRequestErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsVacancyBlacklistedBadRequestError>;
});

