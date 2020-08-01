import { create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'

import { PostOrPutCompanyObject } from '../../stores/types'

import endpoints from '../endpoints'

import CompaniesService from '.'

class CompaniesApiService implements CompaniesService {
   api: Record<string, any>
   networkCallWithApisauce
   constructor(networkCallWithApisauce) {
      this.networkCallWithApisauce = networkCallWithApisauce
      this.api = create({
         baseURL: 'baseURL' //TODO: Need to add baseURL
      })
   }

   getCompanies() {
      return this.networkCallWithApisauce(
         this.api,
         endpoints.getCompanies,
         {},
         apiMethods.get
      )
   }

   deleteCompanies(companyId: string) {
      return this.networkCallWithApisauce(
         this.api,
         `${endpoints.deleteCompanies}${companyId}`,
         {},
         apiMethods.delete
      )
   }

   postCompanies(company: PostOrPutCompanyObject) {
      return this.networkCallWithApisauce(
         this.api,
         endpoints.postCompanies,
         company,
         apiMethods.post
      )
   }

   getSelectedCompanyDetails(companyId: string) {
      return this.networkCallWithApisauce(
         this.api,
         `${endpoints.getCompanies}${companyId}`,
         {},
         apiMethods.get
      )
   }

   putCompanyDetails(
      companyDetails: PostOrPutCompanyObject,
      companyId: string
   ) {
      return this.networkCallWithApisauce(
         this.api,
         `${endpoints.putCompanies}${companyId}`,
         companyDetails,
         apiMethods.put
      )
   }
}

export default CompaniesApiService
