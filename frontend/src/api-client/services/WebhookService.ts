/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebhookService {
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
}
