import { observable, action, computed, toJS } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../../common/utils/APIUtils'
import {
   setAccessToken,
   getAccessToken,
   clearUserSession
} from '../../../common/utils/StorageUtils'
import { object } from "@storybook/addon-knobs"
import { AuthAPI } from "../../services/AuthService/AuthAPI"
import { AuthFixtureService } from "../../services/AuthService/AuthFixtureService"

type SigninResponseType={
   access_token:string,
   user_type:string
}

class AuthStore {
   @observable getUserAuthAPIStatus:number=API_INITIAL
   @observable getUserAuthAPIError:string|null=null
   @observable getUserSignOutAPIStatus:number=API_INITIAL
   @observable getUserSignOutAPIError:string|null=null
   @observable Access_token:string|null=null
   authAPIService :AuthFixtureService

   constructor(authAPIService:AuthFixtureService) {
      this.authAPIService = authAPIService
      this.init()
   }

   @action.bound
   init() {
      this.getUserAuthAPIStatus = API_INITIAL
      this.getUserSignOutAPIStatus = API_INITIAL
      this.getUserAuthAPIError = null
      this.getUserSignOutAPIError = null
   }
   //TODO
   @action.bound
   userSignIn(request, onSuccess, onFailure) {
      const signInPromise = this.authAPIService.signInAPI(request)
      return bindPromiseWithOnSuccess(signInPromise)
         .to(this.setGetUserAuthAPIStatus, (response:any) => {
            this.setUserAuthAPIResponse(response)
            onSuccess(response.user_type)
         })
         .catch(error => {
            this.setGetUserAuthAPIError(error)
            onFailure()
         })
   }
   @action.bound
   setUserAuthAPIResponse(SignInAPIResponse:SigninResponseType) {
      this.Access_token = SignInAPIResponse.access_token
      setAccessToken(this.Access_token)
   }

   @action.bound
   setGetUserAuthAPIStatus(apiStatus) {
      this.getUserAuthAPIStatus = apiStatus
   }

   @action.bound
   setGetUserAuthAPIError(error) {
      this.getUserAuthAPIError = getUserDisplayableErrorMessage(error)
   }

   @action.bound
   userSignOut(request, onSuccess, onFailure) {
      clearUserSession()
      const signOutPromise = this.authAPIService.signOutAPI({})
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
   setUserSignOutAPIResponse(SignOutAPIResponse) {}
}
export { AuthStore }
