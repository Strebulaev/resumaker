/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CredsQuestions = {
    /**
     * Описание вопроса
     */
    description?: string | null;
    /**
     * Показан ли вопрос изначально, актуально для динамических вопросов
     */
    is_active?: boolean;
    /**
     * Возможные ответы на вопрос, гарантировано придут в поле answers
     */
    possible_answers?: Array<string>;
    /**
     * Идентификатор вопроса (совпадает с ключом объекта)
     */
    question_id?: string;
    /**
     * Текст вопроса отображаемый на форме
     */
    question_title?: string;
    /**
     * Возможность мульти выбора ответов на данный вопрос "single_choice" / "multi_select"
     */
    question_type?: string;
    /**
     * Обязателен ли вопрос для получения ответа
     */
    required?: boolean;
    /**
     * Пропускать ли текст вопроса на просмотре, если false - ответы внутри placeholder, если true - просто перечисляем без текста вопроса
     */
    skip_title_at_view?: boolean;
    /**
     * Текст вопроса на просмотре
     */
    view_title?: string | null;
};

