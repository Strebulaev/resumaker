/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResumeObjectsCounters } from './ResumeObjectsCounters';
/**
 * Информация о вакансиях, похожих на это резюме
 */
export type ResumeObjectsSimilarVacancies = {
    counters: ResumeObjectsCounters;
    /**
     * URL, по которому необходимо сделать GET-запрос, для получения [вакансий, похожих на данное резюме](#tag/Poisk-vakansij-dlya-soiskatelya/operation/get-vacancies-similar-to-resume)
     */
    url: string;
};

