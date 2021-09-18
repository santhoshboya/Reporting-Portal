import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import companiesData from '../../fixtures/companies-data.json'
import selectedCompaniesData from '../../fixtures/selected-companies-data.json'
import { PostOrPutCompanyObject } from '../../stores/types'

import CompaniesService from '.'

class CompaniesFixtureService implements CompaniesService {
   constructor(_networkCallWithApisauce) {} // eslint-disable-line

   getCompanies() {
      return resolveWithTimeout(companiesData)
   }

   deleteCompanies(_companyId: string) {
      return resolveWithTimeout({})
   }

   postCompanies(_company: PostOrPutCompanyObject) {
      return resolveWithTimeout({ company_id: Math.random().toString() })
   }

   getSelectedCompanyDetails(companyId: string) {
      if (selectedCompaniesData[companyId]) {
         return resolveWithTimeout(selectedCompaniesData[companyId])
      }
      return resolveWithTimeout(selectedCompaniesData.iBC05)
   }

   putCompanyDetails(_companyDetails, _companyId: string) {
      return resolveWithTimeout({})
   }
}

export default CompaniesFixtureService
