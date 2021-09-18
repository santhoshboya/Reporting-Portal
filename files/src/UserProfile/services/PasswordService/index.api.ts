import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import config from '../../../Common/constants/EnvironmentConstants'
import { networkCallWithAPISauceWithoutAuth } from '../../../Common/utils/APIUtils'

import endpoints from '../endpoints'

import { PasswordService } from '.'

const PASSWORD_URL = `${config.BASE_URL}/api/ib_iam`

export default class PasswordAPI implements PasswordService {
   api: ApisauceInstance

   constructor() {
      this.api = create({
         baseURL: PASSWORD_URL
      })
   }

   sendResetPasswordLinkAPI = requestObject =>
      // FIXME: Need to send UPDATE_PASSWORD_ROUTE_PATH as string in requestObject
      networkCallWithAPISauceWithoutAuth(
         this.api,
         endpoints.resetPasswordLink,
         requestObject,
         apiMethods.post
      )

   updatePasswordAPI = data => {
      const { token, ...requestObject } = data
      const endpoint = `${endpoints.updatePassword}?token=${token}`
      return networkCallWithAPISauceWithoutAuth(
         this.api,
         endpoint,
         requestObject,
         apiMethods.post
      )
   }
}
