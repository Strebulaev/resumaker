/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesMetroStation } from './_IncludesMetroStation';
import type { GeocoderAddress } from './GeocoderAddress';
import type { VacancyDescriptionAddress } from './VacancyDescriptionAddress';
/**
 * Адрес
 */
export type VacancyAddressOutput = (GeocoderAddress & VacancyDescriptionAddress & {
    metro_stations?: Array<_IncludesMetroStation>;
}) | null;

