/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
import type { _IncludesLanguageLevel } from './_IncludesLanguageLevel';
import type { ResumeNullableFields } from './ResumeNullableFields';
import type { ResumeObjectsContact } from './ResumeObjectsContact';
import type { ResumeObjectsExperience } from './ResumeObjectsExperience';
import type { ResumeObjectsOneOfEducation } from './ResumeObjectsOneOfEducation';
import type { ResumeObjectsOneOfId } from './ResumeObjectsOneOfId';
/**
 * Тело запроса при редактировании резюме
 */
export type ResumeEditResumeRequest = (ResumeNullableFields & {
    /**
     * Город проживания. Элемент справочника [areas](#tag/Obshie-spravochniki/operation/get-areas)
     */
    area?: ResumeObjectsOneOfId | null;
    /**
     * Список гражданств соискателя. Элементы [справочника регионов](#tag/Obshie-spravochniki/operation/get-areas)
     */
    citizenship?: Array<_IncludesId> | null;
    /**
     * Список контактов соискателя.
     *
     * При заполнении контактов в резюме необходимо учитывать следующие условия:
     *
     * * В резюме обязательно должен быть указан e-mail. Он может быть только один.
     * * В резюме должен быть указан хотя бы один телефон, причём можно указывать только один телефон каждого типа.
     * * Комментарий можно указывать только для телефонов, для e-mail комментарий не сохранится
     * * Обязательно указать либо телефон полностью в поле `formatted`, либо все три части телефона по отдельности в трёх полях: `country`, `city` и `number`. Если указано и то, и то, используются данные из трёх полей. В поле `formatted` допустимо использовать пробелы, скобки и дефисы. В остальных полях допустимы только цифры
     *
     */
    contact?: Array<ResumeObjectsContact> | null;
    /**
     * Образование соискателя.
     *
     * Особенности сохранения образования:
     *
     * * Если передать и высшее и среднее образование и уровень образования "средний", то сохранится только среднее образование.
     * * Если передать и высшее и среднее образование и уровень образования "высшее", то сохранится только высшее образование
     *
     */
    education?: ResumeObjectsOneOfEducation | null;
    /**
     * Опыт работы
     */
    experience?: Array<ResumeObjectsExperience> | null;
    /**
     * Пол. Элемент справочника [gender](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    gender?: ResumeObjectsOneOfId | null;
    /**
     * Список языков, которыми владеет соискатель. Элементы справочника [languages](#tag/Obshie-spravochniki/operation/get-languages)
     */
    language?: Array<_IncludesLanguageLevel> | null;
});

