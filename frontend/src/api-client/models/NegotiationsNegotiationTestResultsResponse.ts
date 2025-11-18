/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SkillVerificationsTestResultTasks } from './SkillVerificationsTestResultTasks';
export type NegotiationsNegotiationTestResultsResponse = {
    /**
     * Пройденные тесты кандидата
     */
    test_result: {
        /**
         * Время, затраченное на выполнение теста, в секундах
         */
        duration: number;
        /**
         * Дифференцированная оценка за тест:
         * * `UNFAIR` — от 0 до 14 баллов;
         * * `FAIR` — от 15 до 44 баллов;
         * * `GOOD` — от 45 до 79 баллов;
         * * `EXCELLENT` — от 80 до 100 баллов
         *
         */
        mark: NegotiationsNegotiationTestResultsResponse.mark;
        /**
         * Наименование теста
         */
        name: string;
        /**
         * Результат прохождения теста в баллах (от 0 до 100)
         */
        score: number;
        tasks: Array<SkillVerificationsTestResultTasks>;
    };
};
export namespace NegotiationsNegotiationTestResultsResponse {
    /**
     * Дифференцированная оценка за тест:
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

