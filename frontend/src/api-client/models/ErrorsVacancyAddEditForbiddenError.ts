/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNumericId } from './_IncludesNumericId';
export type ErrorsVacancyAddEditForbiddenError = {
    /**
     * Описание ошибки
     *
     */
    description?: string | null;
    /**
     * Общее количество дубликатов вакансии. Возвращается только для `"value": "duplicate"`
     *
     */
    found?: number | null;
    /**
     * Ограниченное количество записей с информацией о дубликатах. Не гарантирует выдачу всех дубликатов. Возвращается только для `"value": "duplicate"`
     *
     */
    items?: Array<_IncludesNumericId> | null;
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsVacancyAddEditForbiddenError.type;
    /**
     * Ошибки при публикации и редактировании вакансии:
     * * `not_enough_purchased_services` — купленных услуг недостаточно для публикации или обновления данного типа вакансии
     * * `quota_exceeded` — квота менеджера на публикацию данного типа вакансии закончилась
     * * `duplicate` — аналогичная вакансия уже опубликована. В ответе передается информация по дубликатам вакансии. Данную ошибку можно форсировано отключить параметром `?ignore_duplicates=true`
     * * `replacement` — вакансия существенно изменена, есть риски блокировки. Чтобы проигнорировать риск блокировки, следует отправить повторный запрос с параметром `?ignore_replacement_warning=true`
     * * `creation_forbidden` — публикация вакансий недоступна текущему менеджеру
     * * `unavailable_for_archived` — редактирование недоступно для архивной вакансии
     * * `conflict_changes` — [конфликтные изменения](https://github.com/hhru/api/blob/master/docs/employer_vacancies.md#%D1%81%D0%BC%D0%B5%D0%BD%D0%B0-%D0%B1%D0%B8%D0%BB%D0%BB%D0%B8%D0%BD%D0%B3-%D1%82%D0%B8%D0%BF%D0%B0-%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80%D0%B0-%D0%B2%D0%B0%D0%BA%D0%B0%D0%BD%D1%81%D0%B8%D0%B8) данных вакансии
     *
     */
    value: ErrorsVacancyAddEditForbiddenError.value;
};
export namespace ErrorsVacancyAddEditForbiddenError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        VACANCIES = 'vacancies',
    }
    /**
     * Ошибки при публикации и редактировании вакансии:
     * * `not_enough_purchased_services` — купленных услуг недостаточно для публикации или обновления данного типа вакансии
     * * `quota_exceeded` — квота менеджера на публикацию данного типа вакансии закончилась
     * * `duplicate` — аналогичная вакансия уже опубликована. В ответе передается информация по дубликатам вакансии. Данную ошибку можно форсировано отключить параметром `?ignore_duplicates=true`
     * * `replacement` — вакансия существенно изменена, есть риски блокировки. Чтобы проигнорировать риск блокировки, следует отправить повторный запрос с параметром `?ignore_replacement_warning=true`
     * * `creation_forbidden` — публикация вакансий недоступна текущему менеджеру
     * * `unavailable_for_archived` — редактирование недоступно для архивной вакансии
     * * `conflict_changes` — [конфликтные изменения](https://github.com/hhru/api/blob/master/docs/employer_vacancies.md#%D1%81%D0%BC%D0%B5%D0%BD%D0%B0-%D0%B1%D0%B8%D0%BB%D0%BB%D0%B8%D0%BD%D0%B3-%D1%82%D0%B8%D0%BF%D0%B0-%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80%D0%B0-%D0%B2%D0%B0%D0%BA%D0%B0%D0%BD%D1%81%D0%B8%D0%B8) данных вакансии
     *
     */
    export enum value {
        NOT_ENOUGH_PURCHASED_SERVICES = 'not_enough_purchased_services',
        QUOTA_EXCEEDED = 'quota_exceeded',
        DUPLICATE = 'duplicate',
        REPLACEMENT = 'replacement',
        CREATION_FORBIDDEN = 'creation_forbidden',
        UNAVAILABLE_FOR_ARCHIVED = 'unavailable_for_archived',
        CONFLICT_CHANGES = 'conflict_changes',
    }
}

