/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsVacancyApplyForbiddenError } from './ErrorsVacancyApplyForbiddenError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsVacancyApplyForbiddenErrors = (ErrorsCommonErrorRequestId & {
    /**
     * @deprecated
     */
    bad_argument?: ErrorsVacancyApplyForbiddenErrors.bad_argument;
    /**
     * @deprecated
     */
    bad_arguments?: Array<{
        description?: string;
        /**
         * Поле, в котором допущена ошибка.
         * Возможные значения:
         * * `vacancy_id` — указан невалидный идентификатор
         * * `resume_id` — указан невалидный идентификатор
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
    errors: Array<ErrorsVacancyApplyForbiddenError>;
});
export namespace ErrorsVacancyApplyForbiddenErrors {
    /**
     * @deprecated
     */
    export enum bad_argument {
        VACANCY_ID = 'vacancy_id',
        RESUME_ID = 'resume_id',
    }
}

