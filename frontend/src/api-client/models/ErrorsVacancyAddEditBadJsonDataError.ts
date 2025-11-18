/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsVacancyAddEditBadJsonDataError = {
    /**
     * Описание ошибки
     */
    description?: string | null;
    /**
     * Путь до параметра, в котором возникла ошибка.
     *
     * Для указания параметра используется формат JsonPointer [RFC 6901](https://tools.ietf.org/html/rfc6901)
     *
     */
    pointer?: string;
    /**
     * Причина ошибки. Возможные значения:
     * * `required` - отстутствует поле в запросе
     * * `invalid` - недопустимое значение в поле запроса
     * * `is_empty` — пустое значение
     * * `wrong_size` — значение имеет неправильный размер
     * * `is_too_short` — значение имеет слишком маленький размер
     * * `is_too_long` — значение имеет слишком большой размер
     * * `currency_code_is_invalid` — валюта заработной платы введена некорректно
     * * `chosen_area_is_not_a_leaf_or_not_exist` — местоположение вакансии введено неверно (например, передан несуществующий ID) или не является конечным регионом (город, населенный пункт)
     * * `email_in_description` — в описании вакансии содержится email
     * * `fly_in_fly_out_pay_for_performance` — это вакансия с оплатой за контакты в откликах — для них доступен только вахтовый метод
     * * `fly_in_fly_out_incompatible_employment_form` — длительность вахты указывается только для вахтового метода
     * * `anonymous_vacancy_contains_address` — в анонимной вакансии содержится адрес работодателя
     * * `anonymous_vacancy_has_real_company_name` — в названии вакансии содержится название компании работодателя
     * * `only_for_anonymous_type` — действие доступно только для анонимных вакансий
     * * `address_is_disabled` — адрес недоступен
     * * `vacancy_type_employer_billing_type_mismatch` — тип вакансии не совместим с текущим биллинг-типом
     * * `only_for_direct_type` — действие доступно только для прямых вакансий
     * * `address_is_empty_with_checked_show_metro_flag` — введен пустой адрес, но указана опция показывать метро
     * * `address_has_no_metro_but_checked_show_metro_flag` — по введенному адресу не доступно метро, но указана опция показывать метро
     * * `default_vacancy_branded_template_is_invalid_or_not_enough_purchased_services` — в запросе указан шаблон, который отсутствует в списке доступных шаблонов (этот список можно получить [запросом](#tag/Informaciya-o-rabotodatele/operation/get-vacancy-branded-templates-list)). Также шаблон может отсутствовать в списке доступных шаблонов, если не оплачена услуга использования [брендированного шаблона вакансии](https://hh.ru/price/branding)
     * * `department_code_prohibited_in_anonymous_vacancy` — нельзя указать код подразделения для анонимной вакансии
     * * `branded_template_prohibited_in_anonymous_vacancy` — использование брендированного шаблона невозможно для анонимной вакансии
     * * `value_conflict_with_business_rules` — публикация вакансии с указанным `billing_type` запрещена
     * * `can_not_accept_kids` — вакансия недоступна несовершеннолетним
     * * `can_not_edit_vacancy_after_moderation` — нельзя изменить название вакансии после модерации
     * * `employment_form_uncompatible_with_internship` — тип занятости несовместим для типа занятости вахта и стажировка
     * * `employment_form_uncompatible_with_work_format` — тип занятости несовместима с указанным форматом работы
     * * `properties_existence` — переданные properties не существуют
     *
     */
    reason?: ErrorsVacancyAddEditBadJsonDataError.reason;
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsVacancyAddEditBadJsonDataError.type;
    /**
     * Название поля с ошибкой
     */
    value?: string;
};
export namespace ErrorsVacancyAddEditBadJsonDataError {
    /**
     * Причина ошибки. Возможные значения:
     * * `required` - отстутствует поле в запросе
     * * `invalid` - недопустимое значение в поле запроса
     * * `is_empty` — пустое значение
     * * `wrong_size` — значение имеет неправильный размер
     * * `is_too_short` — значение имеет слишком маленький размер
     * * `is_too_long` — значение имеет слишком большой размер
     * * `currency_code_is_invalid` — валюта заработной платы введена некорректно
     * * `chosen_area_is_not_a_leaf_or_not_exist` — местоположение вакансии введено неверно (например, передан несуществующий ID) или не является конечным регионом (город, населенный пункт)
     * * `email_in_description` — в описании вакансии содержится email
     * * `fly_in_fly_out_pay_for_performance` — это вакансия с оплатой за контакты в откликах — для них доступен только вахтовый метод
     * * `fly_in_fly_out_incompatible_employment_form` — длительность вахты указывается только для вахтового метода
     * * `anonymous_vacancy_contains_address` — в анонимной вакансии содержится адрес работодателя
     * * `anonymous_vacancy_has_real_company_name` — в названии вакансии содержится название компании работодателя
     * * `only_for_anonymous_type` — действие доступно только для анонимных вакансий
     * * `address_is_disabled` — адрес недоступен
     * * `vacancy_type_employer_billing_type_mismatch` — тип вакансии не совместим с текущим биллинг-типом
     * * `only_for_direct_type` — действие доступно только для прямых вакансий
     * * `address_is_empty_with_checked_show_metro_flag` — введен пустой адрес, но указана опция показывать метро
     * * `address_has_no_metro_but_checked_show_metro_flag` — по введенному адресу не доступно метро, но указана опция показывать метро
     * * `default_vacancy_branded_template_is_invalid_or_not_enough_purchased_services` — в запросе указан шаблон, который отсутствует в списке доступных шаблонов (этот список можно получить [запросом](#tag/Informaciya-o-rabotodatele/operation/get-vacancy-branded-templates-list)). Также шаблон может отсутствовать в списке доступных шаблонов, если не оплачена услуга использования [брендированного шаблона вакансии](https://hh.ru/price/branding)
     * * `department_code_prohibited_in_anonymous_vacancy` — нельзя указать код подразделения для анонимной вакансии
     * * `branded_template_prohibited_in_anonymous_vacancy` — использование брендированного шаблона невозможно для анонимной вакансии
     * * `value_conflict_with_business_rules` — публикация вакансии с указанным `billing_type` запрещена
     * * `can_not_accept_kids` — вакансия недоступна несовершеннолетним
     * * `can_not_edit_vacancy_after_moderation` — нельзя изменить название вакансии после модерации
     * * `employment_form_uncompatible_with_internship` — тип занятости несовместим для типа занятости вахта и стажировка
     * * `employment_form_uncompatible_with_work_format` — тип занятости несовместима с указанным форматом работы
     * * `properties_existence` — переданные properties не существуют
     *
     */
    export enum reason {
        REQUIRED = 'required',
        INVALID = 'invalid',
        IS_EMPTY = 'is_empty',
        WRONG_SIZE = 'wrong_size',
        IS_TOO_SHORT = 'is_too_short',
        IS_TOO_LONG = 'is_too_long',
        CURRENCY_CODE_IS_INVALID = 'currency_code_is_invalid',
        CHOSEN_AREA_IS_NOT_A_LEAF_OR_NOT_EXIST = 'chosen_area_is_not_a_leaf_or_not_exist',
        EMAIL_IN_DESCRIPTION = 'email_in_description',
        FLY_IN_FLY_OUT_PAY_FOR_PERFORMANCE = 'fly_in_fly_out_pay_for_performance',
        FLY_IN_FLY_OUT_INCOMPATIBLE_EMPLOYMENT_FORM = 'fly_in_fly_out_incompatible_employment_form',
        ANONYMOUS_VACANCY_CONTAINS_ADDRESS = 'anonymous_vacancy_contains_address',
        ANONYMOUS_VACANCY_HAS_REAL_COMPANY_NAME = 'anonymous_vacancy_has_real_company_name',
        ONLY_FOR_ANONYMOUS_TYPE = 'only_for_anonymous_type',
        ADDRESS_IS_DISABLED = 'address_is_disabled',
        VACANCY_TYPE_EMPLOYER_BILLING_TYPE_MISMATCH = 'vacancy_type_employer_billing_type_mismatch',
        ONLY_FOR_DIRECT_TYPE = 'only_for_direct_type',
        ADDRESS_IS_EMPTY_WITH_CHECKED_SHOW_METRO_FLAG = 'address_is_empty_with_checked_show_metro_flag',
        ADDRESS_HAS_NO_METRO_BUT_CHECKED_SHOW_METRO_FLAG = 'address_has_no_metro_but_checked_show_metro_flag',
        DEFAULT_VACANCY_BRANDED_TEMPLATE_IS_INVALID_OR_NOT_ENOUGH_PURCHASED_SERVICES = 'default_vacancy_branded_template_is_invalid_or_not_enough_purchased_services',
        DEPARTMENT_CODE_PROHIBITED_IN_ANONYMOUS_VACANCY = 'department_code_prohibited_in_anonymous_vacancy',
        BRANDED_TEMPLATE_PROHIBITED_IN_ANONYMOUS_VACANCY = 'branded_template_prohibited_in_anonymous_vacancy',
        VALUE_CONFLICT_WITH_BUSINESS_RULES = 'value_conflict_with_business_rules',
        CAN_NOT_ACCEPT_KIDS = 'can_not_accept_kids',
        CAN_NOT_EDIT_VACANCY_AFTER_MODERATION = 'can_not_edit_vacancy_after_moderation',
        EMPLOYMENT_FORM_UNCOMPATIBLE_WITH_INTERNSHIP = 'employment_form_uncompatible_with_internship',
        EMPLOYMENT_FORM_UNCOMPATIBLE_WITH_WORK_FORMAT = 'employment_form_uncompatible_with_work_format',
        PROPERTIES_EXISTENCE = 'properties_existence',
    }
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        BAD_JSON_DATA = 'bad_json_data',
        VACANCIES = 'vacancies',
    }
}

