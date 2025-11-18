/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResumesAccessTypesItem } from './ResumesAccessTypesItem';
import type { ResumesAutoHideTimeOptions } from './ResumesAutoHideTimeOptions';
export type ResumesAccessTypes = {
    /**
     * Варианты времени автоскрытия резюме при неактивности пользователя. Возвращается только для пользователей rabota.by
     */
    auto_hide_time_options?: Array<ResumesAutoHideTimeOptions> | null;
    /**
     * Доступные типы видимости резюме
     */
    items: Array<ResumesAccessTypesItem>;
};

