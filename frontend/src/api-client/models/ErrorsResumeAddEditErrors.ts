/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsResumeAddEditError } from './ErrorsResumeAddEditError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsResumeAddEditErrors = (ErrorsCommonErrorRequestId & {
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
    errors: Array<ErrorsResumeAddEditError>;
});

