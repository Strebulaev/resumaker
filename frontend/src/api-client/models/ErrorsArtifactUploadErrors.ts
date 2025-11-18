/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsArtifactUploadError } from './ErrorsArtifactUploadError';
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
/**
 * Информация о возникших ошибках
 */
export type ErrorsArtifactUploadErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsArtifactUploadError>;
});

