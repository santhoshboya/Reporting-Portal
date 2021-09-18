import { create, ApisauceInstance } from 'apisauce'
import { apiMethods } from '../../constants/APIConstants'

import Config from '../../../Common/constants/EnvironmentConstants'
import { SearchbleDropDownResultsRequest } from '../../stores/types'
import { SearchableDropDownService } from './index'

class SearchableDropDownServiceAPI implements SearchableDropDownService {
   api: ApisauceInstance
   networkCallWithApisauce!: Function
   endPoint

   constructor(url, networkCallWithApisauce: Function) {
      this.api = create({
         baseURL: Config.BASE_URL
      })
      this.endPoint = url
      this.networkCallWithApisauce = networkCallWithApisauce
   }

   getSeachResultsAPI = (requestObj: SearchbleDropDownResultsRequest) =>
      this.networkCallWithApisauce(
         this.api,
         `${this.endPoint}`,
         requestObj,
         apiMethods.post
      )
}

export default SearchableDropDownServiceAPI
