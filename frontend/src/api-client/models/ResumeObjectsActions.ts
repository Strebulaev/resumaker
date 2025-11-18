/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResumeObjectsActionsForOwner } from './ResumeObjectsActionsForOwner';
import type { ResumeObjectsOneOfDownloadOrNullableObject } from './ResumeObjectsOneOfDownloadOrNullableObject';
import type { ResumeObjectsOneOfUrlOrNullableObject } from './ResumeObjectsOneOfUrlOrNullableObject';
export type ResumeObjectsActions = (ResumeObjectsActionsForOwner & {
    download_with_contact?: ResumeObjectsOneOfDownloadOrNullableObject;
    get_with_contact?: ResumeObjectsOneOfUrlOrNullableObject;
});

