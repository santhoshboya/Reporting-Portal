import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import SearchableDropDownService from '../../services/SearchableDropDownService/index.fixture'
import SearchDropDownResultModel from '../models/SearchDropDownResultModel'

class SearchableDropDownStore {
   searchableDropDownService
   @observable getSearchResultsResponseStatus!: number
   @observable getSearchResultsResponseError!: Error | null

   @observable searchResultsArray!: Array<{
      id: number
      display_name: string
   }>

   constructor(searchableDropDownService: SearchableDropDownService) {
      this.init()
      this.searchableDropDownService = searchableDropDownService
   }

   init() {
      this.getSearchResultsResponseStatus = API_INITIAL
      this.getSearchResultsResponseError = null

      this.searchResultsArray = []
   }

   @action.bound
   setGetResponseSearchResultsAPIStatus(apiStatus) {
      this.getSearchResultsResponseStatus = apiStatus
   }

   @action.bound
   setAPIResponseSearchResults(response) {
      response &&
         (this.searchResultsArray = response.search_results.map(
            obj => new SearchDropDownResultModel(obj)
         ))
   }

   @action.bound
   setGetSearchResultsAPIError(error) {
      this.getSearchResultsResponseError = error
   }

   @action.bound
   getSearchResultsData(searchText: string) {
      const requestObject = {
         text: searchText
      }
      const promise = this.searchableDropDownService.getSeachResultsAPI(
         requestObject
      )

      return bindPromiseWithOnSuccess(promise)
         .to(
            this.setGetResponseSearchResultsAPIStatus,
            this.setAPIResponseSearchResults
         )
         .catch(this.setGetSearchResultsAPIError)
   }
}

export default SearchableDropDownStore
