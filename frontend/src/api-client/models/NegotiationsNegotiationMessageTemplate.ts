/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NegotiationsNegotiationMessageTemplate = {
    /**
     * Работодательский статус, соответствующий данному шаблону; может отсутствовать если шаблон не связан с каким-либо статусом
     */
    employer_state?: string;
    /**
     * Был ли изменен шаблон работодателем или же используется стандартный шаблон с текстом от Хэдхантер
     */
    template_modified: boolean;
    /**
     * Текст шаблона
     */
    text: string;
};

