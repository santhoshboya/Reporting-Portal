import {
   SearchbleDropDownResultsRequest,
   SearchbleDropDownResultsResponse
} from '../../stores/types'

export interface SearchableDropDownService {
   getSeachResultsAPI: (
      requestObject: SearchbleDropDownResultsRequest
   ) => Promise<SearchbleDropDownResultsResponse>
}
