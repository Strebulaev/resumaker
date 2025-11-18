/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClickmeStatisticsResponse } from '../models/ClickmeStatisticsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClickmeService {
    /**
     * Получение информации о статистике рекламных кампаний в Clickme
     * Получение информации о статистике рекламных кампаний в Clickme
     * @param dateFrom Дата, от которой нужно начать поиск. Значение указывается в формате [ISO 8601](#date-format) — `YYYY-MM-DD`
     *
     * @param dateTo Дата, до которой нужно искать включительно. Значение указывается в формате [ISO 8601](#date-format) — `YYYY-MM-DD`
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ClickmeStatisticsResponse Успешный ответ
     * @throws ApiError
     */
    public static getClickmeStatistics(
        dateFrom: string,
        dateTo: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ClickmeStatisticsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/clickme/statistics',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'date_from': dateFrom,
                'date_to': dateTo,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки в аргументах или в запросе`,
                403: `Недоступно для текущего пользователя`,
            },
        });
    }
}
