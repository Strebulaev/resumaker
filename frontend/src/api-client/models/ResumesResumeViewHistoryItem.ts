/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesName } from './_IncludesName';
import type { EmployersEmployerItemShort } from './EmployersEmployerItemShort';
export type ResumesResumeViewHistoryItem = {
    /**
     * Дата создания записи (дата просмотра резюме работодателем)
     */
    created_at: string;
    /**
     * Информация о компании.
     *
     * Если резюме просмотрено анонимным работодателем, либо из откликов к анонимной вакансии, объект будет содержать только поле `name`
     *
     */
    employer: (EmployersEmployerItemShort | _IncludesName);
    /**
     * Отметка о просмотре записи
     */
    viewed: boolean;
};

