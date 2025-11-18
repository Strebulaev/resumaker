/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesArea } from './_IncludesArea';
import type { MetroLineStation } from './MetroLineStation';
import type { MetroMetroLine } from './MetroMetroLine';
import type { ProfileFieldsDistrict } from './ProfileFieldsDistrict';
export type ProfileFieldsPreferredWorkArea = {
    /**
     * Город поиска работы, в том числе можно добавить город проживания
     */
    area: _IncludesArea;
    /**
     * Район города для поиска работы, район должен быть обязательно находится в выбранном городе для поиска работы
     *
     */
    districts?: Array<ProfileFieldsDistrict>;
    /**
     * Линии метро для поиска работы, линии метро должны находится в выбранном городе для поиска работы
     */
    lines?: Array<MetroMetroLine>;
    /**
     * Станции метро для поиска работы, станции метро должны находится в выбранном городе для поиска работы
     */
    stations?: Array<MetroLineStation>;
};

