/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Платные услуги по резюме для работодателя
 *
 * Работодателю может быть предложен список платных услуг по резюме.
 *
 * Например, если полные данные по резюме недоступны, то будет выдано предложение покупки рекомендованной услуги, чтобы такой доступ получить
 *
 */
export type ResumeObjectsEmployerPaidServices = Array<{
    /**
     * Примечание к использованию услуги
     */
    description?: string;
    /**
     * Идентификатор услуги
     */
    id: string;
    /**
     * Название услуги
     */
    name: string;
    /**
     * Прайс на услугу
     */
    price_list: {
        /**
         * Ссылка на сайт, по которой доступен полный прайс на услугу
         */
        alternate_url: string;
    };
    /**
     * Описание быстрой покупки услуги, если доступно
     */
    quick_purchase?: {
        /**
         * Ссылка на сайт, по которой будет предложено купить услугу
         */
        alternate_url: string;
        /**
         * Валюта услуги
         */
        currency: {
            /**
             * Краткое обозначение
             */
            abbr: string;
            /**
             * Код
             */
            code: string;
            /**
             * Название
             */
            name: string;
        };
        /**
         * Название действия по заказу услуги
         */
        name: string;
        /**
         * Цена услуги
         */
        price: number;
    };
}>;
