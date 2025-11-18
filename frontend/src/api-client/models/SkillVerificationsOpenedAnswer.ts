/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SkillVerificationsOpenedAnswer = {
    /**
     * Дифференцированная оценка за ответ от работодателя:
     * * `UNFAIR` — 0 баллов;
     * * `FAIR` — 30 баллов;
     * * `GOOD` — 60 баллов;
     * * `EXCELLENT` — 100 баллов
     *
     */
    mark: SkillVerificationsOpenedAnswer.mark;
    /**
     * Ответ на вопрос
     */
    value: string;
};
export namespace SkillVerificationsOpenedAnswer {
    /**
     * Дифференцированная оценка за ответ от работодателя:
     * * `UNFAIR` — 0 баллов;
     * * `FAIR` — 30 баллов;
     * * `GOOD` — 60 баллов;
     * * `EXCELLENT` — 100 баллов
     *
     */
    export enum mark {
        UNFAIR = 'UNFAIR',
        FAIR = 'FAIR',
        GOOD = 'GOOD',
        EXCELLENT = 'EXCELLENT',
    }
}

