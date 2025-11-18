/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NegotiationsPhoneCallItem = {
    /**
     * Дата и время создания звонка
     */
    creation_time: string;
    /**
     * Длительность звонка в секундах
     */
    duration_seconds?: number | null;
    /**
     * Идентификатор звонка
     */
    id: number;
    /**
     * Дата и время обновления звонка
     */
    last_change_time?: string | null;
    /**
     * Статус звонка.
     *
     * Возможные значения перечислены в разделе `phone_call_status` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     */
    status: string;
};

