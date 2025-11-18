/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsVacancyAddEditBadJsonDataError } from './ErrorsVacancyAddEditBadJsonDataError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsVacancyAddEditBadJsonDataErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsVacancyAddEditBadJsonDataError>;
});

