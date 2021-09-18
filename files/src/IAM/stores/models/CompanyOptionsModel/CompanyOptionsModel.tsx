import { CompanyOptionObject } from '../../types'

class CompanyOptionsModel {
   companyId: string
   companyName: string

   constructor(company: CompanyOptionObject) {
      this.companyId = company.company_id
      this.companyName = company.company_name
   }
}
export { CompanyOptionsModel }
