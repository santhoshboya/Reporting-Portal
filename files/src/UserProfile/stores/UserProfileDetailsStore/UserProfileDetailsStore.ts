import { observable, action } from 'mobx'

import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { clearUserSession } from '../../../Common/utils/StorageUtils'

import { UserProfileDetailsService } from '../../services/UserProfileDetailsService'
import { UserProfileDetailsAPIResponseObjectType } from '../types'

export default class UserProfileDetailsStore {
   @observable getUserProfileDetailsAPIStatus!: APIStatus
   @observable getUserProfileDetailsAPIError!: Error | null
   @observable getLogoutAPIStatus!: APIStatus
   @observable getLogoutAPIError!: Error | null

   userProfileDetailsAPIService: UserProfileDetailsService
   userProfileDetails = {
      userId: '',
      userName: '',
      profilePicURL: '',
      isAdmin: false
   }

   constructor(userProfileDetailsAPIService: UserProfileDetailsService) {
      this.userProfileDetailsAPIService = userProfileDetailsAPIService
      this.init()
   }

   @action.bound
   init() {
      this.getLogoutAPIStatus = this.getUserProfileDetailsAPIStatus = API_INITIAL
      this.getLogoutAPIError = this.getUserProfileDetailsAPIError = null
   }

   @action.bound
   setGetUserProfileDetailsAPIStatus(apiStatus: APIStatus) {
      this.getUserProfileDetailsAPIStatus = apiStatus
   }

   @action.bound
   setGetUserProfileDetailsResponse(
      response: UserProfileDetailsAPIResponseObjectType | null
   ) {
      if (response) {
         const {
            user_id: userId,
            name: userName,
            profile_pic_url: profilePicURL,
            is_admin: isAdmin
         } = response
         this.userProfileDetails = { userId, userName, profilePicURL, isAdmin }
      }
   }

   @action.bound
   setGetUserProfileDetailsAPIError(error: Error) {
      this.getUserProfileDetailsAPIError = error
   }

   @action.bound
   getUserProfileDetails(
      onSuccess?: Function,
      onFailure?: Function
   ): Promise<void | UserProfileDetailsAPIResponseObjectType> {
      const {
         userProfileDetailsAPIService,
         setGetUserProfileDetailsAPIStatus,
         setGetUserProfileDetailsAPIError,
         setGetUserProfileDetailsResponse
      } = this
      const userPromise = userProfileDetailsAPIService.getUserProfileDetailsAPI()
      return bindPromiseWithOnSuccess(userPromise)
         .to(setGetUserProfileDetailsAPIStatus, response => {
            setGetUserProfileDetailsResponse(response)
            onSuccess && onSuccess()
         })
         .catch(error => {
            setGetUserProfileDetailsAPIError(error)
            onFailure && onFailure(error)
         })
   }

   @action.bound
   setGetLogoutAPIStatus(apiStatus: APIStatus) {
      this.getLogoutAPIStatus = apiStatus
   }

   @action.bound
   setLogoutAPIResponse(response: any) {
      clearUserSession()
   }

   @action.bound
   setGetLogoutAPIError(error: Error) {
      this.getLogoutAPIError = error
   }

   @action.bound
   userLogoutHandler(onSuccessRequest?, onFailureRequest?): Promise<void | {}> {
      // FIXME: Handle ConfirmationDialog from common/alertDialog utils
      const {
         userProfileDetailsAPIService,
         setGetLogoutAPIStatus,
         setGetLogoutAPIError,
         setLogoutAPIResponse
      } = this
      const usersPromise = userProfileDetailsAPIService.getLogoutAPI()

      return bindPromiseWithOnSuccess(usersPromise)
         .to(setGetLogoutAPIStatus, response => {
            setLogoutAPIResponse(response)
            onSuccessRequest()
         })
         .catch(error => {
            setGetLogoutAPIError(error)
            onFailureRequest(error)
         })
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
