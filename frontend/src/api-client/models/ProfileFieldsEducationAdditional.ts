/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProfileFieldsEducationResumes } from './ProfileFieldsEducationResumes';
export type ProfileFieldsEducationAdditional = {
    /**
     * Идентификатор
     */
    id?: string | null;
    /**
     * Название курса / теста
     */
    name: string;
    /**
     * Организация, проводившая курс / тест
     */
    organization?: string;
    /**
     * Специальность / специализация
     */
    result?: string | null;
    resumes: ProfileFieldsEducationResumes;
    /**
     * Год окончания / сдачи
     */
    year: number;
};

