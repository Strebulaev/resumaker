/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from './_IncludesId';
export type VacancyArguments = {
    /**
     * Идентификатор аргумента. Возможные значения:
     *
     * * `resume_id` — идентификатор резюме.
     * * `vacancy_id` — идентификатор вакансии.
     * * `message` — сообщение, которое будет отправлено соискателю на электронную почту. Используйте [шаблоны](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-mail-templates) для получения текстов.
     * * `send_sms` — уведомлять ли соискателя о приглашении с помощью SMS. Значение по умолчанию — `false`. Обратите внимание: в SMS-сообщении используется стандартный текст, изменить его нельзя
     * * `address_id` — идентификатор [адреса](#tag/Adresa-rabotodatelya), который будет указан в приглашении
     *
     */
    id: VacancyArguments.id;
    /**
     * Обязательность аргумента
     */
    required: boolean;
    /**
     * Идентификаторы аргументов, которые необходимо приложить, если указан данный аргумент. Например, адрес является необязательным, но при его указании необходимо указать также и сообщение
     */
    required_arguments: Array<_IncludesId>;
};
export namespace VacancyArguments {
    /**
     * Идентификатор аргумента. Возможные значения:
     *
     * * `resume_id` — идентификатор резюме.
     * * `vacancy_id` — идентификатор вакансии.
     * * `message` — сообщение, которое будет отправлено соискателю на электронную почту. Используйте [шаблоны](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-mail-templates) для получения текстов.
     * * `send_sms` — уведомлять ли соискателя о приглашении с помощью SMS. Значение по умолчанию — `false`. Обратите внимание: в SMS-сообщении используется стандартный текст, изменить его нельзя
     * * `address_id` — идентификатор [адреса](#tag/Adresa-rabotodatelya), который будет указан в приглашении
     *
     */
    export enum id {
        RESUME_ID = 'resume_id',
        VACANCY_ID = 'vacancy_id',
        MESSAGE = 'message',
        SEND_SMS = 'send_sms',
        ADDRESS_ID = 'address_id',
    }
}

