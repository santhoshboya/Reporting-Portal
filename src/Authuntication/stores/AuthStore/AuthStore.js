import { observable, action, computed, toJS } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { setAccessToken, setUserType, clearUserSession } from '../../../common/utils/StorageUtils'

class AuthStore {
   @observable getUserAuthAPIStatus
   @observable getUserAuthAPIError
   @observable getUserSignOutAPIStatus
   @observable getUserSignOutAPIError
   @observable Access_token
   @observable User_type
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
            //onFailure()
         })
   }
   @action.bound
   setUserAuthAPIResponse(SignInAPIResponse) {
      // console.log("respo", SignInAPIResponse);

      // this.Access_token = SignInAPIResponse.access_token
      // this.User_type = SignInAPIResponse.user_type
      // setAccessToken(this.Access_token)
      // setUserType(this.User_type);
      console.log("response", SignInAPIResponse);
   }

   @action.bound
   setGetUserAuthAPIStatus(apiStatus) {
      console.log("status", apiStatus);

      this.getUserAuthAPIStatus = apiStatus
   }

   @action.bound
   setGetUserAuthAPIError(error) {

      this.getUserAuthAPIError = error
      console.log("error", error);

   }

   @action.bound
   userSignOut(request, onSuccess, onFailure) {
      clearUserSession();
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
      console.log(SignOutAPIResponse);

   }
}
export { AuthStore }
