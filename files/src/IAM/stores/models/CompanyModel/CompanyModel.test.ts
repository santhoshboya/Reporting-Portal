import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'

import CompaniesService from '../../../services/CompaniesService'
import companiesData from '../../../fixtures/companies-data.json'
import selectedCompaniesData from '../../../fixtures/selected-companies-data.json'
import CompaniesFixtureService from '../../../services/CompaniesService/index.fixture'

import Company from '.'

describe('Company Model', () => {
   let companiesService: CompaniesService
   let companyModel: Company
   const sampleCompany = companiesData.companies[0]

   beforeEach(() => {
      companiesService = new CompaniesFixtureService(undefined)
      companyModel = new Company(companiesService, sampleCompany)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test initialisation of the company model', () => {
      expect(companyModel.getSelectedCompanyAPIStatus).toBe(API_INITIAL)
      expect(companyModel.getSelectedCompanyAPIError).toBe(null)
      expect(companyModel.putCompanyDetailsAPIStatus).toBe(API_INITIAL)
      expect(companyModel.putCompanyDetailsAPIError).toBe(null)
      expect(companyModel.name).toBe(sampleCompany.name)
      expect(companyModel.id).toBe(sampleCompany.company_id)
      expect(companyModel.noOfEmployees).toBe(sampleCompany.no_of_employees)
      expect(companyModel.description).toBe(sampleCompany.description)
      expect(companyModel.logoURL).toBe(sampleCompany.logo_url)
      expect(companyModel.employees.length).toBe(0)
   })

   it('should test fetching state of getSelectedCompanyDetailsAPI', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockGetSelectedCompanyDetailsAPI = jest.fn()
      mockGetSelectedCompanyDetailsAPI.mockReturnValue(mockFetchingPromise)
      companiesService.getSelectedCompanyDetails = mockGetSelectedCompanyDetailsAPI

      companyModel.getSelectedCompanyDetails(sampleCompany.company_id)
      expect(companyModel.getSelectedCompanyAPIStatus).toBe(API_FETCHING)
      expect(companyModel.getSelectedCompanyAPIError).toBe(null)
   })

   it('should test failure state of getSelectedCompanyDetailsAPI', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while Fetching company details!'))
      )

      const mockGetSelectedCompanyDetailsAPI = jest.fn()
      mockGetSelectedCompanyDetailsAPI.mockReturnValue(mockFailurePromise)
      companiesService.getSelectedCompanyDetails = mockGetSelectedCompanyDetailsAPI

      await companyModel.getSelectedCompanyDetails(sampleCompany.company_id)
      expect(companyModel.getSelectedCompanyAPIStatus).toBe(API_FAILED)
      expect(companyModel.getSelectedCompanyAPIError).toBe(
         'Error while Fetching company details!'
      )
   })

   it('should test success state of getSelectedCompanyDetailsAPI', async () => {
      const selectedCompany = companiesData.companies[2]
      await companyModel.getSelectedCompanyDetails(selectedCompany.company_id)
      expect(companyModel.getSelectedCompanyAPIStatus).toBe(API_SUCCESS)
      expect(companyModel.getSelectedCompanyAPIError).toBe(null)
      expect(companyModel.name).toBe(selectedCompany.name)
      expect(companyModel.id).toBe(selectedCompany.company_id)
      expect(companyModel.description).toBe(selectedCompany.description)
      expect(companyModel.logoURL).toBe(selectedCompany.logo_url)
      expect(companyModel.employees.length).not.toBe(0)
   })

   it('should test onChange methods', () => {
      const companyDetails = selectedCompaniesData.iBC02
      companyModel.onChangeCompanyName(companyDetails.name)
      expect(companyModel.name).toBe(companyDetails.name)
      companyModel.onChangeCompanyDescription(companyDetails.description)
      expect(companyModel.description).toBe(companyDetails.description)
      companyModel.onChangeEmployees(companyDetails.employees)
      expect(companyModel.employees.length).toBe(
         companyDetails.employees.length
      )
   })

   it('should test fetching state of putCompanyDetailsAPI', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockPutCompanyDetailsAPI = jest.fn()
      mockPutCompanyDetailsAPI.mockReturnValue(mockFetchingPromise)
      companiesService.putCompanyDetails = mockPutCompanyDetailsAPI

      companyModel.updateCompanyDetails(_ => {})
      expect(companyModel.putCompanyDetailsAPIStatus).toBe(API_FETCHING)
      expect(companyModel.putCompanyDetailsAPIError).toBe(null)
   })

   it('should test failure state of putCompanyDetailsAPI', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while updating company details!'))
      )

      const mockPutCompanyDetailsAPI = jest.fn()
      mockPutCompanyDetailsAPI.mockReturnValue(mockFailurePromise)
      companiesService.putCompanyDetails = mockPutCompanyDetailsAPI

      await companyModel.updateCompanyDetails(_ => {})
      expect(companyModel.putCompanyDetailsAPIStatus).toBe(API_FAILED)
      expect(companyModel.putCompanyDetailsAPIError).toBe(
         'Error while updating company details!'
      )
   })

   it('should test success state of putCompanyDetailsAPI', async () => {
      await companyModel.updateCompanyDetails(_ => {})
      expect(companyModel.putCompanyDetailsAPIStatus).toBe(API_SUCCESS)
      expect(companyModel.putCompanyDetailsAPIError).toBe(null)
   })
})
