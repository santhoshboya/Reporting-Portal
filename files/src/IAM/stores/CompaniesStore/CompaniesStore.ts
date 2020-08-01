import { observable, ObservableMap, action } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import CompaniesService from '../../services/CompaniesService'
import { EMPTY_STRING } from '../../Common/constants/stringConstants'

import CompanyModel from '../models/CompanyModel'
import {
   GetCompaniesResponse,
   PostOrPutCompanyObject,
   PostCompanyResponse
} from '../types'

class CompaniesStore {
   @observable companiesList!: ObservableMap
   @observable getCompaniesAPIStatus!: APIStatus
   @observable getCompaniesAPIError!: Error | null
   @observable deleteCompaniesAPIStatus!: APIStatus
   @observable deleteCompaniesAPIError!: Error | null
   @observable postCompaniesAPIStatus!: APIStatus
   @observable postCompaniesAPIError!: Error | null
   companiesService: CompaniesService

   constructor(companiesService: CompaniesService) {
      this.companiesService = companiesService
      this.init()
   }

   @action.bound
   init() {
      this.getCompaniesAPIStatus = API_INITIAL
      this.getCompaniesAPIError = null
      this.deleteCompaniesAPIStatus = API_INITIAL
      this.deleteCompaniesAPIError = null
      this.postCompaniesAPIStatus = API_INITIAL
      this.postCompaniesAPIError = null
      this.companiesList = new ObservableMap()
   }

   @action.bound
   setGetCompaniesAPIStatus(apiStatus: APIStatus) {
      this.getCompaniesAPIStatus = apiStatus
   }

   @action.bound
   setGetCompaniesAPIError(apiError: Error | null) {
      this.getCompaniesAPIError = apiError
   }

   @action.bound
   setGetCompaniesAPIResponse(apiResponse: GetCompaniesResponse | null) {
      if (apiResponse) {
         apiResponse.companies.map(company => {
            this.companiesList.set(
               company.company_id,
               new CompanyModel(this.companiesService, company)
            )
         })
      }
   }

   @action.bound
   getCompanies() {
      const getCompaniesPromise = this.companiesService.getCompanies()
      return bindPromiseWithOnSuccess(getCompaniesPromise)
         .to(this.setGetCompaniesAPIStatus, this.setGetCompaniesAPIResponse)
         .catch(e => this.setGetCompaniesAPIError(e))
   }

   @action.bound
   setPostCompaniesAPIStatus(apiStatus: APIStatus) {
      this.postCompaniesAPIStatus = apiStatus
   }

   @action.bound
   setPostCompaniesAPIResponse(
      apiResponse: PostCompanyResponse | null,
      company: PostOrPutCompanyObject
   ) {
      if (apiResponse) {
         const { company_id } = apiResponse
         //NOTE: Just for fixtures
         const { name, description, employee_ids } = company
         const newCompany = {
            company_id: company_id,
            name: name,
            description: description,
            logo_url: EMPTY_STRING,
            no_of_employees: employee_ids.length
         }

         this.companiesList.set(
            company_id,
            new CompanyModel(this.companiesService, newCompany)
         )
      }
   }

   @action.bound
   setPostCompaniesAPIError(apiError: Error | null) {
      this.postCompaniesAPIError = apiError
   }

   @action.bound
   onAddCompany(
      newCompany: PostOrPutCompanyObject,
      onSuccess: (name: string) => void
   ) {
      const postCompaniesPromise = this.companiesService.postCompanies(
         newCompany
      )

      return bindPromiseWithOnSuccess(postCompaniesPromise)
         .to(this.setPostCompaniesAPIStatus, response => {
            this.setPostCompaniesAPIResponse(response, newCompany)
            onSuccess(newCompany.name)
         })
         .catch(e => this.setPostCompaniesAPIError(e))
   }

   @action.bound
   setDeleteCompaniesAPIStatus(apiStatus: APIStatus) {
      this.deleteCompaniesAPIStatus = apiStatus
   }

   @action.bound
   setDeleteCompaniesAPIError(apiError: Error | null) {
      this.deleteCompaniesAPIError = apiError
   }

   @action.bound
   deleteCompany(companyId: string, callback: () => void) {
      const deleteCompaniesPromise = this.companiesService.deleteCompanies(
         companyId
      )
      return bindPromiseWithOnSuccess(deleteCompaniesPromise)
         .to(this.setDeleteCompaniesAPIStatus, _res => {
            this.companiesList.delete(companyId)
            callback()
         })
         .catch(e => this.setDeleteCompaniesAPIError(e))
   }

   createAndReturnCompanyInstance = () =>
      new CompanyModel(this.companiesService)

   @action.bound
   clearStore() {
      this.init()
   }
}

export { CompaniesStore }
