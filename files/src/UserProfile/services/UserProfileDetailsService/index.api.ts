import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import config from '../../../Common/constants/EnvironmentConstants'

import endpoints from '../endpoints'
import { UserProfileDetailsService } from '.'

const USER_PROFIE_URL = `${config.BASE_URL}/api/ib_iam`

export default class UserProfileDetailsAPI
   implements UserProfileDetailsService {
   api: ApisauceInstance
   networkCallWithApisauce: Function

   constructor(networkCallWithApisauce: Function) {
      this.api = create({
         baseURL: USER_PROFIE_URL
      })
      this.networkCallWithApisauce = networkCallWithApisauce
   }

   getUserProfileDetailsAPI = () =>
      this.networkCallWithApisauce(
         this.api,
         endpoints.userProfileDetails,
         {},
         apiMethods.get
      )

   getLogoutAPI = () =>
      this.networkCallWithApisauce(
         this.api,
         endpoints.logout,
         {},
         apiMethods.post
      )
}
