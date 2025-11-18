/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsVacancyApplyBadRequestError } from './ErrorsVacancyApplyBadRequestError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsVacancyApplyBadRequestErrors = (ErrorsCommonErrorRequestId & {
    /**
     * @deprecated
     */
    bad_argument?: ErrorsVacancyApplyBadRequestErrors.bad_argument;
    /**
     * @deprecated
     */
    bad_arguments?: Array<{
        description?: string;
        /**
         * Поле, в котором допущена ошибка.
         * Возможные значения:
         * * `vacancy_id` - указан не валидный идентификатор
         * * `resume_id` - указан не валидный идентификатор
         *
         */
        name?: 'vacancy_id' | 'resume_id';
    }>;
    /**
     * Описание ошибки
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsVacancyApplyBadRequestError>;
});
export namespace ErrorsVacancyApplyBadRequestErrors {
    /**
     * @deprecated
     */
    export enum bad_argument {
        VACANCY_ID = 'vacancy_id',
        RESUME_ID = 'resume_id',
    }
}

