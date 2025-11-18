/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorsCommonErrorRequestId } from './ErrorsCommonErrorRequestId';
export type SuggestsErrors = (ErrorsCommonErrorRequestId & {
    /**
     * @deprecated
     */
    bad_argument?: SuggestsErrors.bad_argument;
    /**
     * @deprecated
     */
    bad_arguments?: Array<{
        description?: string;
        /**
         * Поле, в котором допущена ошибка.
         * Возможные значения:
         * * `locale` — указан неподдерживаемый язык
         * * `text` — искомый текст должен быть длиной от 2 до 30000 символов
         * * `area_id` - указан не валидный идентификатор
         *
         */
        name?: 'locale' | 'text' | 'area_id';
    }>;
    /**
     * @deprecated
     */
    description?: string;
    errors: Array<{
        type?: 'bad_argument';
        /**
         * Поле, в котором допущена ошибка.
         * Возможные значения:
         * * `locale` — указан неподдерживаемый язык
         * * `text` — искомый текст должен быть длиной от 2 до 30000 символов
         * * `area_id` - указан не валидный идентификатор
         *
         */
        value?: 'locale' | 'text' | 'area_id';
    }>;
});
export namespace SuggestsErrors {
    /**
     * @deprecated
     */
    export enum bad_argument {
        LOCALE = 'locale',
        TEXT = 'text',
        AREA_ID = 'area_id',
    }
}

