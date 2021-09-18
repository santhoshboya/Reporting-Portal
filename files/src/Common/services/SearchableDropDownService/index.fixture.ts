import getSeachResults from '../../fixtures/getSearchResults.json'
import { resolveWithTimeout } from '../../utils/TestUtils'
import { SearchbleDropDownResultsRequest } from '../../stores/types'
import { SearchableDropDownService } from './index'

class SearchableDropDownServiceAPI implements SearchableDropDownService {
   endPoint
   networkCallWithApisauceWithAuth

   constructor(url, networkCallWithApisauceWithAuth) {
      this.networkCallWithApisauceWithAuth = networkCallWithApisauceWithAuth
      this.endPoint = url
   }

   getSeachResultsAPI = (requestObj: SearchbleDropDownResultsRequest) =>
      resolveWithTimeout(getSeachResults)
}

export default SearchableDropDownServiceAPI
