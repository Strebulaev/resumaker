/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CredsAnswers } from './CredsAnswers';
import type { CredsQuestions } from './CredsQuestions';
/**
 * Документы, подтверждающие наличие у соискателя опыта или квалификации для выполнения определенного вида деятельности.
 * Зависят от профессиональных ролей резюме
 *
 */
export type CredsCreds = {
    answers?: Record<string, CredsAnswers>;
    question_to_answer_map?: Record<string, Array<string>>;
    questions?: Record<string, CredsQuestions>;
};

