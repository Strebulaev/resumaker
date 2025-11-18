/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
import type { Id } from './Id';
import type { ResumeNullableFields } from './ResumeNullableFields';
import type { ResumeObjectsContact } from './ResumeObjectsContact';
import type { ResumeObjectsEducation } from './ResumeObjectsEducation';
import type { ResumeObjectsExperienceCreateEditResume } from './ResumeObjectsExperienceCreateEditResume';
import type { ResumeObjectsLanguage } from './ResumeObjectsLanguage';
/**
 * Тело запроса при создании резюме
 */
export type ResumeAddResumeRequest = (ResumeNullableFields & {
    /**
     * Город проживания. Элемент справочника [areas](#tag/Obshie-spravochniki/operation/get-areas)
     */
    area?: Id;
    /**
     * Список гражданств соискателя. Элементы [справочника регионов](#tag/Obshie-spravochniki/operation/get-areas)
     */
    citizenship?: Array<_IncludesId>;
    /**
     * Список контактов соискателя.
     *
     * При заполнении контактов в резюме необходимо учитывать следующие условия:
     *
     * * В резюме обязательно должен быть указан e-mail. Он может быть только один.
     * * В резюме должен быть указан хотя бы один телефон, причём можно указывать только один телефон каждого типа.
     * * Комментарий можно указывать только для телефонов, для e-mail комментарий не сохранится.
     * * Обязательно указать либо телефон полностью в поле `formatted`, либо все три части телефона по отдельности в трёх полях: `country`, `city` и `number`. Если указано и то, и то, используются данные из трёх полей. В поле `formatted` допустимо использовать пробелы, скобки и дефисы. В остальных полях допустимы только цифры
     *
     */
    contact?: Array<ResumeObjectsContact>;
    /**
     * Образование соискателя.
     *
     * Особенности сохранения образования:
     *
     * * Если передать и высшее и среднее образование и уровень образования "средний", то сохранится только среднее образование.
     * * Если передать и высшее и среднее образование и уровень образования "высшее", то сохранится только высшее образование
     *
     */
    education?: ResumeObjectsEducation;
    /**
     * Опыт работы
     */
    experience?: Array<ResumeObjectsExperienceCreateEditResume>;
    /**
     * Пол. Элемент справочника [gender](#tag/Obshie-spravochniki/operation/get-dictionaries)
     */
    gender?: Id;
    /**
     * Список языков, которыми владеет соискатель. Элементы справочника [languages](#tag/Obshie-spravochniki/operation/get-languages)
     */
    language?: Array<ResumeObjectsLanguage>;
});

