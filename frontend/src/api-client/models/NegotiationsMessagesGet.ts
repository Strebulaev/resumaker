/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NegotiationsAssessment } from './NegotiationsAssessment';
import type { NegotiationsMessage } from './NegotiationsMessage';
import type { VacancyAddressRawOutput } from './VacancyAddressRawOutput';
/**
 * Сообщение в отклике
 */
export type NegotiationsMessagesGet = (NegotiationsMessage & {
    address?: VacancyAddressRawOutput;
    /**
     * Инструменты оценки, привязанные к сообщению
     */
    assessments?: Array<NegotiationsAssessment>;
});

