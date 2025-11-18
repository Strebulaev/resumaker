/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetroLineStation } from './MetroLineStation';
import type { MetroMetroLine } from './MetroMetroLine';
export type MetroMetroLineWithStations = (MetroMetroLine & {
    /**
     * Список станций метро на линии
     */
    stations: Array<MetroLineStation>;
});

