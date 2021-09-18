import { observable, action, computed, reaction, toJS } from 'mobx'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../../common/utils/APIUtils'

import { getLoadingStatus } from '@ib/api-utils'
import { Observation } from '../Models/Observation'
import { observationType, getObservationApiResponce } from "../types"
import { ObservationApiService } from "../../services/ObservationApiService/ObservationApiService"
const LIMIT = 3
const SORT_OPTIONS = ['new', 'old']
const SORT_KEYS = ['due_date', 'reported_on']
const SORT_KEY = 'reported_on'
const FILTER_TYPE = 'all'
const USERTYPE = 'user'


export interface subCategoriesType{
   "id": number,
   "name": string
}


export interface  categoriesType{
   "category_id": number,
   "category": string,
   "sub_catogiries":Array<subCategoriesType>
}
class UserStore {
   @observable userType
   @observable observationList
   @observable observation
   @observable observationDetails
   @observable getObservationListAPIStatus
   @observable getObservationListAPIError
   @observable userObservationAPIService

   @observable getObservationAPIStatus
   @observable getObservationAPIError

   @observable getPostObservationAPIStatus
   @observable getPostObservationAPIError

   @observable updateObservationAPIStatus
   @observable updateObservationAPIError

   @observable observationsSortType
   @observable observationsSortOption
   @observable reportedOnSortType
   @observable dueDateSortType
   @observable filtersOfObservation

   @observable currentPage
   @observable totalPages
   @observable filterType
   @observable sortType
   @observable cateogary
   @observable cateogaries
   @observable subCateogaries
   @observable rpList

   @observable getCateogariesAPIStatus
   @observable getCateogariesAPIError

   constructor(userObservationAPIService) {
      this.init()
      this.userObservationAPIService = userObservationAPIService
   }
   @action.bound
   init() {
      this.getObservationListAPIStatus = API_INITIAL
      this.getObservationListAPIError = null

      this.getObservationAPIStatus = API_INITIAL
      this.getObservationAPIError = null

      this.getPostObservationAPIStatus = API_INITIAL
      this.getPostObservationAPIError = null

      this.getCateogariesAPIStatus = API_INITIAL
      this.getCateogariesAPIError = null

      this.updateObservationAPIStatus = API_INITIAL
      this.updateObservationAPIError = null

      this.observationDetails = {}
      this.observationList = []
      this.observation = {}
      this.currentPage = 1
      this.totalPages = null
      this.userType = ''
      this.filterType = 'all'
      this.observationsSortOption = SORT_OPTIONS[0]
      this.reportedOnSortType = SORT_OPTIONS[0]
      this.dueDateSortType = SORT_OPTIONS[0]
      this.observationsSortType = SORT_KEY
      this.cateogaries = []
      this.subCateogaries = []
      this.filtersOfObservation = FILTER_TYPE
      this.cateogary = null
      this.rpList = []
   }

   @action.bound
   updateObservationDeatails(updationFail, userType, details) {
      const updateObservationApiPromise = this.userObservationAPIService.updateObservationApi(
         userType,
         details
      )

      return  bindPromiseWithOnSuccess(updateObservationApiPromise)

         .to(
            this.setUpdateObservationApiAPIStatus,
            this.setUpdateObservationApiResponse
         )
         .catch(error => {
            this.setUpdateObservationApiAPIError(error)
            updationFail()
         })
   }

   @action.bound
   setUpdateObservationApiAPIStatus(apiStatus) {
      this.updateObservationAPIStatus = apiStatus
   }
   @action.bound
   setUpdateObservationApiResponse(response) {}

   @action.bound
   setUpdateObservationApiAPIError(error) {
      this.updateObservationAPIError = getUserDisplayableErrorMessage(error)
   }

   @action.bound
   getCateogaries(requestObject, onSuccess, onFailure) {
      const categoriesPromise = this.userObservationAPIService.getCateogariesApi(
      )
      return bindPromiseWithOnSuccess(categoriesPromise)
         .to(this.setGetCateogariesApiAPIStatus, response => {
            this.setGetCateogariesApiResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setGetCateogariesApiAPIError(error)
            onFailure()
         })
   }
   

   @action.bound
   setGetCateogariesApiAPIStatus(apiStatus) {
      this.getCateogariesAPIStatus = apiStatus
   }

   @action.bound
   setGetCateogariesApiAPIError(error) {
      this.getCateogariesAPIError = error
   }

   @action.bound
   setGetCateogariesApiResponse(response) {
      this.cateogaries = response.categories
      this.subCateogaries = []
   }
   @computed get cateogariesList() {
      let temp:Array<string>  = []
      this.cateogaries.forEach((cateogary:categoriesType) => {
         temp.push(cateogary.category)
      })
      return temp
   }
   @computed get getSubCateogaries() {
      let subCateogaries = []
      if (this.cateogaries.length > 0 && this.cateogary != null) {
         subCateogaries = this.cateogaries.find(
            cateogary => cateogary.name === this.cateogary
         ).sub_categories
      } else subCateogaries = []

      let temp:Array<string> = []
      if (subCateogaries)
         subCateogaries.forEach((subCateogary:subCategoriesType) => {
            temp.push(subCateogary.name)
         })
      return temp
   }

   @action.bound
   getObservationList() {
      let offset = Math.ceil(LIMIT * (this.currentPage - 1))
      let details = {
         user_type: USERTYPE,
         sort_on: this.observationsSortType,
         sort_by: this.observationsSortOption,
         filter_on: this.filterType
      }

      const userObservationPromise = this.userObservationAPIService.getObservationListApi(
         LIMIT,
         offset,
         details
      )
      return bindPromiseWithOnSuccess(userObservationPromise)
         .to(
            this.setGetObservationListApiAPIStatus,
            this.setGetObservationListApiResponse
         )
         .catch(this.setGetObservationListApiAPIError)
   }

   @action.bound
   setGetObservationListApiAPIStatus(apiStatus) {
      this.getObservationListAPIStatus = apiStatus
   }

   @action.bound
   setGetObservationListApiAPIError(error) {
      this.getObservationListAPIError = error
   }

   @action.bound
   setGetObservationListApiResponse(ObservationListResponse) {
      this.totalPages = Math.ceil(
         ObservationListResponse.user_observations_count / LIMIT
      )
      if (this.totalPages < 1) this.currentPage = 1
      this.observationList = ObservationListResponse.user_observations.map(
         observation => new Observation(observation)
      )
      this.userType = ObservationListResponse.user_type
   }

   @action.bound
   getObservation(observation_id, onSuccess, onFailure) {
      const observationPromise = this.userObservationAPIService.getObservationApi(
         observation_id
      )
      return bindPromiseWithOnSuccess(observationPromise)
         .to(this.setGetObservationApiAPIStatus, response => {
            this.setGetObservationApiResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setGetObservationApiAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setGetObservationApiAPIStatus(apiStatus) {
      this.getObservationAPIStatus = apiStatus
   }

   @action.bound
   setGetObservationApiAPIError(error) {
      this.getObservationAPIError = error
   }

   @action.bound
   setGetObservationApiResponse(ObservationResponse) {
      this.observationDetails = ObservationResponse
      this.userType = ObservationResponse.user_type
      this.rpList = ObservationResponse.rp_list
   }

   @action.bound
   addNewObservation(requestObject, onSuccess, onFailure) {
      const postObservationPromise = this.userObservationAPIService.postObservationApi(
         requestObject
      )
      return bindPromiseWithOnSuccess(postObservationPromise)
         .to(this.setPostObservationApiAPIStatus, response => {
            this.setPostObservationApiResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setPostObservationApiAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setPostObservationApiAPIStatus(apiStatus) {
      this.getPostObservationAPIStatus = apiStatus
   }

   @action.bound
   setPostObservationApiAPIError(error) {
      this.getPostObservationAPIError = error
   }

   @action.bound
   setPostObservationApiResponse(postObservationResponse) {
      this.observation = postObservationResponse
   }

   @action.bound
   filterObservationList(value) {
      this.filterType = value
      this.currentPage = 1
      this.getObservationList()
   }

   @action.bound
   goToPreviousPage() {
      this.currentPage--
      this.getObservationList()
   }

   @action.bound
   goToNextPage() {
      this.currentPage++
      this.getObservationList()
   }

   @action.bound
   goToRandomPage(value) {
      this.currentPage = parseInt(value, 10)
      this.getObservationList()
   }
   // currentPage = reaction(
   //    () => {
   //       return {
   //          currentPage: this.currentPage,
   //          filterType: this.filterType
   //       }
   //    },
   //    () => this.getObservationList()
   // )

   @action.bound
   reportedOnSort() {
      if (this.reportedOnSortType === SORT_OPTIONS[0])
         this.reportedOnSortType = SORT_OPTIONS[1]
      else this.reportedOnSortType = SORT_OPTIONS[0]
      this.observationsSortType = SORT_KEYS[1]
      this.observationsSortOption = this.reportedOnSortType
      this.currentPage = 1
      this.getObservationList()
   }
   @action.bound
   dueDateOnSort() {
      if (this.dueDateSortType === SORT_OPTIONS[0])
         this.dueDateSortType = SORT_OPTIONS[1]
      else this.dueDateSortType = SORT_OPTIONS[0]
      this.observationsSortType = SORT_KEYS[0]
      this.observationsSortOption = this.dueDateSortType
      this.currentPage = 1
      this.getObservationList()
   }
}
export { UserStore }
