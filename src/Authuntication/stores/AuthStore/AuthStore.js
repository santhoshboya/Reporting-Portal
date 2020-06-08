import { observable, action, computed, toJS } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../../common/utils/APIUtils'
import {
   setAccessToken,
   getAccessToken,
   clearUserSession
} from '../../../common/utils/StorageUtils'

class AuthStore {
   @observable getUserAuthAPIStatus
   @observable getUserAuthAPIError
   @observable getUserSignOutAPIStatus
   @observable getUserSignOutAPIError
   @observable Access_token
   authAPIService

   constructor(authAPIService) {
      this.authAPIService = authAPIService
      this.init()
   }

   @action.bound
   init() {
      this.getUserAuthAPIStatus = API_INITIAL
      this.getUserAuthAPIError = null
   }

   @action.bound
   userSignIn(request, onSuccess, onFailure) {
      const signInPromise = this.authAPIService.signInAPI(request)
      return bindPromiseWithOnSuccess(signInPromise)
         .to(this.setGetUserAuthAPIStatus, response => {
            this.setUserAuthAPIResponse(response)
            onSuccess(response.user_type)
         })
         .catch(error => {
            this.setGetUserAuthAPIError(error)
            onFailure()
         })
   }
   @action.bound
   setUserAuthAPIResponse(SignInAPIResponse) {
      this.Access_token = SignInAPIResponse.access_token
      setAccessToken(this.Access_token)
   }

   @action.bound
   setGetUserAuthAPIStatus(apiStatus) {
      this.getUserAuthAPIStatus = apiStatus
   }

   @action.bound
   setGetUserAuthAPIError(error) {
      console.log(error, 999999988888)
      this.getUserAuthAPIError = getUserDisplayableErrorMessage(error)
   }

   @action.bound
   userSignOut(request, onSuccess, onFailure) {
      clearUserSession()
      const signOutPromise = this.authAPIService.signOutAPI()
      return bindPromiseWithOnSuccess(signOutPromise)
         .to(this.setGetUserSignOutSignOutStatus, response => {
            this.setUserSignOutAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setGetUserSignOutAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setGetUserSignOutSignOutStatus(apiStatus) {
      this.getUserSignOutAPIStatus = apiStatus
   }

   @action.bound
   setGetUserSignOutAPIError(error) {
      this.getUserSignOutAPIError = error
   }

   @action.bound
   setUserSignOutAPIResponse(SignOutAPIResponse) {
      console.log(SignOutAPIResponse)
   }
}
export { AuthStore }
