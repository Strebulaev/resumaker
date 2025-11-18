/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * В зависимости от состояния инструмента оценки, конкретные действия над ним могут быть доступны либо нет
 *
 */
export type NegotiationsAction = {
    /**
     * Ссылка на сайт, переход по которой инициирует действие
     */
    alternate_url?: string;
    /**
     * Пояснение, почему действие недоступно
     */
    disable_reason?: string;
    /**
     * Доступно ли действие
     */
    enabled: boolean;
    /**
     * Тип действия
     */
    id: string;
    /**
     * Описание действия
     */
    name: string;
};

