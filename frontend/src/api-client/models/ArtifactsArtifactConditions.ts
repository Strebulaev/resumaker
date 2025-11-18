/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtifactsCounters } from './ArtifactsCounters';
import type { ArtifactsFields } from './ArtifactsFields';
export type ArtifactsArtifactConditions = {
    /**
     * Счетчик артефактов данного типа
     */
    counters: (ArtifactsCounters & Record<string, any>);
    /**
     * Условия для полей артефакта
     */
    fields: (ArtifactsFields & Record<string, any>);
};

