/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ArtifactsState = {
    /**
     * Идентификатор текущего статуса изображения:
     *
     * - `processing` — в процессе обработки;
     * - `failed` — ошибка, скорее всего неподдерживаемый формат;
     * - `ok` — обработан, доступен для использования в резюме
     *
     */
    id: ArtifactsState.id;
    /**
     * Название текущего статуса изображения
     */
    name: string;
};
export namespace ArtifactsState {
    /**
     * Идентификатор текущего статуса изображения:
     *
     * - `processing` — в процессе обработки;
     * - `failed` — ошибка, скорее всего неподдерживаемый формат;
     * - `ok` — обработан, доступен для использования в резюме
     *
     */
    export enum id {
        PROCESSING = 'processing',
        FAILED = 'failed',
        OK = 'ok',
    }
}

