/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ErrorsCommonCaptchaError = {
    /**
     * Адрес веб-страницы, на которой можно пройти капчу.
     * После прохождения капчи аналогичный запрос в API должен выполниться успешно.
     * Приложение должно добавить в captcha_url обязательный параметр backurl,на который произойдет редирект
     * после прохождения капчи.
     * Backurl должен обязательно содержать схему, например, https:// или схему приложения
     *
     */
    captcha_url?: string;
    /**
     * Адрес веб-страницы, на котором можно капчу. Аналогично параметру captcha_url
     */
    fallback_url?: string;
    /**
     * Текстовый идентификатор типа ошибки
     */
    type: ErrorsCommonCaptchaError.type;
    /**
     * Необходимо пройти капчу - `captcha_required`
     *
     */
    value: ErrorsCommonCaptchaError.value;
};
export namespace ErrorsCommonCaptchaError {
    /**
     * Текстовый идентификатор типа ошибки
     */
    export enum type {
        CAPTCHA_REQUIRED = 'captcha_required',
        EMPLOYER_REGISTRATION_CHANGE_EMAIL = 'employer_registration_change_email',
        EMPLOYER_RESUME_VIEW = 'employer_resume_view',
    }
    /**
     * Необходимо пройти капчу - `captcha_required`
     *
     */
    export enum value {
        CAPTCHA_REQUIRED = 'captcha_required',
    }
}

