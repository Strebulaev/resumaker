/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
import type { ErrorsResumeTooManyResumesError } from './ErrorsResumeTooManyResumesError';
/**
 * Информация о возникших ошибках
 */
export type ErrorsResumeTooManyResumesErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание ошибки
     * @deprecated
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsResumeTooManyResumesError>;
});

