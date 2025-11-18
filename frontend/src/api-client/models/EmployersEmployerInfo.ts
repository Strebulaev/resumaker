/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesArea } from './_IncludesArea';
import type { _IncludesEmployerApplicantServices } from './_IncludesEmployerApplicantServices';
import type { _IncludesIdName } from './_IncludesIdName';
import type { _IncludesLogoUrls } from './_IncludesLogoUrls';
import type { _IncludesNullableObject } from './_IncludesNullableObject';
import type { EmployersBrandingEmployerBranding } from './EmployersBrandingEmployerBranding';
import type { EmployersInsiderInterviews } from './EmployersInsiderInterviews';
export type EmployersEmployerInfo = {
    /**
     * Флаг, показывающий, прошел ли работодатель [IT аккредитацию](https://feedback.hh.ru/knowledge-base/article/hh-что-означает-ярлык-«аккредитованная-ит-компания»)
     */
    accredited_it_employer?: boolean;
    /**
     * Ссылка на описание работодателя на сайте
     */
    alternate_url: string;
    applicant_services?: _IncludesEmployerApplicantServices;
    /**
     * Информация о регионе работодателя
     */
    area: (_IncludesArea & Record<string, any>);
    /**
     * Строка с кодом HTML (возможно наличие `<script/>` и `<style/>`), которая является альтернативой стандартному описанию работодателя. HTML адаптирован для мобильных устройств и корректно отображается без поддержки Javascript.
     *
     * При этом:
     *
     * - Контент тянется по ширине на 100% ширины контейнера и умещается без прокрутки в 300px.
     * - Контент рассчитан на то, что он будет вставлен в обвязку, в которую входит название, логотип, сайт и ссылка на вакансии работодателя.
     * - Изображения, которые могут встретиться в таком описании, адаптированы под retina-дисплеи.
     * - Размер шрифта не меньше 12px, размер межстрочного интервала не меньше 16px.
     *
     * Значение может быть `null`, если у работодателя отсутствует индивидуальное описание
     *
     * @deprecated
     */
    branded_description?: string | null;
    /**
     * Значение может быть `null`, если у работодателя отсутствует брендирование страницы
     */
    branding?: (_IncludesNullableObject | EmployersBrandingEmployerBranding) | null;
    /**
     * Описание работодателя в виде строки с кодом HTML (без `<script/>` и `<style/>`)
     */
    description?: string | null;
    /**
     * Идентификатор работодателя
     */
    id: string;
    /**
     * Список отраслей работодателя. Элементы [справочника индустрий](https://api.hh.ru/openapi/redoc#tag/Obshie-spravochniki/operation/get-industries)
     */
    industries: Array<_IncludesIdName>;
    /**
     * Список интервью
     */
    insider_interviews: Array<EmployersInsiderInterviews>;
    /**
     * Ссылки на изображения логотипов работодателя разных размеров. `original` — это необработанный логотип, который может быть большого размера. Если изначально загруженный компанией логотип меньше, чем 240px и/или 90px по меньшей стороне, то в соответствующих ключах будут ссылки на изображения оригинального размера. Объект может быть `null`, если компания не загрузила логотип. Клиент должен предусмотреть возможность отсутствия логотипа по указанной ссылке (ответ с кодом `404 Not Found`). Если информация о работодателе используется для описания вакансии, у которой есть брендированный логотип, все ссылки ведут на него. Логотипы 90 и 240 присутствуют не во всех компаниях
     */
    logo_urls?: (_IncludesLogoUrls | _IncludesNullableObject) | null;
    /**
     * Название работодателя
     */
    name: string;
    /**
     * Количество открытых вакансий у работодателя
     */
    open_vacancies?: number | null;
    /**
     * Если работодатель добавлен в черный список, то вернется `['blacklisted']`, иначе `[]`
     */
    relations: Array<'blacklisted' | null>;
    /**
     * Адрес сайта работодателя
     */
    site_url: string;
    /**
     * Флаг, показывающий, прошел ли работодатель [проверку на сайте](https://feedback.hh.ru/article/details/id/5951)
     */
    trusted: boolean;
    /**
     * Тип работодателя (прямой работодатель, кадровое агентство и т.п.). Возможные значения описаны в [справочнике](#tag/Obshie-spravochniki/operation/get-dictionaries) в поле `employer_type`. Возвращает `null`, если тип работодателя скрыт
     */
    type?: string | null;
    /**
     * URL для получения поисковой выдачи с вакансиями данного работодателя
     */
    vacancies_url: string;
};

