/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonBadJsonDataError } from './ErrorsCommonBadJsonDataError';
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
/**
 * Информация о возникших ошибках
 */
export type ErrorsCommonBadJsonDataErrors = (ErrorsCommonErrorRequestId & {
    /**
     * @deprecated
     */
    bad_argument?: string;
    /**
     * @deprecated
     */
    bad_arguments?: Array<{
        description?: string;
        /**
         * Поле, в котором допущена ошибка
         */
        name?: string;
    }>;
    /**
     * Описание ошибки
     * @deprecated
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsCommonBadJsonDataError>;
});

