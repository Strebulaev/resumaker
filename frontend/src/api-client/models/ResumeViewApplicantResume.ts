/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesUrl } from './_IncludesUrl';
import type { ResumeObjectsActionsForOwner } from './ResumeObjectsActionsForOwner';
import type { ResumeObjectsAutoHideTime } from './ResumeObjectsAutoHideTime';
import type { ResumeObjectsModerationNote } from './ResumeObjectsModerationNote';
import type { ResumeObjectsPhotoShort } from './ResumeObjectsPhotoShort';
import type { ResumeResume } from './ResumeResume';
/**
 * Информация о резюме для соискателя
 */
export type ResumeViewApplicantResume = (ResumeResume & _IncludesUrl & {
    /**
     * Документация [Видимость резюме](#tag/Prosmotr-rezyume/operation/get-resume) (атрибут 'access')
     *
     */
    access: {
        /**
         * Тип видимости
         */
        type: _IncludesIdName;
    };
    /**
     * Дополнительные действия
     */
    actions: ResumeObjectsActionsForOwner;
    /**
     * Время автоскрытия резюме при неактивности пользователя.
     *
     * Определяет период, по истечение которого резюме будет скрыто, если пользователь не совершал никаких действий
     * Возможные значения перечислены при запросе [типов видимости резюме](#tag/Rezyume.-Spiski-vidimosti/operation/get-resume-access-types)
     *
     * Поле доступно для просмотра и редактирования только для пользователей rabota.by
     *
     */
    auto_hide_time?: ResumeObjectsAutoHideTime;
    /**
     * Заблокировано ли резюме ([подробнее](#tag/Rezyume.-Prosmotr-informacii/Status-rezyume))
     */
    blocked?: boolean;
    /**
     * Можно ли опубликовать или обновить данное резюме
     */
    can_publish_or_update?: boolean;
    /**
     * Заполнено ли резюме
     */
    finished?: boolean;
    /**
     * Замечания модератора.
     *
     * В некоторых случаях замечания могут сопровождаться [блокировкой резюме](#tag/Rezyume.-Prosmotr-informacii/Status-rezyume).
     *
     * Полный список возможных замечаний доступен в поле `resume_moderation_note` [в справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     */
    moderation_note?: Array<ResumeObjectsModerationNote>;
    /**
     * Дата и время следующей возможной публикации/обновления
     */
    next_publish_at?: string | null;
    /**
     * Документация [Платные услуги по резюме для автора](#tag/Prosmotr-rezyume/operation/get-resume) (атрибут 'paid_services')
     *
     */
    paid_services: Array<{
        /**
         * Активна ли в данный момент услуга
         */
        active: boolean;
        /**
         * Время окончания действия услуги, если услуга активна
         */
        expires?: string;
        /**
         * Идентификатор услуги
         */
        id: string;
        /**
         * Название услуги
         */
        name: string;
    }>;
    photo?: ResumeObjectsPhotoShort;
    /**
     * URL для публикации или обновления резюме
     */
    publish_url?: string;
    /**
     * Раздел [Статус резюме](#tag/Rezyume.-Prosmotr-informacii/Status-rezyume)
     *
     */
    status?: _IncludesIdName;
});

