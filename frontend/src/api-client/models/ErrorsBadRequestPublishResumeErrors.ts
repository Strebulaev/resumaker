/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsBadRequestPublishResumeError } from './ErrorsBadRequestPublishResumeError';
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
/**
 * Информация о возникших ошибках
 */
export type ErrorsBadRequestPublishResumeErrors = (ErrorsCommonErrorRequestId & {
    /**
     * Описание причины ошибки. Возможные причины:
     *
     * * Не заполнены обязательные поля.
     *
     * Чтобы понять, какие именно поля не заполнены, воспользуйтесь методом [просмотр резюме](#tag/Rezyume.-Prosmotr-informacii/operation/get-resume). Обязательные поля перечислены в поле `progress.mandatory`).
     *
     * * Не отредактированы поля после блокировки модератором.
     * * Резюме находится на проверке у модератора
     *
     */
    description?: string;
    /**
     * Массив с данными ошибок
     */
    errors: Array<ErrorsBadRequestPublishResumeError>;
});

