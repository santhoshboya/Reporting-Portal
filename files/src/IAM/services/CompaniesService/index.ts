import {
   GetCompaniesResponse,
   PostOrPutCompanyObject,
   PostCompanyResponse,
   GetSelectedCompanyResponse
} from '../../stores/types'

interface CompaniesService {
   getCompanies: () => Promise<GetCompaniesResponse | any>

   deleteCompanies: (companyId: string) => Promise<any>

   postCompanies: (
      company: PostOrPutCompanyObject
   ) => Promise<PostCompanyResponse | any>

   getSelectedCompanyDetails: (
      companyId: string
   ) => Promise<GetSelectedCompanyResponse | any>

   putCompanyDetails: (
      companyDetails: PostOrPutCompanyObject,
      companyId: string
   ) => Promise<any>
}

export default CompaniesService
