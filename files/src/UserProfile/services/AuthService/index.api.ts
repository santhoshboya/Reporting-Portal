import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import config from '../../../Common/constants/EnvironmentConstants'
import { networkCallWithAPISauceWithoutAuth } from '../../../Common/utils/APIUtils'

import endpoints from '../endpoints'

import { AuthService } from '.'

const AUTH_URL = `${config.BASE_URL}api/ib_iam`

export default class AuthAPI implements AuthService {
   api: ApisauceInstance

   constructor() {
      this.api = create({
         baseURL: AUTH_URL
      })
   }

   getLoginAPI = requestObject =>
      networkCallWithAPISauceWithoutAuth(
         this.api,
         endpoints.login,
         requestObject,
         apiMethods.post
      )
}
