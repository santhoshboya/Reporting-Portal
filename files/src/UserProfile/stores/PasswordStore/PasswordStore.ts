import { observable, action } from 'mobx'

import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { PasswordService } from '../../services/PasswordService'
import {
   ForgotPasswordAPIRequestObjectType,
   UpdatePasswordAPIRequestObjectType
} from '../types'

export default class PasswordStore {
   @observable getForgotPasswordAPIStatus!: APIStatus
   @observable getForgotPasswordAPIError!: Error | null
   @observable getUpdatePasswordAPIStatus!: APIStatus
   @observable getUpdatePasswordAPIError!: Error | null

   passwordAPIService: PasswordService

   constructor(passwordAPIService: PasswordService) {
      this.passwordAPIService = passwordAPIService
      this.init()
   }

   @action.bound
   init() {
      this.getForgotPasswordAPIStatus = this.getUpdatePasswordAPIStatus = API_INITIAL
      this.getForgotPasswordAPIError = this.getUpdatePasswordAPIError = null
   }

   @action.bound
   setGetForgotPasswordAPIStatus(apiStatus: APIStatus) {
      this.getForgotPasswordAPIStatus = apiStatus
   }

   @action.bound
   setGetForgotPasswordAPIError(error: Error) {
      this.getForgotPasswordAPIError = error
   }

   @action.bound
   forgotPasswordHandler(
      requestObject: ForgotPasswordAPIRequestObjectType,
      onSuccess: Function,
      onFailure: Function
   ): Promise<void> {
      const {
         passwordAPIService,
         setGetForgotPasswordAPIStatus,
         setGetForgotPasswordAPIError
      } = this
      const passwordPromise = passwordAPIService.sendResetPasswordLinkAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(passwordPromise)
         .to(setGetForgotPasswordAPIStatus, () => onSuccess())
         .catch(error => {
            setGetForgotPasswordAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setGetUpdatePasswordAPIStatus(apiStatus: APIStatus) {
      this.getUpdatePasswordAPIStatus = apiStatus
   }

   @action.bound
   setGetUpdatePasswordAPIError(error: Error) {
      this.getUpdatePasswordAPIError = error
   }

   @action.bound
   updatePasswordHandler(
      requestObject: UpdatePasswordAPIRequestObjectType,
      onSuccess: Function,
      onFailure: Function
   ): Promise<void> {
      const {
         passwordAPIService,
         setGetUpdatePasswordAPIStatus,
         setGetUpdatePasswordAPIError
      } = this
      const passwordPromise = passwordAPIService.updatePasswordAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(passwordPromise)
         .to(setGetUpdatePasswordAPIStatus, () => onSuccess())
         .catch(error => {
            setGetUpdatePasswordAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
