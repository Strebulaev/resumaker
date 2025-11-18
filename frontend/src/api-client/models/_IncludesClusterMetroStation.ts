/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesArea } from './_IncludesArea';
export type _IncludesClusterMetroStation = {
    area: (Record<string, any> & _IncludesArea);
    /**
     * Цвет линии в HEX-формате `RRGGBB` (от `000000` до `FFFFFF`)
     */
    hex_color: string;
    /**
     * Идентификатор станции метро
     */
    id: string;
    /**
     * Широта
     */
    lat: number;
    /**
     * Долгота
     */
    lng: number;
    /**
     * Порядковый номер станции в линии метро
     */
    order: number;
};

