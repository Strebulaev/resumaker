/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsResumeAddEditError = {
    /**
     * Описание ошибки для пользователя
     */
    description: string;
    /**
     * Путь до параметра, в котором возникла ошибка.
     *
     * Для указания параметра используется формат JsonPointer [RFC 6901](https://tools.ietf.org/html/rfc6901)
     *
     */
    pointer: string;
    /**
     * Причина ошибки. Возможные значения:
     *
     * * `required` — поле является обязательным для заполнения.
     * * `not_found` — не найдено значение по переданному ID.
     * * `faculty_without_university` — нельзя установить факультет без университета.
     * * `not_in_dictionary` — не найдено значение по переданному ID в справочнике.
     * * `not_a_leaf` — значение не должно содержать потомков.
     * * `end_date_before_start_date` — значение `end` меньше `start`.
     * * `not_country` — значение `area` должно быть страной (см. [справочник стран](#tag/Obshie-spravochniki/operation/get-countries)).
     * * `more_than_one_native_language` — указано более одного родного языка.
     * * `must_contain_unique` — переданные значения должны быть уникальны.
     * * `from_different_profareas` — переданы значения из разных отраслей.
     * * `duplicate` — значение уже было использовано.
     * * `bad_image_type` — передано значение изображения неправильного типа (для `portfolio` необходимы значения из [GET /artifacts/portfolio](#tag/Rabota-s-artefaktami/operation/get-artifacts-portfolio), для photo — [GET /artifacts/photo](#tag/Rabota-s-artefaktami/operation/get-artifact-photos)) .
     * * `processing` — объект в процессе обработки.
     * * `preferred_must_be_unique` — предпочитаемый тип связи должен быть уникальным.
     * * `preferred_contact_not_specified` — предпочитаемый тип связи не указан или не указано значение контакта.
     * * `need_country_city_number_or_formatted` — телефон в контактах указан в неверном формате (см. [условия заполнения контактов в резюме](#tag/Rezyume.-Usloviya-zapolneniya-polej/operation/get-new-resume-conditions)).
     * * `invalid` — ошибка в значении поля (поля должны соответствовать [условиям заполнения](#tag/Rezyume.-Usloviya-zapolneniya-polej/operation/get-resume-conditions)).
     * * `greater_than_max` — значение больше максимума .
     * * `less_than_min` — значение меньше минимума.
     * * `earlier_than_min` — указанная дата раньше минимально возможной.
     * * `later_than_max` — указанная дата позже максимально возможной.
     * * `length_less_than_min` — количество символов в поле меньше минимума.
     * * `length_greater_than_max` — количество символов в поле больше максимума.
     * * `size_less_than_min` — количество элементов меньше минимума.
     * * `size_greater_than_max` — количество элементов больше максимума.
     * * `send_metro_without_area` — не передано значение поля `area` при заполненном метро.
     * * `not_belong_this_city` — указанного метро нет в указанном городе.
     * * `required_with_not_started_career` — необходимо отправлять опыт работы, если специализация не начало карьеры.
     * * `not_match_regexp` — значение не соответствует регулярному выражению.
     * * `more_than_one` — передано более одного email.
     * * `not_available` — недопустимое значение
     *
     */
    reason: string;
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsResumeAddEditError.type;
    /**
     * Название поля с ошибкой
     */
    value: string;
};
export namespace ErrorsResumeAddEditError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        BAD_JSON_DATA = 'bad_json_data',
    }
}

