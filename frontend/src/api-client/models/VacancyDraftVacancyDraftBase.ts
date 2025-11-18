/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { VacancyDraftAutoPublicationState } from './VacancyDraftAutoPublicationState';
import type { VacancyDraftPublications } from './VacancyDraftPublications';
import type { VacancyDraftScheduledAt } from './VacancyDraftScheduledAt';
export type VacancyDraftVacancyDraftBase = {
    /**
     * Состояние автопубликации. Объект при активной автопубликации, иначе null
     */
    auto_publication?: (VacancyDraftAutoPublicationState | _IncludesNullableObject) | null;
    /**
     * Процент заполнения черновика
     */
    completed_fields_percentage: number;
    /**
     * Идентификатор черновика
     */
    draft_id: string;
    /**
     * Массив объектов с информацией о том, каких публикаций не хватает на счету для публикации вакансии из данного черновика
     */
    insufficient_publications?: Array<VacancyDraftPublications> | null;
    /**
     * Массив объектов с информацией о том, какие квоты превышены
     */
    insufficient_quotas?: Array<VacancyDraftPublications> | null;
    /**
     * Время изменения черновика (в формате [ISO 8601](https://ru.wikipedia.org/wiki/ISO_8601) с точностью до секунды `YYYY-MM-DDThh:mm:ss±hhmm`)
     */
    last_change_time?: string | null;
    /**
     * Готовность черновика к публикации
     */
    publication_ready: boolean;
    /**
     * Массив объектов с информацией о необходимых публикациях на счету
     */
    required_publications?: Array<VacancyDraftPublications> | null;
    scheduled_at: (VacancyDraftScheduledAt | _IncludesNullableObject) | null;
};

