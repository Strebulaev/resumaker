/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MeAnyProfile } from './MeAnyProfile';
import type { MeApplicantProfile } from './MeApplicantProfile';
import type { MeEmployerProfile } from './MeEmployerProfile';
import type { MeManagerProfile } from './MeManagerProfile';
/**
 * Информация о текущем авторизованном пользователе
 */
export type MeProfile = (MeAnyProfile | MeApplicantProfile | MeManagerProfile | MeEmployerProfile);

