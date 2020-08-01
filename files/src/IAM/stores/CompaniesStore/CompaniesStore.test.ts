import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'

import { networkCallWithApisauceWithAuth } from '../../../Common/stores'

import companiesData from '../../fixtures/companies-data.json'
import CompaniesService from '../../services/CompaniesService'
import CompaniesFixtureService from '../../services/CompaniesService/index.fixture'
import { EMPTY_STRING } from '../../Common/constants/stringConstants'

import CompaniesStore from '.'

describe('Companies Store tests', () => {
   let companiesService: CompaniesService
   let companiesStore: CompaniesStore

   const sampleCompany = {
      name: 'LearnTech',
      description: 'Learning by doing!',
      employee_ids: []
   }

   beforeEach(() => {
      companiesService = new CompaniesFixtureService(
         networkCallWithApisauceWithAuth
      )
      companiesStore = new CompaniesStore(companiesService)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test if store is initialized or not', () => {
      expect(companiesStore.getCompaniesAPIStatus).toBe(API_INITIAL)
      expect(companiesStore.getCompaniesAPIError).toBe(null)
      expect(companiesStore.deleteCompaniesAPIStatus).toBe(API_INITIAL)
      expect(companiesStore.deleteCompaniesAPIError).toBe(null)
      expect(companiesStore.postCompaniesAPIStatus).toBe(API_INITIAL)
      expect(companiesStore.postCompaniesAPIError).toBe(null)
      expect(companiesStore.companiesList.size).toBe(0)
   })

   it('should test getCompaniesAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockGetCompaniesAPI = jest.fn()
      mockGetCompaniesAPI.mockReturnValue(mockFetchingPromise)
      companiesService.getCompanies = mockGetCompaniesAPI

      companiesStore.getCompanies()
      expect(companiesStore.getCompaniesAPIStatus).toBe(API_FETCHING)
      expect(companiesStore.getCompaniesAPIError).toBe(null)
   })

   it('should test getCompaniesAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while fetching companies!'))
      )

      const mockGetCompaniesAPI = jest.fn()
      mockGetCompaniesAPI.mockReturnValue(mockFailurePromise)
      companiesService.getCompanies = mockGetCompaniesAPI

      await companiesStore.getCompanies()
      expect(companiesStore.getCompaniesAPIStatus).toBe(API_FAILED)
      expect(companiesStore.getCompaniesAPIError).toBe(
         'Error while fetching companies!'
      )
   })

   it('should test getCompaniesAPI success state', async () => {
      await companiesStore.getCompanies()
      expect(companiesStore.getCompaniesAPIStatus).toBe(API_SUCCESS)
      expect(companiesStore.companiesList.size).toBe(
         companiesData.companies.length
      )
   })

   it('should test postCompaniesAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockPostCompaniesAPI = jest.fn()
      mockPostCompaniesAPI.mockReturnValue(mockFetchingPromise)
      companiesService.postCompanies = mockPostCompaniesAPI

      companiesStore.onAddCompany(sampleCompany, _ => {})
      expect(companiesStore.postCompaniesAPIStatus).toBe(API_FETCHING)
      expect(companiesStore.postCompaniesAPIError).toBe(null)
   })

   it('should test postCompaniesAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while fetching companies!'))
      )

      const mockGetTeamsAPI = jest.fn()
      mockGetTeamsAPI.mockReturnValue(mockFailurePromise)
      companiesService.postCompanies = mockGetTeamsAPI

      await companiesStore.onAddCompany(sampleCompany, _ => {})
      expect(companiesStore.postCompaniesAPIStatus).toBe(API_FAILED)
      expect(companiesStore.postCompaniesAPIError).toBe(
         'Error while fetching companies!'
      )
   })

   it('should test postCompaniesAPI success state', async () => {
      await companiesStore.onAddCompany(sampleCompany, _ => {})
      expect(companiesStore.postCompaniesAPIStatus).toBe(API_SUCCESS)
      expect(companiesStore.postCompaniesAPIError).toBe(null)
      expect(companiesStore.companiesList.size).toBe(1)
   })

   it('should test deleteCompaniesAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockDeleteCompaniesAPI = jest.fn()
      mockDeleteCompaniesAPI.mockReturnValue(mockFetchingPromise)
      companiesService.deleteCompanies = mockDeleteCompaniesAPI

      companiesStore.deleteCompany('1', () => {})
      expect(companiesStore.deleteCompaniesAPIStatus).toBe(API_FETCHING)
      expect(companiesStore.deleteCompaniesAPIError).toBe(null)
   })

   it('should test deleteCompaniesAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while deleting company!'))
      )

      const mockDeleteCompaniesAPI = jest.fn()
      mockDeleteCompaniesAPI.mockReturnValue(mockFailurePromise)
      companiesService.deleteCompanies = mockDeleteCompaniesAPI

      await companiesStore.deleteCompany('1', () => {})
      expect(companiesStore.deleteCompaniesAPIStatus).toBe(API_FAILED)
      expect(companiesStore.deleteCompaniesAPIError).toBe(
         'Error while deleting company!'
      )
   })

   it('should test deleteCompaniesAPI success state', async () => {
      const sampleCompany = companiesData.companies[0]
      companiesStore.companiesList.set(sampleCompany.company_id, sampleCompany)
      await companiesStore.deleteCompany(sampleCompany.company_id, () => {})
      expect(companiesStore.deleteCompaniesAPIStatus).toBe(API_SUCCESS)
      expect(companiesStore.companiesList.size).toBe(0)
   })

   it('should test clearStore', async () => {
      await companiesStore.getCompanies()
      expect(companiesStore.getCompaniesAPIStatus).toBe(API_SUCCESS)
      expect(companiesStore.companiesList.size).toBe(
         companiesData.companies.length
      )
      companiesStore.clearStore()
      expect(companiesStore.getCompaniesAPIStatus).toBe(API_INITIAL)
      expect(companiesStore.getCompaniesAPIError).toBe(null)
      expect(companiesStore.deleteCompaniesAPIStatus).toBe(API_INITIAL)
      expect(companiesStore.deleteCompaniesAPIError).toBe(null)
      expect(companiesStore.postCompaniesAPIStatus).toBe(API_INITIAL)
      expect(companiesStore.postCompaniesAPIError).toBe(null)
      expect(companiesStore.companiesList.size).toBe(0)
   })
})
