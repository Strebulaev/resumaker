/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
/**
 * Тип видимости резюме
 */
export type ResumeObjectsAccess = {
    /**
     * Определяет, кому будет доступно резюме в поиске и по прямой ссылке.
     *
     * Установить значение параметра можно при [создании](#tag/Rezyume.-Sozdanie-i-obnovlenie/operation/create-resume) или [редактировании](#tag/Rezyume.-Sozdanie-i-obnovlenie/operation/edit-resume) резюме. Возможные значения приведены в поле `resume_access_type` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries).
     *
     * С 1 сентября 2021 года тип видимости `everyone` стал недоступен для сохранения из-за законодательных ограничений.
     *
     * Чтобы управлять списком работодателей, которые могут просматривать резюме, воспользуйтесь группой методов [Резюме. Списки видимости](#tag/Rezyume.-Spiski-vidimosti)
     *
     */
    type: _IncludesIdName;
};

