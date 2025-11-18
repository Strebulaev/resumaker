/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResumeObjectsMetroLine } from './ResumeObjectsMetroLine';
/**
 * Ближайшая станция метро. Элемент справочника [metro](#tag/Obshie-spravochniki/operation/get-metro-stations)
 *
 */
export type ResumeObjectsMetroStation = {
    /**
     * Идентификатор станции метро
     */
    id: string;
    /**
     * Широта
     */
    lat: number;
    /**
     * Линия метро
     */
    line: ResumeObjectsMetroLine;
    /**
     * Долгота
     */
    lng: number;
    /**
     * Название станции метро
     */
    name?: string;
    /**
     * Порядковый номер станции в линии метро
     */
    order: number;
};

