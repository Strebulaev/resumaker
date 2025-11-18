/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ResumeObjectsCertificate = {
    /**
     * Дата получения (в формате `ГГГГ-ММ-ДД`)
     */
    achieved_at?: string;
    /**
     * На кого выдан сертификат. Возвращается только для сертификатов с `type = microsoft`
     */
    owner?: string | null;
    /**
     * Название сертификата
     */
    title?: string;
    /**
     * Тип сертификата. Доступные значения:
     *
     * * `custom`;
     * * `microsoft`
     *
     */
    type?: string;
    /**
     * Ссылка на страницу с описанием сертификата
     */
    url?: string | null;
};

