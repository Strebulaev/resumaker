/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Id } from './Id';
import type { VacancyDraftDraftVacancyError } from './VacancyDraftDraftVacancyError';
export type VacancyDraftDraftResponseSchema = (Id & {
    /**
     * Поля, которые не были сохранены при создании черновика, вследствие не верного заполнения
     */
    ignored_fields?: Array<string>;
    /**
     * Заголовок черновика
     */
    name: string;
    /**
     * Готовность черновика к публикации
     */
    publication_ready: boolean;
    /**
     * Поля, которые были сохранены при создании черновика, с соответствующими ошибками, которые необходимо поправить для успешной публикации вакансии на основе черновика
     */
    validation_errors?: Array<VacancyDraftDraftVacancyError>;
});

