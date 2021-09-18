import { observable, action } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import CompaniesService from '../../../services/CompaniesService'
import { EMPTY_STRING } from '../../../Common/constants/stringConstants'

import {
   CompanyObject,
   GetSelectedCompanyResponse,
   Employee,
   PostOrPutCompanyObject
} from '../../types'

class Company {
   @observable getSelectedCompanyAPIStatus!: APIStatus
   @observable getSelectedCompanyAPIError!: Error | null
   @observable putCompanyDetailsAPIStatus!: APIStatus
   @observable putCompanyDetailsAPIError!: Error | null
   @observable name: string = EMPTY_STRING
   @observable description: string = EMPTY_STRING
   @observable employees: Array<Employee> = []
   id!: string
   logoURL!: string
   noOfEmployees!: number | undefined
   companiesService: CompaniesService

   constructor(companiesService: CompaniesService, company?: CompanyObject) {
      this.companiesService = companiesService
      this.getSelectedCompanyAPIStatus = API_INITIAL
      this.getSelectedCompanyAPIError = null
      this.putCompanyDetailsAPIStatus = API_INITIAL
      this.putCompanyDetailsAPIError = null
      if (company) {
         this.initCompany(company)
      }
   }

   @action.bound
   initCompany(company: CompanyObject | GetSelectedCompanyResponse) {
      const {
         company_id,
         name,
         description,
         logo_url,
         no_of_employees,
         employees
      } = company
      this.id = company_id
      this.name = name
      this.description = description
      this.logoURL = logo_url
      this.noOfEmployees = no_of_employees
      if (employees?.length) {
         this.employees = [...employees]
      }
   }

   @action.bound
   onChangeCompanyName(name: string) {
      this.name = name
   }

   @action.bound
   onChangeCompanyDescription(description: string) {
      this.description = description
   }

   @action.bound
   onChangeEmployees(employees: Array<Employee>) {
      this.employees = [...employees]
   }

   getSelectedEmployees = () =>
      this.employees.map(employee => employee.employee_id)

   getRequestObject = (): PostOrPutCompanyObject => ({
      name: this.name,
      description: this.description,
      employee_ids: this.getSelectedEmployees()
   })

   @action.bound
   setGetSelectedCompanyAPIStatus(apiStatus: APIStatus) {
      this.getSelectedCompanyAPIStatus = apiStatus
   }

   @action.bound
   setGetSelectedCompanyAPIError(apiError: Error | null) {
      this.getSelectedCompanyAPIError = apiError
   }

   @action.bound
   setGetSelectedCompanyAPIResponse(
      apiResponse: GetSelectedCompanyResponse | null
   ) {
      if (apiResponse) {
         this.initCompany(apiResponse)
      }
   }

   @action.bound
   getSelectedCompanyDetails(companyId: string) {
      const getSelectedCompanyDetailsPromise = this.companiesService.getSelectedCompanyDetails(
         companyId
      )
      return bindPromiseWithOnSuccess(getSelectedCompanyDetailsPromise)
         .to(
            this.setGetSelectedCompanyAPIStatus,
            this.setGetSelectedCompanyAPIResponse
         )
         .catch(e => this.setGetSelectedCompanyAPIError(e))
   }

   @action.bound
   setPutCompanyDetailsAPIStatus(apiStatus: APIStatus) {
      this.putCompanyDetailsAPIStatus = apiStatus
   }

   @action.bound
   setPutCompanyDetailsAPIError(apiError: Error | null) {
      this.putCompanyDetailsAPIError = apiError
   }

   @action.bound
   updateCompanyDetails(onSuccess: (name: string) => void) {
      const putCompanyDetailsPromise = this.companiesService.putCompanyDetails(
         this.getRequestObject(),
         this.id
      )

      return bindPromiseWithOnSuccess(putCompanyDetailsPromise)
         .to(this.setPutCompanyDetailsAPIStatus, _ => onSuccess(this.name))
         .catch(e => this.setPutCompanyDetailsAPIError(e))
   }
}

export default Company
