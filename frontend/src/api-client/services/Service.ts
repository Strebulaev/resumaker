/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { _IncludesId } from '../models/_IncludesId';
import type { ApplicantCommentsApplicantCommentItem } from '../models/ApplicantCommentsApplicantCommentItem';
import type { ApplicantCommentsApplicantCommentsList } from '../models/ApplicantCommentsApplicantCommentsList';
import type { ArtifactsArtifactConditions } from '../models/ArtifactsArtifactConditions';
import type { ArtifactsArtifactItem } from '../models/ArtifactsArtifactItem';
import type { ArtifactsArtifactPhotoResponse } from '../models/ArtifactsArtifactPhotoResponse';
import type { ArtifactsArtifactPortfolioResponse } from '../models/ArtifactsArtifactPortfolioResponse';
import type { ArtifactsArtifactUploadBody } from '../models/ArtifactsArtifactUploadBody';
import type { ArtifactsPortfolioDescription } from '../models/ArtifactsPortfolioDescription';
import type { AuthClientCredentials } from '../models/AuthClientCredentials';
import type { AuthCode } from '../models/AuthCode';
import type { AuthRefreshToken } from '../models/AuthRefreshToken';
import type { AuthUserTokenAndAppToken } from '../models/AuthUserTokenAndAppToken';
import type { DictionariesAreaItem } from '../models/DictionariesAreaItem';
import type { DictionariesAreaResponse } from '../models/DictionariesAreaResponse';
import type { DictionariesCountriesResponse } from '../models/DictionariesCountriesResponse';
import type { DictionariesDictResponse } from '../models/DictionariesDictResponse';
import type { DictionariesDistrictsResponse } from '../models/DictionariesDistrictsResponse';
import type { DictionariesFacultiesResponse } from '../models/DictionariesFacultiesResponse';
import type { DictionariesIndustriesResponse } from '../models/DictionariesIndustriesResponse';
import type { DictionariesLangResponse } from '../models/DictionariesLangResponse';
import type { DictionariesSalaryStatisticsAreaResponse } from '../models/DictionariesSalaryStatisticsAreaResponse';
import type { DictionariesSalaryStatisticsEmployeeLevelResponse } from '../models/DictionariesSalaryStatisticsEmployeeLevelResponse';
import type { DictionariesSalaryStatisticsProfessionalAreasResponse } from '../models/DictionariesSalaryStatisticsProfessionalAreasResponse';
import type { DictionariesSkillsResponse } from '../models/DictionariesSkillsResponse';
import type { EmployerAddressesEmployerAddressesResponse } from '../models/EmployerAddressesEmployerAddressesResponse';
import type { EmployerAddressesEmployerAddressItemResponse } from '../models/EmployerAddressesEmployerAddressItemResponse';
import type { EmployerDictionariesTestsResponse } from '../models/EmployerDictionariesTestsResponse';
import type { EmployerManagersAddEmployerManager } from '../models/EmployerManagersAddEmployerManager';
import type { EmployerManagersEmployerManagerId } from '../models/EmployerManagersEmployerManagerId';
import type { EmployerManagersEmployerManagerInfo } from '../models/EmployerManagersEmployerManagerInfo';
import type { EmployerManagersEmployerManagerLimits } from '../models/EmployerManagersEmployerManagerLimits';
import type { EmployerManagersManagerData } from '../models/EmployerManagersManagerData';
import type { EmployerManagersResponse } from '../models/EmployerManagersResponse';
import type { EmployerManagerTypesResponse } from '../models/EmployerManagerTypesResponse';
import type { EmployersEmployerDepartmentsResponse } from '../models/EmployersEmployerDepartmentsResponse';
import type { EmployersEmployerInfo } from '../models/EmployersEmployerInfo';
import type { EmployersEmployersBlacklistedResponse } from '../models/EmployersEmployersBlacklistedResponse';
import type { EmployersEmployersList } from '../models/EmployersEmployersList';
import type { EmployersEmployerVacancyAreasResponse } from '../models/EmployersEmployerVacancyAreasResponse';
import type { EmployerServicesEmployerServices } from '../models/EmployerServicesEmployerServices';
import type { EmployerServicesMethodAccess } from '../models/EmployerServicesMethodAccess';
import type { EmployersVacancyBrandedTemplatesList } from '../models/EmployersVacancyBrandedTemplatesList';
import type { LocalesLocales } from '../models/LocalesLocales';
import type { LocalesResumeLocales } from '../models/LocalesResumeLocales';
import type { MailTemplatesMailTemplateInput } from '../models/MailTemplatesMailTemplateInput';
import type { MailTemplatesMailTemplates } from '../models/MailTemplatesMailTemplates';
import type { ManagerAccounts } from '../models/ManagerAccounts';
import type { ManagerSettings } from '../models/ManagerSettings';
import type { MeChangeName } from '../models/MeChangeName';
import type { MeProfile } from '../models/MeProfile';
import type { MeSetInSearch } from '../models/MeSetInSearch';
import type { MetroCityMetroItem } from '../models/MetroCityMetroItem';
import type { MetroMetroResponse } from '../models/MetroMetroResponse';
import type { NegotiationsCollectionNegotiationsResponse } from '../models/NegotiationsCollectionNegotiationsResponse';
import type { NegotiationsListResponse } from '../models/NegotiationsListResponse';
import type { NegotiationsMessageSent } from '../models/NegotiationsMessageSent';
import type { NegotiationsMessagesGetResponse } from '../models/NegotiationsMessagesGetResponse';
import type { NegotiationsNegotiationGetResponse } from '../models/NegotiationsNegotiationGetResponse';
import type { NegotiationsNegotiationMessageTemplates } from '../models/NegotiationsNegotiationMessageTemplates';
import type { NegotiationsNegotiationsStatisticsEmployerResponse } from '../models/NegotiationsNegotiationsStatisticsEmployerResponse';
import type { NegotiationsNegotiationsStatisticsManagerResponse } from '../models/NegotiationsNegotiationsStatisticsManagerResponse';
import type { NegotiationsNegotiationTestResultsResponse } from '../models/NegotiationsNegotiationTestResultsResponse';
import type { ProfessionalRolesCatalog } from '../models/ProfessionalRolesCatalog';
import type { ResumeAddResumeRequest } from '../models/ResumeAddResumeRequest';
import type { ResumeEditResumeRequest } from '../models/ResumeEditResumeRequest';
import type { ResumePhoneGenerateCodeGenerateCode } from '../models/ResumePhoneGenerateCodeGenerateCode';
import type { ResumeProfileResumeProfileCreateRequestBody } from '../models/ResumeProfileResumeProfileCreateRequestBody';
import type { ResumeProfileResumeProfileDictionariesResponse } from '../models/ResumeProfileResumeProfileDictionariesResponse';
import type { ResumeProfileResumeProfileResponse } from '../models/ResumeProfileResumeProfileResponse';
import type { ResumeProfileResumeProfileUpdateRequestBody } from '../models/ResumeProfileResumeProfileUpdateRequestBody';
import type { ResumeResumeViewResponse } from '../models/ResumeResumeViewResponse';
import type { ResumesAccessTypes } from '../models/ResumesAccessTypes';
import type { ResumesByStatusResponse } from '../models/ResumesByStatusResponse';
import type { ResumesCreationAvailability } from '../models/ResumesCreationAvailability';
import type { ResumesGetResumeVisibilityListResponse } from '../models/ResumesGetResumeVisibilityListResponse';
import type { ResumeShouldSendSmsContainer } from '../models/ResumeShouldSendSmsContainer';
import type { ResumesMineResponse } from '../models/ResumesMineResponse';
import type { ResumesPostResumeVisibilityListBody } from '../models/ResumesPostResumeVisibilityListBody';
import type { ResumesResumeConditions } from '../models/ResumesResumeConditions';
import type { ResumesResumeNegotiationsHistoryResponse } from '../models/ResumesResumeNegotiationsHistoryResponse';
import type { ResumesResumeViewHistoryResponse } from '../models/ResumesResumeViewHistoryResponse';
import type { ResumesResumeVisibilityListSearchResponse } from '../models/ResumesResumeVisibilityListSearchResponse';
import type { ResumesSearchForResumesResponse } from '../models/ResumesSearchForResumesResponse';
import type { ResumesSuitableResumesResponse } from '../models/ResumesSuitableResumesResponse';
import type { ResumeStatusReadiness } from '../models/ResumeStatusReadiness';
import type { SalaryStatisticsEvaluationResponse } from '../models/SalaryStatisticsEvaluationResponse';
import type { SavedSearchesSavedSearchItem } from '../models/SavedSearchesSavedSearchItem';
import type { SavedSearchesSavedSearchResponse } from '../models/SavedSearchesSavedSearchResponse';
import type { SuggestsAreas } from '../models/SuggestsAreas';
import type { SuggestsCompanies } from '../models/SuggestsCompanies';
import type { SuggestsEducationalInstitutions } from '../models/SuggestsEducationalInstitutions';
import type { SuggestsFieldsOfStudy } from '../models/SuggestsFieldsOfStudy';
import type { SuggestsPositions } from '../models/SuggestsPositions';
import type { SuggestsProfessionalRoles } from '../models/SuggestsProfessionalRoles';
import type { SuggestsSearchKeyword } from '../models/SuggestsSearchKeyword';
import type { SuggestsSkillSet } from '../models/SuggestsSkillSet';
import type { SuggestsVacancyPositions } from '../models/SuggestsVacancyPositions';
import type { VacanciesArchivedVacancyListResponse } from '../models/VacanciesArchivedVacancyListResponse';
import type { VacanciesAvailableVacancyTypeResponse } from '../models/VacanciesAvailableVacancyTypeResponse';
import type { VacanciesDeletedVacancyListResponse } from '../models/VacanciesDeletedVacancyListResponse';
import type { VacanciesPreferredNegotiationsOrder } from '../models/VacanciesPreferredNegotiationsOrder';
import type { VacanciesPreferredNegotiationsOrderRequest } from '../models/VacanciesPreferredNegotiationsOrderRequest';
import type { VacanciesVacanciesBlacklistedResponse } from '../models/VacanciesVacanciesBlacklistedResponse';
import type { VacanciesVacanciesFavoritedResponse } from '../models/VacanciesVacanciesFavoritedResponse';
import type { VacanciesVacanciesResponse } from '../models/VacanciesVacanciesResponse';
import type { VacanciesVacancy } from '../models/VacanciesVacancy';
import type { VacanciesVacancyApplicationBody } from '../models/VacanciesVacancyApplicationBody';
import type { VacanciesVacancyConditions } from '../models/VacanciesVacancyConditions';
import type { VacanciesVacancyListResponse } from '../models/VacanciesVacancyListResponse';
import type { VacanciesVacancyProlongate } from '../models/VacanciesVacancyProlongate';
import type { VacanciesVacancyStatsResponse } from '../models/VacanciesVacancyStatsResponse';
import type { VacanciesVacancyUpgradeListResponse } from '../models/VacanciesVacancyUpgradeListResponse';
import type { VacanciesVisitorsResponse } from '../models/VacanciesVisitorsResponse';
import type { VacancyCreate } from '../models/VacancyCreate';
import type { VacancyDraftDraftResponseSchema } from '../models/VacancyDraftDraftResponseSchema';
import type { VacancyDraftVacanciesDraftResponse } from '../models/VacancyDraftVacanciesDraftResponse';
import type { VacancyDraftVacancyDraftCreate } from '../models/VacancyDraftVacancyDraftCreate';
import type { VacancyDraftVacancyDraftEdit } from '../models/VacancyDraftVacancyDraftEdit';
import type { VacancyDraftVacancyDraftFull } from '../models/VacancyDraftVacancyDraftFull';
import type { VacancyDraftVacancyDraftItems } from '../models/VacancyDraftVacancyDraftItems';
import type { VacancyDuplicates } from '../models/VacancyDuplicates';
import type { VacancyEdit } from '../models/VacancyEdit';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
    /**
     * Подтвердить телефон кодом
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns any Успешный ответ, номер верифицирован
     * @throws ApiError
     */
    public static confirmPhoneInResume(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Телефон который надо подтвердить
             */
            phone: string;
            /**
             * Код для подтверждения
             */
            confirmation_code: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/resume_phone_confirm',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибки в аргументах`,
                403: `Ошибка авторизации`,
            },
        });
    }
    /**
     * Предпочтения менеджера
     * Возвращает информацию о предпочтениях менеджера.
     *
     * Проще всего получить URL из поля `manager_settings_url` объекта `manager`
     * в [информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info).
     *
     * Предпочтения менеджера *не влияют* на действия в API по умолчанию. Например, брендированный шаблон оформления
     * (`default_vacancy_branded_template`) не будет применен автоматически при публикации вакансии, если шаблон не был передан.
     * Приложение может использовать эту информацию для того, чтобы реализовать логику предзаполнения полей
     *
     * @param employerId Идентификатор работодателя, который можно узнать [в информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param managerId Идентификатор менеджера. Можно узнать из списка [менеджеров](#tag/Menedzhery-rabotodatelya/operation/get-employer-managers)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ManagerSettings Успешный ответ
     * @throws ApiError
     */
    public static getManagerSettings(
        employerId: string,
        managerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ManagerSettings> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/managers/{manager_id}/settings',
            path: {
                'employer_id': employerId,
                'manager_id': managerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является менеджером`,
                404: `Менеджер не существует, либо просмотр его настроек не доступен`,
            },
        });
    }
    /**
     * Дневной лимит просмотра резюме для текущего менеджера
     * Метод доступен менеджеру только для просмотра своего дневного лимита
     * @param employerId Идентификатор работодателя, который можно узнать в [информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param managerId Идентификатор менеджера, который можно узнать в [информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerManagersEmployerManagerLimits Успешный ответ
     * @throws ApiError
     */
    public static getEmployerManagerLimits(
        employerId: string,
        managerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerManagersEmployerManagerLimits> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/managers/{manager_id}/limits/resume',
            path: {
                'employer_id': employerId,
                'manager_id': managerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Неподходящая авторизация`,
                404: `Указанный работодатель или менеджер не существует или у текущего пользователя нет прав на просмотр информации`,
            },
        });
    }
    /**
     * Список адресов работодателя
     * Возвращает список адресов работодателя. Для компаний с большим количеством адресов, возможна ситуация, когда между созданием адреса и его чтением будет задержка. То есть, только что созданный адрес не будет содержаться в теле ответа
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param changedAfter Позволяет загрузить все адреса, изменённые после этой даты (добавление, удаление или изменение адреса). Изменения возвращаются без пагинации. Значение указывается в формате [ISO 8601](#date-format) - `YYYY-MM-DDThh:mm:ss` или c указанием отступа для часового пояса `YYYY-MM-DDThh:mm:ss±hhmm`. Максимальное значение отступа от текущей даты - 7 дней. При передаче этого параметра, для каждого адреса в теле ответа возвращается поле `deleted`, указывающее на то, удалён ли адрес. Также, в случае передачи этого параметра, игнорируются все остальные
     * @param managerId Идентификатор менеджера создавшего адрес
     * @param withManager Если true, ответ будет содержать информацию о менеджере создавшем адрес
     * @param perPage Количество элементов на странице выдачи. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). Значение по умолчанию и максимальное значение per_page составляет 10000
     *
     * @param page Порядковый номер страницы в выдаче. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). По умолчанию нумерация начинается с 0 страницы
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerAddressesEmployerAddressesResponse Успешный ответ, в поле `items` содержится список адресов компании
     * @throws ApiError
     */
    public static getEmployerAddresses(
        employerId: string,
        hhUserAgent: string,
        changedAfter?: string,
        managerId?: string,
        withManager?: boolean,
        perPage?: number,
        page?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerAddressesEmployerAddressesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/addresses',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'changed_after': changedAfter,
                'manager_id': managerId,
                'with_manager': withManager,
                'per_page': perPage,
                'page': page,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Текущий пользователь не имеет прав на просмотр адресов данного работодателя`,
                404: `Указанный работодатель не существует или у текущего пользователя нет прав на просмотр информации`,
            },
        });
    }
    /**
     * Список адресов работодателя
     * Возвращает список адресов работодателя. Для компаний с большим количеством адресов, возможна ситуация, когда между созданием адреса и его чтением будет задержка. То есть, только что созданный адрес не будет содержаться в теле ответа
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param changedAfter Позволяет загрузить все адреса, изменённые после этой даты (добавление, удаление или изменение адреса). Изменения возвращаются без пагинации. Значение указывается в формате [ISO 8601](#date-format) - `YYYY-MM-DDThh:mm:ss` или c указанием отступа для часового пояса `YYYY-MM-DDThh:mm:ss±hhmm`. Максимальное значение отступа от текущей даты - 7 дней. При передаче этого параметра, для каждого адреса в теле ответа возвращается поле `deleted`, указывающее на то, удалён ли адрес. Также, в случае передачи этого параметра, игнорируются все остальные
     * @param managerId Идентификатор менеджера создавшего адрес
     * @param withManager Если true, ответ будет содержать информацию о менеджере создавшем адрес
     * @param perPage Количество элементов на странице выдачи. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). Значение по умолчанию и максимальное значение per_page составляет 10000
     *
     * @param page Порядковый номер страницы в выдаче. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). По умолчанию нумерация начинается с 0 страницы
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerAddressesEmployerAddressesResponse Успешный ответ, в поле `items` содержится список адресов компании
     * @throws ApiError
     */
    public static getEmployerAddresses1(
        employerId: string,
        hhUserAgent: string,
        changedAfter?: string,
        managerId?: string,
        withManager?: boolean,
        perPage?: number,
        page?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerAddressesEmployerAddressesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/addresses',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'changed_after': changedAfter,
                'manager_id': managerId,
                'with_manager': withManager,
                'per_page': perPage,
                'page': page,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Текущий пользователь не имеет прав на просмотр адресов данного работодателя`,
                404: `Указанный работодатель не существует или у текущего пользователя нет прав на просмотр информации`,
            },
        });
    }
    /**
     * Список менеджеров работодателя
     * @param employerId Идентификатор работодателя, который можно узнать [в информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы
     * @param perPage Количество элементов
     * @param searchText Поисковая строка по имени менеджера
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerManagersResponse Успешный ответ
     * @throws ApiError
     */
    public static getEmployerManagers(
        employerId: string,
        hhUserAgent: string,
        page?: number,
        perPage: number = 200,
        searchText?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerManagersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/managers',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search_text': searchText,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не имеет прав на просмотр менеджеров данного работодателя`,
                404: `Указанный работодатель не существует или у текущего пользователя нет прав на просмотр информации`,
            },
        });
    }
    /**
     * Список менеджеров работодателя
     * @param employerId Идентификатор работодателя, который можно узнать [в информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы
     * @param perPage Количество элементов
     * @param searchText Поисковая строка по имени менеджера
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerManagersResponse Успешный ответ
     * @throws ApiError
     */
    public static getEmployerManagers1(
        employerId: string,
        hhUserAgent: string,
        page?: number,
        perPage: number = 200,
        searchText?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerManagersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/managers',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search_text': searchText,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не имеет прав на просмотр менеджеров данного работодателя`,
                404: `Указанный работодатель не существует или у текущего пользователя нет прав на просмотр информации`,
            },
        });
    }
    /**
     * Добавление менеджера
     * @param employerId Идентификатор работодателя. Чтобы получить его, используйте метод [Информация о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerManagersEmployerManagerId Менеджер добавлен
     * @throws ApiError
     */
    public static addEmployerManager(
        employerId: string,
        hhUserAgent: string,
        requestBody: EmployerManagersAddEmployerManager,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerManagersEmployerManagerId> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/employers/{employer_id}/managers',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Параметры во входном JSON переданы с ошибкой`,
                403: `Неподходящая авторизация или другие причины`,
                404: `Указанный работодатель не существует, или пользователь не имеет прав на создание менеджера`,
            },
        });
    }
    /**
     * Справочник типов и прав менеджера
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerManagerTypesResponse Успешный ответ
     * @throws ApiError
     */
    public static getEmployerManagerTypes(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerManagerTypesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/manager_types',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не имеет прав на просмотр типов менеджеров данного работодателя`,
                404: `Указанный работодатель не существует или у текущего пользователя нет прав на просмотр информации`,
            },
        });
    }
    /**
     * Справочник типов и прав менеджера
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerManagerTypesResponse Успешный ответ
     * @throws ApiError
     */
    public static getEmployerManagerTypes1(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerManagerTypesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/manager_types',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не имеет прав на просмотр типов менеджеров данного работодателя`,
                404: `Указанный работодатель не существует или у текущего пользователя нет прав на просмотр информации`,
            },
        });
    }
    /**
     * Рабочие аккаунты менеджера
     * Возвращает список рабочих аккаунтов менеджера и информацию об основном и текущем аккаунте.
     *
     * Для работы под определенным аккаунтом необходимо передать значение account_id, полученное из списка, в заголовке:
     *
     * `X-Manager-Account-Id: {account_id}`
     *
     * Использовать данный заголовок можно во всех методах, доступных для работодателей.
     *
     * В заголовке можно передавать account_id основного аккаунта, который также подразумевается по умолчанию, при отсутствии заголовка
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ManagerAccounts Успешный ответ
     * @throws ApiError
     */
    public static getManagerAccounts(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ManagerAccounts> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/manager_accounts/mine',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации`,
            },
        });
    }
    /**
     * Получить информацию о телефоне соискателя
     * @param phone Номер телефона в любом формате
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumeShouldSendSmsContainer Успешный ответ
     * @throws ApiError
     */
    public static getApplicantPhoneInfo(
        phone: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumeShouldSendSmsContainer> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resume_should_send_sms',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'phone': phone,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки в аргументах`,
                403: `Ошибка авторизации`,
            },
        });
    }
    /**
     * Получение адреса
     * @param employerId Идентификатор работодателя. Чтобы получить его, используйте метод [Информация о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param addressId Идентификатор адреса работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param withManager Если true, ответ будет содержать информацию о менеджере создавшем адрес
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerAddressesEmployerAddressItemResponse Успешный ответ
     * @throws ApiError
     */
    public static getAddress(
        employerId: string,
        addressId: string,
        hhUserAgent: string,
        withManager?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerAddressesEmployerAddressItemResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/addresses/{address_id}',
            path: {
                'employer_id': employerId,
                'address_id': addressId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'with_manager': withManager,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Неподходящая авторизация`,
                404: `Указанный работодатель или адрес не существует`,
            },
        });
    }
    /**
     * Получение адреса
     * @param employerId Идентификатор работодателя. Чтобы получить его, используйте метод [Информация о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param addressId Идентификатор адреса работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param withManager Если true, ответ будет содержать информацию о менеджере создавшем адрес
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerAddressesEmployerAddressItemResponse Успешный ответ
     * @throws ApiError
     */
    public static getAddress1(
        employerId: string,
        addressId: string,
        hhUserAgent: string,
        withManager?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerAddressesEmployerAddressItemResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/addresses/{address_id}',
            path: {
                'employer_id': employerId,
                'address_id': addressId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'with_manager': withManager,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Неподходящая авторизация`,
                404: `Указанный работодатель или адрес не существует`,
            },
        });
    }
    /**
     * Редактирование менеджера
     * @param employerId Идентификатор работодателя, который можно узнать [в информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param managerId Идентификатор менеджера. Можно узнать из списка [менеджеров](#tag/Menedzhery-rabotodatelya/operation/get-employer-managers)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns any Параметры менеджера отредактированы
     * @throws ApiError
     */
    public static editEmployerManager(
        employerId: string,
        managerId: string,
        hhUserAgent: string,
        requestBody: EmployerManagersManagerData,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/employers/{employer_id}/managers/{manager_id}',
            path: {
                'employer_id': employerId,
                'manager_id': managerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Параметры запроса переданы с ошибкой`,
                403: `Текущий пользователь не имеет прав на редактирование менеджера или иные причины`,
                404: `Указанный работодатель или менеджер не существует, или пользователь не имеет прав на редактирование менеджера`,
            },
        });
    }
    /**
     * Получение информации о менеджере
     * @param employerId Идентификатор работодателя, который можно узнать в [информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param managerId Идентификатор менеджера
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerManagersEmployerManagerInfo Успешный ответ
     * @throws ApiError
     */
    public static getEmployerManager(
        employerId: string,
        managerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerManagersEmployerManagerInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/managers/{manager_id}',
            path: {
                'employer_id': employerId,
                'manager_id': managerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации`,
                404: `Указанный работодатель или менеджер не существует или у текущего пользователя нет прав на просмотр информации`,
            },
        });
    }
    /**
     * Получение информации о менеджере
     * @param employerId Идентификатор работодателя, который можно узнать в [информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param managerId Идентификатор менеджера
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerManagersEmployerManagerInfo Успешный ответ
     * @throws ApiError
     */
    public static getEmployerManager1(
        employerId: string,
        managerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerManagersEmployerManagerInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/managers/{manager_id}',
            path: {
                'employer_id': employerId,
                'manager_id': managerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации`,
                404: `Указанный работодатель или менеджер не существует или у текущего пользователя нет прав на просмотр информации`,
            },
        });
    }
    /**
     * Удаление менеджера
     * Удаление менеджера занимает некоторое время. По этой причине, если сразу после успешного удаления менеджера вы запросите, например, список менеджеров, в ответе может вернуться удаленный менеджер
     * @param employerId Идентификатор работодателя, который можно узнать в [информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param managerId Идентификатор менеджера
     * @param successorId Идентификатор менеджера, которому передаются данные, связанные с удаляемым менеджером, в частности: вакансии, отклики, папки отобранных резюме, комментарии к соискателю, автопоиски и прочее
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteEmployerManager(
        employerId: string,
        managerId: string,
        successorId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/employers/{employer_id}/managers/{manager_id}',
            path: {
                'employer_id': employerId,
                'manager_id': managerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'successor_id': successorId,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Параметры запроса переданы с ошибкой`,
                403: `Неподходящая авторизация или иные причины отказа`,
                404: `Указанный работодатель или менеджер не существует, или пользователь не имеет прав на удаление данного менеджера`,
            },
        });
    }
    /**
     * Отправить код подтверждения для телефона резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns ResumePhoneGenerateCodeGenerateCode Успешно отправлено
     * @throws ApiError
     */
    public static sendCodeForVerifyPhoneInResume(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Телефон на который надо отправить подтверждающий код
             */
            phone: string;
        },
    ): CancelablePromise<ResumePhoneGenerateCodeGenerateCode> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/resume_phone_generate_code',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибки в аргументах`,
                403: `Ошибка авторизации`,
            },
        });
    }
    /**
     * Получение access-токена
     * @param formData В зависимости от способа получения токена `grant_type` необходимо передавать различные наборы параметров <a name="required_parameters"></a>
     *
     * @returns AuthUserTokenAndAppToken Успешный ответ
     * @throws ApiError
     */
    public static authorize(
        formData: (AuthCode | AuthRefreshToken | AuthClientCredentials),
    ): CancelablePromise<AuthUserTokenAndAppToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oauth/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка параметров запроса`,
                403: `Действие запрещено`,
            },
        });
    }
    /**
     * Получение access-токена
     * @param formData В зависимости от способа получения токена `grant_type` необходимо передавать различные наборы параметров <a name="required_parameters"></a>
     *
     * @returns AuthUserTokenAndAppToken Успешный ответ
     * @throws ApiError
     */
    public static authorize1(
        formData: (AuthCode | AuthRefreshToken | AuthClientCredentials),
    ): CancelablePromise<AuthUserTokenAndAppToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oauth/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка параметров запроса`,
                403: `Действие запрещено`,
            },
        });
    }
    /**
     * Получение access-токена
     * @param formData В зависимости от способа получения токена `grant_type` необходимо передавать различные наборы параметров <a name="required_parameters"></a>
     *
     * @returns AuthUserTokenAndAppToken Успешный ответ
     * @throws ApiError
     */
    public static authorize2(
        formData: (AuthCode | AuthRefreshToken | AuthClientCredentials),
    ): CancelablePromise<AuthUserTokenAndAppToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oauth/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка параметров запроса`,
                403: `Действие запрещено`,
            },
        });
    }
    /**
     * Инвалидация токена
     * Инвалидация работает только на действующем access-токене.
     * После инвалидации токен нельзя будет запросить с помощью refresh-токена - для работы необходимо будет заново авторизоваться в API
     * Таким образом нельзя инвалидировать токен приложения <a name="invalidate_token"></a>.
     * В случае компрометации токена необходимо инвалидировать скомпрометированный токен и запросить токен заново!
     *
     * @returns void
     * @throws ApiError
     */
    public static invalidateToken(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/oauth/token',
            errors: {
                403: `Запрос выполнен не с авторизацией пользователя`,
            },
        });
    }
    /**
     * Инвалидация токена
     * Инвалидация работает только на действующем access-токене.
     * После инвалидации токен нельзя будет запросить с помощью refresh-токена - для работы необходимо будет заново авторизоваться в API
     * Таким образом нельзя инвалидировать токен приложения <a name="invalidate_token"></a>.
     * В случае компрометации токена необходимо инвалидировать скомпрометированный токен и запросить токен заново!
     *
     * @returns void
     * @throws ApiError
     */
    public static invalidateToken1(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/oauth/token',
            errors: {
                403: `Запрос выполнен не с авторизацией пользователя`,
            },
        });
    }
    /**
     * Инвалидация токена
     * Инвалидация работает только на действующем access-токене.
     * После инвалидации токен нельзя будет запросить с помощью refresh-токена - для работы необходимо будет заново авторизоваться в API
     * Таким образом нельзя инвалидировать токен приложения <a name="invalidate_token"></a>.
     * В случае компрометации токена необходимо инвалидировать скомпрометированный токен и запросить токен заново!
     *
     * @returns void
     * @throws ApiError
     */
    public static invalidateToken2(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/oauth/token',
            errors: {
                403: `Запрос выполнен не с авторизацией пользователя`,
            },
        });
    }
    /**
     * Информация о текущем пользователе
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns MeProfile Успешный ответ
     * @throws ApiError
     */
    public static getCurrentUserInfo(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<MeProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации`,
            },
        });
    }
    /**
     * Информация о текущем пользователе
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns MeProfile Успешный ответ
     * @throws ApiError
     */
    public static getCurrentUserInfo1(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<MeProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации`,
            },
        });
    }
    /**
     * Информация о текущем пользователе
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns MeProfile Успешный ответ
     * @throws ApiError
     */
    public static getCurrentUserInfo2(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<MeProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации`,
            },
        });
    }
    /**
     * Информация о текущем пользователе
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns MeProfile Успешный ответ
     * @throws ApiError
     */
    public static getCurrentUserInfo3(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<MeProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации`,
            },
        });
    }
    /**
     * Информация о текущем пользователе
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns MeProfile Успешный ответ
     * @throws ApiError
     */
    public static getCurrentUserInfo4(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<MeProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации`,
            },
        });
    }
    /**
     * Редактирование информации авторизованного пользователя
     * Редактирование ФИО или изменение флага «ищу работу». Данные можно редактировать только группами
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns void
     * @throws ApiError
     */
    public static editCurrentUserInfo(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: (MeChangeName | MeSetInSearch),
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/me',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Переданы не все поля, или параметры относятся к разным группам`,
                403: `Ошибка авторизации. Пользователь не является соискателем`,
            },
        });
    }
    /**
     * Список доступных локалей для резюме
     * Возвращает справочник возможных локалей резюме. Подколлекция [справочника локалей](#tag/Obshie-spravochniki/operation/get-locales-for-resume).
     *
     * Изменив локаль, можно, например, создать резюме на английском языке
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns LocalesResumeLocales Успешный ответ
     * @throws ApiError
     */
    public static getLocalesForResume(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<LocalesResumeLocales> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locales/resume',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Список доступных локалей
     * Возвращает список возможных значений (доступных локалей) в поле `id`. Список локалей будет зависеть от указанного сайта (параметр `host`). В любом запросе к API можно указывать параметр `?locale=` для передачи значения локали (языка)
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns LocalesLocales Успешный ответ
     * @throws ApiError
     */
    public static getLocales(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<LocalesLocales> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locales',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Подсказки по должностям резюме
     * @param text Текст для поиска должности. Искомый текст должен быть длиной два или более символа и не более 3 000 символов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsPositions Успешный ответ
     * @throws ApiError
     */
    public static getPositionsSuggestions(
        text: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsPositions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suggests/positions',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки запроса`,
            },
        });
    }
    /**
     * Подсказки по названиям учебных заведений
     * Чтобы узнать список факультетов, обратитесь к [соответствующему методу](#tag/Obshie-spravochniki/operation/get-educational-institutions-dictionary)
     * @param text Текст для поиска учебного заведения. Искомый текст должен быть длиной два или более символа и не более 3 000 символов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsEducationalInstitutions Успешный ответ
     * @throws ApiError
     */
    public static getEducationalInstitutionsSuggests(
        text: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsEducationalInstitutions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suggests/educational_institutions',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки запроса`,
            },
        });
    }
    /**
     * Подсказки по регионам, являющимися листами в дереве регионов
     * Также доступна загрузка [полного дерева регионов](#tag/Obshie-spravochniki/operation/get-areas) и [части дерева от определенного элемента](#tag/Obshie-spravochniki/operation/get-areas-from-specified)
     * @param text Текст для поиска региона. Искомый текст должен быть длиной два или более символа и не более 3 000 символов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param areaId Идентификатор региона из [справочника](#tag/Obshie-spravochniki/operation/get-areas). Сужает подсказки поддеревом переданного идентификатора региона
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsAreas Успешный ответ
     * @throws ApiError
     */
    public static getAreaLeavesSuggests(
        text: string,
        hhUserAgent: string,
        areaId?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsAreas> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suggests/area_leaves',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'area_id': areaId,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки запроса`,
            },
        });
    }
    /**
     * Подсказки по ключевым навыкам
     * @param text Текст для поиска ключевых навыков. Искомый текст должен быть длиной два или более символа и не более 3 000 символов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsSkillSet Успешный ответ
     * @throws ApiError
     */
    public static getSkillSetSuggests(
        text: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsSkillSet> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suggests/skill_set',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки запроса`,
            },
        });
    }
    /**
     * Подсказки по должностям вакансий
     * @param text Текст для поиска должности в вакансии. Искомый текст должен быть длиной два или более символа и не более 3 000 символов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsVacancyPositions Успешный ответ
     * @throws ApiError
     */
    public static getVacancyPositionsSuggests(
        text: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsVacancyPositions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suggests/vacancy_positions',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки запроса`,
            },
        });
    }
    /**
     * Подсказки по профессиональным ролям
     * @param text Текст для поиска профессиональной роли. Искомый текст должен быть длиной два или более символа и не более 3 000 символов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsProfessionalRoles Успешный ответ
     * @throws ApiError
     */
    public static getProfessionalRolesSuggests(
        text: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsProfessionalRoles> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suggests/professional_roles',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки запроса`,
            },
        });
    }
    /**
     * Подсказки по ключевым словам поиска резюме
     * Предназначены для использования в поле `text` при [поиске резюме](#tag/Poisk-rezyume/operation/search-for-resumes). Содержит названия должностей, компаний и другие фразы, часто используемые при поиске резюме
     * @param text Текст для поиска ключевого слова. Искомый текст должен быть длиной два или более символа и не более 3 000 символов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsSearchKeyword Успешный ответ
     * @throws ApiError
     */
    public static getResumeSearchKeywordsSuggests(
        text: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsSearchKeyword> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suggests/resume_search_keyword',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки запроса`,
            },
        });
    }
    /**
     * Подсказки по регионам
     * Также доступна загрузка [полного дерева регионов](#tag/Obshie-spravochniki/operation/get-areas) и [части дерева от определенного элемента](#tag/Obshie-spravochniki/operation/get-areas-from-specified)
     * @param text Текст для поиска региона. Искомый текст должен быть длиной два или более символа и не более 3 000 символов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param areaId Идентификатор региона из [справочника](#tag/Obshie-spravochniki/operation/get-areas). Сужает подсказки поддеревом переданного идентификатора региона
     * @param includeParent Включать ли в ответ регион, переданный в параметре `area_id`, если он подходит по искомому тексту
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsAreas Успешный ответ
     * @throws ApiError
     */
    public static getAreasSuggests(
        text: string,
        hhUserAgent: string,
        areaId?: string,
        includeParent: boolean = false,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsAreas> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suggests/areas',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'area_id': areaId,
                'include_parent': includeParent,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки запроса`,
            },
        });
    }
    /**
     * Подсказки по ключевым словам поиска вакансий
     * Предназначены для использования в поле `text` при [поиске вакансий](#tag/Poisk-vakansij/operation/get-vacancies). Содержит названия должностей, компаний и другие фразы, часто используемые при поиске вакансий
     * @param text Текст для поиска ключевого слова. Искомый текст должен быть длиной два или более символа и не более 3 000 символов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsSearchKeyword Успешный ответ
     * @throws ApiError
     */
    public static getVacancySearchKeywords(
        text: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsSearchKeyword> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suggests/vacancy_search_keyword',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки запроса`,
            },
        });
    }
    /**
     * Подсказки по специализациям
     * @param text Текст для поиска специализаций. Искомый текст должен быть длиной два или более символа и не более 3 000 символов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsFieldsOfStudy Успешный ответ
     * @throws ApiError
     */
    public static getFieldsOfStudySuggestions(
        text: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsFieldsOfStudy> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suggests/fields_of_study',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки запроса`,
            },
        });
    }
    /**
     * Подсказки по зарегистрированным организациям
     * Данные из этой подсказки можно использовать, например, для выбора компании при заполнении опыта работы [в резюме](#tag/Rezyume.-Sozdanie-i-obnovlenie). Чтобы найти организации, которые могут публиковать вакансии, используйте [поиск](#tag/Rabotodatel/operation/search-employer)
     * @param text Текст для поиска организации. Искомый текст должен быть длиной два или более символа и не более 3 000 символов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsCompanies Успешный ответ
     * @throws ApiError
     */
    public static getRegisteredCompaniesSuggests(
        text: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsCompanies> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suggests/companies',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки запроса`,
            },
        });
    }
    /**
     * Получение схемы резюме-профиля соискателя для резюме
     * Возвращает схему резюме-профиля соискателя для построения визарда заполнения / дозаполнения / исправления резюме и профиля
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumeProfileResumeProfileResponse Успешный ответ
     * @throws ApiError
     */
    public static readResumeProfile(
        resumeId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumeProfileResumeProfileResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resume_profile/{resume_id}',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является coискателем`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
            },
        });
    }
    /**
     * Обновление резюме-профиля соискателя
     * Обновляет резюме-профиль и возвращает схему резюме-профиля соискателя для построения визарда заполнения / дозаполнения / исправления резюме и профиля
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumeProfileResumeProfileResponse Успешный ответ
     * @throws ApiError
     */
    public static updateResumeProfile(
        resumeId: string,
        hhUserAgent: string,
        requestBody: ResumeProfileResumeProfileUpdateRequestBody,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumeProfileResumeProfileResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/resume_profile/{resume_id}',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Ошибка в параметрах резюме, кредов или превышено допустимое количество резюме`,
                403: `Текущий пользователь не является coискателем`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
            },
        });
    }
    /**
     * Создание резюме-профиля соискателя
     * Создаёт резюме-профиль и возвращает схему резюме-профиля соискателя для построения визарда заполнения / дозаполнения / исправления резюме и профиля
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumeProfileResumeProfileResponse Успешный ответ
     * @throws ApiError
     */
    public static createResumeProfile(
        hhUserAgent: string,
        requestBody: ResumeProfileResumeProfileCreateRequestBody,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumeProfileResumeProfileResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/resume_profile',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Текущий пользователь не является coискателем`,
            },
        });
    }
    /**
     * Получение cловарей резюме-профиля
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumeProfileResumeProfileDictionariesResponse Успешный ответ
     * @throws ApiError
     */
    public static getResumeProfileDictionaries(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumeProfileResumeProfileDictionariesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resume_profile/dictionaries',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Информация по активным услугам API для платных методов
     * Каждая подключенная услуга отображается отдельным объектом в массиве `items`, даже при условии, что подключено несколько услуг одного типа.
     * Если у работодателя нет активных услуг, то в ответе придет пустой массив `items`
     *
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerServicesEmployerServices Успешный ответ
     * @throws ApiError
     */
    public static getPayableApiActions(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerServicesEmployerServices> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/services/payable_api_actions/active',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Указанный работодатель не существует или у текущего пользователя нет прав на просмотр информации`,
            },
        });
    }
    /**
     * Проверка доступа к платным методам
     * Начиная с 16 июля 2018 года, некоторые методы API HH для работодателей стали платными.
     *
     * Такие методы отмечены в [оглавлении GitHub](https://github.com/hhru/api/blob/master/README.md#content) лейблом <img src="https://tech.hh.ru/api/badges/emp_paid.png" alt="employer with paid access" />
     *
     * Чтобы приобрести доступ к платным методам, обратитесь к своему персональному менеджеру.
     *
     * > Если вы работаете от имени нескольких учетных записей работодателя, проверьте [информацию о подключенных услугах](#tag/Uslugi-rabotodatelya/operation/get-payable-api-actions) — каждой учетной записи должен быть предоставлен доступ к платным методам API. При отсутствии доступа будет выдана ошибка `403 Forbidden`.
     *
     * Метод возвращает информацию о доступе к группам платных методов. Существующие группы:
     *
     * 1. Наличие доступа к методам резюме:
     * * [Просмотр резюме](#tag/Prosmotr-rezyume/operation/get-resume).
     * * [Работа с откликами](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md).
     * * [Переписка с соискателем](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-messages).
     * 2. Наличие доступа к методам поиска вакансий:
     * * [Поиск резюме](#tag/Poisk-rezyume/operation/search-for-resumes).
     * * [Сохраненные поиски резюме](#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-searches).
     * 3. Наличие доступа к [просмотру резюме](#tag/Prosmotr-rezyume/operation/get-resume), у которого есть отклик или приглашение.
     * 4. Наличие доступа к [просмотру резюме](#tag/Prosmotr-rezyume/operation/get-resume), найденных через [поиск по базе](#tag/Poisk-rezyume/operation/search-for-resumes).
     *
     * **Внимание!** Изменился доступ к контактной информации резюме, подробнее [о новой модели работы с базой резюме](https://github.com/hhru/api/blob/master/docs/payable/resume.md)
     *
     * @param employerId Идентификатор работодателя. Можно узнать в [информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     *
     * @param managerId Идентификатор менеджера. Можно узнать в [информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerServicesMethodAccess Успешный ответ
     * @throws ApiError
     */
    public static getPayableApiMethodAccess(
        employerId: string,
        managerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerServicesMethodAccess> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/managers/{manager_id}/method_access',
            path: {
                'employer_id': employerId,
                'manager_id': managerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Указанный работодатель или менеджер не найден`,
            },
        });
    }
    /**
     * Список сохраненных поисков вакансий
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы (считается от 0, по умолчанию - 0)
     * @param perPage Количество элементов (по умолчанию - 10, максимальное значение - 10)
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SavedSearchesSavedSearchResponse Успешный ответ
     * @throws ApiError
     */
    public static getSavedVacancySearches(
        hhUserAgent: string,
        page?: number,
        perPage?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SavedSearchesSavedSearchResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/saved_searches/vacancies',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Создание нового сохраненного поиска вакансий
     * Некоторые параметры принимают множественные значения: `key=value&key=value`.
     *
     * При указании параметров пагинации (`page`, `per_page`) работает ограничение: глубина возвращаемых результатов не может быть больше 2000. Например, возможен запрос `per_page=10&page=199` (выдача с 1991 по 2000 вакансию), но запрос с `per_page=10&page=200` вернёт ошибку (выдача с 2001 до 2010 вакансию)
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы (считается от 0, по умолчанию - 0)
     * @param perPage Количество элементов (по умолчанию - 10, максимальное значение - 100)
     * @param text Переданное значение ищется в полях вакансии, указанных в параметре `search_field`. Доступен [язык запросов](https://hh.ru/article/1175). Специально для этого поля есть [автодополнение](#tag/Podskazki/operation/get-vacancy-search-keywords)
     * @param name Название нового автопоиска
     * @param searchField Область поиска. Справочник с возможными значениями: `vacancy_search_fields` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * По умолчанию, используются все поля. Можно указать несколько значений
     *
     * @param experience Опыт работы. Необходимо передавать `id` из справочника `experience` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param employment Тип занятости. Необходимо передавать `id` из справочника `employment` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param schedule График работы. Необходимо передавать `id` из справочника `schedule` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param area Регион. Необходимо передавать `id` из справочника [/areas](#tag/Obshie-spravochniki/operation/get-areas). Можно указать несколько значений
     *
     * @param metro Ветка или станция метро. Необходимо передавать `id` из справочника [/metro](#tag/Obshie-spravochniki/operation/get-metro-stations). Можно указать несколько значений
     *
     * @param professionalRole Профессиональная область. Необходимо передавать `id` из справочника [/professional_roles](#tag/Obshie-spravochniki/operation/get-professional-roles-dictionary)
     *
     * @param industry Индустрия компании, разместившей вакансию. Необходимо передавать `id` из справочника [/industries](#tag/Obshie-spravochniki/operation/get-industries). Можно указать несколько значений
     *
     * @param employerId Идентификатор [работодателя](#tag/Rabotodatel). Можно указать несколько значений
     *
     * @param currency Код валюты. Справочник с возможными значениями: `currency` (ключ `code`) в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Имеет смысл указывать только совместно с параметром `salary`
     *
     * @param salary Размер заработной платы. Если указано это поле, но не указано `currency`, то для `currency` используется значение RUR.
     *
     * При указании значения будут найдены вакансии, в которых вилка зарплаты близка к указанной в запросе. При этом значения пересчитываются по текущим курсам ЦБ РФ. Например, при указании `salary=100&currency=EUR` будут найдены вакансии, где вилка зарплаты указана в рублях и после пересчёта в Евро близка к 100 EUR.
     *
     * По умолчанию будут также найдены вакансии, в которых вилка зарплаты не указана, чтобы такие вакансии отфильтровать, используйте `only_with_salary=true`
     *
     * @param label Фильтр по меткам вакансий. Необходимо передавать `id` из справочника `vacancy_label` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param onlyWithSalary Показывать вакансии только с указанием зарплаты. По умолчанию `false`
     *
     * @param period Количество дней, в пределах которых производится поиск по вакансиям
     *
     * @param dateFrom Дата, которая ограничивает снизу диапазон дат публикации вакансий. Нельзя передавать вместе с параметром `period`.
     *
     * Значение указывается в формате `ISO 8601 - YYYY-MM-DD` или с точность до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Указанное значение будет округлено до ближайших пяти минут
     *
     * @param dateTo Дата, которая ограничивает сверху диапазон дат публикации вакансий. Нельзя передавать вместе с параметром `period`.
     *
     * Значение указывается в формате `ISO 8601 - YYYY-MM-DD` или с точность до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Указанное значение будет округлено до ближайших пяти минут
     *
     * @param topLat Верхняя граница широты.
     *
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     *
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param bottomLat Нижняя граница широты.
     *
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     *
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param leftLng Левая граница долготы.
     *
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     *
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param rightLng Правая граница долготы.
     *
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     *
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param orderBy Сортировка списка вакансий. Справочник с возможными значениями: `vacancy_search_order` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     *
     * Если выбрана сортировка по удалённости от гео-точки `distance`, необходимо также задать её координаты: `sort_point_lat`, `sort_point_lng`
     *
     * @param sortPointLat Значение географической широты точки, по расстоянию от которой будут отсортированы вакансии. Необходимо указывать только, если `order_by` установлено в `distance`
     *
     * @param sortPointLng Значение географической долготы точки, по расстоянию от которой будут отсортированы вакансии. Необходимо указывать только, если `order_by` установлено в `distance`
     *
     * @param clusters Возвращать ли [кластеры для данного поиска](#tag/Poisk-vakansij/Klastery-v-poiske-vakansij). По умолчанию — `false`
     *
     * @param describeArguments Возвращать ли описание использованных параметров поиска. Успешный ответ будет содержать поле [`arguments`]((#tag/Poisk-vakansij/operation/get-vacancies))).
     * По умолчанию — `false`
     *
     * @param noMagic Если значение `true` — автоматическое преобразование вакансий отключено. По умолчанию – false.
     *
     * При включённом автоматическом преобразовании, будет предпринята попытка изменить текстовый запрос пользователя на набор параметров. Например, запрос `text=москва бухгалтер 100500` будет преобразован в `text=бухгалтер&only_with_salary=true&area=1&salary=100500`
     *
     * @param premium Если значение `true` — в сортировке вакансий будет учтены премиум вакансии. Такая сортировка используется на сайте. По умолчанию — false
     *
     * @param responsesCountEnabled Если значение `true` — дополнительное поле `counters` с количеством откликов для вакансии включено. По-умолчанию — `false`
     *
     * @param partTime Вакансии для подработки. Возможные значения:
     *
     * * Все элементы из `working_days` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Все элементы из `working_time_intervals` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Все элементы из `working_time_modes` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Элементы `part` или `project` из `employment` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Элемент `accept_temporary`, показывает вакансии только с временным трудоустройством.
     *
     * Можно указать несколько значений
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns string Успешно создано
     * @throws ApiError
     */
    public static createSavedVacancySearch(
        hhUserAgent: string,
        page?: number,
        perPage?: number,
        text?: string,
        name?: string,
        searchField?: string,
        experience?: string,
        employment?: string,
        schedule?: string,
        area?: string,
        metro?: string,
        professionalRole?: string,
        industry?: string,
        employerId?: string,
        currency?: string,
        salary?: number,
        label?: string,
        onlyWithSalary?: boolean,
        period?: number,
        dateFrom?: string,
        dateTo?: string,
        topLat?: number,
        bottomLat?: number,
        leftLng?: number,
        rightLng?: number,
        orderBy?: string,
        sortPointLat?: number,
        sortPointLng?: number,
        clusters?: boolean,
        describeArguments?: boolean,
        noMagic?: boolean,
        premium?: boolean,
        responsesCountEnabled?: boolean,
        partTime?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/saved_searches/vacancies',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'text': text,
                'name': name,
                'search_field': searchField,
                'experience': experience,
                'employment': employment,
                'schedule': schedule,
                'area': area,
                'metro': metro,
                'professional_role': professionalRole,
                'industry': industry,
                'employer_id': employerId,
                'currency': currency,
                'salary': salary,
                'label': label,
                'only_with_salary': onlyWithSalary,
                'period': period,
                'date_from': dateFrom,
                'date_to': dateTo,
                'top_lat': topLat,
                'bottom_lat': bottomLat,
                'left_lng': leftLng,
                'right_lng': rightLng,
                'order_by': orderBy,
                'sort_point_lat': sortPointLat,
                'sort_point_lng': sortPointLng,
                'clusters': clusters,
                'describe_arguments': describeArguments,
                'no_magic': noMagic,
                'premium': premium,
                'responses_count_enabled': responsesCountEnabled,
                'part_time': partTime,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки в аргументах`,
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Посмотревшие вакансию
     * Возвращает список сокращенных резюме соискателей, просмотревших вакансию за последнюю неделю. Список отсортирован по убыванию по дате просмотра. Если у пользователя несколько резюме, то вернется резюме с наиболее поздней датой обновления.
     *
     * В списке `items` не отображаются резюме, которые соискатель удалил или скрыл от работодателя. Но они учитываются при пагинации (`per_page`) и при подсчете найденных резюме (`found`), а в поле `hidden_on_page` показано количество таких пропущенных резюме на странице
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы (считается от 0)
     * @param perPage Количество элементов
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVisitorsResponse Успешный ответ
     * @throws ApiError
     */
    public static getVacancyVisitors(
        vacancyId: string,
        hhUserAgent: string,
        page?: number,
        perPage: number = 20,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVisitorsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{vacancy_id}/visitors',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Параметры переданы с ошибкой`,
                403: `Ошибка авторизации`,
                404: `Вакансия не найдена или недоступна текущему пользователю`,
            },
        });
    }
    /**
     * Просмотр вакансии
     * Возвращает подробную информацию по указанной вакансии
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacancy Успешный ответ
     * @throws ApiError
     */
    public static getVacancy(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacancy> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{vacancy_id}',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Требуется ввести капчу`,
                404: `Указанная вакансия не существует или у пользователя нет прав на просмотр вакансии`,
                429: `Слишком много запросов`,
            },
        });
    }
    /**
     * Просмотр вакансии
     * Возвращает подробную информацию по указанной вакансии
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacancy Успешный ответ
     * @throws ApiError
     */
    public static getVacancy1(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacancy> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{vacancy_id}',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Требуется ввести капчу`,
                404: `Указанная вакансия не существует или у пользователя нет прав на просмотр вакансии`,
                429: `Слишком много запросов`,
            },
        });
    }
    /**
     * Редактирование вакансий
     * Изменяет поля вакансии, передаваемые в теле запроса.
     *
     * Составные поля (например, `salary_range`, `contacts`, `professional_roles`) можно редактировать только целиком, передавая полный объект. Например, для изменения валюты в зарплате, необходимо передавать также и значение зарплаты.
     *
     * Поля `billing_type` и `manager` необходимо передавать в отдельном запросе
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param ignoreDuplicates Игнорировать [появление дубликата](https://github.com/hhru/api/blob/master/docs/employer_vacancies.md#edit-ignore-duplicates), после редактирования вакансии. По умолчанию — `false`
     * @param ignoreReplacementWarning При значительном изменении вакансии ошибка будет проигнорирована, что может привести к риску блокировки. По умолчанию — `true`
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static editVacancy(
        vacancyId: string,
        hhUserAgent: string,
        requestBody: VacancyEdit,
        ignoreDuplicates?: boolean,
        ignoreReplacementWarning?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vacancies/{vacancy_id}',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'ignore_duplicates': ignoreDuplicates,
                'ignore_replacement_warning': ignoreReplacementWarning,
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Ошибка в теле запроса`,
                403: `Ошибка авторизации`,
                404: `Вакансия с переданным идентификатором не существует`,
            },
        });
    }
    /**
     * Редактирование вакансий
     * Изменяет поля вакансии, передаваемые в теле запроса.
     *
     * Составные поля (например, `salary_range`, `contacts`, `professional_roles`) можно редактировать только целиком, передавая полный объект. Например, для изменения валюты в зарплате, необходимо передавать также и значение зарплаты.
     *
     * Поля `billing_type` и `manager` необходимо передавать в отдельном запросе
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param ignoreDuplicates Игнорировать [появление дубликата](https://github.com/hhru/api/blob/master/docs/employer_vacancies.md#edit-ignore-duplicates), после редактирования вакансии. По умолчанию — `false`
     * @param ignoreReplacementWarning При значительном изменении вакансии ошибка будет проигнорирована, что может привести к риску блокировки. По умолчанию — `true`
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static editVacancy1(
        vacancyId: string,
        hhUserAgent: string,
        requestBody: VacancyEdit,
        ignoreDuplicates?: boolean,
        ignoreReplacementWarning?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vacancies/{vacancy_id}',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'ignore_duplicates': ignoreDuplicates,
                'ignore_replacement_warning': ignoreReplacementWarning,
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Ошибка в теле запроса`,
                403: `Ошибка авторизации`,
                404: `Вакансия с переданным идентификатором не существует`,
            },
        });
    }
    /**
     * Список скрытых вакансий
     * Возвращает [подмножество вакансий](#tag/Vakansii/operation/get-vacancy), скрытых пользователем, а также один дополнительный параметр
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacanciesBlacklistedResponse Успешный ответ
     * @throws ApiError
     */
    public static getBlacklistedVacancies(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacanciesBlacklistedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/blacklisted',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Публикация вакансии
     * Создает новую вакансию с полями, передаваемыми в теле запроса.
     *
     * В соответствии с [законом РФ № 1032-1 от 19.04.1991 в ред. от 02.07.2013 г.](https://hh.ru/article/13967) запрещено размещать информацию, ограничивающую права или устанавливающую преимущества для соискателей по полу, возрасту, семейному положению и другим обстоятельствам, не связанным с деловыми качествами работников.
     *
     * Примечания:
     *
     * * При успешной публикации будут списаны соответствующие услуги.
     * * Все вакансии проходят ручную модерацию.
     * * В течение нескольких минут после публикации вакансия станет доступна в поиске.
     *
     * Полезные ссылки:
     *
     * * [Правила размещения вакансий](https://hh.ru/article/341)
     * * [Как составить хорошее описание вакансии](https://hh.ru/article/16239)
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param ignoreDuplicates Форсирование добавления дубликатов
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns _IncludesId Успешный ответ
     * @throws ApiError
     */
    public static publishVacancy(
        hhUserAgent: string,
        requestBody: VacancyCreate,
        ignoreDuplicates?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<_IncludesId> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vacancies',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'ignore_duplicates': ignoreDuplicates,
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Ошибка авторизации`,
            },
        });
    }
    /**
     * Публикация вакансии
     * Создает новую вакансию с полями, передаваемыми в теле запроса.
     *
     * В соответствии с [законом РФ № 1032-1 от 19.04.1991 в ред. от 02.07.2013 г.](https://hh.ru/article/13967) запрещено размещать информацию, ограничивающую права или устанавливающую преимущества для соискателей по полу, возрасту, семейному положению и другим обстоятельствам, не связанным с деловыми качествами работников.
     *
     * Примечания:
     *
     * * При успешной публикации будут списаны соответствующие услуги.
     * * Все вакансии проходят ручную модерацию.
     * * В течение нескольких минут после публикации вакансия станет доступна в поиске.
     *
     * Полезные ссылки:
     *
     * * [Правила размещения вакансий](https://hh.ru/article/341)
     * * [Как составить хорошее описание вакансии](https://hh.ru/article/16239)
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param ignoreDuplicates Форсирование добавления дубликатов
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns _IncludesId Успешный ответ
     * @throws ApiError
     */
    public static publishVacancy1(
        hhUserAgent: string,
        requestBody: VacancyCreate,
        ignoreDuplicates?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<_IncludesId> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vacancies',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'ignore_duplicates': ignoreDuplicates,
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Ошибка авторизации`,
            },
        });
    }
    /**
     * Поиск по вакансиям
     * Возвращает список вакансий, размещенных в сервисе. Список вакансий фильтруется согласно переданным параметрам запроса.
     *
     * Особенности работы метода:
     *
     * * Неизвестные параметры и параметры с ошибкой в названии игнорируются.
     * * Если не передан токен авторизации, то после первого запроса будет предложено пройти капчу.
     * * Список вакансий зависит от типа авторизации пользователя. Например, для соискателей вакансии фильтруются по [списку скрытых вакансий](#tag/Skrytye-vakansii) и [списку скрытых компаний](#tag/Skrytye-rabotodateli).
     * * Список вакансий также зависит от [выбранного сайта](#section/Obshaya-informaciya/Vybor-sajta) (параметр `host`). Однако выбор регионального сайта, например hh.kz, не ограничивает список вакансиями данного региона. Чтобы ограничить список по региону, используйте параметр `area`.
     * * При указании параметров пагинации (`page`, `per_page`) работает ограничение: глубина возвращаемых результатов не может быть больше `2000`. Например, возможен запрос `per_page=10&page=199` (выдача с `1991` по `2000` вакансию), но запрос с `per_page=10&page=200` вернёт ошибку (выдача с `2001` по `2010` вакансию)
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы
     * @param perPage Количество элементов
     * @param text Переданное значение ищется в полях вакансии, указанных в параметре `search_field`. Доступен [язык запросов](https://hh.ru/article/1175). Специально для этого поля есть [автодополнение](#tag/Podskazki/operation/get-vacancy-search-keywords)
     * @param searchField Область поиска. Справочник с возможными значениями: `vacancy_search_fields` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * По умолчанию, используются все поля. Можно указать несколько значений
     *
     * @param experience Опыт работы. Необходимо передавать `id` из справочника `experience` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param employment Тип занятости. Необходимо передавать `id` из справочника `employment` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param schedule График работы. Необходимо передавать `id` из справочника `schedule` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param area Регион. Необходимо передавать `id` из справочника [/areas](#tag/Obshie-spravochniki/operation/get-areas). Можно указать несколько значений
     *
     * @param metro Ветка или станция метро. Необходимо передавать `id` из справочника [/metro](#tag/Obshie-spravochniki/operation/get-metro-stations). Можно указать несколько значений
     *
     * @param professionalRole Профессиональная область. Необходимо передавать `id` из справочника [/professional_roles](#tag/Obshie-spravochniki/operation/get-professional-roles-dictionary)
     *
     * @param industry Индустрия компании, разместившей вакансию. Необходимо передавать `id` из справочника [/industries](#tag/Obshie-spravochniki/operation/get-industries). Можно указать несколько значений
     *
     * @param employerId Идентификатор [работодателя](#tag/Rabotodatel). Можно указать несколько значений
     *
     * @param currency Код валюты. Справочник с возможными значениями: `currency` (ключ `code`) в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Имеет смысл указывать только совместно с параметром `salary`
     *
     * @param salary Размер заработной платы. Если указано это поле, но не указано `currency`, то для `currency` используется значение RUR.
     * При указании значения будут найдены вакансии, в которых вилка зарплаты близка к указанной в запросе. При этом значения пересчитываются по текущим курсам ЦБ РФ. Например, при указании `salary=100&currency=EUR` будут найдены вакансии, где вилка зарплаты указана в рублях и после пересчёта в Евро близка к 100 EUR.
     * По умолчанию будут также найдены вакансии, в которых вилка зарплаты не указана, чтобы такие вакансии отфильтровать, используйте `only_with_salary=true`
     *
     * @param label Фильтр по меткам вакансий. Необходимо передавать `id` из справочника `vacancy_label` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param onlyWithSalary Показывать вакансии только с указанием зарплаты
     *
     * @param period Количество дней, в пределах которых производится поиск по вакансиям
     *
     * @param dateFrom Дата, которая ограничивает снизу диапазон дат публикации вакансий. Нельзя передавать вместе с параметром `period`.
     * Значение указывается в формате ISO 8601 (`YYYY-MM-DD`) или с точностью до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Указанное значение будет округлено до ближайших пяти минут
     *
     * @param dateTo Дата, которая ограничивает сверху диапазон дат публикации вакансий. Нельзя передавать вместе с параметром `period`.
     * Значение указывается в формате ISO 8601 (`YYYY-MM-DD`) или с точностью до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Указанное значение будет округлено до ближайших пяти минут
     *
     * @param topLat Верхняя граница широты.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param bottomLat Нижняя граница широты.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param leftLng Левая граница долготы.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param rightLng Правая граница долготы.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param orderBy Сортировка списка вакансий. Справочник с возможными значениями: `vacancy_search_order` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * Если выбрана сортировка по удалённости от гео-точки `distance`, необходимо также задать её координаты: `sort_point_lat`, `sort_point_lng`
     *
     * @param sortPointLat Значение географической широты точки, по расстоянию от которой будут отсортированы вакансии. Необходимо указывать только, если `order_by` установлено в `distance`
     *
     * @param sortPointLng Значение географической долготы точки, по расстоянию от которой будут отсортированы вакансии. Необходимо указывать только, если `order_by` установлено в `distance`
     *
     * @param clusters Возвращать ли [кластеры для данного поиска](#tag/Poisk-vakansij/Klastery-v-poiske-vakansij)
     *
     * @param describeArguments Возвращать ли описание использованных параметров поиска (массив `arguments`)
     *
     * @param noMagic Если значение `true` — автоматическое преобразование вакансий отключено.
     * При включённом автоматическом преобразовании, будет предпринята попытка изменить текстовый запрос пользователя на набор параметров. Например, запрос `text=москва бухгалтер 100500` будет преобразован в `text=бухгалтер&only_with_salary=true&area=1&salary=100500`
     *
     * @param premium Если значение `true` — в сортировке вакансий будет учтены премиум-вакансии. Такая сортировка используется на сайте
     *
     * @param responsesCountEnabled Если значение `true` — дополнительное поле `counters` с количеством откликов для вакансии включено
     *
     * @param partTime Вакансии для подработки. Возможные значения:
     * * Все элементы из `working_days` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Все элементы из `working_time_intervals` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Все элементы из `working_time_modes` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Элементы `part` или `project` из `employment` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Элемент `accept_temporary`, показывает вакансии только с временным трудоустройством.
     * Можно указать несколько значений
     *
     * @param acceptTemporary Если значение `true` — то поиск происходит только по вакансиям временной работы
     *
     * @param employmentForm Тип занятости. Необходимо передавать `id` из справочника `employment_form` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param workScheduleByDays График работы. Необходимо передавать `id` из справочника `work_schedule_by_days` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param workingHours Рабочие часы в день. Необходимо передавать `id` из справочника `working_hours` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param workFormat Формат работы. Необходимо передавать `id` из справочника `work_format` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param excludedText Исключить слова. Из результата будут исключены вакансии, содержащие слова, переданные в этом параметре. Слова разделяются запятой
     *
     * @param education Образование. Можно указать несколько значений. Возможные значения:
     * * `not_required_or_not_specified` - не требуется или не указано
     * * `special_secondary` - среднее специальное
     * * `higher` - высшее
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacanciesResponse Успешный ответ
     * @throws ApiError
     */
    public static getVacancies(
        hhUserAgent: string,
        page?: number,
        perPage: number = 10,
        text?: string,
        searchField?: string,
        experience?: string,
        employment?: string,
        schedule?: string,
        area?: string,
        metro?: string,
        professionalRole?: string,
        industry?: string,
        employerId?: string,
        currency?: string,
        salary?: number,
        label?: string,
        onlyWithSalary: boolean = false,
        period?: number,
        dateFrom?: string,
        dateTo?: string,
        topLat?: number,
        bottomLat?: number,
        leftLng?: number,
        rightLng?: number,
        orderBy?: string,
        sortPointLat?: number,
        sortPointLng?: number,
        clusters: boolean = false,
        describeArguments: boolean = false,
        noMagic: boolean = false,
        premium: boolean = false,
        responsesCountEnabled: boolean = false,
        partTime?: string,
        acceptTemporary: boolean = false,
        employmentForm?: string,
        workScheduleByDays?: string,
        workingHours?: string,
        workFormat?: string,
        excludedText?: string,
        education?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacanciesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'text': text,
                'search_field': searchField,
                'experience': experience,
                'employment': employment,
                'schedule': schedule,
                'area': area,
                'metro': metro,
                'professional_role': professionalRole,
                'industry': industry,
                'employer_id': employerId,
                'currency': currency,
                'salary': salary,
                'label': label,
                'only_with_salary': onlyWithSalary,
                'period': period,
                'date_from': dateFrom,
                'date_to': dateTo,
                'top_lat': topLat,
                'bottom_lat': bottomLat,
                'left_lng': leftLng,
                'right_lng': rightLng,
                'order_by': orderBy,
                'sort_point_lat': sortPointLat,
                'sort_point_lng': sortPointLng,
                'clusters': clusters,
                'describe_arguments': describeArguments,
                'no_magic': noMagic,
                'premium': premium,
                'responses_count_enabled': responsesCountEnabled,
                'part_time': partTime,
                'accept_temporary': acceptTemporary,
                'employment_form': employmentForm,
                'work_schedule_by_days': workScheduleByDays,
                'working_hours': workingHours,
                'work_format': workFormat,
                'excluded_text': excludedText,
                'education': education,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Параметры переданы с ошибкой`,
                403: `Требуется ввести капчу`,
                404: `Указанная вакансия не существует`,
            },
        });
    }
    /**
     * Поиск подходящих вакансий
     * По умолчанию, выдает вакансии, похожие на вакансию.
     *
     * Если запрос идет со страницы вакансии (параметр `hhtmSource` = `vacancy` или `vacancy_search_list` или `vacancy_search_filter`):
     * * когда пользователь авторизован как соискатель, и у него есть резюме — выдает подходящие под последнее резюме пользователя вакансии;
     * * когда у соискателя нет резюме — результаты поиска по заголовку вакансии;
     * * когда пользователь не авторизован — рекомендации для анонимов.
     *
     * При указании параметров пагинации (`page`, `per_page`) работает ограничение: глубина возвращаемых результатов не может быть больше `2000`. Например, возможен запрос `per_page=10&page=199` (выдача с `1991` по `2000` вакансию), но запрос с `per_page=10&page=200` вернёт ошибку (выдача с `2001` по `2010` вакансию)
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы
     * @param perPage Количество элементов
     * @param text Переданное значение ищется в полях вакансии, указанных в параметре `search_field`. Доступен [язык запросов](https://hh.ru/article/1175). Специально для этого поля есть [автодополнение](#tag/Podskazki/operation/get-vacancy-search-keywords)
     * @param searchField Область поиска. Справочник с возможными значениями: `vacancy_search_fields` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * По умолчанию, используются все поля. Можно указать несколько значений
     *
     * @param experience Опыт работы. Необходимо передавать `id` из справочника `experience` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param employment Тип занятости. Необходимо передавать `id` из справочника `employment` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param schedule График работы. Необходимо передавать `id` из справочника `schedule` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param area Регион. Необходимо передавать `id` из справочника [/areas](#tag/Obshie-spravochniki/operation/get-areas). Можно указать несколько значений
     *
     * @param metro Ветка или станция метро. Необходимо передавать `id` из справочника [/metro](#tag/Obshie-spravochniki/operation/get-metro-stations). Можно указать несколько значений
     *
     * @param professionalRole Профессиональная область. Необходимо передавать `id` из справочника [/professional_roles](#tag/Obshie-spravochniki/operation/get-professional-roles-dictionary)
     *
     * @param industry Индустрия компании, разместившей вакансию. Необходимо передавать `id` из справочника [/industries](#tag/Obshie-spravochniki/operation/get-industries). Можно указать несколько значений
     *
     * @param employerId Идентификатор [работодателя](#tag/Rabotodatel). Можно указать несколько значений
     *
     * @param excludedEmployerId Идентификатор [работодателя](#tag/Rabotodatel), вакансии которого должны быть исключены из выдачи. Можно указать несколько значений
     *
     * @param currency Код валюты. Справочник с возможными значениями: `currency` (ключ `code`) в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Имеет смысл указывать только совместно с параметром `salary`
     *
     * @param salary Размер заработной платы. Если указано это поле, но не указано `currency`, то для `currency` используется значение RUR.
     * При указании значения будут найдены вакансии, в которых вилка зарплаты близка к указанной в запросе. При этом значения пересчитываются по текущим курсам ЦБ РФ. Например, при указании `salary=100&currency=EUR` будут найдены вакансии, где вилка зарплаты указана в рублях и после пересчёта в Евро близка к 100 EUR.
     * По умолчанию будут также найдены вакансии, в которых вилка зарплаты не указана, чтобы такие вакансии отфильтровать, используйте `only_with_salary=true`
     *
     * @param label Фильтр по меткам вакансий. Необходимо передавать `id` из справочника `vacancy_label` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param onlyWithSalary Показывать вакансии только с указанием зарплаты
     *
     * @param period Количество дней, в пределах которых производится поиск по вакансиям
     *
     * @param dateFrom Дата, которая ограничивает снизу диапазон дат публикации вакансий. Нельзя передавать вместе с параметром `period`.
     * Значение указывается в формате `ISO 8601 - YYYY-MM-DD` или с точность до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Указанное значение будет округлено до ближайших пяти минут
     *
     * @param dateTo Дата, которая ограничивает сверху диапазон дат публикации вакансий. Нельзя передавать вместе с параметром `period`.
     * Значение указывается в формате `ISO 8601 - YYYY-MM-DD` или с точность до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Указанное значение будет округлено до ближайших пяти минут
     *
     * @param topLat Верхняя граница широты.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param bottomLat Нижняя граница широты.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param leftLng Левая граница долготы.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param rightLng Правая граница долготы.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param orderBy Сортировка списка вакансий. Справочник с возможными значениями: `vacancy_search_order` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * Если выбрана сортировка по удалённости от гео-точки `distance`, необходимо также задать её координаты: `sort_point_lat`, `sort_point_lng`
     *
     * @param sortPointLat Значение географической широты точки, по расстоянию от которой будут отсортированы вакансии. Необходимо указывать только, если `order_by` установлено в `distance`
     *
     * @param sortPointLng Значение географической долготы точки, по расстоянию от которой будут отсортированы вакансии. Необходимо указывать только, если `order_by` установлено в `distance`
     *
     * @param clusters Возвращать ли [кластеры для данного поиска](#tag/Poisk-vakansij/Klastery-v-poiske-vakansij)
     *
     * @param describeArguments Возвращать ли описание использованных параметров поиска. Успешный ответ будет содержать поле [`arguments`]((#tag/Poisk-vakansij/operation/get-vacancies)))
     *
     * @param noMagic Если значение `true` — автоматическое преобразование вакансий отключено.
     * При включённом автоматическом преобразовании, будет предпринята попытка изменить текстовый запрос пользователя на набор параметров. Например, запрос `text=москва бухгалтер 100500` будет преобразован в `text=бухгалтер&only_with_salary=true&area=1&salary=100500`
     *
     * @param premium Если значение `true` — в сортировке вакансий будет учтены премиум-вакансии. Такая сортировка используется на сайте
     *
     * @param responsesCountEnabled Если значение `true` — дополнительное поле `counters` с количеством откликов для вакансии включено
     *
     * @param partTime Вакансии для подработки. Возможные значения:
     * * Все элементы из `working_days` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Все элементы из `working_time_intervals` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Все элементы из `working_time_modes` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Элементы `part` или `project` из `employment` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Элемент `accept_temporary`, показывает вакансии только с временным трудоустройством.
     * Можно указать несколько значений
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacanciesResponse Успешный ответ
     * @throws ApiError
     */
    public static getVacanciesRelatedToVacancy(
        vacancyId: string,
        hhUserAgent: string,
        page?: number,
        perPage: number = 10,
        text?: string,
        searchField?: string,
        experience?: string,
        employment?: string,
        schedule?: string,
        area?: string,
        metro?: string,
        professionalRole?: string,
        industry?: string,
        employerId?: string,
        excludedEmployerId?: string,
        currency?: string,
        salary?: number,
        label?: string,
        onlyWithSalary: boolean = false,
        period?: number,
        dateFrom?: string,
        dateTo?: string,
        topLat?: number,
        bottomLat?: number,
        leftLng?: number,
        rightLng?: number,
        orderBy?: string,
        sortPointLat?: number,
        sortPointLng?: number,
        clusters: boolean = false,
        describeArguments: boolean = false,
        noMagic: boolean = false,
        premium: boolean = false,
        responsesCountEnabled: boolean = false,
        partTime?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacanciesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{vacancy_id}/related_vacancies',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'text': text,
                'search_field': searchField,
                'experience': experience,
                'employment': employment,
                'schedule': schedule,
                'area': area,
                'metro': metro,
                'professional_role': professionalRole,
                'industry': industry,
                'employer_id': employerId,
                'excluded_employer_id': excludedEmployerId,
                'currency': currency,
                'salary': salary,
                'label': label,
                'only_with_salary': onlyWithSalary,
                'period': period,
                'date_from': dateFrom,
                'date_to': dateTo,
                'top_lat': topLat,
                'bottom_lat': bottomLat,
                'left_lng': leftLng,
                'right_lng': rightLng,
                'order_by': orderBy,
                'sort_point_lat': sortPointLat,
                'sort_point_lng': sortPointLng,
                'clusters': clusters,
                'describe_arguments': describeArguments,
                'no_magic': noMagic,
                'premium': premium,
                'responses_count_enabled': responsesCountEnabled,
                'part_time': partTime,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Параметры переданы с ошибкой`,
                403: `Требуется ввести капчу`,
                404: `Указанная вакансия не существует`,
            },
        });
    }
    /**
     * Получение единичного сохраненного поиска вакансий
     * @param id Идентификатор сохраненного поиска
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SavedSearchesSavedSearchItem Успешный ответ
     * @throws ApiError
     */
    public static getSavedVacancySearch(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SavedSearchesSavedSearchItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/saved_searches/vacancies/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
                404: `Сохраненный поиск не найден`,
            },
        });
    }
    /**
     * Обновление сохраненного поиска вакансий
     * У сохраненного поиска можно изменить имя (`name`) и статус подписки (`subscription`). В одном запросе можно передать только один из параметров
     * @param id Идентификатор сохраненного поиска
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param name Новое имя сохраненного поиска
     * @param subscription Статус подписки
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static updateSavedVacancySearch(
        id: string,
        hhUserAgent: string,
        name?: string,
        subscription?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/saved_searches/vacancies/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'name': name,
                'subscription': subscription,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметре запроса`,
                403: `Ошибка авторизации пользователя`,
                404: `Не найдено или не доступно текущему пользователю`,
                409: `Ошибка запроса при одновременном изменении параметров`,
            },
        });
    }
    /**
     * Удаление сохраненного поиска вакансий
     * @param id Идентификатор сохраненного поиска
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteSavedVacancySearch(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/saved_searches/vacancies/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации пользователя`,
                404: `Не найдено или не доступно текущему пользователю`,
            },
        });
    }
    /**
     * Поиск по вакансиям, похожим на вакансию
     * Если не передан токен авторизации, то после первого запроса будет предложено пройти капчу.
     *
     * При указании параметров пагинации (`page`, `per_page`) работает ограничение: глубина возвращаемых результатов не может быть больше `2000`. Например, возможен запрос `per_page=10&page=199` (выдача с `1991` по `2000` вакансию), но запрос с `per_page=10&page=200` вернёт ошибку (выдача с `2001` по `2010` вакансию)
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы
     * @param perPage Количество элементов
     * @param text Переданное значение ищется в полях вакансии, указанных в параметре `search_field`. Доступен [язык запросов](https://hh.ru/article/1175). Специально для этого поля есть [автодополнение](#tag/Podskazki/operation/get-vacancy-search-keywords)
     * @param searchField Область поиска. Справочник с возможными значениями: `vacancy_search_fields` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * По умолчанию, используются все поля. Можно указать несколько значений
     *
     * @param experience Опыт работы. Необходимо передавать `id` из справочника `experience` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param employment Тип занятости. Необходимо передавать `id` из справочника `employment` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param schedule График работы. Необходимо передавать `id` из справочника `schedule` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param area Регион. Необходимо передавать `id` из справочника [/areas](#tag/Obshie-spravochniki/operation/get-areas). Можно указать несколько значений
     *
     * @param metro Ветка или станция метро. Необходимо передавать `id` из справочника [/metro](#tag/Obshie-spravochniki/operation/get-metro-stations). Можно указать несколько значений
     *
     * @param professionalRole Профессиональная область. Необходимо передавать `id` из справочника [/professional_roles](#tag/Obshie-spravochniki/operation/get-professional-roles-dictionary)
     *
     * @param industry Индустрия компании, разместившей вакансию. Необходимо передавать `id` из справочника [/industries](#tag/Obshie-spravochniki/operation/get-industries). Можно указать несколько значений
     *
     * @param employerId Идентификатор [работодателя](#tag/Rabotodatel). Можно указать несколько значений
     *
     * @param excludedEmployerId Идентификатор [работодателя](#tag/Rabotodatel), вакансии которого должны быть исключены из выдачи. Можно указать несколько значений
     *
     * @param currency Код валюты. Справочник с возможными значениями: `currency` (ключ `code`) в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Имеет смысл указывать только совместно с параметром `salary`
     *
     * @param salary Размер заработной платы. Если указано это поле, но не указано `currency`, то для `currency` используется значение RUR.
     * При указании значения будут найдены вакансии, в которых вилка зарплаты близка к указанной в запросе. При этом значения пересчитываются по текущим курсам ЦБ РФ. Например, при указании `salary=100&currency=EUR` будут найдены вакансии, где вилка зарплаты указана в рублях и после пересчёта в Евро близка к 100 EUR.
     * По умолчанию будут также найдены вакансии, в которых вилка зарплаты не указана, чтобы такие вакансии отфильтровать, используйте `only_with_salary=true`
     *
     * @param label Фильтр по меткам вакансий. Необходимо передавать `id` из справочника `vacancy_label` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param onlyWithSalary Показывать вакансии только с указанием зарплаты. По умолчанию `false`
     *
     * @param period Количество дней, в пределах которых производится поиск по вакансиям
     *
     * @param dateFrom Дата, которая ограничивает снизу диапазон дат публикации вакансий. Нельзя передавать вместе с параметром `period`.
     * Значение указывается в формате `ISO 8601 - YYYY-MM-DD` или с точность до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Указанное значение будет округлено до ближайших пяти минут
     *
     * @param dateTo Дата, которая ограничивает сверху диапазон дат публикации вакансий. Нельзя передавать вместе с параметром `period`.
     * Значение указывается в формате `ISO 8601 - YYYY-MM-DD` или с точность до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Указанное значение будет округлено до ближайших пяти минут
     *
     * @param topLat Верхняя граница широты.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param bottomLat Нижняя граница широты.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param leftLng Левая граница долготы.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param rightLng Правая граница долготы.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param orderBy Сортировка списка вакансий. Справочник с возможными значениями: `vacancy_search_order` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * Если выбрана сортировка по удалённости от гео-точки `distance`, необходимо также задать её координаты: `sort_point_lat`, `sort_point_lng`
     *
     * @param sortPointLat Значение географической широты точки, по расстоянию от которой будут отсортированы вакансии. Необходимо указывать только, если `order_by` установлено в `distance`
     *
     * @param sortPointLng Значение географической долготы точки, по расстоянию от которой будут отсортированы вакансии. Необходимо указывать только, если `order_by` установлено в `distance`
     *
     * @param clusters Возвращать ли [кластеры для данного поиска](#tag/Poisk-vakansij/Klastery-v-poiske-vakansij). По умолчанию — `false`
     *
     * @param describeArguments Возвращать ли описание использованных параметров поиска. Успешный ответ будет содержать поле [`arguments`]((#tag/Poisk-vakansij/operation/get-vacancies))).
     * По умолчанию — `false`
     *
     * @param noMagic Если значение `true` — автоматическое преобразование вакансий отключено. По умолчанию – false.
     * При включённом автоматическом преобразовании, будет предпринята попытка изменить текстовый запрос пользователя на набор параметров. Например, запрос `text=москва бухгалтер 100500` будет преобразован в `text=бухгалтер&only_with_salary=true&area=1&salary=100500`
     *
     * @param premium Если значение `true` — в сортировке вакансий будет учтены премиум вакансии. Такая сортировка используется на сайте. По умолчанию — false
     *
     * @param responsesCountEnabled Если значение `true` — дополнительное поле `counters` с количеством откликов для вакансии включено. По-умолчанию — `false`
     *
     * @param partTime Вакансии для подработки. Возможные значения:
     * * Все элементы из `working_days` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Все элементы из `working_time_intervals` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Все элементы из `working_time_modes` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Элементы `part` или `project` из `employment` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Элемент `accept_temporary`, показывает вакансии только с временным трудоустройством.
     * Можно указать несколько значений
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacanciesResponse Успешный ответ
     * @throws ApiError
     */
    public static getVacanciesSimilarToVacancy(
        vacancyId: string,
        hhUserAgent: string,
        page?: number,
        perPage: number = 10,
        text?: string,
        searchField?: string,
        experience?: string,
        employment?: string,
        schedule?: string,
        area?: string,
        metro?: string,
        professionalRole?: string,
        industry?: string,
        employerId?: string,
        excludedEmployerId?: string,
        currency?: string,
        salary?: number,
        label?: string,
        onlyWithSalary?: boolean,
        period?: number,
        dateFrom?: string,
        dateTo?: string,
        topLat?: number,
        bottomLat?: number,
        leftLng?: number,
        rightLng?: number,
        orderBy?: string,
        sortPointLat?: number,
        sortPointLng?: number,
        clusters?: boolean,
        describeArguments?: boolean,
        noMagic?: boolean,
        premium?: boolean,
        responsesCountEnabled?: boolean,
        partTime?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacanciesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{vacancy_id}/similar_vacancies',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'text': text,
                'search_field': searchField,
                'experience': experience,
                'employment': employment,
                'schedule': schedule,
                'area': area,
                'metro': metro,
                'professional_role': professionalRole,
                'industry': industry,
                'employer_id': employerId,
                'excluded_employer_id': excludedEmployerId,
                'currency': currency,
                'salary': salary,
                'label': label,
                'only_with_salary': onlyWithSalary,
                'period': period,
                'date_from': dateFrom,
                'date_to': dateTo,
                'top_lat': topLat,
                'bottom_lat': bottomLat,
                'left_lng': leftLng,
                'right_lng': rightLng,
                'order_by': orderBy,
                'sort_point_lat': sortPointLat,
                'sort_point_lng': sortPointLng,
                'clusters': clusters,
                'describe_arguments': describeArguments,
                'no_magic': noMagic,
                'premium': premium,
                'responses_count_enabled': responsesCountEnabled,
                'part_time': partTime,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Параметры переданы с ошибкой`,
                403: `Требуется ввести капчу`,
                404: `Указанная вакансия не существует`,
            },
        });
    }
    /**
     * Список улучшений для вакансии
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacancyUpgradeListResponse Успешный ответ
     * @throws ApiError
     */
    public static getVacancyUpgradeList(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacancyUpgradeListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{vacancy_id}/upgrades',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Вакансия не найдена или у пользователя нет прав на просмотр данной вакансии`,
            },
        });
    }
    /**
     * Поиск по вакансиям, похожим на резюме
     * Данные доступны только автору резюме.
     *
     * При указании параметров пагинации (`page`, `per_page`) работает ограничение: глубина возвращаемых результатов не может быть больше `2000`. Например, возможен запрос `per_page=10&page=199` (выдача с `1991` по `2000` вакансию), но запрос с `per_page=10&page=200` вернёт ошибку (выдача с `2001` по `2010` вакансию)
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы (считается от 0, по умолчанию - 0)
     * @param perPage Количество элементов (по умолчанию - 10, максимальное значение - 100)
     * @param text Переданное значение ищется в полях вакансии, указанных в параметре `search_field`. Доступен [язык запросов](https://hh.ru/article/1175). Специально для этого поля есть [автодополнение](#tag/Podskazki/operation/get-vacancy-search-keywords)
     * @param searchField Область поиска. Справочник с возможными значениями: `vacancy_search_fields` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * По умолчанию, используются все поля. Можно указать несколько значений
     *
     * @param experience Опыт работы. Необходимо передавать `id` из справочника `experience` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param employment Тип занятости. Необходимо передавать `id` из справочника `employment` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param schedule График работы. Необходимо передавать `id` из справочника `schedule` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param area Регион. Необходимо передавать `id` из справочника [/areas](#tag/Obshie-spravochniki/operation/get-areas). Можно указать несколько значений
     *
     * @param metro Ветка или станция метро. Необходимо передавать `id` из справочника [/metro](#tag/Obshie-spravochniki/operation/get-metro-stations). Можно указать несколько значений
     *
     * @param professionalRole Профессиональная область. Необходимо передавать `id` из справочника [/professional_roles](#tag/Obshie-spravochniki/operation/get-professional-roles-dictionary)
     *
     * @param industry Индустрия компании, разместившей вакансию. Необходимо передавать `id` из справочника [/industries](#tag/Obshie-spravochniki/operation/get-industries). Можно указать несколько значений
     *
     * @param employerId Идентификатор [работодателя](#tag/Rabotodatel). Можно указать несколько значений
     *
     * @param excludedEmployerId Идентификатор [работодателя](#tag/Rabotodatel), вакансии которого должны быть исключены из выдачи. Можно указать несколько значений
     *
     * @param currency Код валюты. Справочник с возможными значениями: `currency` (ключ `code`) в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Имеет смысл указывать только совместно с параметром `salary`
     *
     * @param salary Размер заработной платы. Если указано это поле, но не указано `currency`, то для `currency` используется значение RUR.
     * При указании значения будут найдены вакансии, в которых вилка зарплаты близка к указанной в запросе. При этом значения пересчитываются по текущим курсам ЦБ РФ. Например, при указании `salary=100&currency=EUR` будут найдены вакансии, где вилка зарплаты указана в рублях и после пересчёта в Евро близка к 100 EUR.
     * По умолчанию будут также найдены вакансии, в которых вилка зарплаты не указана, чтобы такие вакансии отфильтровать, используйте `only_with_salary=true`
     *
     * @param label Фильтр по меткам вакансий. Необходимо передавать `id` из справочника `vacancy_label` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param onlyWithSalary Показывать вакансии только с указанием зарплаты. По умолчанию `false`
     *
     * @param period Количество дней, в пределах которых производится поиск по вакансиям
     *
     * @param dateFrom Дата, которая ограничивает снизу диапазон дат публикации вакансий. Нельзя передавать вместе с параметром `period`.
     * Значение указывается в формате `ISO 8601 - YYYY-MM-DD` или с точность до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Указанное значение будет округлено до ближайших пяти минут
     *
     * @param dateTo Дата, которая ограничивает сверху диапазон дат публикации вакансий. Нельзя передавать вместе с параметром `period`.
     * Значение указывается в формате `ISO 8601 - YYYY-MM-DD` или с точность до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Указанное значение будет округлено до ближайших пяти минут
     *
     * @param topLat Верхняя граница широты.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param bottomLat Нижняя граница широты.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param leftLng Левая граница долготы.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param rightLng Правая граница долготы.
     * При поиске используется значение указанного в вакансии адреса. Принимаемое значение — градусы в виде десятичной дроби.
     * Необходимо передавать одновременно все четыре параметра гео-координат, иначе вернется ошибка
     *
     * @param orderBy Сортировка списка вакансий. Справочник с возможными значениями: `vacancy_search_order` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * Если выбрана сортировка по удалённости от гео-точки `distance`, необходимо также задать её координаты: `sort_point_lat`, `sort_point_lng`
     *
     * @param sortPointLat Значение географической широты точки, по расстоянию от которой будут отсортированы вакансии. Необходимо указывать только, если `order_by` установлено в `distance`
     *
     * @param sortPointLng Значение географической долготы точки, по расстоянию от которой будут отсортированы вакансии. Необходимо указывать только, если `order_by` установлено в `distance`
     *
     * @param clusters Возвращать ли [кластеры для данного поиска](#tag/Poisk-vakansij/Klastery-v-poiske-vakansij). По умолчанию — `false`
     *
     * @param describeArguments Возвращать ли описание использованных параметров поиска. Успешный ответ будет содержать поле [`arguments`]((#tag/Poisk-vakansij/operation/get-vacancies))).
     * По умолчанию — `false`
     *
     * @param noMagic Если значение `true` — автоматическое преобразование вакансий отключено. По умолчанию – false.
     * При включённом автоматическом преобразовании, будет предпринята попытка изменить текстовый запрос пользователя на набор параметров. Например, запрос `text=москва бухгалтер 100500` будет преобразован в `text=бухгалтер&only_with_salary=true&area=1&salary=100500`
     *
     * @param premium Если значение `true` — в сортировке вакансий будет учтены премиум вакансии. Такая сортировка используется на сайте. По умолчанию — false
     *
     * @param responsesCountEnabled Если значение `true` — дополнительное поле `counters` с количеством откликов для вакансии включено. По-умолчанию — `false`
     *
     * @param partTime Вакансии для подработки. Возможные значения:
     * * Все элементы из `working_days` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Все элементы из `working_time_intervals` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Все элементы из `working_time_modes` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Элементы `part` или `project` из `employment` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries).
     * * Элемент `accept_temporary`, показывает вакансии только с временным трудоустройством.
     * Можно указать несколько значений
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacanciesResponse Успешный ответ
     * @throws ApiError
     */
    public static getVacanciesSimilarToResume(
        resumeId: string,
        hhUserAgent: string,
        page?: number,
        perPage?: number,
        text?: string,
        searchField?: string,
        experience?: string,
        employment?: string,
        schedule?: string,
        area?: string,
        metro?: string,
        professionalRole?: string,
        industry?: string,
        employerId?: string,
        excludedEmployerId?: string,
        currency?: string,
        salary?: number,
        label?: string,
        onlyWithSalary?: boolean,
        period?: number,
        dateFrom?: string,
        dateTo?: string,
        topLat?: number,
        bottomLat?: number,
        leftLng?: number,
        rightLng?: number,
        orderBy?: string,
        sortPointLat?: number,
        sortPointLng?: number,
        clusters?: boolean,
        describeArguments?: boolean,
        noMagic?: boolean,
        premium?: boolean,
        responsesCountEnabled?: boolean,
        partTime?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacanciesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}/similar_vacancies',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'text': text,
                'search_field': searchField,
                'experience': experience,
                'employment': employment,
                'schedule': schedule,
                'area': area,
                'metro': metro,
                'professional_role': professionalRole,
                'industry': industry,
                'employer_id': employerId,
                'excluded_employer_id': excludedEmployerId,
                'currency': currency,
                'salary': salary,
                'label': label,
                'only_with_salary': onlyWithSalary,
                'period': period,
                'date_from': dateFrom,
                'date_to': dateTo,
                'top_lat': topLat,
                'bottom_lat': bottomLat,
                'left_lng': leftLng,
                'right_lng': rightLng,
                'order_by': orderBy,
                'sort_point_lat': sortPointLat,
                'sort_point_lng': sortPointLng,
                'clusters': clusters,
                'describe_arguments': describeArguments,
                'no_magic': noMagic,
                'premium': premium,
                'responses_count_enabled': responsesCountEnabled,
                'part_time': partTime,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Параметры переданы с ошибкой`,
                404: `Указанное резюме не существует или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Список отобранных вакансий
     * Возвращает [подмножество вакансий](#tag/Vakansii/operation/get-vacancy), добавленных пользователем в отобранные, а также ряд дополнительных полей
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы (считается от 0, по умолчанию - 0)
     * @param perPage Количество элементов на странице
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacanciesFavoritedResponse Успешный ответ
     * @throws ApiError
     */
    public static getFavoriteVacancies(
        hhUserAgent: string,
        page?: number,
        perPage?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacanciesFavoritedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/favorited',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Добавление вакансии в список скрытых
     * Добавляет указанную вакансию в [список скрытых вакансий](#tag/Skrytye-vakansii/operation/get-blacklisted-vacancies)
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static addVacancyToBlacklisted(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vacancies/blacklisted/{vacancy_id}',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Превышен лимит на количество элементов в списке`,
                403: `Текущий пользователь не является соискателем или не имеет прав на добавление вакансии в скрытые`,
                404: `Вакансия не найдена`,
            },
        });
    }
    /**
     * Удаление вакансии из списка скрытых
     * Удаляет указанную вакансию из [списка скрытых вакансий](#tag/Skrytye-vakansii/operation/get-blacklisted-vacancies)
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteVacancyFromBlacklisted(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vacancies/blacklisted/{vacancy_id}',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
                404: `Вакансия не найдена`,
            },
        });
    }
    /**
     * Просмотр списка опубликованных вакансий
     * Возвращает список опубликованных вакансий.
     *
     * Если передан параметр `resume_id`, то в список попадут только те вакансии, которые подходят для указанного резюме. Кроме того, ответ будет содержать дополнительные поля
     *
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы (считается от 0)
     * @param perPage Количество элементов
     * @param managerId Идентификатор менеджера, вакансии которого будут получены в ответе. По умолчанию возвращаются вакансии текущего пользователя.
     * Этот параметр нельзя передавать в комбинации с параметрами `manager_ids` и `all_accessible`.
     * Если передать несколько `manager_id`, будет использован последний. Значения можно взять из [списка](#tag/Menedzhery-rabotodatelya/operation/get-employer-managers)
     *
     * @param managerIds Идентификаторы менеджеров, вакансии которых будут получены в ответе. По умолчанию возвращаются вакансии текущего пользователя.
     * Этот параметр нельзя передавать в комбинации с параметрами `manager_id` и `all_accessible`.
     * Значения должны быть переданы строкой через запятую.
     * Значения можно взять из [списка](#tag/Menedzhery-rabotodatelya/operation/get-employer-managers)
     *
     * @param text Строка для поиска по названию вакансии
     * @param area Идентификатор региона с вакансией. Чтобы получить идентификаторы регионов, в которых есть активные вакансии, воспользуйтесь [соответствующим методом](#tag/Informaciya-o-rabotodatele/operation/get-employer-vacancy-areas)
     * @param allAccessible Позволяет получить все активные вакансии текущего пользователя вместе со всеми активными вакансиями менеджеров, к которым ему выдан доступ.
     * Этот параметр нельзя передавать в комбинации с параметрами `manager_id` и `manager_ids`
     *
     * @param departmentId Идентификатор департамента работодателя, от имени которого размещается вакансия (если данная возможность доступна для компании).
     * Значения можно взять из [списка](#tag/Informaciya-o-rabotodatele/operation/get-employer-departments)
     *
     * @param resumeId Идентификатор резюме. Этот параметр нельзя передавать в комбинации с другими параметрами, только отдельно. Если параметр передан, в ответе возвращаются только те вакансии, которые подходят для указанного резюме, а также дополнительные поля
     * @param orderBy Способ сортировки вакансий. Доступные значения перечислены в поле `employer_active_vacancies_order` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacancyListResponse Успешный ответ
     * @throws ApiError
     */
    public static getActiveVacancyList(
        employerId: string,
        hhUserAgent: string,
        page?: number,
        perPage: number = 20,
        managerId?: string,
        managerIds?: string,
        text?: string,
        area?: string,
        allAccessible?: boolean,
        departmentId?: string,
        resumeId?: string,
        orderBy?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacancyListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/vacancies/active',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'manager_id': managerId,
                'manager_ids': managerIds,
                'text': text,
                'area': area,
                'all_accessible': allAccessible,
                'department_id': departmentId,
                'resume_id': resumeId,
                'order_by': orderBy,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка параметров запроса или передана несочетаемая пара параметров`,
                403: `Текущий пользователь не является работодателем`,
                404: `Менеджер с переданным идентификатором не существует или у текущего пользователя нет прав на просмотр опубликованных вакансий`,
            },
        });
    }
    /**
     * Просмотр списка опубликованных вакансий
     * Возвращает список опубликованных вакансий.
     *
     * Если передан параметр `resume_id`, то в список попадут только те вакансии, которые подходят для указанного резюме. Кроме того, ответ будет содержать дополнительные поля
     *
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы (считается от 0)
     * @param perPage Количество элементов
     * @param managerId Идентификатор менеджера, вакансии которого будут получены в ответе. По умолчанию возвращаются вакансии текущего пользователя.
     * Этот параметр нельзя передавать в комбинации с параметрами `manager_ids` и `all_accessible`.
     * Если передать несколько `manager_id`, будет использован последний. Значения можно взять из [списка](#tag/Menedzhery-rabotodatelya/operation/get-employer-managers)
     *
     * @param managerIds Идентификаторы менеджеров, вакансии которых будут получены в ответе. По умолчанию возвращаются вакансии текущего пользователя.
     * Этот параметр нельзя передавать в комбинации с параметрами `manager_id` и `all_accessible`.
     * Значения должны быть переданы строкой через запятую.
     * Значения можно взять из [списка](#tag/Menedzhery-rabotodatelya/operation/get-employer-managers)
     *
     * @param text Строка для поиска по названию вакансии
     * @param area Идентификатор региона с вакансией. Чтобы получить идентификаторы регионов, в которых есть активные вакансии, воспользуйтесь [соответствующим методом](#tag/Informaciya-o-rabotodatele/operation/get-employer-vacancy-areas)
     * @param allAccessible Позволяет получить все активные вакансии текущего пользователя вместе со всеми активными вакансиями менеджеров, к которым ему выдан доступ.
     * Этот параметр нельзя передавать в комбинации с параметрами `manager_id` и `manager_ids`
     *
     * @param departmentId Идентификатор департамента работодателя, от имени которого размещается вакансия (если данная возможность доступна для компании).
     * Значения можно взять из [списка](#tag/Informaciya-o-rabotodatele/operation/get-employer-departments)
     *
     * @param resumeId Идентификатор резюме. Этот параметр нельзя передавать в комбинации с другими параметрами, только отдельно. Если параметр передан, в ответе возвращаются только те вакансии, которые подходят для указанного резюме, а также дополнительные поля
     * @param orderBy Способ сортировки вакансий. Доступные значения перечислены в поле `employer_active_vacancies_order` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacancyListResponse Успешный ответ
     * @throws ApiError
     */
    public static getActiveVacancyList1(
        employerId: string,
        hhUserAgent: string,
        page?: number,
        perPage: number = 20,
        managerId?: string,
        managerIds?: string,
        text?: string,
        area?: string,
        allAccessible?: boolean,
        departmentId?: string,
        resumeId?: string,
        orderBy?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacancyListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/vacancies/active',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'manager_id': managerId,
                'manager_ids': managerIds,
                'text': text,
                'area': area,
                'all_accessible': allAccessible,
                'department_id': departmentId,
                'resume_id': resumeId,
                'order_by': orderBy,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка параметров запроса или передана несочетаемая пара параметров`,
                403: `Текущий пользователь не является работодателем`,
                404: `Менеджер с переданным идентификатором не существует или у текущего пользователя нет прав на просмотр опубликованных вакансий`,
            },
        });
    }
    /**
     * Список удаленных вакансий
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param managerId Идентификатор менеджера. Передайте, если требуется получить удаленные вакансии другого менеджера.
     * Если передать несколько параметров `manager_id`, будет использоваться только последний.
     * По умолчанию возвращаются вакансии текущего пользователя
     *
     * @param orderBy Сортировка списка вакансий в архиве. Справочник с возможными значениями: `employer_hidden_vacancies_order` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param perPage Количество элементов на странице выдачи. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). Значение по умолчанию и максимальное значение `per_page` составляет 1000
     *
     * @param page Порядковый номер страницы в выдаче. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). По умолчанию нумерация начинается с 0 страницы
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesDeletedVacancyListResponse Успешный ответ
     * @throws ApiError
     */
    public static getHiddenVacancies(
        employerId: string,
        hhUserAgent: string,
        managerId?: string,
        orderBy?: string,
        perPage?: number,
        page?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesDeletedVacancyListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/vacancies/hidden',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'manager_id': managerId,
                'order_by': orderBy,
                'per_page': perPage,
                'page': page,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Параметры переданы с ошибкой`,
                403: `Текущий пользователь не является работодателем, либо указан неверный идентификатор работодателя`,
                404: `У текущего пользователя нет прав на просмотр удаленных вакансий`,
            },
        });
    }
    /**
     * Список удаленных вакансий
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param managerId Идентификатор менеджера. Передайте, если требуется получить удаленные вакансии другого менеджера.
     * Если передать несколько параметров `manager_id`, будет использоваться только последний.
     * По умолчанию возвращаются вакансии текущего пользователя
     *
     * @param orderBy Сортировка списка вакансий в архиве. Справочник с возможными значениями: `employer_hidden_vacancies_order` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param perPage Количество элементов на странице выдачи. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). Значение по умолчанию и максимальное значение `per_page` составляет 1000
     *
     * @param page Порядковый номер страницы в выдаче. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). По умолчанию нумерация начинается с 0 страницы
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesDeletedVacancyListResponse Успешный ответ
     * @throws ApiError
     */
    public static getHiddenVacancies1(
        employerId: string,
        hhUserAgent: string,
        managerId?: string,
        orderBy?: string,
        perPage?: number,
        page?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesDeletedVacancyListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/vacancies/hidden',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'manager_id': managerId,
                'order_by': orderBy,
                'per_page': perPage,
                'page': page,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Параметры переданы с ошибкой`,
                403: `Текущий пользователь не является работодателем, либо указан неверный идентификатор работодателя`,
                404: `У текущего пользователя нет прав на просмотр удаленных вакансий`,
            },
        });
    }
    /**
     * Удаление вакансий
     * Удалить можно только вакансию из архива
     * @param employerId Идентификатор работодателя
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static addVacancyToHidden(
        employerId: string,
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/employers/{employer_id}/vacancies/hidden/{vacancy_id}',
            path: {
                'employer_id': employerId,
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем или вы пытаетесь удалить вакансию, которая не находится в архиве`,
                404: `Указан неверный идентификатор работодателя или вакансии, либо у текущего пользователя нет прав на удаление вакансии из архива`,
            },
        });
    }
    /**
     * Восстановление вакансии из удаленных
     * Восстановить можно только удаленную из архива вакансию. Вакансия вернется в архив
     * @param employerId Идентификатор работодателя
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static restoreVacancyFromHidden(
        employerId: string,
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/employers/{employer_id}/vacancies/hidden/{vacancy_id}',
            path: {
                'employer_id': employerId,
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем или вы пытаетесь восстановить вакансию, которая не удалена`,
                404: `Указан неверный идентификатор работодателя или вакансии, либо у текущего пользователя нет прав на удаление вакансии из архива`,
            },
        });
    }
    /**
     * Условия заполнения полей при добавлении и редактировании вакансий
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacancyConditions Успешный ответ
     * @throws ApiError
     */
    public static getVacancyConditions(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacancyConditions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancy_conditions',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Условия заполнения полей вакансии недоступны данному пользователю`,
            },
        });
    }
    /**
     * Информация о возможности продления вакансии
     * Условия продления:
     *
     * * Стоимость продления вакансии равна стоимости новой публикации
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacancyProlongate Успешный ответ
     * @throws ApiError
     */
    public static getProlongationVacancyInfo(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacancyProlongate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{vacancy_id}/prolongate',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Текущему пользователю недоступно получение информации о вакансии или вакансия не существует`,
            },
        });
    }
    /**
     * Информация о возможности продления вакансии
     * Условия продления:
     *
     * * Стоимость продления вакансии равна стоимости новой публикации
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacancyProlongate Успешный ответ
     * @throws ApiError
     */
    public static getProlongationVacancyInfo1(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacancyProlongate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{vacancy_id}/prolongate',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Текущему пользователю недоступно получение информации о вакансии или вакансия не существует`,
            },
        });
    }
    /**
     * Продление вакансии
     * Продлевает срок размещения указанной вакансии.
     *
     * Условия продления:
     *
     * * Стоимость продления вакансии равна стоимости новой публикации
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static vacancyProlongation(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vacancies/{vacancy_id}/prolongate',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем или продление невозможно`,
                404: `Текущему пользователю недоступно получение информации о вакансии или вакансия не существует`,
            },
        });
    }
    /**
     * Продление вакансии
     * Продлевает срок размещения указанной вакансии.
     *
     * Условия продления:
     *
     * * Стоимость продления вакансии равна стоимости новой публикации
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static vacancyProlongation1(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vacancies/{vacancy_id}/prolongate',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем или продление невозможно`,
                404: `Текущему пользователю недоступно получение информации о вакансии или вакансия не существует`,
            },
        });
    }
    /**
     * Архивация вакансии
     * Переносит вакансию в архив
     * @param employerId Идентификатор работодателя
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static addVacancyToArchive(
        employerId: string,
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/employers/{employer_id}/vacancies/archived/{vacancy_id}',
            path: {
                'employer_id': employerId,
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Указан неверный идентификатор работодателя, либо у текущего пользователя нет прав на архивацию вакансии, либо вакансия с переданным идентификатором не существует`,
            },
        });
    }
    /**
     * Архивация вакансии
     * Переносит вакансию в архив
     * @param employerId Идентификатор работодателя
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static addVacancyToArchive1(
        employerId: string,
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/employers/{employer_id}/vacancies/archived/{vacancy_id}',
            path: {
                'employer_id': employerId,
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Указан неверный идентификатор работодателя, либо у текущего пользователя нет прав на архивацию вакансии, либо вакансия с переданным идентификатором не существует`,
            },
        });
    }
    /**
     * Просмотр предпочитаемой сортировки откликов
     * @param id Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesPreferredNegotiationsOrder Успешный ответ
     * @throws ApiError
     */
    public static getPrefNegotiationsOrder(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesPreferredNegotiationsOrder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{id}/preferred_negotiations_order',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                404: `Вакансия не найдена или просмотр откликов/приглашений по ней недоступен`,
            },
        });
    }
    /**
     * Просмотр предпочитаемой сортировки откликов
     * @param id Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesPreferredNegotiationsOrder Успешный ответ
     * @throws ApiError
     */
    public static getPrefNegotiationsOrder1(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesPreferredNegotiationsOrder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{id}/preferred_negotiations_order',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                404: `Вакансия не найдена или просмотр откликов/приглашений по ней недоступен`,
            },
        });
    }
    /**
     * Изменение предпочитаемой сортировки откликов
     * @param id Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param formData
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static putPrefNegotiationsOrder(
        id: string,
        hhUserAgent: string,
        formData: VacanciesPreferredNegotiationsOrderRequest,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vacancies/{id}/preferred_negotiations_order',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Идентификатор типа сортировки передан с ошибкой или данный тип сортировки недоступен`,
                404: `Вакансия не найдена или просмотр откликов/приглашений по ней недоступен`,
            },
        });
    }
    /**
     * Изменение предпочитаемой сортировки откликов
     * @param id Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param formData
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static putPrefNegotiationsOrder1(
        id: string,
        hhUserAgent: string,
        formData: VacanciesPreferredNegotiationsOrderRequest,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vacancies/{id}/preferred_negotiations_order',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Идентификатор типа сортировки передан с ошибкой или данный тип сортировки недоступен`,
                404: `Вакансия не найдена или просмотр откликов/приглашений по ней недоступен`,
            },
        });
    }
    /**
     * Добавление вакансии в список отобранных
     * Добавляет указанную вакансию в [список отобранных вакансий](#tag/Otobrannye-vakansii/operation/get-favorite-vacancies)
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static addVacancyToFavorite(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vacancies/favorited/{vacancy_id}',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем или не имеет прав на добавление вакансии в отобранные`,
                404: `Вакансия не найдена`,
            },
        });
    }
    /**
     * Удаление вакансии из списка отобранных
     * Удаляет указанную вакансию из [списка отобранных вакансий](#tag/Otobrannye-vakansii/operation/get-favorite-vacancies)
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteVacancyFromFavorite(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vacancies/favorited/{vacancy_id}',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
                404: `Вакансия не найдена`,
            },
        });
    }
    /**
     * Варианты публикации вакансий у текущего менеджера
     * Метод позволяет понять, может ли менеджер публиковать вакансии и какие типы вакансий ему доступны. Возвращает все возможные типы публикации
     * @param employerId Идентификатор работодателя, который можно узнать [в информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param managerId Идентификатор менеджера, который можно узнать [в информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesAvailableVacancyTypeResponse Успешный ответ
     * @throws ApiError
     */
    public static getAvailableVacancyTypes(
        employerId: string,
        managerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesAvailableVacancyTypeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/managers/{manager_id}/vacancies/available_types',
            path: {
                'employer_id': employerId,
                'manager_id': managerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем или не имеет доступа к данным`,
                404: `Менеджер или компания не существуют или не доступны для текущего пользователя`,
            },
        });
    }
    /**
     * Статистика по вакансии
     * Возвращает статистику за последние пять дней существования вакансии.
     *
     * При этом:
     *
     * * Если вакансия создана менее пяти дней назад, то первой датой в ответе будет дата создания вакансии. Для будущих дат в полях `responses` и `views` вернется `null`.
     * * Если вакансия находится в архиве или удалена, то последней датой будет дата архивации
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesVacancyStatsResponse Успешный ответ
     * @throws ApiError
     */
    public static getVacancyStats(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesVacancyStatsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{vacancy_id}/stats',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Вакансия не найдена`,
            },
        });
    }
    /**
     * Список архивных вакансий
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param managerId Идентификатор менеджера из [списка менеджеров работодателя](#tag/Menedzhery-rabotodatelya/operation/get-employer-managers). Передайте, если требуется получить вакансии другого менеджера.
     *
     * Если передать несколько параметров `manager_id`, будет использоваться только последний.
     *
     * По умолчанию возвращаются вакансии текущего пользователя
     *
     * @param orderBy Сортировка списка вакансий в архиве. Справочник с возможными значениями: `employer_archived_vacancies_order` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param perPage Количество элементов на странице выдачи. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). Значение по умолчанию и максимальное значение `per_page` составляет 1000
     *
     * @param page Порядковый номер страницы в выдаче. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). По умолчанию нумерация начинается с 0 страницы
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesArchivedVacancyListResponse Успешный ответ
     * @throws ApiError
     */
    public static getArchivedVacancies(
        employerId: string,
        hhUserAgent: string,
        managerId?: string,
        orderBy?: string,
        perPage?: number,
        page?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesArchivedVacancyListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/vacancies/archived',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'manager_id': managerId,
                'order_by': orderBy,
                'per_page': perPage,
                'page': page,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Параметры переданы с ошибкой`,
                403: `Текущий пользователь не является работодателем, либо указан неверный идентификатор работодателя`,
                404: `У текущего пользователя нет прав на просмотр архивных вакансий`,
            },
        });
    }
    /**
     * Список архивных вакансий
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param managerId Идентификатор менеджера из [списка менеджеров работодателя](#tag/Menedzhery-rabotodatelya/operation/get-employer-managers). Передайте, если требуется получить вакансии другого менеджера.
     *
     * Если передать несколько параметров `manager_id`, будет использоваться только последний.
     *
     * По умолчанию возвращаются вакансии текущего пользователя
     *
     * @param orderBy Сортировка списка вакансий в архиве. Справочник с возможными значениями: `employer_archived_vacancies_order` в [/dictionaries](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param perPage Количество элементов на странице выдачи. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). Значение по умолчанию и максимальное значение `per_page` составляет 1000
     *
     * @param page Порядковый номер страницы в выдаче. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). По умолчанию нумерация начинается с 0 страницы
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacanciesArchivedVacancyListResponse Успешный ответ
     * @throws ApiError
     */
    public static getArchivedVacancies1(
        employerId: string,
        hhUserAgent: string,
        managerId?: string,
        orderBy?: string,
        perPage?: number,
        page?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacanciesArchivedVacancyListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/vacancies/archived',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'manager_id': managerId,
                'order_by': orderBy,
                'per_page': perPage,
                'page': page,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Параметры переданы с ошибкой`,
                403: `Текущий пользователь не является работодателем, либо указан неверный идентификатор работодателя`,
                404: `У текущего пользователя нет прав на просмотр архивных вакансий`,
            },
        });
    }
    /**
     * Условия загрузки портфолио
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ArtifactsArtifactConditions Успешный ответ
     * @throws ApiError
     */
    public static getArtifactsPortfolioConditions(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ArtifactsArtifactConditions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artifacts/portfolio/conditions',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Редактирование артефакта
     * Метод позволяет отредактировать описание портфолио
     * @param id Идентификатор артефакта. Чтобы получить его, используйте метод [Получение портфолио](#tag/Rabota-s-artefaktami/operation/get-artifacts-portfolio)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param formData
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static editArtifact(
        id: string,
        hhUserAgent: string,
        formData: ArtifactsPortfolioDescription,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/artifacts/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Текущий пользователь не является соискателем`,
                404: `Артефакт не существует или не принадлежит текущему пользователю`,
            },
        });
    }
    /**
     * Удаление артефакта
     * @param id Идентификатор артефакта. Чтобы получить его, используйте метод [Получение портфолио](#tag/Rabota-s-artefaktami/operation/get-artifacts-portfolio) или [Получение фотографий](#tag/Rabota-s-artefaktami/operation/get-artifact-photos)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteArtifact(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/artifacts/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
                404: `Артефакт не существует или не принадлежит текущему пользователю`,
            },
        });
    }
    /**
     * Загрузка артефакта
     * Запрос загружает файл с локальной машины в сервис.
     *
     * Ограничения на типы файлов и их размер доступны в [условиях загрузки артефактов](#tag/Rabota-s-artefaktami).
     *
     * Для прикрепления загруженных изображений в резюме, необходимо передать `id` артефакта в [соответствующее поле резюме](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#resume-fields). Для удаления артефакта из резюме укажите `null`
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param formData
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ArtifactsArtifactItem Результат отправки файла
     * @throws ApiError
     */
    public static loadArtifact(
        hhUserAgent: string,
        formData: ArtifactsArtifactUploadBody,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ArtifactsArtifactItem> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/artifacts',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Ошибка в параметрах запроса или добавление изображения невозможно`,
                403: `Текущий пользователь не является соискателем`,
                413: `Изображение слишком большое`,
            },
        });
    }
    /**
     * Получение портфолио
     * Возвращает список ранее загруженных изображений с портфолио. Их можно использовать при создании/редактировании резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ArtifactsArtifactPortfolioResponse Успешный ответ
     * @throws ApiError
     */
    public static getArtifactsPortfolio(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ArtifactsArtifactPortfolioResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artifacts/portfolio',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Условия загрузки фотографий
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ArtifactsArtifactConditions Успешный ответ
     * @throws ApiError
     */
    public static getArtifactPhotosConditions(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ArtifactsArtifactConditions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artifacts/photo/conditions',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Получение фотографий
     * Возвращает список ранее загруженных изображений с фотографиями. Их можно использовать при создании/редактировании резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ArtifactsArtifactPhotoResponse Успешный ответ
     * @throws ApiError
     */
    public static getArtifactPhotos(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ArtifactsArtifactPhotoResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artifacts/photo',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Справочники полей
     * Справочники полей и сущностей, используемых в API. Значения в справочниках могут поменяться в любой момент
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesDictResponse Успешный ответ
     * @throws ApiError
     */
    public static getDictionaries(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesDictResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dictionaries',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Список всех языков
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesLangResponse Успешный ответ
     * @throws ApiError
     */
    public static getLanguages(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesLangResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/languages',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Основная информация об учебных заведениях
     * @param id Идентификаторы учебных заведений. Идентификатор конкретного заведения можно узнать в [подсказке](#tag/Podskazki/operation/get-educational-institutions-suggests). Передать можно не более 50 значений. Например: `?id=39196&id=45470&id=0`. Если был передан идентификатор несуществующего заведения, для него не вернется никакой информации
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SuggestsEducationalInstitutions Успешный ответ
     * @throws ApiError
     */
    public static getEducationalInstitutionsDictionary(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SuggestsEducationalInstitutions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/educational_institutions',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'id': id,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Неверные параметры запроса, либо ошибка [bulk-запроса](https://github.com/hhru/api/blob/master/docs/errors.md#bulk-request)`,
            },
        });
    }
    /**
     * Справочник ключевых навыков
     * Метод возвращает информацию по запрашиваемым ключевым навыкам.
     *
     * Значения в справочнике могут поменяться в любой момент
     *
     * @param id Идентификаторы ключевых навыков. Идентификатор конкретного навыка можно узнать по [подсказке](#tag/Podskazki/operation/get-skill-set-suggests). Передать можно не более 50 значений. Например: `?id=2716&id=3019&id=0`. Если был передан идентификатор несуществующего ключевого навыка, для него не вернется никакой информации
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesSkillsResponse Успешный ответ
     * @throws ApiError
     */
    public static getSkills(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesSkillsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/skills',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'id': id,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Неверные параметры запроса, либо ошибка [bulk-запроса](https://github.com/hhru/api/blob/master/docs/errors.md#bulk-request)`,
            },
        });
    }
    /**
     * Справочник профессиональных ролей
     * Возвращает профессиональные роли, их категории и другую информацию о профессиональных ролях
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ProfessionalRolesCatalog Успешный ответ
     * @throws ApiError
     */
    public static getProfessionalRolesDictionary(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ProfessionalRolesCatalog> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/professional_roles',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметре запроса`,
            },
        });
    }
    /**
     * Список факультетов учебного заведения
     * Возвращает список факультетов указанного учебного заведения
     * @param id Идентификатор учебного заведения, который можно узнать из [подсказки](#tag/Podskazki/operation/get-educational-institutions-suggests)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesFacultiesResponse Успешный ответ
     * @throws ApiError
     */
    public static getFaculties(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesFacultiesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/educational_institutions/{id}/faculties',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                404: `Указанное учебное заведение не существует`,
            },
        });
    }
    /**
     * Отрасли компаний
     * Возвращает двухуровневый справочник всех отраслей
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesIndustriesResponse Успешный ответ
     * @throws ApiError
     */
    public static getIndustries(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesIndustriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/industries',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Действия по отклику/приглашению коллекции
     * Запрос изменяет состояние работодательского (`employer_state`) или соискательского (`state`) состояния отклика/приглашения.
     *
     * #### Смена работодательского состояния отклика/приглашения
     *
     * > Доступные действия для каждого отклика/приглашения перечислены в массиве `employer_states` [списка откликов/приглашений](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations).
     *
     * Чтобы изменить состояние отклика, выполните запрос из параметра `actions[].url` [списка откликов/приглашений](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-collection-negotiations-list) для выбранного действия над откликом.
     * В запросе необходимо передать аргументы массива `actions[].arguments` в формате `application/x-www-form-urlencoded`.
     *
     * Примеры действий:
     *
     * * отложить отклик;
     * * пригласить соискателя на интервью в ответ на отклик;
     * * отказать соискателю.
     *
     * #### Смена соискательского состояния отклика/приглашения
     *
     * Изменение соискательского состояния отклика/приглашения влияет на [статистику по работе с откликами](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations-statistics-employer).
     *
     * Условие смены соискательского состояния отклика/приглашения — отправка сообщения соискателю любым из способов:
     *
     * - Совершить действие с откликом/приглашением, используя метод `/negotiations/{collection_name}/{nid}`, с сопроводительным сообщением.
     * - [Отправить сообщение](#tag/Otklikipriglasheniya-rabotodatelya/operation/send-negotiation-message) в отклике. Статус изменится, если перед отправкой использовался метод изменения работодательского статуса без сопроводительного сообщения.
     *
     * Соискательский статус в обоих случаях изменится или на приглашение (`invitation`), или на отказ (`discard`)
     *
     * @param collectionName Название коллекции. Возможные значения указаны в поле `collections[].id` [списка коллекций](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations)
     *
     * @param nid Идентификатор отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static changeNegotiationAction(
        collectionName: string,
        nid: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/negotiations/{collection_name}/{nid}',
            path: {
                'collection_name': collectionName,
                'nid': nid,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка параметров запроса`,
                403: `Невозможно выполнить действие по отклику/приглашению`,
                404: `Указанный отклик/приглашение не найден или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Действия по отклику/приглашению коллекции
     * Запрос изменяет состояние работодательского (`employer_state`) или соискательского (`state`) состояния отклика/приглашения.
     *
     * #### Смена работодательского состояния отклика/приглашения
     *
     * > Доступные действия для каждого отклика/приглашения перечислены в массиве `employer_states` [списка откликов/приглашений](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations).
     *
     * Чтобы изменить состояние отклика, выполните запрос из параметра `actions[].url` [списка откликов/приглашений](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-collection-negotiations-list) для выбранного действия над откликом.
     * В запросе необходимо передать аргументы массива `actions[].arguments` в формате `application/x-www-form-urlencoded`.
     *
     * Примеры действий:
     *
     * * отложить отклик;
     * * пригласить соискателя на интервью в ответ на отклик;
     * * отказать соискателю.
     *
     * #### Смена соискательского состояния отклика/приглашения
     *
     * Изменение соискательского состояния отклика/приглашения влияет на [статистику по работе с откликами](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations-statistics-employer).
     *
     * Условие смены соискательского состояния отклика/приглашения — отправка сообщения соискателю любым из способов:
     *
     * - Совершить действие с откликом/приглашением, используя метод `/negotiations/{collection_name}/{nid}`, с сопроводительным сообщением.
     * - [Отправить сообщение](#tag/Otklikipriglasheniya-rabotodatelya/operation/send-negotiation-message) в отклике. Статус изменится, если перед отправкой использовался метод изменения работодательского статуса без сопроводительного сообщения.
     *
     * Соискательский статус в обоих случаях изменится или на приглашение (`invitation`), или на отказ (`discard`)
     *
     * @param collectionName Название коллекции. Возможные значения указаны в поле `collections[].id` [списка коллекций](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations)
     *
     * @param nid Идентификатор отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static changeNegotiationAction1(
        collectionName: string,
        nid: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/negotiations/{collection_name}/{nid}',
            path: {
                'collection_name': collectionName,
                'nid': nid,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка параметров запроса`,
                403: `Невозможно выполнить действие по отклику/приглашению`,
                404: `Указанный отклик/приглашение не найден или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Отклик на вакансию
     * Запрос позволяет пользователю откликнуться на вакансию.
     *
     * Чтобы узнать, какими резюме возможно откликнуться на конкретную вакансию, воспользуйтесь [списком подходящих резюме](#tag/Rezyume.-Prosmotr-informacii/operation/get-suitable-resumes)
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param formData
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns string Результат отклика на обычную вакансию
     * @throws ApiError
     */
    public static applyToVacancy(
        hhUserAgent: string,
        formData: VacanciesVacancyApplicationBody,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/negotiations',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                303: `Результат отклика на вакансию с прямым откликом`,
                400: `Ошибка в параметрах запроса`,
                403: `Невозможно откликнуться на вакансию`,
            },
        });
    }
    /**
     * Список откликов/приглашений
     * Возвращает список откликов соискателя или список коллекций откликов/приглашений по [вакансии](#tag/Upravlenie-vakansiyami/operation/get-active-vacancy-list) работодателя.
     *
     * По умолчанию отклики сортируются по дате последнего обновления — от новых к старым.
     *
     * Чтобы получить список активных откликов, передайте в запросе параметр `?status=active`
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы
     * @param perPage Количество элементов на странице
     * @param orderBy Тип сортировки. Возможные значения указаны в поле `negotiations_order` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param order Направление сортировки. Возможные значения: `asc` — по возрастанию, `desc` — по убыванию
     * @param vacancyId Фильтр по ID вакансии. Обязательный для работодателя
     * @param status Запрос вернет только те отклики, которые находятся в определенном статусе.
     *
     * Возможные значения указаны в поле `applicant_negotiation_status` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param hasUpdates Если передан `true`, запрос вернет только те отклики, для которых есть непросмотренные сообщения. По умолчанию `false`
     *
     * @param withJobSearchStatus Если передан `true`, запрос вернет статус поиска работы кандидатом
     *
     * @param withGeneratedCollections Если передан `true`, запрос вернет информацию по [сгенерированным коллекциям](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md#term-collection) откликов/приглашений для данной вакансии.
     *
     * Чтобы получить выгрузку по нескольким коллекциям, запросите их последовательно. По умолчанию `false`
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsListResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiations(
        hhUserAgent: string,
        page?: number,
        perPage: number = 20,
        orderBy?: string,
        order?: string,
        vacancyId?: string,
        status?: string,
        hasUpdates?: boolean,
        withJobSearchStatus?: boolean,
        withGeneratedCollections: boolean = false,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'order_by': orderBy,
                'order': order,
                'vacancy_id': vacancyId,
                'status': status,
                'has_updates': hasUpdates,
                'with_job_search_status': withJobSearchStatus,
                'with_generated_collections': withGeneratedCollections,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка параметров запроса`,
                403: `Текущий пользователь не является соискателем`,
                404: `Указанная вакансия не существует или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Список откликов/приглашений
     * Возвращает список откликов соискателя или список коллекций откликов/приглашений по [вакансии](#tag/Upravlenie-vakansiyami/operation/get-active-vacancy-list) работодателя.
     *
     * По умолчанию отклики сортируются по дате последнего обновления — от новых к старым.
     *
     * Чтобы получить список активных откликов, передайте в запросе параметр `?status=active`
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы
     * @param perPage Количество элементов на странице
     * @param orderBy Тип сортировки. Возможные значения указаны в поле `negotiations_order` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param order Направление сортировки. Возможные значения: `asc` — по возрастанию, `desc` — по убыванию
     * @param vacancyId Фильтр по ID вакансии. Обязательный для работодателя
     * @param status Запрос вернет только те отклики, которые находятся в определенном статусе.
     *
     * Возможные значения указаны в поле `applicant_negotiation_status` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param hasUpdates Если передан `true`, запрос вернет только те отклики, для которых есть непросмотренные сообщения. По умолчанию `false`
     *
     * @param withJobSearchStatus Если передан `true`, запрос вернет статус поиска работы кандидатом
     *
     * @param withGeneratedCollections Если передан `true`, запрос вернет информацию по [сгенерированным коллекциям](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md#term-collection) откликов/приглашений для данной вакансии.
     *
     * Чтобы получить выгрузку по нескольким коллекциям, запросите их последовательно. По умолчанию `false`
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsListResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiations1(
        hhUserAgent: string,
        page?: number,
        perPage: number = 20,
        orderBy?: string,
        order?: string,
        vacancyId?: string,
        status?: string,
        hasUpdates?: boolean,
        withJobSearchStatus?: boolean,
        withGeneratedCollections: boolean = false,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'order_by': orderBy,
                'order': order,
                'vacancy_id': vacancyId,
                'status': status,
                'has_updates': hasUpdates,
                'with_job_search_status': withJobSearchStatus,
                'with_generated_collections': withGeneratedCollections,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка параметров запроса`,
                403: `Текущий пользователь не является соискателем`,
                404: `Указанная вакансия не существует или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Список откликов/приглашений
     * Возвращает список откликов соискателя или список коллекций откликов/приглашений по [вакансии](#tag/Upravlenie-vakansiyami/operation/get-active-vacancy-list) работодателя.
     *
     * По умолчанию отклики сортируются по дате последнего обновления — от новых к старым.
     *
     * Чтобы получить список активных откликов, передайте в запросе параметр `?status=active`
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы
     * @param perPage Количество элементов на странице
     * @param orderBy Тип сортировки. Возможные значения указаны в поле `negotiations_order` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param order Направление сортировки. Возможные значения: `asc` — по возрастанию, `desc` — по убыванию
     * @param vacancyId Фильтр по ID вакансии. Обязательный для работодателя
     * @param status Запрос вернет только те отклики, которые находятся в определенном статусе.
     *
     * Возможные значения указаны в поле `applicant_negotiation_status` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param hasUpdates Если передан `true`, запрос вернет только те отклики, для которых есть непросмотренные сообщения. По умолчанию `false`
     *
     * @param withJobSearchStatus Если передан `true`, запрос вернет статус поиска работы кандидатом
     *
     * @param withGeneratedCollections Если передан `true`, запрос вернет информацию по [сгенерированным коллекциям](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md#term-collection) откликов/приглашений для данной вакансии.
     *
     * Чтобы получить выгрузку по нескольким коллекциям, запросите их последовательно. По умолчанию `false`
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsListResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiations2(
        hhUserAgent: string,
        page?: number,
        perPage: number = 20,
        orderBy?: string,
        order?: string,
        vacancyId?: string,
        status?: string,
        hasUpdates?: boolean,
        withJobSearchStatus?: boolean,
        withGeneratedCollections: boolean = false,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'order_by': orderBy,
                'order': order,
                'vacancy_id': vacancyId,
                'status': status,
                'has_updates': hasUpdates,
                'with_job_search_status': withJobSearchStatus,
                'with_generated_collections': withGeneratedCollections,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка параметров запроса`,
                403: `Текущий пользователь не является соискателем`,
                404: `Указанная вакансия не существует или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Статистика откликов для менеджера
     * Запрос выводит статистику по работе с откликами для вакансий менеджера за период (30 дней). Статистика менеджера доступна самому менеджеру, а также менеджерам с [типом](#tag/Menedzhery-rabotodatelya/operation/get-employer-manager-types) `main_contact_person`.
     *
     * Дополнительно рассчитывается [индекс вежливости](https://hh.ru/article/23734) менеджера по всем вакансиям
     *
     * @param employerId Идентификатор работодателя
     * @param managerId Идентификатор менеджера
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsNegotiationsStatisticsManagerResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiationsStatisticsManager(
        employerId: string,
        managerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsNegotiationsStatisticsManagerResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/managers/{manager_id}/negotiations_statistics',
            path: {
                'employer_id': employerId,
                'manager_id': managerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является менеджером или работодателем`,
                404: `Запрашиваемый работодатель или менеджер не существует или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Статистика откликов для менеджера
     * Запрос выводит статистику по работе с откликами для вакансий менеджера за период (30 дней). Статистика менеджера доступна самому менеджеру, а также менеджерам с [типом](#tag/Menedzhery-rabotodatelya/operation/get-employer-manager-types) `main_contact_person`.
     *
     * Дополнительно рассчитывается [индекс вежливости](https://hh.ru/article/23734) менеджера по всем вакансиям
     *
     * @param employerId Идентификатор работодателя
     * @param managerId Идентификатор менеджера
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsNegotiationsStatisticsManagerResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiationsStatisticsManager1(
        employerId: string,
        managerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsNegotiationsStatisticsManagerResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/managers/{manager_id}/negotiations_statistics',
            path: {
                'employer_id': employerId,
                'manager_id': managerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является менеджером или работодателем`,
                404: `Запрашиваемый работодатель или менеджер не существует или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * @deprecated
     * Список активных откликов
     * Возвращает список активных откликов соискателя.
     *
     * Запрос является устаревшим и поддерживается для обратной совместимости. Вместо него используйте [запрос списка откликов](#tag/Perepiska-(otklikipriglasheniya)-dlya-soiskatelya/operation/get-negotiations) с параметром `?status=active`
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы
     * @param perPage Количество элементов на странице
     * @param orderBy Тип сортировки. Возможные значения указаны в поле `negotiations_order` [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param order Направление сортировки. Возможные значения: `asc` — по возрастанию, `desc` — по убыванию
     * @param vacancyId Фильтр по ID вакансии
     * @param hasUpdates Если передан `true`, запрос вернет только те отклики, для которых есть непросмотренные сообщения. По умолчанию `false`
     *
     * @param withJobSearchStatus Если передан `true`, запрос вернет статус поиска работы кандидатом
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsListResponse Успешный ответ
     * @throws ApiError
     */
    public static getActiveNegotiations(
        hhUserAgent: string,
        page?: number,
        perPage: number = 20,
        orderBy?: string,
        order?: string,
        vacancyId?: string,
        hasUpdates?: boolean,
        withJobSearchStatus?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations/active',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'order_by': orderBy,
                'order': order,
                'vacancy_id': vacancyId,
                'has_updates': hasUpdates,
                'with_job_search_status': withJobSearchStatus,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка параметров запроса`,
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Список шаблонов ответов для отклика/приглашения
     * Метод требует наличия [платного доступа для работодателя](#operation/get-payable-api-method-access).
     *
     * Возвращает список шаблонов ответов для отклика/приглашения или резюме. Может использоваться в отправляемых соискателю приглашениях на вакансию или [действиях по откликам/приглашениям](#tag/Otklikipriglasheniya-rabotodatelya/operation/put-negotiations-collection-to-next-state).
     *
     * > Количество доступных шаблонов будет зависеть от конкретного отклика/приглашения или вакансии и их статусов.
     *
     * Рекомендуется использовать URL из поля `templates.url` в [списке откликов/приглашений](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations). Примеры:
     *
     * ```
     * GET /message_templates/{template}?topic_id={topic_id}
     * GET /message_templates/{template}?vacancy_id={vacancy_id}&resume_id={resume_id}
     * ```
     *
     * @param template Название шаблона. Возможные варианты:
     *
     * * `invite` — текст при приглашении соискателя на вакансию;
     * * `invite_after_response` — текст при [приглашении после отклика со стороны соискателя](#tag/Otklikipriglasheniya-rabotodatelya/operation/put-negotiations-collection-to-next-state);
     * * `discard_after_response` — текст при [отказе после отклика](#tag/Otklikipriglasheniya-rabotodatelya/operation/put-negotiations-collection-to-next-state);
     * * `discard_after_interview` — текст при [отказе после приглашения соискателя на интервью](#tag/Otklikipriglasheniya-rabotodatelya/operation/put-negotiations-collection-to-next-state).
     *
     * Список шаблонов может быть расширен
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param topicId Идентификатор существующего отклика/приглашения. Не может передаваться одновременно с другими параметрами
     * @param vacancyId Идентификатор вакансии для приглашения. Передается только вместе с параметром `resume_id`
     * @param resumeId Идентификатор резюме для приглашения на вакансию. Передается только вместе с параметром `vacancy_id`
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsNegotiationMessageTemplates Успешный ответ
     * @throws ApiError
     */
    public static getNegotiationMessageTemplates(
        template: string,
        hhUserAgent: string,
        topicId?: string,
        vacancyId?: string,
        resumeId?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsNegotiationMessageTemplates> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/message_templates/{template}',
            path: {
                'template': template,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'topic_id': topicId,
                'vacancy_id': vacancyId,
                'resume_id': resumeId,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Переданы конфликтующие параметры запроса (\`topic_id\` одновременно с \`resume_id\` или \`vacancy_id\`) или параметры не переданы совсем. Расшифровка возможных ошибок:
                 * \`topic_id\` — 1) указанного отклика/приглашения не существует, либо у текущего пользователя нет к нему доступа; 2) вакансия из отклика/приглашения была заархивирована; 3) резюме из отклика/приглашения было скрыто/удалено;
                 * \`resume_id\` — указанного резюме не существует, либо у текущего пользователя нет к нему доступа;
                 * \`vacancy_id\` — 1) указанной вакансии не существует; 2) вакансия скрыта/заархивирована; 3) у текущего пользователя нет доступа к вакансии
                `,
                403: `Ошибка авторизации, либо отсутствует доступ к платному методу`,
                404: `Запрашиваемый шаблон не существует`,
            },
        });
    }
    /**
     * Список откликов/приглашений коллекции
     * Возвращает список откликов/приглашений для заданной коллекции. URL для запроса необходимо брать из поля `collections[].url` [списка коллекций](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations).
     *
     * > Вместо `response` необходимо указывать параметр `{collection_name}` — название коллекции. Возможные значения указаны в поле `collections[].id` [списка коллекций](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations).
     *
     * В ответе будет только основная информация о резюме. Чтобы получить дополнительную информацию, например, контактный телефон, необходимо [запросить полное резюме](#tag/Upravlenie-vakansiyami/operation/get-vacancy).
     *
     * Некоторые параметры запроса могут принимать множественные значения: `key=value&key=value`. Если параметр может принимать несколько значений, об этом явно указано в его описании. Неизвестные параметры и параметры с ошибкой в названии игнорируются.
     *
     * > Коллекция `phone_calls` принимает только параметры `vacancy_id`, `order_by`, `page` и `per_page`
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param orderBy Тип сортировки. Возможные значения указаны в поле `order_types` [списка коллекций](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations)
     *
     * @param page Порядковый номер страницы в выдаче. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). По умолчанию нумерация начинается с 0 страницы
     *
     * @param perPage Количество элементов на странице выдачи. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). Максимальное значение — `50`
     *
     * @param ageFrom Нижняя граница возраста соискателя в годах
     * @param ageTo Верхняя граница возраста соискателя в годах
     * @param area Регион. Возможные значения указаны в [справочнике регионов](#tag/Obshie-spravochniki/operation/get-areas). Можно указать несколько значений.
     *
     * По умолчанию выбираются резюме, в которых соискатели живут в указанных регионах или готовы в них переехать. Поменять это поведение поиска можно, указав параметр `relocation`
     *
     * @param citizenship Страна гражданства соискателя. Возможные значения перечислены в [справочнике стран](#tag/Obshie-spravochniki/operation/get-countries). Можно указать несколько значений
     *
     * @param currency Код валюты. Возможные значения перечислены в поле `currency.code` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param driverLicenseTypes Категории водительских прав соискателя. Возможные значения перечислены в поле `driver_license_types` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param educationalInstitution Учебные заведения соискателя. В качестве параметров используются [подсказки по названиям университетов](#tag/Podskazki/operation/get-educational-institutions-suggests). Можно указать несколько значений
     *
     * @param educationLevel Уровень образования. Возможные значения перечислены в поле `education_level` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Если параметр не указан, поиск ведется без ограничений на уровень образования
     *
     * @param experience Опыт работы. Возможные значения перечислены в поле `experience` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param gender Пол соискателя. Возможные значения перечислены в поле `gender` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries).
     *
     * По умолчанию вне зависимости от значения параметра будут найдены резюме, в которых пол не указан, исключить из поисковой выдачи такие резюме можно с помощью параметра `label=only_with_gender`
     *
     * @param language Знание языка. Можно указать несколько значений. Задается в формате `language.level`, где:
     *
     * * `language` — значение из [справочника языков](#tag/Obshie-spravochniki/operation/get-languages);
     * * `level` — значение поля language_level из [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * Например, `ita.c2`
     *
     * @param relocation Готовность к переезду. Возможные значения указаны в поле `resume_search_relocation` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Необходимо указывать вместе с параметром `area`
     *
     * @param salaryFrom Нижняя граница желаемой заработной платы (ЗП)
     * @param salaryTo Верхняя граница желаемой заработной платы (ЗП)
     * @param searchRadiusMeters Расстояние до кандидата (в метрах)
     * @param searchText Поисковая строка
     * @param showOnlyNewResponses Показывать только непросмотренные отклики коллекции «Все неразобранные» (`/response`)
     *
     * @param showOnlyWithVehicle Показывать соискателей с личным автомобилем
     * @param showOnlyNew Показывать только отклики, в которых есть непрочитанные сообщения для всех коллекций, кроме «Все неразобранные» (`/response`)
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsCollectionNegotiationsResponse Успешный ответ
     * @throws ApiError
     */
    public static getCollectionNegotiationsList(
        vacancyId: string,
        hhUserAgent: string,
        orderBy?: string,
        page?: number,
        perPage: number = 20,
        ageFrom?: string,
        ageTo?: string,
        area?: string,
        citizenship?: string,
        currency?: string,
        driverLicenseTypes?: string,
        educationalInstitution?: string,
        educationLevel?: string,
        experience?: string,
        gender?: string,
        language?: string,
        relocation?: string,
        salaryFrom?: number,
        salaryTo?: number,
        searchRadiusMeters?: number,
        searchText?: string,
        showOnlyNewResponses?: boolean,
        showOnlyWithVehicle?: boolean,
        showOnlyNew?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsCollectionNegotiationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations/response',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'vacancy_id': vacancyId,
                'order_by': orderBy,
                'page': page,
                'per_page': perPage,
                'age_from': ageFrom,
                'age_to': ageTo,
                'area': area,
                'citizenship': citizenship,
                'currency': currency,
                'driver_license_types': driverLicenseTypes,
                'educational_institution': educationalInstitution,
                'education_level': educationLevel,
                'experience': experience,
                'gender': gender,
                'language': language,
                'relocation': relocation,
                'salary_from': salaryFrom,
                'salary_to': salaryTo,
                'search_radius_meters': searchRadiusMeters,
                'search_text': searchText,
                'show_only_new_responses': showOnlyNewResponses,
                'show_only_with_vehicle': showOnlyWithVehicle,
                'show_only_new': showOnlyNew,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Текущий пользователь не является работодателем или не имеет доступа к методу`,
                404: `Запрашиваемая вакансия не существует или недоступна для текущего пользователя`,
            },
        });
    }
    /**
     * Список откликов/приглашений коллекции
     * Возвращает список откликов/приглашений для заданной коллекции. URL для запроса необходимо брать из поля `collections[].url` [списка коллекций](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations).
     *
     * > Вместо `response` необходимо указывать параметр `{collection_name}` — название коллекции. Возможные значения указаны в поле `collections[].id` [списка коллекций](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations).
     *
     * В ответе будет только основная информация о резюме. Чтобы получить дополнительную информацию, например, контактный телефон, необходимо [запросить полное резюме](#tag/Upravlenie-vakansiyami/operation/get-vacancy).
     *
     * Некоторые параметры запроса могут принимать множественные значения: `key=value&key=value`. Если параметр может принимать несколько значений, об этом явно указано в его описании. Неизвестные параметры и параметры с ошибкой в названии игнорируются.
     *
     * > Коллекция `phone_calls` принимает только параметры `vacancy_id`, `order_by`, `page` и `per_page`
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param orderBy Тип сортировки. Возможные значения указаны в поле `order_types` [списка коллекций](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations)
     *
     * @param page Порядковый номер страницы в выдаче. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). По умолчанию нумерация начинается с 0 страницы
     *
     * @param perPage Количество элементов на странице выдачи. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). Максимальное значение — `50`
     *
     * @param ageFrom Нижняя граница возраста соискателя в годах
     * @param ageTo Верхняя граница возраста соискателя в годах
     * @param area Регион. Возможные значения указаны в [справочнике регионов](#tag/Obshie-spravochniki/operation/get-areas). Можно указать несколько значений.
     *
     * По умолчанию выбираются резюме, в которых соискатели живут в указанных регионах или готовы в них переехать. Поменять это поведение поиска можно, указав параметр `relocation`
     *
     * @param citizenship Страна гражданства соискателя. Возможные значения перечислены в [справочнике стран](#tag/Obshie-spravochniki/operation/get-countries). Можно указать несколько значений
     *
     * @param currency Код валюты. Возможные значения перечислены в поле `currency.code` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param driverLicenseTypes Категории водительских прав соискателя. Возможные значения перечислены в поле `driver_license_types` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param educationalInstitution Учебные заведения соискателя. В качестве параметров используются [подсказки по названиям университетов](#tag/Podskazki/operation/get-educational-institutions-suggests). Можно указать несколько значений
     *
     * @param educationLevel Уровень образования. Возможные значения перечислены в поле `education_level` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Если параметр не указан, поиск ведется без ограничений на уровень образования
     *
     * @param experience Опыт работы. Возможные значения перечислены в поле `experience` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param gender Пол соискателя. Возможные значения перечислены в поле `gender` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries).
     *
     * По умолчанию вне зависимости от значения параметра будут найдены резюме, в которых пол не указан, исключить из поисковой выдачи такие резюме можно с помощью параметра `label=only_with_gender`
     *
     * @param language Знание языка. Можно указать несколько значений. Задается в формате `language.level`, где:
     *
     * * `language` — значение из [справочника языков](#tag/Obshie-spravochniki/operation/get-languages);
     * * `level` — значение поля language_level из [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * Например, `ita.c2`
     *
     * @param relocation Готовность к переезду. Возможные значения указаны в поле `resume_search_relocation` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Необходимо указывать вместе с параметром `area`
     *
     * @param salaryFrom Нижняя граница желаемой заработной платы (ЗП)
     * @param salaryTo Верхняя граница желаемой заработной платы (ЗП)
     * @param searchRadiusMeters Расстояние до кандидата (в метрах)
     * @param searchText Поисковая строка
     * @param showOnlyNewResponses Показывать только непросмотренные отклики коллекции «Все неразобранные» (`/response`)
     *
     * @param showOnlyWithVehicle Показывать соискателей с личным автомобилем
     * @param showOnlyNew Показывать только отклики, в которых есть непрочитанные сообщения для всех коллекций, кроме «Все неразобранные» (`/response`)
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsCollectionNegotiationsResponse Успешный ответ
     * @throws ApiError
     */
    public static getCollectionNegotiationsList1(
        vacancyId: string,
        hhUserAgent: string,
        orderBy?: string,
        page?: number,
        perPage: number = 20,
        ageFrom?: string,
        ageTo?: string,
        area?: string,
        citizenship?: string,
        currency?: string,
        driverLicenseTypes?: string,
        educationalInstitution?: string,
        educationLevel?: string,
        experience?: string,
        gender?: string,
        language?: string,
        relocation?: string,
        salaryFrom?: number,
        salaryTo?: number,
        searchRadiusMeters?: number,
        searchText?: string,
        showOnlyNewResponses?: boolean,
        showOnlyWithVehicle?: boolean,
        showOnlyNew?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsCollectionNegotiationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations/response',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'vacancy_id': vacancyId,
                'order_by': orderBy,
                'page': page,
                'per_page': perPage,
                'age_from': ageFrom,
                'age_to': ageTo,
                'area': area,
                'citizenship': citizenship,
                'currency': currency,
                'driver_license_types': driverLicenseTypes,
                'educational_institution': educationalInstitution,
                'education_level': educationLevel,
                'experience': experience,
                'gender': gender,
                'language': language,
                'relocation': relocation,
                'salary_from': salaryFrom,
                'salary_to': salaryTo,
                'search_radius_meters': searchRadiusMeters,
                'search_text': searchText,
                'show_only_new_responses': showOnlyNewResponses,
                'show_only_with_vehicle': showOnlyWithVehicle,
                'show_only_new': showOnlyNew,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Текущий пользователь не является работодателем или не имеет доступа к методу`,
                404: `Запрашиваемая вакансия не существует или недоступна для текущего пользователя`,
            },
        });
    }
    /**
     * Пригласить соискателя на вакансию
     * Запрос формирует приглашение на вакансию для соискателя по инициативе работодателя.
     *
     * > Вместо `phone_interview` необходимо сформировать запрос из параметра `negotiations_actions[].url` [списка подходящих вакансий к резюме](#tag/Upravlenie-vakansiyami/operation/get-active-vacancy-list), передав аргументы из массива `negotiations_actions[].arguments`.
     *
     * Пример запроса:
     *
     * ```
     * POST /negotiations/phone_interview?resume_id=123456&vacancy_id=654321&message=new_msg
     * ```
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns string Результат приглашения на вакансию
     * @throws ApiError
     */
    public static inviteApplicantToVacancy(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Идентификатор резюме
             */
            resume_id: string;
            /**
             * Идентификатор вакансии
             */
            vacancy_id: string;
            /**
             * Сообщение, которое будет отправлено соискателю на электронную почту. Используйте [шаблоны](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-mail-templates) для получения текстов
             */
            message?: string;
            /**
             * Если установлено `true`, соискателю будет отправлено SMS-уведомление о приглашении. Обратите внимание, что в SMS-сообщении используется стандартный текст, изменить его нельзя
             */
            send_sms?: boolean;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/negotiations/phone_interview',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Невозможно пригласить на вакансию`,
            },
        });
    }
    /**
     * Пригласить соискателя на вакансию
     * Запрос формирует приглашение на вакансию для соискателя по инициативе работодателя.
     *
     * > Вместо `phone_interview` необходимо сформировать запрос из параметра `negotiations_actions[].url` [списка подходящих вакансий к резюме](#tag/Upravlenie-vakansiyami/operation/get-active-vacancy-list), передав аргументы из массива `negotiations_actions[].arguments`.
     *
     * Пример запроса:
     *
     * ```
     * POST /negotiations/phone_interview?resume_id=123456&vacancy_id=654321&message=new_msg
     * ```
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns string Результат приглашения на вакансию
     * @throws ApiError
     */
    public static inviteApplicantToVacancy1(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Идентификатор резюме
             */
            resume_id: string;
            /**
             * Идентификатор вакансии
             */
            vacancy_id: string;
            /**
             * Сообщение, которое будет отправлено соискателю на электронную почту. Используйте [шаблоны](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-mail-templates) для получения текстов
             */
            message?: string;
            /**
             * Если установлено `true`, соискателю будет отправлено SMS-уведомление о приглашении. Обратите внимание, что в SMS-сообщении используется стандартный текст, изменить его нельзя
             */
            send_sms?: boolean;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/negotiations/phone_interview',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Невозможно пригласить на вакансию`,
            },
        });
    }
    /**
     * Получить результаты тестов, прикрепленных к вакансии
     * Запрос возвращает информацию о пройденных тестах откликнувшегося соискателя
     * @param nid Идентификатор отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsNegotiationTestResultsResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiationTestResults(
        nid: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsNegotiationTestResultsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations/{nid}/test/solution',
            path: {
                'nid': nid,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Указанный отклик/приглашение не найден или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Получить результаты тестов, прикрепленных к вакансии
     * Запрос возвращает информацию о пройденных тестах откликнувшегося соискателя
     * @param nid Идентификатор отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsNegotiationTestResultsResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiationTestResults1(
        nid: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsNegotiationTestResultsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations/{nid}/test/solution',
            path: {
                'nid': nid,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Указанный отклик/приглашение не найден или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Редактирование сообщения в отклике
     * На данный момент доступно редактирование только сообщения при отклике.
     *
     * Текст сообщения можно редактировать после отправки при соблюдении следующих условий:
     * - сообщение еще не прочитано другой стороной;
     * - вакансия, на которую отправлялся отклик, должна быть активна (не в архиве);
     * - резюме из отклика не должно быть скрыто или удалено.
     *
     * Условия могут измениться.
     *
     * У каждого сообщения в [списке сообщений в отклике](https://github.com/hhru/api/blob/master/docs/negotiations.md#%D0%BF%D1%80%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B9-%D0%B2-%D0%BE%D1%82%D0%BA%D0%BB%D0%B8%D0%BA%D0%B5) в поле `editable` указана возможность редактирования
     *
     * @param nid Идентификатор отклика
     * @param mid Идентификатор сообщения в отклике
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static editNegotiationMessage(
        nid: string,
        mid: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/negotiations/{nid}/messages/{mid}',
            path: {
                'nid': nid,
                'mid': mid,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Выбранное сообщение не может быть отредактировано`,
                404: `Указанный отклик или сообщение не были найдены`,
            },
        });
    }
    /**
     * Отметить отклики прочитанными
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns void
     * @throws ApiError
     */
    public static postNegotiationsTopicsRead(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Идентификаторы откликов
             */
            topic_id: string;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/negotiations/read',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Текущий пользователь не является работодателем`,
                404: `Топик не существует или недоступен для текущего пользователя`,
            },
        });
    }
    /**
     * Отметить отклики прочитанными
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns void
     * @throws ApiError
     */
    public static postNegotiationsTopicsRead1(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Идентификаторы откликов
             */
            topic_id: string;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/negotiations/read',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Текущий пользователь не является работодателем`,
                404: `Топик не существует или недоступен для текущего пользователя`,
            },
        });
    }
    /**
     * Скрыть отклик
     * @param nid Идентификатор отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param withDeclineMessage Должно ли быть отправлено работодателю сообщение об отказе, по умолчанию `false`. Возможность отправить сообщение об отказе определяется полем `decline_allowed` получаемым при запросе [списка откликов или одного отклика](https://github.com/hhru/api/blob/e2a0ac4e174a6b56272f78348c05958f5db1b392/docs/negotiations.md#get_negotiation)
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static hideActiveResponse(
        nid: string,
        hhUserAgent: string,
        withDeclineMessage?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/negotiations/active/{nid}',
            path: {
                'nid': nid,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'with_decline_message': withDeclineMessage,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Невозможно отправить сообщение об отказе`,
                404: `Отклик не существует`,
                425: `Чат отклика еще не готов`,
            },
        });
    }
    /**
     * Просмотр отклика/приглашения
     * Запрос возвращает информацию об отклике/приглашении по его ID.
     *
     * Работодатель может получить URL для запроса из [списка откликов/приглашений](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-collection-negotiations-list) (поле `items[].url`).
     *
     * > !! Обратите внимание, что методы для работы с сообщениями в рамках отклика/приглашения от имени [соискателя](#tag/Perepiska-(otklikipriglasheniya)-dlya-soiskatelya/operation/get-negotiation-messages) и [менеджера работодателя](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-messages) устарели, и новые возможности [чатов](https://feedback.hh.ru/knowledge-base/article/1290) в них не будут поддерживаться
     *
     * @param id Идентификатор отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsNegotiationGetResponse Отклик/приглашение получено
     * @throws ApiError
     */
    public static getNegotiationItem(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsNegotiationGetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Указанный отклик/приглашение не найден или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Просмотр отклика/приглашения
     * Запрос возвращает информацию об отклике/приглашении по его ID.
     *
     * Работодатель может получить URL для запроса из [списка откликов/приглашений](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-collection-negotiations-list) (поле `items[].url`).
     *
     * > !! Обратите внимание, что методы для работы с сообщениями в рамках отклика/приглашения от имени [соискателя](#tag/Perepiska-(otklikipriglasheniya)-dlya-soiskatelya/operation/get-negotiation-messages) и [менеджера работодателя](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-messages) устарели, и новые возможности [чатов](https://feedback.hh.ru/knowledge-base/article/1290) в них не будут поддерживаться
     *
     * @param id Идентификатор отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsNegotiationGetResponse Отклик/приглашение получено
     * @throws ApiError
     */
    public static getNegotiationItem1(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsNegotiationGetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Указанный отклик/приглашение не найден или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Действия по откликам/приглашениям
     * Работодатель может изменять состояние (state) отклика для соискателя, чтобы повысить качество обратной связи и упростить работу со статистикой откликов.
     *
     * Если работодатель, используя данный метод, отправляет соискателю сообщение об изменении состояния отклика/приглашения (поле `message` в теле запроса), это приведет также к изменению соискательского состояния отклика/приглашения.
     *
     * Обязательность аргументов в теле запроса отличается для разных откликов/приглашений. Проверить, является ли аргумент обязательным можно в поле `actions.arguments`, которое возвращается для каждого отклика в [списке откликов/приглашений](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md#действия-по-откликуприглашению-actions)
     *
     * @param id Идентификатор [коллекции](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations) топиков, в которую будет перенесено состояние отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns void
     * @throws ApiError
     */
    public static putNegotiationsCollectionToNextState(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Идентификаторы откликов. Допускается передавать не более 50 идентификаторов,
             * перечисляя их через амперсанд, например: `topic_id=1&topic_id=2&topic_id=3...&topic_id=50`
             *
             */
            topic_id: string;
            /**
             * Идентификатор [адреса](https://api.hh.ru/openapi/redoc#tag/Adresa-rabotodatelya), который будет указан в приглашении
             */
            address_id?: string;
            /**
             * Сообщение, которое будет отправлено соискателю на электронную почту. Используйте [шаблоны](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-mail-templates) для получения текстов
             */
            message?: string;
            /**
             * Если установлено `true`, соискателю будет отправлено SMS-уведомление о приглашении. Обратите внимание, что в SMS-сообщении используется стандартный текст, изменить его нельзя
             */
            send_sms?: boolean;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/negotiations/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Ошибка доступа к отклику/приглашению`,
                404: `Топик не существует или недоступен для текущего пользователя`,
            },
        });
    }
    /**
     * Действия по откликам/приглашениям
     * Работодатель может изменять состояние (state) отклика для соискателя, чтобы повысить качество обратной связи и упростить работу со статистикой откликов.
     *
     * Если работодатель, используя данный метод, отправляет соискателю сообщение об изменении состояния отклика/приглашения (поле `message` в теле запроса), это приведет также к изменению соискательского состояния отклика/приглашения.
     *
     * Обязательность аргументов в теле запроса отличается для разных откликов/приглашений. Проверить, является ли аргумент обязательным можно в поле `actions.arguments`, которое возвращается для каждого отклика в [списке откликов/приглашений](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md#действия-по-откликуприглашению-actions)
     *
     * @param id Идентификатор [коллекции](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations) топиков, в которую будет перенесено состояние отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns void
     * @throws ApiError
     */
    public static putNegotiationsCollectionToNextState1(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Идентификаторы откликов. Допускается передавать не более 50 идентификаторов,
             * перечисляя их через амперсанд, например: `topic_id=1&topic_id=2&topic_id=3...&topic_id=50`
             *
             */
            topic_id: string;
            /**
             * Идентификатор [адреса](https://api.hh.ru/openapi/redoc#tag/Adresa-rabotodatelya), который будет указан в приглашении
             */
            address_id?: string;
            /**
             * Сообщение, которое будет отправлено соискателю на электронную почту. Используйте [шаблоны](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-mail-templates) для получения текстов
             */
            message?: string;
            /**
             * Если установлено `true`, соискателю будет отправлено SMS-уведомление о приглашении. Обратите внимание, что в SMS-сообщении используется стандартный текст, изменить его нельзя
             */
            send_sms?: boolean;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/negotiations/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Ошибка доступа к отклику/приглашению`,
                404: `Топик не существует или недоступен для текущего пользователя`,
            },
        });
    }
    /**
     * Статистика откликов для компании
     * Запрос выводит статистику по работе с откликами для вакансий компании за период (30 дней).
     *
     * Дополнительно рассчитывается [индекс вежливости](https://hh.ru/article/23734) компании по всем вакансиям
     *
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsNegotiationsStatisticsEmployerResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiationsStatisticsEmployer(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsNegotiationsStatisticsEmployerResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/negotiations_statistics',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Запрашиваемый работодатель не существует или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Статистика откликов для компании
     * Запрос выводит статистику по работе с откликами для вакансий компании за период (30 дней).
     *
     * Дополнительно рассчитывается [индекс вежливости](https://hh.ru/article/23734) компании по всем вакансиям
     *
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsNegotiationsStatisticsEmployerResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiationsStatisticsEmployer1(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsNegotiationsStatisticsEmployerResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/negotiations_statistics',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Запрашиваемый работодатель не существует или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Отправка нового сообщения
     * Запрос отправляет новое сообщение в рамках переписки.
     *
     * Отправить новое сообщение можно, если:
     *
     * * Работодатель пригласил соискателя на вакансию.
     * * Соискатель оставил отклик на вакансию.
     *
     * Если вакансия была отправлена в архив или соискатель удалил резюме, переписка будет недоступна. Работодатель также может вручную отключить переписку для вакансии.
     *
     * ‼️ Обратите внимание, что методы для работы с сообщениями в рамках отклика/приглашения от имени [соискателя](#tag/Perepiska-(otklikipriglasheniya)-dlya-soiskatelya/operation/get-negotiation-messages) и
     * [менеджера работодателя](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-messages) устарели, и новые возможности [чатов](https://feedback.hh.ru/knowledge-base/article/1290) в них не будут поддерживаться.
     * В связи с этим переписка может некорректно отображаться
     *
     * @param nid Идентификатор отклика/приглашения
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns NegotiationsMessageSent Сообщение отправлено. Обратите внимание:
     * для работодателя возвращаемый `Content-type: text/html`, а для соискателя - `application/json`
     *
     * @throws ApiError
     */
    public static sendNegotiationMessage(
        nid: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Сообщение отклика/приглашения
             */
            message?: string;
        },
    ): CancelablePromise<NegotiationsMessageSent> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/negotiations/{nid}/messages',
            path: {
                'nid': nid,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Не удалось отправить сообщение`,
                404: `Указанный отклик/приглашение не найден или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Отправка нового сообщения
     * Запрос отправляет новое сообщение в рамках переписки.
     *
     * Отправить новое сообщение можно, если:
     *
     * * Работодатель пригласил соискателя на вакансию.
     * * Соискатель оставил отклик на вакансию.
     *
     * Если вакансия была отправлена в архив или соискатель удалил резюме, переписка будет недоступна. Работодатель также может вручную отключить переписку для вакансии.
     *
     * ‼️ Обратите внимание, что методы для работы с сообщениями в рамках отклика/приглашения от имени [соискателя](#tag/Perepiska-(otklikipriglasheniya)-dlya-soiskatelya/operation/get-negotiation-messages) и
     * [менеджера работодателя](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-messages) устарели, и новые возможности [чатов](https://feedback.hh.ru/knowledge-base/article/1290) в них не будут поддерживаться.
     * В связи с этим переписка может некорректно отображаться
     *
     * @param nid Идентификатор отклика/приглашения
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns NegotiationsMessageSent Сообщение отправлено. Обратите внимание:
     * для работодателя возвращаемый `Content-type: text/html`, а для соискателя - `application/json`
     *
     * @throws ApiError
     */
    public static sendNegotiationMessage1(
        nid: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Сообщение отклика/приглашения
             */
            message?: string;
        },
    ): CancelablePromise<NegotiationsMessageSent> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/negotiations/{nid}/messages',
            path: {
                'nid': nid,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Не удалось отправить сообщение`,
                404: `Указанный отклик/приглашение не найден или у текущего пользователя нет доступа`,
            },
        });
    }
    /**
     * Просмотр списка сообщений в отклике/приглашении
     * Запрос возвращает список всех сообщений выбранного отклика/приглашения. Работодатель может посмотреть список по URL, указанному в поле `messages` [списка откликов/приглашений](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations) или в [отдельном отклике](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-item).
     *
     * Типы сообщений:
     *
     * * сопроводительное письмо соискателя;
     * * сопроводительное письмо работодателя при смене статуса отклика;
     * * свободная переписка между соискателем и работодателем.
     *
     * ‼️ Обратите внимание, что методы для работы с сообщениями в рамках отклика/приглашения от имени [соискателя](#tag/Perepiska-(otklikipriglasheniya)-dlya-soiskatelya/operation/get-negotiation-messages) и
     * [менеджера работодателя](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-messages) устарели, и новые возможности [чатов](https://feedback.hh.ru/knowledge-base/article/1290) в них не будут поддерживаться.
     * В связи с этим переписка может некорректно отображаться
     *
     * @param nid Идентификатор отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param withTextOnly Вернуть непустые сообщения (содержат текст в параметре `text`)
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsMessagesGetResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiationMessages(
        nid: string,
        hhUserAgent: string,
        withTextOnly: boolean = false,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsMessagesGetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations/{nid}/messages',
            path: {
                'nid': nid,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'with_text_only': withTextOnly,
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Просмотр списка сообщений в отклике/приглашении
     * Запрос возвращает список всех сообщений выбранного отклика/приглашения. Работодатель может посмотреть список по URL, указанному в поле `messages` [списка откликов/приглашений](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations) или в [отдельном отклике](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-item).
     *
     * Типы сообщений:
     *
     * * сопроводительное письмо соискателя;
     * * сопроводительное письмо работодателя при смене статуса отклика;
     * * свободная переписка между соискателем и работодателем.
     *
     * ‼️ Обратите внимание, что методы для работы с сообщениями в рамках отклика/приглашения от имени [соискателя](#tag/Perepiska-(otklikipriglasheniya)-dlya-soiskatelya/operation/get-negotiation-messages) и
     * [менеджера работодателя](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-messages) устарели, и новые возможности [чатов](https://feedback.hh.ru/knowledge-base/article/1290) в них не будут поддерживаться.
     * В связи с этим переписка может некорректно отображаться
     *
     * @param nid Идентификатор отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param withTextOnly Вернуть непустые сообщения (содержат текст в параметре `text`)
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsMessagesGetResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiationMessages1(
        nid: string,
        hhUserAgent: string,
        withTextOnly: boolean = false,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsMessagesGetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations/{nid}/messages',
            path: {
                'nid': nid,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'with_text_only': withTextOnly,
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Просмотр списка сообщений в отклике/приглашении
     * Запрос возвращает список всех сообщений выбранного отклика/приглашения. Работодатель может посмотреть список по URL, указанному в поле `messages` [списка откликов/приглашений](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiations) или в [отдельном отклике](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-item).
     *
     * Типы сообщений:
     *
     * * сопроводительное письмо соискателя;
     * * сопроводительное письмо работодателя при смене статуса отклика;
     * * свободная переписка между соискателем и работодателем.
     *
     * ‼️ Обратите внимание, что методы для работы с сообщениями в рамках отклика/приглашения от имени [соискателя](#tag/Perepiska-(otklikipriglasheniya)-dlya-soiskatelya/operation/get-negotiation-messages) и
     * [менеджера работодателя](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-negotiation-messages) устарели, и новые возможности [чатов](https://feedback.hh.ru/knowledge-base/article/1290) в них не будут поддерживаться.
     * В связи с этим переписка может некорректно отображаться
     *
     * @param nid Идентификатор отклика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param withTextOnly Вернуть непустые сообщения (содержат текст в параметре `text`)
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns NegotiationsMessagesGetResponse Успешный ответ
     * @throws ApiError
     */
    public static getNegotiationMessages2(
        nid: string,
        hhUserAgent: string,
        withTextOnly: boolean = false,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<NegotiationsMessagesGetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/negotiations/{nid}/messages',
            path: {
                'nid': nid,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'with_text_only': withTextOnly,
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Получение черновика вакансии
     * @param draftId Идентификатор черновика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacancyDraftVacancyDraftFull Успешный ответ содержит информацию по созданному черновику и дополнительную информацию по полям
     * @throws ApiError
     */
    public static getVacancyDraft(
        draftId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacancyDraftVacancyDraftFull> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/drafts/{draft_id}',
            path: {
                'draft_id': draftId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Черновик не найден или пользователь не имеет прав на просмотр указанного черновика`,
            },
        });
    }
    /**
     * Изменение черновика вакансии
     * @param draftId Идентификатор черновика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacancyDraftDraftResponseSchema Успешный ответ содержит информацию по измененому черновику и дополнительную информацию по полям
     * @throws ApiError
     */
    public static changeVacancyDraft(
        draftId: string,
        hhUserAgent: string,
        requestBody: VacancyDraftVacancyDraftEdit,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacancyDraftDraftResponseSchema> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vacancies/drafts/{draft_id}',
            path: {
                'draft_id': draftId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Переданный формат не json`,
                403: `Запрос выполнен не с авторизацией работодателя или черновик не был создан вами`,
                404: `Черновик не найден`,
            },
        });
    }
    /**
     * Удаление черновика вакансии
     * @param draftId Идентификатор черновика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteVacancyDraft(
        draftId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vacancies/drafts/{draft_id}',
            path: {
                'draft_id': draftId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Черновик не найден или у пользователя нет прав на удаление данного черновика`,
            },
        });
    }
    /**
     * Публикация вакансии на основе черновика
     * @param draftId Идентификатор черновика вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacancyDraftVacanciesDraftResponse Массив идентификаторов опубликованных вакансий
     * @throws ApiError
     */
    public static publishVacancyFromDraft(
        draftId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacancyDraftVacanciesDraftResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vacancies/drafts/{draft_id}/publish',
            path: {
                'draft_id': draftId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки в полях при добавлении вакансии`,
                403: `Запрос выполнен не с авторизацией работодателя`,
                404: `Черновик не найден`,
            },
        });
    }
    /**
     * Проверка наличия дубликатов вакансии
     * @param draftId Идентификатор черновика вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacancyDuplicates Информация про найденные дубликаты вакансии
     * @throws ApiError
     */
    public static searchForVacancyDraftDuplicates(
        draftId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacancyDuplicates> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/drafts/{draft_id}/duplicates',
            path: {
                'draft_id': draftId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Черновик не найден`,
            },
        });
    }
    /**
     * Создание черновика вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacancyDraftDraftResponseSchema Успешный ответ содержит информацию по созданному черновику и дополнительную информацию по полям
     * @throws ApiError
     */
    public static createVacancyDraft(
        hhUserAgent: string,
        requestBody: VacancyDraftVacancyDraftCreate,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacancyDraftDraftResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vacancies/drafts',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Переданный формат не json`,
                403: `Запрос выполнен не с авторизацией работодателя`,
                429: `Превышено допустимое количество черновиков`,
            },
        });
    }
    /**
     * Получение списка черновиков вакансий
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы (считается от 0, по умолчанию - 0)
     * @param perPage Количество элементов (по умолчанию - 20, максимальное значение - 50)
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns VacancyDraftVacancyDraftItems Успешный ответ
     * @throws ApiError
     */
    public static getVacancyDraftList(
        hhUserAgent: string,
        page?: number,
        perPage?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<VacancyDraftVacancyDraftItems> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/drafts',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
            },
        });
    }
    /**
     * Отмена автопубликации вакансии
     * @param draftId Идентификатор черновика
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static disableAutomaticVacancyPublication(
        draftId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vacancies/auto_publication',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'draft_id': draftId,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Не передан draft_id`,
                403: `Текущий пользователь не является работодателем`,
                404: `Черновик не найден или у пользователя нет прав на удаление данного расписания`,
            },
        });
    }
    /**
     * Справочник тестов работодателя
     * Возвращает список сохраненных тестов работодателя
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerDictionariesTestsResponse Успешный ответ
     * @throws ApiError
     */
    public static getTestsDictionary(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerDictionariesTestsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/tests',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации. Пользователь не является работодателем`,
                404: `Работодатель не найден`,
            },
        });
    }
    /**
     * Справочник тестов работодателя
     * Возвращает список сохраненных тестов работодателя
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployerDictionariesTestsResponse Успешный ответ
     * @throws ApiError
     */
    public static getTestsDictionary1(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployerDictionariesTestsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/tests',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации. Пользователь не является работодателем`,
                404: `Работодатель не найден`,
            },
        });
    }
    /**
     * Список регионов, в которых есть активные вакансии
     * Возвращает список регионов, в которых на данный момент есть активные вакансии от указанного работодателя.
     *
     * Значения в справочнике могут поменяться в любой момент
     *
     * @param employerId Идентификатор работодателя, который можно узнать [в информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployersEmployerVacancyAreasResponse Успешный ответ
     * @throws ApiError
     */
    public static getEmployerVacancyAreas(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployersEmployerVacancyAreasResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/vacancy_areas/active',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Пользователь не имеет прав на просмотр информации`,
                404: `Работодатель не найден`,
            },
        });
    }
    /**
     * Информация о работодателе
     * Возвращает данные о работодателе со ссылкой на выдачу вакансий этого работодателя
     * @param employerId Идентификатор работодателя, который можно получить в [списке работодателей](#tag/Rabotodatel/operation/search-employer)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployersEmployerInfo Успешный ответ
     * @throws ApiError
     */
    public static getEmployerInfo(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployersEmployerInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметрах запроса`,
                404: `Работодатель не найден`,
            },
        });
    }
    /**
     * Добавление работодателя в список скрытых
     * Добавляет указанного работодателя в [список скрытых работодателей](#tag/Skrytye-vakansii/operation/get-blacklisted-vacancies)
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static addEmployerToBlacklisted(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/employers/blacklisted/{employer_id}',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Превышен лимит на количество элементов в списке`,
                403: `Текущий пользователь не является соискателем или не имеет прав на добавление работодателя в скрытые`,
                404: `Работодатель не найден`,
            },
        });
    }
    /**
     * Удаление работодателя из списка скрытых
     * Удаляет указанного работодателя из [списка скрытых работодателей](#tag/Skrytye-vakansii/operation/get-blacklisted-vacancies)
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteEmployerFromBlacklisted(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/employers/blacklisted/{employer_id}',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
                404: `Работодатель не найден`,
            },
        });
    }
    /**
     * Поиск работодателя
     * При указании параметров пагинации (`page`, `per_page`) работает ограничение: глубина возвращаемых результатов не может быть больше `5000`. Например, возможен запрос `per_page=10&page=499` (выдача с `4991` по `5000` работодателя), но запрос с `per_page=10&page=500` вернёт ошибку (выдача с `5001` до `5010` работодателя)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param text Текст для поиска. Переданное значение ищется в названии и описании работодателя
     * @param area Идентификатор региона работодателя, множественный параметр. Идентификаторы регионов можно узнать в [справочнике регионов](#tag/Obshie-spravochniki/operation/get-areas)
     * @param type Тип работодателя, множественный параметр. Разрешенные значения перечислены в [справочнике](#tag/Obshie-spravochniki/operation/get-dictionaries) в поле `employer_type`
     * @param onlyWithVacancies Возвращать только работодателей у которых есть в данный момент открытые вакансии (`true`) или же всех (`false`). По умолчанию — `false`
     * @param sortBy Сортировка по имени (`by_name`) или по количеству открытых вакансий (`by_vacancies_open`). По умолчанию — `by_name`
     * @param page Номер страницы с работодателями (считается от `0`, по умолчанию — `0`)
     * @param perPage Количество элементов на страницу (по умолчанию — 20, максимум — 100 )
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployersEmployersList Успешный ответ
     * @throws ApiError
     */
    public static searchEmployer(
        hhUserAgent: string,
        text?: string,
        area?: string,
        type?: string,
        onlyWithVacancies?: boolean,
        sortBy?: 'by_name' | 'by_vacancies_open',
        page?: number,
        perPage?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployersEmployersList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'area': area,
                'type': type,
                'only_with_vacancies': onlyWithVacancies,
                'sort_by': sortBy,
                'page': page,
                'per_page': perPage,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметрах запроса. В теле ответа может содержаться название параметра с ошибкой`,
            },
        });
    }
    /**
     * Справочник департаментов работодателя
     * Возвращает список департаментов работодателя.
     *
     * Значения в справочнике могут поменяться в любой момент
     *
     * @param employerId Идентификатор работодателя, который можно получить в [списке работодателей](#tag/Rabotodatel/operation/search-employer)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployersEmployerDepartmentsResponse Успешный ответ
     * @throws ApiError
     */
    public static getEmployerDepartments(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployersEmployerDepartmentsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/departments',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Пользователь не имеет прав на просмотр информации`,
                404: `Работодатель не найден`,
            },
        });
    }
    /**
     * Справочник департаментов работодателя
     * Возвращает список департаментов работодателя.
     *
     * Значения в справочнике могут поменяться в любой момент
     *
     * @param employerId Идентификатор работодателя, который можно получить в [списке работодателей](#tag/Rabotodatel/operation/search-employer)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployersEmployerDepartmentsResponse Успешный ответ
     * @throws ApiError
     */
    public static getEmployerDepartments1(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployersEmployerDepartmentsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/departments',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Пользователь не имеет прав на просмотр информации`,
                404: `Работодатель не найден`,
            },
        });
    }
    /**
     * Список доступных бренд шаблонов вакансий работодателя
     * Внимание! Значения в справочниках могут поменяться в любой момент. Не нужно завязываться на них.
     *
     * Использование брендированных шаблонов вакансии доступно работодателям, оплатившим и активировавшим соответствующую
     * услугу. Подробнее на сайте [hh.ru](https://hh.ru/article/brand)
     *
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployersVacancyBrandedTemplatesList Успешный ответ
     * @throws ApiError
     */
    public static getVacancyBrandedTemplatesList(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployersVacancyBrandedTemplatesList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/vacancy_branded_templates',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Если текущий пользователь не авторизован или не является работодателем`,
                404: `Если получение шаблонов по данной компании недоступно или компания не существует`,
            },
        });
    }
    /**
     * Список доступных бренд шаблонов вакансий работодателя
     * Внимание! Значения в справочниках могут поменяться в любой момент. Не нужно завязываться на них.
     *
     * Использование брендированных шаблонов вакансии доступно работодателям, оплатившим и активировавшим соответствующую
     * услугу. Подробнее на сайте [hh.ru](https://hh.ru/article/brand)
     *
     * @param employerId Идентификатор работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployersVacancyBrandedTemplatesList Успешный ответ
     * @throws ApiError
     */
    public static getVacancyBrandedTemplatesList1(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployersVacancyBrandedTemplatesList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/vacancy_branded_templates',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Если текущий пользователь не авторизован или не является работодателем`,
                404: `Если получение шаблонов по данной компании недоступно или компания не существует`,
            },
        });
    }
    /**
     * Список скрытых работодателей
     * Возвращает [подмножество работодателей](#tag/Rabotodatel/operation/search-employer), скрытых пользователем, а также один дополнительный параметр
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns EmployersEmployersBlacklistedResponse Успешный ответ
     * @throws ApiError
     */
    public static getBlacklistedEmployers(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<EmployersEmployersBlacklistedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/blacklisted',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Список районов во всех городах
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesDistrictsResponse Успешный ответ
     * @throws ApiError
     */
    public static getAllDistricts(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesDistrictsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/districts',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Оценка заработной платы без прогноза
     * Возвращает статистику зарплат в соответствии с указанными параметрами запроса. Пользователь должен иметь доступ к платным отчетам [банка зарплат](https://salary.hh.ru/).
     *
     * Как это работает:
     *
     * * Основным источником данных для статистики служит информация о зарплатах, предоставляемая участниками проекта [Банк данных заработных плат](https://salary.hh.ru/promo).
     * * Все анкеты участников проходят проверку модераторами. Если заявленная участником зарплата сильно отличается от средней по рынку, она не будет включена в банк данных.
     * * Если в банке недостаточно данных для построения статистики по запросу, сервис использует следующие приемы:
     *
     * * Объединяет сведения из нескольких отраслей, если недостаточно данных по запрошенной отрасли.
     * * Объединяет сведения из нескольких близких специализаций, если недостаточно данных по запрошенной специализации.
     * * Объединяет сведения из нескольких городов, если недостаточно данных по запрошенному городу.
     * * Использует сведения по запрошенным специализациям из другого региона, если недостаточно данных по запрошенному региону. При этом вычисляется поправочный коэффициент, который отражает разницу в зарплатах между регионами.
     *
     * Если эти приемы не позволяют получить достаточную выборку, сервис может использовать информацию о зарплатах из вакансий и резюме. Такая информация не проходит предварительную модерацию и считается менее надежной, поэтому используется только в крайнем случае. Чтобы использовать эту функцию, передайте в запросе параметр `extend_sources=true`
     *
     * @param areaId Код [региона](#tag/Spravochniki-Banka-dannyh-zarabotnyh-plat/operation/get-salary-salary-areas), по которому будет построена выборка для формирования отчета
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param excludeArea Коды [регионов](#tag/Spravochniki-Banka-dannyh-zarabotnyh-plat/operation/get-salary-salary-areas), которые будут исключены из выборки для формирования отчета. Параметр позволяет получить оценку на региональном рынке за исключением определенных городов или областей
     *
     * @param employeeLevel Справочник [уровни компетенций](#tag/Spravochniki-Banka-dannyh-zarabotnyh-plat/operation/get-salary-employee-levels), которые будут включены в выборку для формирования отчета
     *
     * @param industry Справочник [Коды отраслей](#tag/Spravochniki-Banka-dannyh-zarabotnyh-plat/operation/get-salary-industries), по которым будет построена выборка для формирования отчета
     *
     * @param speciality Справочник [Коды профобластей и специализаций](#tag/Spravochniki-Banka-dannyh-zarabotnyh-plat/operation/get-salary-professional-areas), которые будут включены в выборку для формирования отчета
     *
     * @param extendSources Использовать ли данные из резюме и вакансий, если по указанным параметрам не нашлось данных в банке зарплат. По умолчанию — `false`
     *
     * @param positionName Наименование должности. Если не переданы параметры `speciality` или `employee_level`, сервис самостоятельно определит возможные специализации и уровень специалиста по указанной должности и отрасли, и построит отчет по ним
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SalaryStatisticsEvaluationResponse Успешный ответ
     * @throws ApiError
     */
    public static getSalaryEvaluation(
        areaId: string,
        hhUserAgent: string,
        excludeArea?: string,
        employeeLevel?: string,
        industry?: string,
        speciality?: string,
        extendSources?: boolean,
        positionName?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SalaryStatisticsEvaluationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/salary_statistics/paid/salary_evaluation/{area_id}',
            path: {
                'area_id': areaId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'exclude_area': excludeArea,
                'employee_level': employeeLevel,
                'industry': industry,
                'speciality': speciality,
                'extend_sources': extendSources,
                'position_name': positionName,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Пользователь не авторизован или не имеет доступа к платным отчетам банка зарплат`,
                404: `Для указанных параметров нет данных`,
            },
        });
    }
    /**
     * Оценка заработной платы без прогноза
     * Возвращает статистику зарплат в соответствии с указанными параметрами запроса. Пользователь должен иметь доступ к платным отчетам [банка зарплат](https://salary.hh.ru/).
     *
     * Как это работает:
     *
     * * Основным источником данных для статистики служит информация о зарплатах, предоставляемая участниками проекта [Банк данных заработных плат](https://salary.hh.ru/promo).
     * * Все анкеты участников проходят проверку модераторами. Если заявленная участником зарплата сильно отличается от средней по рынку, она не будет включена в банк данных.
     * * Если в банке недостаточно данных для построения статистики по запросу, сервис использует следующие приемы:
     *
     * * Объединяет сведения из нескольких отраслей, если недостаточно данных по запрошенной отрасли.
     * * Объединяет сведения из нескольких близких специализаций, если недостаточно данных по запрошенной специализации.
     * * Объединяет сведения из нескольких городов, если недостаточно данных по запрошенному городу.
     * * Использует сведения по запрошенным специализациям из другого региона, если недостаточно данных по запрошенному региону. При этом вычисляется поправочный коэффициент, который отражает разницу в зарплатах между регионами.
     *
     * Если эти приемы не позволяют получить достаточную выборку, сервис может использовать информацию о зарплатах из вакансий и резюме. Такая информация не проходит предварительную модерацию и считается менее надежной, поэтому используется только в крайнем случае. Чтобы использовать эту функцию, передайте в запросе параметр `extend_sources=true`
     *
     * @param areaId Код [региона](#tag/Spravochniki-Banka-dannyh-zarabotnyh-plat/operation/get-salary-salary-areas), по которому будет построена выборка для формирования отчета
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param excludeArea Коды [регионов](#tag/Spravochniki-Banka-dannyh-zarabotnyh-plat/operation/get-salary-salary-areas), которые будут исключены из выборки для формирования отчета. Параметр позволяет получить оценку на региональном рынке за исключением определенных городов или областей
     *
     * @param employeeLevel Справочник [уровни компетенций](#tag/Spravochniki-Banka-dannyh-zarabotnyh-plat/operation/get-salary-employee-levels), которые будут включены в выборку для формирования отчета
     *
     * @param industry Справочник [Коды отраслей](#tag/Spravochniki-Banka-dannyh-zarabotnyh-plat/operation/get-salary-industries), по которым будет построена выборка для формирования отчета
     *
     * @param speciality Справочник [Коды профобластей и специализаций](#tag/Spravochniki-Banka-dannyh-zarabotnyh-plat/operation/get-salary-professional-areas), которые будут включены в выборку для формирования отчета
     *
     * @param extendSources Использовать ли данные из резюме и вакансий, если по указанным параметрам не нашлось данных в банке зарплат. По умолчанию — `false`
     *
     * @param positionName Наименование должности. Если не переданы параметры `speciality` или `employee_level`, сервис самостоятельно определит возможные специализации и уровень специалиста по указанной должности и отрасли, и построит отчет по ним
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SalaryStatisticsEvaluationResponse Успешный ответ
     * @throws ApiError
     */
    public static getSalaryEvaluation1(
        areaId: string,
        hhUserAgent: string,
        excludeArea?: string,
        employeeLevel?: string,
        industry?: string,
        speciality?: string,
        extendSources?: boolean,
        positionName?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SalaryStatisticsEvaluationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/salary_statistics/paid/salary_evaluation/{area_id}',
            path: {
                'area_id': areaId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'exclude_area': excludeArea,
                'employee_level': employeeLevel,
                'industry': industry,
                'speciality': speciality,
                'extend_sources': extendSources,
                'position_name': positionName,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Пользователь не авторизован или не имеет доступа к платным отчетам банка зарплат`,
                404: `Для указанных параметров нет данных`,
            },
        });
    }
    /**
     * Список станций метро во всех городах
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns MetroMetroResponse Успешный ответ
     * @throws ApiError
     */
    public static getMetroStations(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<MetroMetroResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/metro',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Список станций метро в указанном городе
     * @param cityId Идентификатор города
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns MetroCityMetroItem Успешный ответ
     * @throws ApiError
     */
    public static getMetroStationsInCity(
        cityId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<MetroCityMetroItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/metro/{city_id}',
            path: {
                'city_id': cityId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                404: `Город с указанным идентификатором не существует`,
            },
        });
    }
    /**
     * Передача сохраненного поиска резюме другому менеджеру
     * @param savedSearchId Идентификатор из [списка сохраненных поисков](#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-searches)
     * @param managerId Идентификатор менеджера, которому надо передать автопоиск ([список менеджеров компании](#tag/Menedzhery-rabotodatelya/operation/get-employer-managers))
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static moveSavedResumeSearch(
        savedSearchId: string,
        managerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/saved_searches/resumes/{saved_search_id}/managers/{manager_id}',
            path: {
                'saved_search_id': savedSearchId,
                'manager_id': managerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Автопоиск или менеджер не найден`,
            },
        });
    }
    /**
     * Резюме, сгруппированные по возможности отклика на данную вакансию
     * Возвращает резюме пользователя, сгруппированные в четыре списка в зависимости от возможности отклика на указанную вакансию
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesByStatusResponse Успешный ответ
     * @throws ApiError
     */
    public static getResumesByStatus(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesByStatusResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{vacancy_id}/resumes_by_status',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Статус резюме и готовность к публикации
     * Возвращает информацию о статусе резюме, готовности резюме к публикации, а также замечания модератора по выбранному резюме
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumeStatusReadiness Успешный ответ
     * @throws ApiError
     */
    public static getResumeStatus(
        resumeId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumeStatusReadiness> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}/status',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
            },
        });
    }
    /**
     * История откликов/приглашений по резюме
     * Возвращает последние действия с указанным резюме, ограниченные 30-ю вакансиями данного работодателя, и 10-ю изменениями состояний откликов/приглашений по каждой из этих вакансий.
     *
     * Метод требует наличия [платного доступа для работодателя](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access)
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesResumeNegotiationsHistoryResponse Успешный ответ
     * @throws ApiError
     */
    public static getResumeNegotiationsHistory(
        resumeId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesResumeNegotiationsHistoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}/negotiations_history',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
            },
        });
    }
    /**
     * История откликов/приглашений по резюме
     * Возвращает последние действия с указанным резюме, ограниченные 30-ю вакансиями данного работодателя, и 10-ю изменениями состояний откликов/приглашений по каждой из этих вакансий.
     *
     * Метод требует наличия [платного доступа для работодателя](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access)
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesResumeNegotiationsHistoryResponse Успешный ответ
     * @throws ApiError
     */
    public static getResumeNegotiationsHistory1(
        resumeId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesResumeNegotiationsHistoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}/negotiations_history',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
            },
        });
    }
    /**
     * Получение единичного сохраненного поиска резюме
     * Внимание: счетчик `new_items.count` обновляется раз в час. Из-за этого реальное количество новых найденных резюме
     * может расходиться со значением этого счетчика
     *
     * @param id Идентификатор сохраненного поиска из [списка](#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-searches)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SavedSearchesSavedSearchItem Успешный ответ
     * @throws ApiError
     */
    public static getSavedResumeSearch(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SavedSearchesSavedSearchItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/saved_searches/resumes/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
                404: `Сохраненный поиск не найден`,
            },
        });
    }
    /**
     * Обновление сохраненного поиска резюме
     * У сохраненного поиска можно изменить имя (`name`) и статус подписки (`subscription`). В одном запросе можно передать только один из параметров
     * @param id Идентификатор сохраненного поиска
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param name Новое имя сохраненного поиска
     * @param subscription Статус подписки
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static updateSavedResumeSearch(
        id: string,
        hhUserAgent: string,
        name?: string,
        subscription?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/saved_searches/resumes/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'name': name,
                'subscription': subscription,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибка в параметре запроса`,
                403: `Ошибка авторизации пользователя`,
                404: `Не найдено или не доступно текущему пользователю`,
                409: `Ошибка запроса при одновременном изменении параметров`,
            },
        });
    }
    /**
     * Удаление сохраненного поиска резюме
     * @param id Идентификатор сохраненного поиска
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteSavedResumeSearch(
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/saved_searches/resumes/{id}',
            path: {
                'id': id,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации пользователя`,
                404: `Не найдено или не доступно текущему пользователю`,
            },
        });
    }
    /**
     * @deprecated
     * Создание резюме
     * Запрос является устаревшим и поддерживается для обратной совместимости. Вместо него используйте [запрос создания резюме-профиля.](#tag/Rezyume-profil-soiskatelya/operation/create-resume-profile)
     *
     * Создает резюме с полями, переданными в теле запроса.
     *
     * Если передан параметр `source_resume_id`, новое резюме будет склонировано из указанного. Склонировать можно только собственное резюме
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param sourceResumeId Идентификатор исходного резюме для клонирования
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param requestBody
     * @returns string Успешно создано
     * @throws ApiError
     */
    public static createResume(
        hhUserAgent: string,
        sourceResumeId?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        requestBody?: ResumeAddResumeRequest,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/resumes',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'source_resume_id': sourceResumeId,
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Ошибка в параметрах резюме или превышено допустимое количество резюме`,
                403: `Ошибка авторизации. Пользователь не является соискателем`,
                404: `Исходное резюме для клонирования не существует или не принадлежит текущему пользователю`,
                409: `Нельзя создать резюме для заархивированной вакансии`,
            },
        });
    }
    /**
     * Поиск резюме
     * Возвращает результаты поиска резюме.
     *
     * Требуется наличие [платного доступа](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     *
     * Некоторые параметры запроса могут принимать множественные значения: `key=value&key=value`. Если параметр может принимать несколько значений, об этом явно указано в его описании. Неизвестные параметры и параметры с ошибкой в названии игнорируются.
     *
     * При указании параметров пагинации (`page`, `per_page`) работает ограничение: глубина возвращаемых результатов не может быть больше 2000. Например, возможен запрос `per_page=10&page=199` (выдача с 1991 по 2000 резюме), но запрос с `per_page=10&page=200` вернёт ошибку (выдача с 2001 до 2010 резюме).
     *
     * Возвращаемые результаты группируются по соискателю: один и тот же соискатель не может вернуться в выборке несколько раз. Если у соискателя есть несколько резюме, которые подходят под запрос, то только одно из его резюме вернется в качестве элемента в массиве items
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param text Поисковая фраза. Метод найдет резюме, в которых встречаются все слова заданной фразы.
     *
     * Особенности:
     *
     * * Можно указать несколько значений. Каждое дополнительное значение уточняет поиск.
     * * В качестве поисковой фразы можно использовать [язык поисковых запросов](https://hh.ru/article/1175).
     * * Специально для этого поля предусмотрено [автодополнение по подсказкам](#tag/Podskazki/operation/get-resume-search-keywords-suggests).
     * * Для тонкой настройки по фразе можно использовать параметры `text.logic`, `text.field`, `text.period`. При использовании дополнительных `text.*` полей, необходимо указывать весь набор (триаду) параметров ([пример использования](#tag/Poisk-rezyume/Primery-poiskovyh-zaprosov))
     *
     * @param textLogic Описывает, как производится поиск. Возможные значения перечислены в поле `resume_search_logic` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param textField Описывает, где должны встречаться слова из поисковой фразы `text`. Можно указать несколько значений через запятую, например `?text.field=education,keywords`. Возможные значения перечислены в поле `resume_search_fields` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param textPeriod Период опыта работы.
     *
     * Параметр имеет смысл только при `text.field` равным одному из значений: `experience`, `experience_company`, `experience_position`, `experience_description`, но указывать его необходимо всегда при указании других `text.*`. Если параметр не имеет смысла, то его значение можно оставить пустым
     *
     * @param textCompanySize Размер компании, в которой у соискателя имеется опыт работы.
     * Параметр применяется только в случае, если text.field имеет одно из следующих значений: workplaces, workplace_organization, workplace_position, workplace_description.
     * Возможные значения:
     * * `any` - любой размер компании
     * * `small` - компании численностью до 100 человек
     * * `medium` - компании численностью 100-1000 человек
     * * `large` - компании численностью более 1000 человек
     *
     * Количество значений этого параметра должно соответствовать количеству значений в `text`, `text.field` и `text.logic`
     *
     * @param textIndustry Идентификатор отрасли, в которой соискатель должен иметь опыт работы.
     * Возможные значения перечислены в [справочнике отраслей](#tag/Obshie-spravochniki/operation/get-industries) (поле id).
     *
     * Количество значений этого параметра должно соответствовать количеству значений в `text`, `text.field` и `text.logic`
     *
     * @param ageFrom Нижняя граница возраста соискателя в годах.
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанным возрастом. Для выдачи резюме только с указанным возрастом передайте значение `only_with_age` в параметре `label`
     *
     * @param ageTo Верхняя граница возраста соискателя в годах.
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанным возрастом. Для выдачи резюме только с указанным возрастом передайте значение `only_with_age` в параметре `label`
     *
     * @param area Регион. Возможные значения указаны в [справочнике регионов](https://github.com/hhru/api/blob/master/docs/areas.md). Можно указать несколько значений.
     *
     * По умолчанию выбираются резюме, в которых соискатели живут в указанных регионах или готовы в них переехать. Поменять это поведение поиска можно, указав параметр `relocation`
     *
     * @param relocation Готовность к переезду. Возможные значения указаны в поле `resume_search_relocation` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Необходимо указывать вместе с параметром `area`
     *
     * @param period Поиск ведется по резюме, опубликованным за указанный период в днях. Если период не указан, поиск ведется без ограничений по дате публикации
     *
     * @param dateFrom Дата, от которой нужно начать поиск. Значение указывается в формате [ISO 8601](#date-format) — `YYYY-MM-DD` или с точностью до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Нельзя передавать вместе с параметром `period`
     *
     * @param dateTo Дата, до которой нужно искать. Значение указывается в формате [ISO 8601](#date-format) — `YYYY-MM-DD` или с точность до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Можно передавать только в паре с параметром `date_from`. Нельзя передавать вместе с параметром `period`
     *
     * @param educationLevel Уровень образования. Возможные значения перечислены в поле `education_level` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Если параметр не указан, поиск ведется без ограничений на уровень образования.
     *
     * Заменен на параметр `education_levels`. В настоящее время поддерживается для обратной совместимости
     *
     * @param employment Тип занятости. Возможные значения перечислены в поле `employment` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param experience Опыт работы. Возможные значения перечислены в поле `experience` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param skill Ключевые навыки. Указывается один или несколько идентификаторов ключевых навыков. Значения можно получить из поля `id` в [подсказке по ключевым навыкам](#tag/Podskazki/operation/get-skill-set-suggests)
     *
     * @param gender Пол соискателя. Возможные значения перечислены в поле `gender` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries).
     *
     * По умолчанию вне зависимости от значения параметра будут найдены резюме, в которых пол не указан, исключить из поисковой выдачи такие резюме можно с помощью параметра `label=only_with_gender`
     *
     * @param label Дополнительный фильтр. Возможные значения перечислены в поле `resume_search_label` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param language Знание языка. Можно указать несколько значений. Задается в формате `language.level`, где:
     *
     * * `language` — значение из [справочника языков](#tag/Obshie-spravochniki/operation/get-languages);
     * * `level` — значение поля language_level из [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * Например, `ita.c2`
     *
     * @param metro Линия, либо станция метро. Можно указать несколько значений.
     *
     * Возможные значения перечислены в [справочнике метро](#tag/Obshie-spravochniki/operation/get-metro-stations)
     *
     * @param currency Код валюты. Возможные значения перечислены в поле `currency.code` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param salaryFrom Нижняя граница желаемой заработной платы (ЗП).
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанной ЗП. Для выдачи резюме только с указанной ЗП передайте параметр `label=only_with_salary`
     *
     * @param salaryTo Верхняя граница желаемой заработной платы (ЗП).
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанной ЗП. Для выдачи резюме только с указанной ЗП передайте параметр `label=only_with_salary`
     *
     * @param schedule График работы. Возможные значения перечислены в поле `schedule` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param orderBy Сортировка списка резюме. Возможные значения перечислены в поле `resume_search_order` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param citizenship Страна гражданства соискателя. Возможные значения перечислены в [справочнике стран](https://github.com/hhru/api/blob/master/docs/areas.md#countries). Можно указать несколько значений
     *
     * @param workTicket Страна, в которой у соискателя есть разрешение на работу. Возможные значения перечислены в [справочнике стран](https://github.com/hhru/api/blob/master/docs/areas.md#countries). Можно указать несколько значений
     *
     * @param educationalInstitution Учебные заведения соискателя. В качестве параметров используются [подсказки по названиям университетов](#tag/Podskazki/operation/get-educational-institutions-suggests). Можно указать несколько значений
     *
     * @param searchInResponses Если `true`, то поиск осуществляется только по резюме, которыми соискатели откликались на вакансии компании текущего пользователя, если `false` — поиск осуществляется по всем резюме. По умолчанию — `false`
     *
     * @param byTextPrefix Если `true`, включается поиск по префиксу. Для каждого параметра `text` будут находиться не только полные совпадения слов, но еще и слова, начинающиеся с `text`. По умолчанию — `false`
     *
     * @param driverLicenseTypes Категории водительских прав соискателя. Возможные значения перечислены в поле `driver_license_types` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param vacancyId Идентификатор вакансии для поиска похожих резюме. Необходимо передавать идентификатор активной вакансии работодателя или вакансии работодателя в архиве
     *
     * @param page Номер страницы (считается от 0, по умолчанию — 0)
     * @param perPage Количество элементов (по умолчанию — 20, максимальное значение — 100)
     * @param professionalRole Профессиональная роль. Элемент справочника [профессиональных ролей](#tag/Obshie-spravochniki/operation/get-professional-roles-dictionary). Можно указать несколько значений
     *
     * @param folder Один или несколько идентификаторов папок с отобранными резюме. Если данный параметр передан, поиск будет ограничен содержимым указанных папок. Можно передавать идентификаторы нескольких папок, например: `folder=111&folder=222&folder=333`
     *
     * @param includeAllFolders Признак, указывающий, нужно ли вести поиск по всем папкам с отобранными резюме.
     *
     * Если у менеджера есть доступ к избранным папкам, то поиск проходит по умолчанию в избранных папках. Если передать параметр `false`, то поиск не будет ограничен папками. Если в одном запросе будут переданы параметры `folder` и `include_all_folders`, вернется ошибка `400 Bad Request`
     *
     * @param jobSearchStatus Статус поиска работы.
     *
     * Возможные значения перечислены в поле `job_search_statuses_employer` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param resume Идентификатор резюме для поиска похожих резюме
     *
     * @param filterExpIndustry Обрабатывается совместно с параметром `filter_exp_period`. Идентификатор отрасли, в которой у соискателя должен присутствовать опыт работы.
     * Возможные значения перечислены в [справочнике отраслей](#tag/Obshie-spravochniki/operation/get-industries) (поле id). Можно указать несколько значений
     *
     * @param filterExpPeriod Период, за который у соискателя должен присутствовать опыт работы в отрасли, указанной в параметре `filter_exp_industry`.
     *
     * Возможные значения:
     *
     * * `all_time` - за все время
     * * `last_year` - за последний год
     * * `last_three_years` - за последние 3 года
     * * `last_six_years` - за последние 6 лет.
     *
     * По умолчанию равен `all_time`
     *
     * @param withJobSearchStatus Параметр для просмотра в резюме статуса поиска кандидата
     *
     * @param educationLevels Требуемый уровень образования соискателя.
     * Возможные значения перечислены в поле `education_level` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries).
     *
     * Если параметр не указан, поиск ведется без ограничений на уровень образования
     *
     * @param district Идентификатор района. Возможные значения приведены в справочнике [/districts](#tag/Obshie-spravochniki/operation/get-all-districts)
     *
     * @param savedSearchId Идентификатор сохраненного автопоиска.
     * Возвращается в полях `items.url` и `new_items.url` при [получении данных о конкретном автопоиске](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-search) и полях `items.items.url` и `items.new_items.url` при [получении списка автопоисков](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-searches).
     * Использование этого параметра при поиске резюме обновляет значение `last_used` в указанном автопоиске
     *
     * @param searchByVacancyId Идентификатор вакансии, среди откликов на которую необходимо искать резюме
     *
     * @param lastUsedTimestamp Время последнего просмотра результатов автопоиска в формате временной метки.
     * Используется совместно с параметром `saved_search_id` для поиска и подсчета новых резюме, подходящих под запрос и появившихся с момента последнего просмотра.
     * Количество новых резюме возвращается в поле `new_items.count` при [получении данных о конкретном автопоиске](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-search) и поле `items.new_items.count` при [получении списка автопоисков](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-searches)
     *
     * @param lastUsed Время последнего просмотра результатов автопоиска в формате даты и времени с временной зоной.
     * Пример: 2015-11-12T18:06:04+0300.
     * Используется совместно с параметром `saved_search_id` для поиска и подсчета новых резюме, подходящих под запрос и появившихся с момента последнего просмотра.
     * Количество новых резюме возвращается в поле `new_items.count` при [получении данных о конкретном автопоиске](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-search) и поле `items.new_items.count` при [получении списка автопоисков](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-searches)
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesSearchForResumesResponse Успешный ответ
     * @throws ApiError
     */
    public static searchForResumes(
        hhUserAgent: string,
        text?: string,
        textLogic?: string,
        textField?: string,
        textPeriod?: string,
        textCompanySize?: string,
        textIndustry?: string,
        ageFrom?: string,
        ageTo?: string,
        area?: string,
        relocation?: string,
        period?: number,
        dateFrom?: string,
        dateTo?: string,
        educationLevel?: string,
        employment?: string,
        experience?: string,
        skill?: string,
        gender?: string,
        label?: string,
        language?: string,
        metro?: string,
        currency?: string,
        salaryFrom?: number,
        salaryTo?: number,
        schedule?: string,
        orderBy?: string,
        citizenship?: string,
        workTicket?: string,
        educationalInstitution?: string,
        searchInResponses?: boolean,
        byTextPrefix?: boolean,
        driverLicenseTypes?: string,
        vacancyId?: string,
        page?: number,
        perPage?: number,
        professionalRole?: string,
        folder?: string,
        includeAllFolders?: boolean,
        jobSearchStatus?: string,
        resume?: string,
        filterExpIndustry?: string,
        filterExpPeriod?: string,
        withJobSearchStatus?: boolean,
        educationLevels?: string,
        district?: string,
        savedSearchId?: string,
        searchByVacancyId?: string,
        lastUsedTimestamp?: string,
        lastUsed?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesSearchForResumesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'text.logic': textLogic,
                'text.field': textField,
                'text.period': textPeriod,
                'text.company_size': textCompanySize,
                'text.industry': textIndustry,
                'age_from': ageFrom,
                'age_to': ageTo,
                'area': area,
                'relocation': relocation,
                'period': period,
                'date_from': dateFrom,
                'date_to': dateTo,
                'education_level': educationLevel,
                'employment': employment,
                'experience': experience,
                'skill': skill,
                'gender': gender,
                'label': label,
                'language': language,
                'metro': metro,
                'currency': currency,
                'salary_from': salaryFrom,
                'salary_to': salaryTo,
                'schedule': schedule,
                'order_by': orderBy,
                'citizenship': citizenship,
                'work_ticket': workTicket,
                'educational_institution': educationalInstitution,
                'search_in_responses': searchInResponses,
                'by_text_prefix': byTextPrefix,
                'driver_license_types': driverLicenseTypes,
                'vacancy_id': vacancyId,
                'page': page,
                'per_page': perPage,
                'professional_role': professionalRole,
                'folder': folder,
                'include_all_folders': includeAllFolders,
                'job_search_status': jobSearchStatus,
                'resume': resume,
                'filter_exp_industry': filterExpIndustry,
                'filter_exp_period': filterExpPeriod,
                'with_job_search_status': withJobSearchStatus,
                'education_levels': educationLevels,
                'district': district,
                'saved_search_id': savedSearchId,
                'search_by_vacancy_id': searchByVacancyId,
                'last_used_timestamp': lastUsedTimestamp,
                'last_used': lastUsed,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки в аргументах или в запросе`,
                403: `Текущий пользователь не является работодателем или не имеет доступа к методу`,
            },
        });
    }
    /**
     * Поиск резюме
     * Возвращает результаты поиска резюме.
     *
     * Требуется наличие [платного доступа](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     *
     * Некоторые параметры запроса могут принимать множественные значения: `key=value&key=value`. Если параметр может принимать несколько значений, об этом явно указано в его описании. Неизвестные параметры и параметры с ошибкой в названии игнорируются.
     *
     * При указании параметров пагинации (`page`, `per_page`) работает ограничение: глубина возвращаемых результатов не может быть больше 2000. Например, возможен запрос `per_page=10&page=199` (выдача с 1991 по 2000 резюме), но запрос с `per_page=10&page=200` вернёт ошибку (выдача с 2001 до 2010 резюме).
     *
     * Возвращаемые результаты группируются по соискателю: один и тот же соискатель не может вернуться в выборке несколько раз. Если у соискателя есть несколько резюме, которые подходят под запрос, то только одно из его резюме вернется в качестве элемента в массиве items
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param text Поисковая фраза. Метод найдет резюме, в которых встречаются все слова заданной фразы.
     *
     * Особенности:
     *
     * * Можно указать несколько значений. Каждое дополнительное значение уточняет поиск.
     * * В качестве поисковой фразы можно использовать [язык поисковых запросов](https://hh.ru/article/1175).
     * * Специально для этого поля предусмотрено [автодополнение по подсказкам](#tag/Podskazki/operation/get-resume-search-keywords-suggests).
     * * Для тонкой настройки по фразе можно использовать параметры `text.logic`, `text.field`, `text.period`. При использовании дополнительных `text.*` полей, необходимо указывать весь набор (триаду) параметров ([пример использования](#tag/Poisk-rezyume/Primery-poiskovyh-zaprosov))
     *
     * @param textLogic Описывает, как производится поиск. Возможные значения перечислены в поле `resume_search_logic` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param textField Описывает, где должны встречаться слова из поисковой фразы `text`. Можно указать несколько значений через запятую, например `?text.field=education,keywords`. Возможные значения перечислены в поле `resume_search_fields` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param textPeriod Период опыта работы.
     *
     * Параметр имеет смысл только при `text.field` равным одному из значений: `experience`, `experience_company`, `experience_position`, `experience_description`, но указывать его необходимо всегда при указании других `text.*`. Если параметр не имеет смысла, то его значение можно оставить пустым
     *
     * @param textCompanySize Размер компании, в которой у соискателя имеется опыт работы.
     * Параметр применяется только в случае, если text.field имеет одно из следующих значений: workplaces, workplace_organization, workplace_position, workplace_description.
     * Возможные значения:
     * * `any` - любой размер компании
     * * `small` - компании численностью до 100 человек
     * * `medium` - компании численностью 100-1000 человек
     * * `large` - компании численностью более 1000 человек
     *
     * Количество значений этого параметра должно соответствовать количеству значений в `text`, `text.field` и `text.logic`
     *
     * @param textIndustry Идентификатор отрасли, в которой соискатель должен иметь опыт работы.
     * Возможные значения перечислены в [справочнике отраслей](#tag/Obshie-spravochniki/operation/get-industries) (поле id).
     *
     * Количество значений этого параметра должно соответствовать количеству значений в `text`, `text.field` и `text.logic`
     *
     * @param ageFrom Нижняя граница возраста соискателя в годах.
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанным возрастом. Для выдачи резюме только с указанным возрастом передайте значение `only_with_age` в параметре `label`
     *
     * @param ageTo Верхняя граница возраста соискателя в годах.
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанным возрастом. Для выдачи резюме только с указанным возрастом передайте значение `only_with_age` в параметре `label`
     *
     * @param area Регион. Возможные значения указаны в [справочнике регионов](https://github.com/hhru/api/blob/master/docs/areas.md). Можно указать несколько значений.
     *
     * По умолчанию выбираются резюме, в которых соискатели живут в указанных регионах или готовы в них переехать. Поменять это поведение поиска можно, указав параметр `relocation`
     *
     * @param relocation Готовность к переезду. Возможные значения указаны в поле `resume_search_relocation` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Необходимо указывать вместе с параметром `area`
     *
     * @param period Поиск ведется по резюме, опубликованным за указанный период в днях. Если период не указан, поиск ведется без ограничений по дате публикации
     *
     * @param dateFrom Дата, от которой нужно начать поиск. Значение указывается в формате [ISO 8601](#date-format) — `YYYY-MM-DD` или с точностью до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Нельзя передавать вместе с параметром `period`
     *
     * @param dateTo Дата, до которой нужно искать. Значение указывается в формате [ISO 8601](#date-format) — `YYYY-MM-DD` или с точность до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Можно передавать только в паре с параметром `date_from`. Нельзя передавать вместе с параметром `period`
     *
     * @param educationLevel Уровень образования. Возможные значения перечислены в поле `education_level` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Если параметр не указан, поиск ведется без ограничений на уровень образования.
     *
     * Заменен на параметр `education_levels`. В настоящее время поддерживается для обратной совместимости
     *
     * @param employment Тип занятости. Возможные значения перечислены в поле `employment` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param experience Опыт работы. Возможные значения перечислены в поле `experience` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param skill Ключевые навыки. Указывается один или несколько идентификаторов ключевых навыков. Значения можно получить из поля `id` в [подсказке по ключевым навыкам](#tag/Podskazki/operation/get-skill-set-suggests)
     *
     * @param gender Пол соискателя. Возможные значения перечислены в поле `gender` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries).
     *
     * По умолчанию вне зависимости от значения параметра будут найдены резюме, в которых пол не указан, исключить из поисковой выдачи такие резюме можно с помощью параметра `label=only_with_gender`
     *
     * @param label Дополнительный фильтр. Возможные значения перечислены в поле `resume_search_label` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param language Знание языка. Можно указать несколько значений. Задается в формате `language.level`, где:
     *
     * * `language` — значение из [справочника языков](#tag/Obshie-spravochniki/operation/get-languages);
     * * `level` — значение поля language_level из [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * Например, `ita.c2`
     *
     * @param metro Линия, либо станция метро. Можно указать несколько значений.
     *
     * Возможные значения перечислены в [справочнике метро](#tag/Obshie-spravochniki/operation/get-metro-stations)
     *
     * @param currency Код валюты. Возможные значения перечислены в поле `currency.code` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param salaryFrom Нижняя граница желаемой заработной платы (ЗП).
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанной ЗП. Для выдачи резюме только с указанной ЗП передайте параметр `label=only_with_salary`
     *
     * @param salaryTo Верхняя граница желаемой заработной платы (ЗП).
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанной ЗП. Для выдачи резюме только с указанной ЗП передайте параметр `label=only_with_salary`
     *
     * @param schedule График работы. Возможные значения перечислены в поле `schedule` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param orderBy Сортировка списка резюме. Возможные значения перечислены в поле `resume_search_order` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param citizenship Страна гражданства соискателя. Возможные значения перечислены в [справочнике стран](https://github.com/hhru/api/blob/master/docs/areas.md#countries). Можно указать несколько значений
     *
     * @param workTicket Страна, в которой у соискателя есть разрешение на работу. Возможные значения перечислены в [справочнике стран](https://github.com/hhru/api/blob/master/docs/areas.md#countries). Можно указать несколько значений
     *
     * @param educationalInstitution Учебные заведения соискателя. В качестве параметров используются [подсказки по названиям университетов](#tag/Podskazki/operation/get-educational-institutions-suggests). Можно указать несколько значений
     *
     * @param searchInResponses Если `true`, то поиск осуществляется только по резюме, которыми соискатели откликались на вакансии компании текущего пользователя, если `false` — поиск осуществляется по всем резюме. По умолчанию — `false`
     *
     * @param byTextPrefix Если `true`, включается поиск по префиксу. Для каждого параметра `text` будут находиться не только полные совпадения слов, но еще и слова, начинающиеся с `text`. По умолчанию — `false`
     *
     * @param driverLicenseTypes Категории водительских прав соискателя. Возможные значения перечислены в поле `driver_license_types` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param vacancyId Идентификатор вакансии для поиска похожих резюме. Необходимо передавать идентификатор активной вакансии работодателя или вакансии работодателя в архиве
     *
     * @param page Номер страницы (считается от 0, по умолчанию — 0)
     * @param perPage Количество элементов (по умолчанию — 20, максимальное значение — 100)
     * @param professionalRole Профессиональная роль. Элемент справочника [профессиональных ролей](#tag/Obshie-spravochniki/operation/get-professional-roles-dictionary). Можно указать несколько значений
     *
     * @param folder Один или несколько идентификаторов папок с отобранными резюме. Если данный параметр передан, поиск будет ограничен содержимым указанных папок. Можно передавать идентификаторы нескольких папок, например: `folder=111&folder=222&folder=333`
     *
     * @param includeAllFolders Признак, указывающий, нужно ли вести поиск по всем папкам с отобранными резюме.
     *
     * Если у менеджера есть доступ к избранным папкам, то поиск проходит по умолчанию в избранных папках. Если передать параметр `false`, то поиск не будет ограничен папками. Если в одном запросе будут переданы параметры `folder` и `include_all_folders`, вернется ошибка `400 Bad Request`
     *
     * @param jobSearchStatus Статус поиска работы.
     *
     * Возможные значения перечислены в поле `job_search_statuses_employer` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param resume Идентификатор резюме для поиска похожих резюме
     *
     * @param filterExpIndustry Обрабатывается совместно с параметром `filter_exp_period`. Идентификатор отрасли, в которой у соискателя должен присутствовать опыт работы.
     * Возможные значения перечислены в [справочнике отраслей](#tag/Obshie-spravochniki/operation/get-industries) (поле id). Можно указать несколько значений
     *
     * @param filterExpPeriod Период, за который у соискателя должен присутствовать опыт работы в отрасли, указанной в параметре `filter_exp_industry`.
     *
     * Возможные значения:
     *
     * * `all_time` - за все время
     * * `last_year` - за последний год
     * * `last_three_years` - за последние 3 года
     * * `last_six_years` - за последние 6 лет.
     *
     * По умолчанию равен `all_time`
     *
     * @param withJobSearchStatus Параметр для просмотра в резюме статуса поиска кандидата
     *
     * @param educationLevels Требуемый уровень образования соискателя.
     * Возможные значения перечислены в поле `education_level` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries).
     *
     * Если параметр не указан, поиск ведется без ограничений на уровень образования
     *
     * @param district Идентификатор района. Возможные значения приведены в справочнике [/districts](#tag/Obshie-spravochniki/operation/get-all-districts)
     *
     * @param savedSearchId Идентификатор сохраненного автопоиска.
     * Возвращается в полях `items.url` и `new_items.url` при [получении данных о конкретном автопоиске](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-search) и полях `items.items.url` и `items.new_items.url` при [получении списка автопоисков](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-searches).
     * Использование этого параметра при поиске резюме обновляет значение `last_used` в указанном автопоиске
     *
     * @param searchByVacancyId Идентификатор вакансии, среди откликов на которую необходимо искать резюме
     *
     * @param lastUsedTimestamp Время последнего просмотра результатов автопоиска в формате временной метки.
     * Используется совместно с параметром `saved_search_id` для поиска и подсчета новых резюме, подходящих под запрос и появившихся с момента последнего просмотра.
     * Количество новых резюме возвращается в поле `new_items.count` при [получении данных о конкретном автопоиске](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-search) и поле `items.new_items.count` при [получении списка автопоисков](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-searches)
     *
     * @param lastUsed Время последнего просмотра результатов автопоиска в формате даты и времени с временной зоной.
     * Пример: 2015-11-12T18:06:04+0300.
     * Используется совместно с параметром `saved_search_id` для поиска и подсчета новых резюме, подходящих под запрос и появившихся с момента последнего просмотра.
     * Количество новых резюме возвращается в поле `new_items.count` при [получении данных о конкретном автопоиске](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-search) и поле `items.new_items.count` при [получении списка автопоисков](https://api.hh.ru/openapi/redoc#tag/Sohranennye-poiski-rezyume/operation/get-saved-resume-searches)
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesSearchForResumesResponse Успешный ответ
     * @throws ApiError
     */
    public static searchForResumes1(
        hhUserAgent: string,
        text?: string,
        textLogic?: string,
        textField?: string,
        textPeriod?: string,
        textCompanySize?: string,
        textIndustry?: string,
        ageFrom?: string,
        ageTo?: string,
        area?: string,
        relocation?: string,
        period?: number,
        dateFrom?: string,
        dateTo?: string,
        educationLevel?: string,
        employment?: string,
        experience?: string,
        skill?: string,
        gender?: string,
        label?: string,
        language?: string,
        metro?: string,
        currency?: string,
        salaryFrom?: number,
        salaryTo?: number,
        schedule?: string,
        orderBy?: string,
        citizenship?: string,
        workTicket?: string,
        educationalInstitution?: string,
        searchInResponses?: boolean,
        byTextPrefix?: boolean,
        driverLicenseTypes?: string,
        vacancyId?: string,
        page?: number,
        perPage?: number,
        professionalRole?: string,
        folder?: string,
        includeAllFolders?: boolean,
        jobSearchStatus?: string,
        resume?: string,
        filterExpIndustry?: string,
        filterExpPeriod?: string,
        withJobSearchStatus?: boolean,
        educationLevels?: string,
        district?: string,
        savedSearchId?: string,
        searchByVacancyId?: string,
        lastUsedTimestamp?: string,
        lastUsed?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesSearchForResumesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'text.logic': textLogic,
                'text.field': textField,
                'text.period': textPeriod,
                'text.company_size': textCompanySize,
                'text.industry': textIndustry,
                'age_from': ageFrom,
                'age_to': ageTo,
                'area': area,
                'relocation': relocation,
                'period': period,
                'date_from': dateFrom,
                'date_to': dateTo,
                'education_level': educationLevel,
                'employment': employment,
                'experience': experience,
                'skill': skill,
                'gender': gender,
                'label': label,
                'language': language,
                'metro': metro,
                'currency': currency,
                'salary_from': salaryFrom,
                'salary_to': salaryTo,
                'schedule': schedule,
                'order_by': orderBy,
                'citizenship': citizenship,
                'work_ticket': workTicket,
                'educational_institution': educationalInstitution,
                'search_in_responses': searchInResponses,
                'by_text_prefix': byTextPrefix,
                'driver_license_types': driverLicenseTypes,
                'vacancy_id': vacancyId,
                'page': page,
                'per_page': perPage,
                'professional_role': professionalRole,
                'folder': folder,
                'include_all_folders': includeAllFolders,
                'job_search_status': jobSearchStatus,
                'resume': resume,
                'filter_exp_industry': filterExpIndustry,
                'filter_exp_period': filterExpPeriod,
                'with_job_search_status': withJobSearchStatus,
                'education_levels': educationLevels,
                'district': district,
                'saved_search_id': savedSearchId,
                'search_by_vacancy_id': searchByVacancyId,
                'last_used_timestamp': lastUsedTimestamp,
                'last_used': lastUsed,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки в аргументах или в запросе`,
                403: `Текущий пользователь не является работодателем или не имеет доступа к методу`,
            },
        });
    }
    /**
     * Список резюме авторизованного пользователя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesMineResponse Успешный ответ
     * @throws ApiError
     */
    public static getMineResumes(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesMineResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/mine',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Публикация резюме
     * При первой публикации резюме оно становится доступно для использования. При повторной публикации происходит обновление даты резюме.
     *
     * Повторная публикация означает обновление даты резюме. Ключ `next_publish_at` у [резюме](#tag/Rezyume.-Prosmotr-informacii/operation/get-mine-resumes) указывает время, когда можно обновить резюме
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static publishResume(
        resumeId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/resumes/{resume_id}/publish',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Публикация или продление невозможны`,
                403: `Пользователь не является соискателем`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
                429: `Обновление резюме еще не доступно`,
            },
        });
    }
    /**
     * Условия заполнения полей нового резюме
     * Возвращает список требований для полей при заполнении нового резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesResumeConditions Успешный ответ
     * @throws ApiError
     */
    public static getNewResumeConditions(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesResumeConditions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resume_conditions',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Список подходящих для отклика резюме
     * Возвращает список сокращенных представлений резюме соискателя, которыми он может откликнуться на указанную вакансию.
     *
     * В качестве альтернативы данному методу можно использовать метод [resumes_by_status](#tag/Rezyume.-Prosmotr-informacii/operation/get-resumes-by-status)
     *
     * @param vacancyId Идентификатор вакансии
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesSuitableResumesResponse Успешный ответ
     * @throws ApiError
     */
    public static getSuitableResumes(
        vacancyId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesSuitableResumesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{vacancy_id}/suitable_resumes',
            path: {
                'vacancy_id': vacancyId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
                404: `Вакансия не найдена`,
            },
        });
    }
    /**
     * Условия заполнения полей существующего резюме
     * Возвращает список требований для полей при заполнении указанного резюме
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesResumeConditions Успешный ответ
     * @throws ApiError
     */
    public static getResumeConditions(
        resumeId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesResumeConditions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}/conditions',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является автором резюме`,
                404: `Резюме не существует`,
            },
        });
    }
    /**
     * История просмотра резюме
     * Возвращает историю просмотров резюме.
     *
     * Этот запрос обнуляет счетчик новых просмотров (поле `new_views`), который возвращается в запросах на просмотр [конкретного резюме](#tag/Prosmotr-rezyume/operation/get-resume) и [списка резюме](#tag/Rezyume.-Prosmotr-informacii/operation/get-mine-resumes)
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param withEmployerLogo Флаг для обогащения компании логотипами
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesResumeViewHistoryResponse Успешный ответ
     * @throws ApiError
     */
    public static getResumeViewHistory(
        resumeId: string,
        hhUserAgent: string,
        withEmployerLogo?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesResumeViewHistoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}/views',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'with_employer_logo': withEmployerLogo,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
            },
        });
    }
    /**
     * Просмотр резюме
     * Возвращает информацию об указанном резюме.
     *
     * Особенности работы метода при запросе от работодателя:
     *
     * * Требуется наличие [платного доступа](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     * * При просмотре резюме с контактами действуют [специальные правила](https://github.com/hhru/api/blob/master/docs/payable/resume.md#просмотр-резюме-с-контактами).
     * * Если просмотр полных данных по резюме недоступен при текущей авторизации, в некоторых полях вернется `null`, а поле `can_view_full_info` будет иметь значение `false`.
     * * Если у работодателя есть отклик/приглашение на это резюме, отклик будет считаться просмотренным (только в том случае, если передан query-параметр topic_id с соответствующим идентификатором отклика)
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param withNegotiationsHistory В случае, если передан данный параметр, в ответе добавится поле `negotiations_history.vacancies`.
     * Его формат подробно описан в методе [полной истории откликов/приглашений по резюме](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-resume-negotiations-history) и различается лишь тем,
     * что в данном случае список будет ограничен тремя вакансиями данного работодателя и последним изменением состояния отклика/приглашения по каждой из этих вакансий
     *
     * @param withCreds В случае, если передан данный параметр, в ответе добавится поле creds
     * @param withJobSearchStatus Параметр для просмотра в резюме статуса поиска кандидата
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumeResumeViewResponse Успешный ответ
     * @throws ApiError
     */
    public static getResume(
        resumeId: string,
        hhUserAgent: string,
        withNegotiationsHistory?: boolean,
        withCreds?: boolean,
        withJobSearchStatus?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumeResumeViewResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'with_negotiations_history': withNegotiationsHistory,
                'with_creds': withCreds,
                'with_job_search_status': withJobSearchStatus,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Требуется авторизация пользователя`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
                429: `Для работодателя превышен лимит просмотров резюме в сутки`,
            },
        });
    }
    /**
     * Просмотр резюме
     * Возвращает информацию об указанном резюме.
     *
     * Особенности работы метода при запросе от работодателя:
     *
     * * Требуется наличие [платного доступа](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     * * При просмотре резюме с контактами действуют [специальные правила](https://github.com/hhru/api/blob/master/docs/payable/resume.md#просмотр-резюме-с-контактами).
     * * Если просмотр полных данных по резюме недоступен при текущей авторизации, в некоторых полях вернется `null`, а поле `can_view_full_info` будет иметь значение `false`.
     * * Если у работодателя есть отклик/приглашение на это резюме, отклик будет считаться просмотренным (только в том случае, если передан query-параметр topic_id с соответствующим идентификатором отклика)
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param withNegotiationsHistory В случае, если передан данный параметр, в ответе добавится поле `negotiations_history.vacancies`.
     * Его формат подробно описан в методе [полной истории откликов/приглашений по резюме](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-resume-negotiations-history) и различается лишь тем,
     * что в данном случае список будет ограничен тремя вакансиями данного работодателя и последним изменением состояния отклика/приглашения по каждой из этих вакансий
     *
     * @param withCreds В случае, если передан данный параметр, в ответе добавится поле creds
     * @param withJobSearchStatus Параметр для просмотра в резюме статуса поиска кандидата
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumeResumeViewResponse Успешный ответ
     * @throws ApiError
     */
    public static getResume1(
        resumeId: string,
        hhUserAgent: string,
        withNegotiationsHistory?: boolean,
        withCreds?: boolean,
        withJobSearchStatus?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumeResumeViewResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'with_negotiations_history': withNegotiationsHistory,
                'with_creds': withCreds,
                'with_job_search_status': withJobSearchStatus,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Требуется авторизация пользователя`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
                429: `Для работодателя превышен лимит просмотров резюме в сутки`,
            },
        });
    }
    /**
     * Просмотр резюме
     * Возвращает информацию об указанном резюме.
     *
     * Особенности работы метода при запросе от работодателя:
     *
     * * Требуется наличие [платного доступа](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     * * При просмотре резюме с контактами действуют [специальные правила](https://github.com/hhru/api/blob/master/docs/payable/resume.md#просмотр-резюме-с-контактами).
     * * Если просмотр полных данных по резюме недоступен при текущей авторизации, в некоторых полях вернется `null`, а поле `can_view_full_info` будет иметь значение `false`.
     * * Если у работодателя есть отклик/приглашение на это резюме, отклик будет считаться просмотренным (только в том случае, если передан query-параметр topic_id с соответствующим идентификатором отклика)
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param withNegotiationsHistory В случае, если передан данный параметр, в ответе добавится поле `negotiations_history.vacancies`.
     * Его формат подробно описан в методе [полной истории откликов/приглашений по резюме](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-resume-negotiations-history) и различается лишь тем,
     * что в данном случае список будет ограничен тремя вакансиями данного работодателя и последним изменением состояния отклика/приглашения по каждой из этих вакансий
     *
     * @param withCreds В случае, если передан данный параметр, в ответе добавится поле creds
     * @param withJobSearchStatus Параметр для просмотра в резюме статуса поиска кандидата
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumeResumeViewResponse Успешный ответ
     * @throws ApiError
     */
    public static getResume2(
        resumeId: string,
        hhUserAgent: string,
        withNegotiationsHistory?: boolean,
        withCreds?: boolean,
        withJobSearchStatus?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumeResumeViewResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'with_negotiations_history': withNegotiationsHistory,
                'with_creds': withCreds,
                'with_job_search_status': withJobSearchStatus,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Требуется авторизация пользователя`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
                429: `Для работодателя превышен лимит просмотров резюме в сутки`,
            },
        });
    }
    /**
     * Просмотр резюме
     * Возвращает информацию об указанном резюме.
     *
     * Особенности работы метода при запросе от работодателя:
     *
     * * Требуется наличие [платного доступа](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     * * При просмотре резюме с контактами действуют [специальные правила](https://github.com/hhru/api/blob/master/docs/payable/resume.md#просмотр-резюме-с-контактами).
     * * Если просмотр полных данных по резюме недоступен при текущей авторизации, в некоторых полях вернется `null`, а поле `can_view_full_info` будет иметь значение `false`.
     * * Если у работодателя есть отклик/приглашение на это резюме, отклик будет считаться просмотренным (только в том случае, если передан query-параметр topic_id с соответствующим идентификатором отклика)
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param withNegotiationsHistory В случае, если передан данный параметр, в ответе добавится поле `negotiations_history.vacancies`.
     * Его формат подробно описан в методе [полной истории откликов/приглашений по резюме](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-resume-negotiations-history) и различается лишь тем,
     * что в данном случае список будет ограничен тремя вакансиями данного работодателя и последним изменением состояния отклика/приглашения по каждой из этих вакансий
     *
     * @param withCreds В случае, если передан данный параметр, в ответе добавится поле creds
     * @param withJobSearchStatus Параметр для просмотра в резюме статуса поиска кандидата
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumeResumeViewResponse Успешный ответ
     * @throws ApiError
     */
    public static getResume3(
        resumeId: string,
        hhUserAgent: string,
        withNegotiationsHistory?: boolean,
        withCreds?: boolean,
        withJobSearchStatus?: boolean,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumeResumeViewResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'with_negotiations_history': withNegotiationsHistory,
                'with_creds': withCreds,
                'with_job_search_status': withJobSearchStatus,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Требуется авторизация пользователя`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
                429: `Для работодателя превышен лимит просмотров резюме в сутки`,
            },
        });
    }
    /**
     * Удаление резюме
     * Резюме удаляется без возможности восстановления. Все связанные с ним отклики исчезают
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteResume(
        resumeId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/resumes/{resume_id}',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Ошибка авторизации. Пользователь не является соискателем`,
                404: `Резюме не найдено или недоступно текущему пользователю`,
            },
        });
    }
    /**
     * @deprecated
     * Обновление резюме
     * Запрос является устаревшим и поддерживается для обратной совместимости. Вместо него используйте [запрос изменения резюме-профиля.](#tag/Rezyume-profil-soiskatelya/operation/update-resume-profile).
     *
     * Обновляет переданные в теле запроса поля указанного резюме.
     *
     * Любой упомянутый в теле запроса массив полностью переопределит существующий. Чтобы добавить к существующему массиву новый элемент, перечислите также в запросе все элементы существующего массива. Так, в приведенном примере запроса к ранее указанному русскому языку добавляется английский.
     *
     * Дополнительные правила заполнения резюме:
     *
     * * У соискателя не может быть несколько резюме с одинаковым `title`.
     * * Специализации должны быть из одной профессиональной области.
     * * Город проживания должен быть одним из элементов справочника `/areas`, и у этого элемента не должно быть потомков. Например, нельзя указать город проживания «Россия».
     * * Ближайшая станция метро должна находиться в городе проживания.
     * * Для специализаций из профессиональной области «Начало карьеры, студенты» (`id=15`) можно не указывать опыт работы и навыки. Для остальных профессиональных областей данные поля должны содержать хотя бы по одной записи
     *
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static editResume(
        resumeId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        requestBody?: ResumeEditResumeRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/resumes/{resume_id}',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Ошибка в параметрах резюме`,
                403: `Ошибка авторизации. Пользователь не является соискателем`,
                404: `Резюме не существует или не принадлежит текущему пользователю`,
            },
        });
    }
    /**
     * Проверка возможности создания резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesCreationAvailability Успешный ответ
     * @throws ApiError
     */
    public static getResumeCreationAvailability(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesCreationAvailability> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/creation_availability',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
            },
        });
    }
    /**
     * Список сохраненных поисков резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы (считается от 0, по умолчанию - 0)
     * @param perPage Количество элементов (по умолчанию - 5, максимальное значение - 10)
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns SavedSearchesSavedSearchResponse Успешный ответ
     * @throws ApiError
     */
    public static getSavedResumeSearches(
        hhUserAgent: string,
        page?: number,
        perPage?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<SavedSearchesSavedSearchResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/saved_searches/resumes',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является работодателем`,
            },
        });
    }
    /**
     * Создание нового сохраненного поиска резюме
     * Некоторые параметры принимают множественные значения: `key=value&key=value`.
     *
     * При указании параметров пагинации (`page`, `per_page`) работает ограничение: глубина возвращаемых результатов не может быть больше 2000. Например, возможен запрос `per_page=10&page=199` (выдача с 1991 по 2000 вакансию), но запрос с `per_page=10&page=200` вернёт ошибку (выдача с 2001 до 2010 вакансию)
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param text Поисковая фраза. Метод найдет резюме, в которых встречаются все слова заданной фразы.
     *
     * Особенности:
     *
     * * Можно указать несколько значений. Каждое дополнительное значение уточняет поиск.
     * * В качестве поисковой фразы можно использовать [язык поисковых запросов](https://hh.ru/article/1175).
     * * Специально для этого поля предусмотрено [автодополнение по подсказкам](#tag/Podskazki/operation/get-resume-search-keywords-suggests).
     * * Для тонкой настройки по фразе можно использовать параметры `text.logic`, `text.field`, `text.period`. При использовании дополнительных `text.*` полей, необходимо указывать весь набор (триаду) параметров
     *
     * @param textLogic Описывает, как производится поиск. Возможные значения перечислены в поле `resume_search_logic` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param textField Описывает, где должны встречаться слова из поисковой фразы `text`. Можно указать несколько значений через запятую, например `?text.field=education,keywords`. Возможные значения перечислены в поле `resume_search_fields` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     * @param textPeriod Период опыта работы.
     *
     * Параметр имеет смысл только при `text.field` равным одному из значений: `experience`, `experience_company`, `experience_position`, `experience_description`, но указывать его необходимо всегда при указании других `text.*`. Если параметр не имеет смысла, то его значение можно оставить пустым
     *
     * @param ageFrom Нижняя граница возраста соискателя в годах.
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанным возрастом. Для выдачи резюме только с указанным возрастом передайте значение `only_with_age` в параметре `label`
     *
     * @param ageTo Верхняя граница возраста соискателя в годах.
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанным возрастом. Для выдачи резюме только с указанным возрастом передайте значение `only_with_age` в параметре `label`
     *
     * @param area Регион. Возможные значения указаны в [справочнике регионов](#tag/Obshie-spravochniki/operation/get-areas). Можно указать несколько значений.
     *
     * По умолчанию выбираются резюме, в которых соискатели живут в указанных регионах или готовы в них переехать. Поменять это поведение поиска можно, указав параметр `relocation`
     *
     * @param relocation Готовность к переезду. Возможные значения указаны в поле `resume_search_relocation` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Необходимо указывать вместе с параметром `area`
     *
     * @param period Поиск ведется по резюме, опубликованным за указанный период в днях. Если период не указан, поиск ведется без ограничений по дате публикации
     *
     * @param dateFrom Дата, от которой нужно начать поиск. Значение указывается в формате [ISO 8601](#date-format) — `YYYY-MM-DD` или с точностью до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Нельзя передавать вместе с параметром `period`
     *
     * @param dateTo Дата, до которой нужно искать. Значение указывается в формате [ISO 8601](#date-format) — `YYYY-MM-DD` или с точность до секунды `YYYY-MM-DDThh:mm:ss±hhmm`. Можно передавать только в паре с параметром `date_from`. Нельзя передавать вместе с параметром `period`
     *
     * @param educationLevel Уровень образования. Возможные значения перечислены в поле `education_level` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Если параметр не указан, поиск ведется без ограничений на уровень образования
     *
     * @param employment Тип занятости. Возможные значения перечислены в поле `employment` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param experience Опыт работы. Возможные значения перечислены в поле `experience` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param skill Ключевые навыки. Указывается один или несколько идентификаторов ключевых навыков. Значения можно получить из поля `id` в [подсказке по ключевым навыкам](#tag/Podskazki/operation/get-skill-set-suggests)
     *
     * @param gender Пол соискателя. Возможные значения перечислены в поле `gender` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries).
     *
     * По умолчанию вне зависимости от значения параметра будут найдены резюме, в которых пол не указан, убрать такие резюме можно с помощью параметра `label=only_with_gender`
     *
     * @param label Дополнительный фильтр. Возможные значения перечислены в поле `resume_search_label` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param language Знание языка. Можно указать несколько значений. Задается в формате `language.level`, где:
     *
     * * `language` — значение из [справочника языков](#tag/Obshie-spravochniki/operation/get-languages);
     * * `level` — значение поля language_level из [справочника полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * Например, `ita.c2`
     *
     * @param metro Линия, либо станция метро. Возможные значения перечислены в [справочнике метро](#tag/Obshie-spravochniki/operation/get-metro-stations)
     *
     * @param currency Код валюты. Возможные значения перечислены в поле `currency.code` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param salaryFrom Нижняя граница желаемой заработной платы (ЗП).
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанной ЗП. Для выдачи резюме только с указанной ЗП передайте параметр `label=only_with_salary`
     *
     * @param salaryTo Верхняя граница желаемой заработной платы (ЗП).
     *
     * По умолчанию в выдачу добавляются также резюме с неуказанной ЗП. Для выдачи резюме только с указанной ЗП передайте параметр `label=only_with_salary`
     *
     * @param schedule График работы. Возможные значения перечислены в поле `schedule` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param orderBy Сортировка списка резюме. Возможные значения перечислены в поле `resume_search_order` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries)
     *
     * @param citizenship Страна гражданства соискателя. Возможные значения перечислены в [справочнике стран](#tag/Obshie-spravochniki/operation/get-countries). Можно указать несколько значений
     *
     * @param workTicket Страна, в которой у соискателя есть разрешение на работу. Возможные значения перечислены в [справочнике стран](#tag/Obshie-spravochniki/operation/get-countries). Можно указать несколько значений
     *
     * @param educationalInstitution Учебные заведения соискателя. В качестве параметров используются [подсказки по названиям университетов](#tag/Podskazki). Можно указать несколько значений
     *
     * @param searchInResponses Если `true`, то поиск осуществляется только по резюме, которыми соискатели откликались на вакансии компании текущего пользователя, если `false` — поиск осуществляется по всем резюме. По умолчанию — `false`
     *
     * @param byTextPrefix Если `true`, включается поиск по префиксу. Для каждого параметра `text` будут находиться не только полные совпадения слов, но еще и слова, начинающиеся с `text`. По умолчанию — `false`
     *
     * @param driverLicenseTypes Категории водительских прав соискателя. Возможные значения перечислены в поле `driver_license_types` в [справочнике полей](#tag/Obshie-spravochniki/operation/get-dictionaries). Можно указать несколько значений
     *
     * @param vacancyId Идентификатор вакансии для поиска похожих резюме. Необходимо передавать идентификатор активной вакансии работодателя или вакансии работодателя в архиве
     *
     * @param page Номер страницы (считается от 0, по умолчанию — 0)
     * @param perPage Количество элементов (по умолчанию — 10, максимальное значение — 50)
     * @param professionalRole Профессиональная роль. Элемент справочника [профессиональных ролей](#tag/Obshie-spravochniki/operation/get-professional-roles-dictionary). Можно указать несколько значений
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns string Успешно создано
     * @throws ApiError
     */
    public static createSavedResumeSearch(
        hhUserAgent: string,
        text?: string,
        textLogic?: string,
        textField?: string,
        textPeriod?: string,
        ageFrom?: number,
        ageTo?: number,
        area?: string,
        relocation?: string,
        period?: number,
        dateFrom?: string,
        dateTo?: string,
        educationLevel?: string,
        employment?: string,
        experience?: string,
        skill?: string,
        gender?: string,
        label?: string,
        language?: string,
        metro?: string,
        currency?: string,
        salaryFrom?: number,
        salaryTo?: number,
        schedule?: string,
        orderBy?: string,
        citizenship?: string,
        workTicket?: string,
        educationalInstitution?: string,
        searchInResponses?: boolean,
        byTextPrefix?: boolean,
        driverLicenseTypes?: string,
        vacancyId?: string,
        page?: number,
        perPage?: number,
        professionalRole?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/saved_searches/resumes',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'text.logic': textLogic,
                'text.field': textField,
                'text.period': textPeriod,
                'age_from': ageFrom,
                'age_to': ageTo,
                'area': area,
                'relocation': relocation,
                'period': period,
                'date_from': dateFrom,
                'date_to': dateTo,
                'education_level': educationLevel,
                'employment': employment,
                'experience': experience,
                'skill': skill,
                'gender': gender,
                'label': label,
                'language': language,
                'metro': metro,
                'currency': currency,
                'salary_from': salaryFrom,
                'salary_to': salaryTo,
                'schedule': schedule,
                'order_by': orderBy,
                'citizenship': citizenship,
                'work_ticket': workTicket,
                'educational_institution': educationalInstitution,
                'search_in_responses': searchInResponses,
                'by_text_prefix': byTextPrefix,
                'driver_license_types': driverLicenseTypes,
                'vacancy_id': vacancyId,
                'page': page,
                'per_page': perPage,
                'professional_role': professionalRole,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки в аргументах`,
                403: `Текущий пользователь не является работодателем`,
            },
        });
    }
    /**
     * Получение списка типов видимости резюме
     * Некоторые типы видимости, например `whitelist` и `blacklist`, подразумевают наличие списка работодателей, для которых резюме должно быть видимо или скрыто. См. [управление списками видимости резюме](#tag/Rezyume.-Spiski-vidimosti)
     * @param resumeId Идентификатор резюме
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesAccessTypes Успешный ответ
     * @throws ApiError
     */
    public static getResumeAccessTypes(
        resumeId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesAccessTypes> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}/access_types',
            path: {
                'resume_id': resumeId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
                404: `Резюме не существует или недоступно для текущего пользователя`,
            },
        });
    }
    /**
     * Обновление комментария
     * Метод требует наличия [платного доступа для работодателя](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     *
     * Автор комментария может изменить его текст и тип доступа. Если параметр не передан, то его значение останется прежним
     *
     * @param applicantId Идентификатор соискателя, который можно узнать из поля `owner` [в резюме](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#owner-field)
     * @param commentId Идентификатор комментария, который можно узнать в [списке комментариев](#tag/Kommentarii-k-soiskatelyu/operation/get-applicant-comments-list)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns void
     * @throws ApiError
     */
    public static updateApplicantComment(
        applicantId: string,
        commentId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Текст комментария
             */
            text?: string;
            /**
             * Тип доступа. Доступные значения перечислены [в справочнике](#tag/Obshie-spravochniki/operation/get-dictionaries) в поле `applicant_comment_access_type`
             */
            access_type?: string;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/applicant_comments/{applicant_id}/{comment_id}',
            path: {
                'applicant_id': applicantId,
                'comment_id': commentId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса. Дополнительно могут быть указаны названия параметров с ошибками`,
                403: `Изменение комментария недоступно для текущего пользователя`,
                404: `Указанный соискатель или комментарий не существует`,
            },
        });
    }
    /**
     * Обновление комментария
     * Метод требует наличия [платного доступа для работодателя](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     *
     * Автор комментария может изменить его текст и тип доступа. Если параметр не передан, то его значение останется прежним
     *
     * @param applicantId Идентификатор соискателя, который можно узнать из поля `owner` [в резюме](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#owner-field)
     * @param commentId Идентификатор комментария, который можно узнать в [списке комментариев](#tag/Kommentarii-k-soiskatelyu/operation/get-applicant-comments-list)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @param formData
     * @returns void
     * @throws ApiError
     */
    public static updateApplicantComment1(
        applicantId: string,
        commentId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
        formData?: {
            /**
             * Текст комментария
             */
            text?: string;
            /**
             * Тип доступа. Доступные значения перечислены [в справочнике](#tag/Obshie-spravochniki/operation/get-dictionaries) в поле `applicant_comment_access_type`
             */
            access_type?: string;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/applicant_comments/{applicant_id}/{comment_id}',
            path: {
                'applicant_id': applicantId,
                'comment_id': commentId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса. Дополнительно могут быть указаны названия параметров с ошибками`,
                403: `Изменение комментария недоступно для текущего пользователя`,
                404: `Указанный соискатель или комментарий не существует`,
            },
        });
    }
    /**
     * Удаление комментария
     * Метод требует наличия [платного доступа для работодателя](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     *
     * Удалить комментарий может только его автор
     *
     * @param applicantId Идентификатор соискателя, который можно узнать из поля `owner` [в резюме](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#owner-field)
     * @param commentId Идентификатор комментария, который будет удален. Его можно узнать в [списке комментариев](#tag/Kommentarii-k-soiskatelyu/operation/get-applicant-comments-list)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteApplicantComment(
        applicantId: string,
        commentId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/applicant_comments/{applicant_id}/{comment_id}',
            path: {
                'applicant_id': applicantId,
                'comment_id': commentId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Удаление комментария недоступно для текущего пользователя`,
                404: `Указанный соискатель не существует`,
            },
        });
    }
    /**
     * Удаление комментария
     * Метод требует наличия [платного доступа для работодателя](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     *
     * Удалить комментарий может только его автор
     *
     * @param applicantId Идентификатор соискателя, который можно узнать из поля `owner` [в резюме](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#owner-field)
     * @param commentId Идентификатор комментария, который будет удален. Его можно узнать в [списке комментариев](#tag/Kommentarii-k-soiskatelyu/operation/get-applicant-comments-list)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteApplicantComment1(
        applicantId: string,
        commentId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/applicant_comments/{applicant_id}/{comment_id}',
            path: {
                'applicant_id': applicantId,
                'comment_id': commentId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Удаление комментария недоступно для текущего пользователя`,
                404: `Указанный соискатель не существует`,
            },
        });
    }
    /**
     * Получение списка комментариев
     * Метод требует наличия [платного доступа для работодателя](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     *
     * Список будет содержать комментарии текущего пользователя, а также комментарии других менеджеров компании, если они открыли доступ к ним при публикации
     *
     * @param applicantId Идентификатор соискателя, который можно узнать из поля `owner` [в резюме](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#owner-field)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы
     * @param perPage Результатов на странице
     * @param orderBy Сортировка комментариев. Доступные значения перечислены [в справочнике](#tag/Obshie-spravochniki/operation/get-dictionaries) в поле `applicant_comments_order`
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ApplicantCommentsApplicantCommentsList Успешный ответ
     * @throws ApiError
     */
    public static getApplicantCommentsList(
        applicantId: string,
        hhUserAgent: string,
        page?: number,
        perPage?: number,
        orderBy?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ApplicantCommentsApplicantCommentsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/applicant_comments/{applicant_id}',
            path: {
                'applicant_id': applicantId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'order_by': orderBy,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Получение комментариев недоступно для текущего пользователя`,
                404: `Указанный соискатель не найден`,
            },
        });
    }
    /**
     * Получение списка комментариев
     * Метод требует наличия [платного доступа для работодателя](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access).
     *
     * Список будет содержать комментарии текущего пользователя, а также комментарии других менеджеров компании, если они открыли доступ к ним при публикации
     *
     * @param applicantId Идентификатор соискателя, который можно узнать из поля `owner` [в резюме](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#owner-field)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param page Номер страницы
     * @param perPage Результатов на странице
     * @param orderBy Сортировка комментариев. Доступные значения перечислены [в справочнике](#tag/Obshie-spravochniki/operation/get-dictionaries) в поле `applicant_comments_order`
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ApplicantCommentsApplicantCommentsList Успешный ответ
     * @throws ApiError
     */
    public static getApplicantCommentsList1(
        applicantId: string,
        hhUserAgent: string,
        page?: number,
        perPage?: number,
        orderBy?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ApplicantCommentsApplicantCommentsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/applicant_comments/{applicant_id}',
            path: {
                'applicant_id': applicantId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'order_by': orderBy,
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Получение комментариев недоступно для текущего пользователя`,
                404: `Указанный соискатель не найден`,
            },
        });
    }
    /**
     * Добавление комментария
     * Метод требует наличия [платного доступа для работодателя](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access)
     * @param applicantId Идентификатор соискателя, который можно узнать из поля `owner` [в резюме](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#owner-field)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param formData
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ApplicantCommentsApplicantCommentItem Комментарий добавлен
     * @throws ApiError
     */
    public static addApplicantComment(
        applicantId: string,
        hhUserAgent: string,
        formData: {
            /**
             * Текст комментария
             */
            text: string;
            /**
             * Тип доступа. Доступные значения перечислены [в справочнике](#tag/Obshie-spravochniki/operation/get-dictionaries) в поле `applicant_comment_access_type`
             */
            access_type: string;
        },
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ApplicantCommentsApplicantCommentItem> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/applicant_comments/{applicant_id}',
            path: {
                'applicant_id': applicantId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Получение комментариев недоступно для текущего пользователя`,
                404: `Указанный соискатель не найден`,
            },
        });
    }
    /**
     * Добавление комментария
     * Метод требует наличия [платного доступа для работодателя](#tag/Uslugi-rabotodatelya/operation/get-payable-api-method-access)
     * @param applicantId Идентификатор соискателя, который можно узнать из поля `owner` [в резюме](https://github.com/hhru/api/blob/master/docs/employer_resumes.md#owner-field)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param formData
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ApplicantCommentsApplicantCommentItem Комментарий добавлен
     * @throws ApiError
     */
    public static addApplicantComment1(
        applicantId: string,
        hhUserAgent: string,
        formData: {
            /**
             * Текст комментария
             */
            text: string;
            /**
             * Тип доступа. Доступные значения перечислены [в справочнике](#tag/Obshie-spravochniki/operation/get-dictionaries) в поле `applicant_comment_access_type`
             */
            access_type: string;
        },
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ApplicantCommentsApplicantCommentItem> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/applicant_comments/{applicant_id}',
            path: {
                'applicant_id': applicantId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Ошибка в параметрах запроса`,
                403: `Получение комментариев недоступно для текущего пользователя`,
                404: `Указанный соискатель не найден`,
            },
        });
    }
    /**
     * Изменение шаблона ответа соискателю
     * Изменение шаблона ответа для [переписки](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md)
     *
     * @param employerId Идентификатор работодателя, который можно узнать [в информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param templateId Идентификатор шаблона для изменения из [списка доступных шаблонов ответов соискателю](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-mail-templates)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static putMailTemplatesItem(
        employerId: string,
        templateId: string,
        hhUserAgent: string,
        requestBody: MailTemplatesMailTemplateInput,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/employers/{employer_id}/mail_templates/{template_id}',
            path: {
                'employer_id': employerId,
                'template_id': templateId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Текст шаблона слишком длинный или содержит неправильную переменную, reason (too_long, wrong_variable)`,
                403: `Неподходящая авторизация`,
                404: `Указанный работодатель или шаблон не существует`,
            },
        });
    }
    /**
     * Изменение шаблона ответа соискателю
     * Изменение шаблона ответа для [переписки](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md)
     *
     * @param employerId Идентификатор работодателя, который можно узнать [в информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param templateId Идентификатор шаблона для изменения из [списка доступных шаблонов ответов соискателю](#tag/Otklikipriglasheniya-rabotodatelya/operation/get-mail-templates)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static putMailTemplatesItem1(
        employerId: string,
        templateId: string,
        hhUserAgent: string,
        requestBody: MailTemplatesMailTemplateInput,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/employers/{employer_id}/mail_templates/{template_id}',
            path: {
                'employer_id': employerId,
                'template_id': templateId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Текст шаблона слишком длинный или содержит неправильную переменную, reason (too_long, wrong_variable)`,
                403: `Неподходящая авторизация`,
                404: `Указанный работодатель или шаблон не существует`,
            },
        });
    }
    /**
     * Список доступных шаблонов ответов соискателю
     * Возвращает список возможных значений шаблонов ответов для [переписки](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md)
     *
     * @param employerId Идентификатор работодателя, который можно узнать [в информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns MailTemplatesMailTemplates Успешный ответ
     * @throws ApiError
     */
    public static getMailTemplates(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<MailTemplatesMailTemplates> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/mail_templates',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Неподходящая авторизация`,
                404: `Указанный работодатель не существует`,
            },
        });
    }
    /**
     * Список доступных шаблонов ответов соискателю
     * Возвращает список возможных значений шаблонов ответов для [переписки](https://github.com/hhru/api/blob/master/docs/employer_negotiations.md)
     *
     * @param employerId Идентификатор работодателя, который можно узнать [в информации о текущем пользователе](#tag/Informaciya-o-menedzhere/operation/get-current-user-info)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns MailTemplatesMailTemplates Успешный ответ
     * @throws ApiError
     */
    public static getMailTemplates1(
        employerId: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<MailTemplatesMailTemplates> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employers/{employer_id}/mail_templates',
            path: {
                'employer_id': employerId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Неподходящая авторизация`,
                404: `Указанный работодатель не существует`,
            },
        });
    }
    /**
     * Справочник стран
     * Возвращает подмножество регионов, являющихся странами
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesCountriesResponse Успешный ответ
     * @throws ApiError
     */
    public static getCountries(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesCountriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/areas/countries',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Дерево всех регионов
     * Возвращает древовидный список всех регионов.
     *
     * Значения в справочнике могут поменяться в любой момент
     *
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param additionalCase Применимо только к русской локализации.
     *
     * В дополнительном поле вернется название региона в указанном падеже. Поддерживается только значение `prepositional` — предложный падеж
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesAreaResponse Успешный ответ
     * @throws ApiError
     */
    public static getAreas(
        hhUserAgent: string,
        additionalCase?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesAreaResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/areas',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'additional_case': additionalCase,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки в параметрах запроса`,
            },
        });
    }
    /**
     * Справочник регионов, начиная с указанного
     * Возвращает древовидный список регионов, начиная с указанного.
     *
     * Значения в справочнике могут поменяться в любой момент
     *
     * @param areaId Идентификатор региона из справочника [/areas](#tag/Obshie-spravochniki/operation/get-areas)
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param additionalCase Применимо только к русской локализации.
     *
     * В дополнительном поле вернется название региона в указанном падеже. Поддерживается только значение `prepositional` — предложный падеж
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesAreaItem Успешный ответ
     * @throws ApiError
     */
    public static getAreasFromSpecified(
        areaId: string,
        hhUserAgent: string,
        additionalCase?: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesAreaItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/areas/{area_id}',
            path: {
                'area_id': areaId,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'additional_case': additionalCase,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Ошибки в параметрах запроса`,
            },
        });
    }
    /**
     * Уровни компетенций
     * Возвращает список уровней компетенций
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesSalaryStatisticsEmployeeLevelResponse Успешный ответ
     * @throws ApiError
     */
    public static getSalaryEmployeeLevels(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesSalaryStatisticsEmployeeLevelResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/salary_statistics/dictionaries/employee_levels',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Регионы и города
     * Возвращает список регионов, областей и городов
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesSalaryStatisticsAreaResponse Успешный ответ
     * @throws ApiError
     */
    public static getSalarySalaryAreas(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesSalaryStatisticsAreaResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/salary_statistics/dictionaries/salary_areas',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Профобласти и специализации
     * Возвращает список профобластей и специализаций
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesSalaryStatisticsProfessionalAreasResponse Успешный ответ
     * @throws ApiError
     */
    public static getSalaryProfessionalAreas(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesSalaryStatisticsProfessionalAreasResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/salary_statistics/dictionaries/professional_areas',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Отрасли и сферы деятельности
     * Возвращает двухуровневый список отраслей и сфер деятельности
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns DictionariesIndustriesResponse Успешный ответ
     * @throws ApiError
     */
    public static getSalaryIndustries(
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<DictionariesIndustriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/salary_statistics/dictionaries/salary_industries',
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
        });
    }
    /**
     * Поиск работодателей для добавления в список видимости
     * Возвращает результаты поиска работодателей
     * @param resumeId Идентификатор резюме
     * @param listType Тип списка. Допустимые значения — `whitelist` или `blacklist`
     * @param text Строка для поиска. Переданное значение ищется в начале названия работодателя и в начале названия департаментов работодателя
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param perPage Количество элементов на странице выдачи. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). Значение по умолчанию и максимальное значение per_page составляет 100
     *
     * @param page Порядковый номер страницы в выдаче. Поддерживаются [стандартные параметры пагинации](#section/Obshaya-informaciya/Paginaciya). По умолчанию нумерация начинается с 0 страницы
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesResumeVisibilityListSearchResponse Успешный ответ
     * @throws ApiError
     */
    public static getResumeVisibilityEmployersList(
        resumeId: string,
        listType: string,
        text: string,
        hhUserAgent: string,
        perPage?: number,
        page?: number,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesResumeVisibilityListSearchResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}/{list_type}/search',
            path: {
                'resume_id': resumeId,
                'list_type': listType,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'text': text,
                'per_page': perPage,
                'page': page,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Входные параметры переданы с ошибкой`,
                403: `Текущий пользователь не является соискателем`,
                404: `Резюме не существует или недоступно для текущего пользователя, либо передан неизвестный \`list_type\``,
            },
        });
    }
    /**
     * Получение списка видимости резюме
     * Возвращает список работодателей, для которых резюме должно быть видимо или скрыто
     *
     * @param resumeId Идентификатор резюме
     * @param listType Тип списка. Допустимые значения — `whitelist` или `blacklist`
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns ResumesGetResumeVisibilityListResponse Успешный ответ
     * @throws ApiError
     */
    public static getResumeVisibilityList(
        resumeId: string,
        listType: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<ResumesGetResumeVisibilityListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resumes/{resume_id}/{list_type}',
            path: {
                'resume_id': resumeId,
                'list_type': listType,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Передано невалидное количество элементов на странице (максимум 100)`,
                403: `Текущий пользователь не является соискателем`,
                404: `Резюме не существует или недоступно для текущего пользователя, либо передан неизвестный \`list_type\``,
            },
        });
    }
    /**
     * Добавление работодателей в список видимости
     * Добавляет указанных работодателей в список видимости указанного типа.
     *
     * За один запрос можно добавить не больше 100 компаний.
     *
     * Добавление в список идемпотентно, то есть добавление работодателей, уже присутствующих в списке, игнорируется и не приводит к дублированию записей.
     *
     * Можно добавить в список заблокированного работодателя
     *
     * @param resumeId Идентификатор резюме
     * @param listType Тип списка. Допустимые значения — `whitelist` или `blacklist`
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param requestBody
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static addResumeVisibilityList(
        resumeId: string,
        listType: string,
        hhUserAgent: string,
        requestBody: ResumesPostResumeVisibilityListBody,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/resumes/{resume_id}/{list_type}',
            path: {
                'resume_id': resumeId,
                'list_type': listType,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Передан невалидный JSON или JSON неправильного формата`,
                403: `Текущий пользователь не является соискателем`,
                404: `Резюме не существует или недоступно для текущего пользователя, либо передан неизвестный \`list_type\``,
            },
        });
    }
    /**
     * Очистка списка видимости
     * @param resumeId Идентификатор резюме
     * @param listType Тип списка. Допустимые значения — `whitelist` или `blacklist`
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteResumeVisibilityList(
        resumeId: string,
        listType: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/resumes/{resume_id}/{list_type}',
            path: {
                'resume_id': resumeId,
                'list_type': listType,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'locale': locale,
                'host': host,
            },
            errors: {
                403: `Текущий пользователь не является соискателем`,
                404: `Резюме не существует или недоступно для текущего пользователя, либо передан неизвестный \`list_type\``,
            },
        });
    }
    /**
     * Удаление работодателя из списка видимости
     * Удаление из списка идемпотентно, то есть удаление отсутствующих в списке или несуществующих работодателей игнорируется и не приводит к ошибкам.
     *
     * Можно удалить из списка заблокированного работодателя.
     *
     * За один запрос можно удалить не более 100 компаний
     *
     * @param resumeId Идентификатор резюме
     * @param listType Тип списка. Допустимые значения — `whitelist` или `blacklist`
     * @param id Идентификатор работодателя. Множественный параметр
     * @param hhUserAgent Название приложения и контактная почта разработчика (см. [Информация о клиенте](#section/Obshaya-informaciya/Trebovaniya-k-zaprosam))
     *
     * @param locale Идентификатор локали (см. [Локализация](#tag/Obshie-spravochniki/operation/get-locales))
     *
     * @param host Доменное имя сайта (см. [Выбор сайта](#section/Obshaya-informaciya/Vybor-sajta))
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteEmployerFromResumeVisibilityList(
        resumeId: string,
        listType: string,
        id: string,
        hhUserAgent: string,
        locale: string = 'RU',
        host: 'hh.ru' | 'rabota.by' | 'hh1.az' | 'hh.uz' | 'hh.kz' | 'headhunter.ge' | 'headhunter.kg' = 'hh.ru',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/resumes/{resume_id}/{list_type}/employer',
            path: {
                'resume_id': resumeId,
                'list_type': listType,
            },
            headers: {
                'HH-User-Agent': hhUserAgent,
            },
            query: {
                'id': id,
                'locale': locale,
                'host': host,
            },
            errors: {
                400: `Дополнительные ошибки с описанием причины`,
                403: `Текущий пользователь не является соискателем`,
                404: `Резюме не существует или недоступно для текущего пользователя, либо передан неизвестный \`list_type\``,
            },
        });
    }
}
