/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsVacancyProlongateError } from './ErrorsVacancyProlongateError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsVacancyProlongateErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsVacancyProlongateError>;
});

