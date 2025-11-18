/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsVacancyFavoritedBadAuthError } from './ErrorsVacancyFavoritedBadAuthError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsVacancyFavoritedBadAuthErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsVacancyFavoritedBadAuthError>;
});

