/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Id } from '../models/Id';
import type { WebhookSubscriptionCreate } from '../models/WebhookSubscriptionCreate';
import type { WebhookSubscriptionsOutput } from '../models/WebhookSubscriptionsOutput';
import type { WebhookSubscriptionUpdate } from '../models/WebhookSubscriptionUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebhookApiService {
    /**
     * Изменить подписку на уведомления
     * Обновить можно как каждое поле по отдельности (в таком случае нужно отправить только обновляемое поле), так и несколько полей одновременно. Для обновления `actions` нужно передать полный список типов событий, по которым будут формироваться уведомления. Переданные типы событий не добавляются к типам событий, на которые пользователь уже подписан.
     * Пустой список `actions` передать нельзя
     *
     * @param subscriptionId Идентификатор подписки
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static changeWebhookSubscription(
        subscriptionId: string,
        hhUserAgent: string,
        requestBody: WebhookSubscriptionUpdate,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/webhook/subscriptions/{subscription_id}',
            path: {
                'subscription_id': subscriptionId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Ошибка параметров запроса`,
                403: `Запрос выполнен не с авторизацией работодателя`,
                404: `Подписка не найдена или недоступна текущему пользователю`,
            },
        });
    }
    /**
     * Удалить подписку на уведомление
     * @param subscriptionId Идентификатор подписки
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static cancelWebhookSubscription(
        subscriptionId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/webhook/subscriptions/{subscription_id}',
            path: {
                'subscription_id': subscriptionId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации`,
                404: `Подписка не найдена или недоступна текущему пользователю`,
            },
        });
    }
    /**
     * Подписаться на уведомления
     * В рамках одного приложения пользователь может получать уведомления только на 1 url:
     * нельзя подписаться разными действиями на разные урлы.
     * После наступления события будет отправлен POST-запрос на указанный URL c json телом (**см. раздел "Callbacks"**).
     *
     * В ответ на POST-запрос ожидается ответ с кодом `2хх Success`, если сообщение принято, или `409 Conflict`, если пришел дубликат.
     * Для определения дубликатов нужно использовать id из запроса - уникальный идентификатор для пары "пользователь + приложение" в рамках одного типа события в подписке.
     *
     * Дубликаты возможны, если:
     * * url, на который отправлялся колбэк, не ответил в течение 2 секунд;
     * * сервер не смог установить соединение с url, на который необходимо отправить колбэк;
     * * url ответил неожиданным кодом (отличным от `2xx Success` или `409 Conflict`)
     *
     * В этих случаях сервер планирует повторную отправку колбэка, с постепенно увеличивающимся промежутком между переотправками.
     *
     * Если в рамках одной подписки ожидаемые ответы не поступают долгое время,
     * на почту разработчика приложения будет отправлено уведомительное письмо, подписка попадает в очередь на блокировку, а отправки прекращаются.
     *
     * Если до блокировки приложения в рамках подписки url ответит ожидаемым кодом в установленный таймаут, подписка исключается из очереди на блокировку.
     *
     * При удалении приложения владельцем или отзыве пользователем доступа у приложения все подписки на уведомления удаляются.
     * После восстановления доступа необходимо оформить новую подписку.
     *
     * Вебхуки не являются средствами гарантированной доставки. Мы отправляем все сообщения, но не гарантируем, что адресат их получит
     *
     * Структура и содержимое колбэков описаны в разделе [callbacks](#callbacks)
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns Id Успешно создано
     * @throws ApiError
     */
    public static postWebhookSubscription(
        hhUserAgent: string,
        requestBody: WebhookSubscriptionCreate,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<Id> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/webhook/subscriptions',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Ошибка параметров запроса`,
                403: `Запрос <a name="callbacks"></a> не от работодателя
                `,
            },
        });
    }
    /**
     * Получить список уведомлений, на которые подписан пользователь
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns WebhookSubscriptionsOutput Успешный ответ
     * @throws ApiError
     */
    public static getWebhookSubscriptions(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<WebhookSubscriptionsOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/webhook/subscriptions',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Запрос выполнен не с авторизацией работодателя`,
            },
        });
    }
}
