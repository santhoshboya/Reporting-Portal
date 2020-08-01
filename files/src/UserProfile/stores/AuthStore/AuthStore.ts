import { observable, action } from 'mobx'

import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { setAccessToken } from '../../../Common/utils/StorageUtils'

import { AuthService } from '../../services/AuthService'
import { LoginAPIResponseObjectType, LoginAPIRequestObjectType } from '../types'

export default class AuthStore {
   @observable getLoginAPIStatus!: APIStatus
   @observable getLoginAPIError!: Error | null

   authAPIService: AuthService
   loginCredentials!: LoginAPIResponseObjectType

   constructor(authAPIService: AuthService) {
      this.authAPIService = authAPIService
      this.init()
   }

   @action.bound
   init() {
      this.getLoginAPIStatus = API_INITIAL
      this.getLoginAPIError = null
   }

   @action.bound
   setGetLoginAPIStatus(apiStatus: APIStatus) {
      this.getLoginAPIStatus = apiStatus
   }

   @action.bound
   setLoginAPIResponse(response: LoginAPIResponseObjectType | null) {
      if (response) {
         const { access_token } = response
         setAccessToken(access_token)
         this.loginCredentials = response
      }
   }

   @action.bound
   setGetLoginAPIError(error: Error) {
      this.getLoginAPIError = error
   }

   @action.bound
   userLoginHandler(
      requestObject: LoginAPIRequestObjectType,
      onSuccess: Function,
      onFailure: Function
   ): Promise<void | LoginAPIResponseObjectType> {
      const {
         authAPIService,
         setGetLoginAPIStatus,
         setGetLoginAPIError,
         setLoginAPIResponse
      } = this
      const usersPromise = authAPIService.getLoginAPI(requestObject)
      return bindPromiseWithOnSuccess(usersPromise)
         .to(setGetLoginAPIStatus, response => {
            setLoginAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            setGetLoginAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
