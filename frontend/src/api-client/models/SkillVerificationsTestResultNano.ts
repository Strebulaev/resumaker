/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Краткая информация о результате теста
 */
export type SkillVerificationsTestResultNano = {
    /**
     * Дифференцированная оценка за тест:
     *
     * * `UNFAIR` — от 0 до 14 баллов;
     * * `FAIR` — от 15 до 44 баллов;
     * * `GOOD` — от 45 до 79 баллов;
     * * `EXCELLENT` — от 80 до 100 баллов
     *
     */
    mark?: SkillVerificationsTestResultNano.mark;
    /**
     * Результат прохождения теста в баллах (от 0 до 100)
     */
    score: number;
};
export namespace SkillVerificationsTestResultNano {
    /**
     * Дифференцированная оценка за тест:
     *
     * * `UNFAIR` — от 0 до 14 баллов;
     * * `FAIR` — от 15 до 44 баллов;
     * * `GOOD` — от 45 до 79 баллов;
     * * `EXCELLENT` — от 80 до 100 баллов
     *
     */
    export enum mark {
        UNFAIR = 'UNFAIR',
        FAIR = 'FAIR',
        GOOD = 'GOOD',
        EXCELLENT = 'EXCELLENT',
    }
}

