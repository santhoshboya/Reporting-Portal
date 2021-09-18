import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL, APIStatus } from '@ib/api-constants'

import TaskDiscussionsService from '../../services/TaskDiscussionsService'
import {
   TaskDiscussionsRequestObjectType,
   TaskDiscussionsResponseObjectType,
   TaskDiscussionRequestObjectType
} from '../types'

export default class TaskDiscussionsStore {
   apiService: TaskDiscussionsService
   @observable getTaskDiscussionsAPIStatus!: APIStatus
   @observable getTaskDiscussionsAPIError!: Error | null
   @observable getTaskDiscussionAPIStatus!: APIStatus
   @observable getTaskDiscussionAPIError!: Error | null

   constructor(apiService: TaskDiscussionsService) {
      this.apiService = apiService
      this.init()
   }

   @action.bound
   init() {
      this.getTaskDiscussionAPIStatus = this.getTaskDiscussionsAPIStatus = API_INITIAL
      this.getTaskDiscussionAPIError = this.getTaskDiscussionsAPIError = null
   }

   @action.bound
   setGetTaskDiscussionsAPIStatus(apiStatus) {
      this.getTaskDiscussionsAPIStatus = apiStatus
   }

   @action.bound
   setTaskDiscussionsAPIResponse(
      response: TaskDiscussionsResponseObjectType | null
   ) {
      //    TODO: implement Model & data holding structures in here
   }

   @action.bound
   setGetTaskDiscussionsAPIError(error) {
      this.getTaskDiscussionsAPIError = error
   }

   @action.bound
   getTaskDiscussions(requestObject: TaskDiscussionsRequestObjectType) {
      const promise = this.apiService.getDiscussionsAPI(requestObject)
      return bindPromiseWithOnSuccess(promise)
         .to(
            this.setGetTaskDiscussionsAPIStatus,
            this.setTaskDiscussionsAPIResponse
         )
         .catch(this.setGetTaskDiscussionsAPIError)
   }

   @action.bound
   setGetTaskDiscussionAPIStatus(apiStatus) {
      this.getTaskDiscussionAPIStatus = apiStatus
   }

   @action.bound
   setTaskDiscussionAPIResponse(response) {
      //    NOTE: Ask advice from bro (Whether to refresh or assign a local value)
   }

   @action.bound
   setGetTaskDiscussionAPIError(error) {
      this.getTaskDiscussionAPIError = error
   }

   @action.bound
   getTaskDiscussion(requestObject: TaskDiscussionRequestObjectType) {
      const promise = this.apiService.postDiscussionAPI(requestObject)
      return bindPromiseWithOnSuccess(promise)
         .to(
            this.setGetTaskDiscussionAPIStatus,
            this.setTaskDiscussionAPIResponse
         )
         .catch(this.setGetTaskDiscussionAPIError)
   }

   clearStore = () => this.init()
}
