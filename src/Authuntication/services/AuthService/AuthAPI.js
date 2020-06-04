import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../utils/APIUtils'

import { apiMethods, apiUrls } from '../../constants/APIConstants'

import { endPoints } from '../EndPoints'

class AuthAPI {
   api
   constructor() {
      this.api = create({
         baseURL: apiUrls.signin
      })
   }
   signInAPI() {
      return networkCallWithApisauce(this.api, endPoints.signin, {}, apiMethods.get)
   }
   signOutAPI() {
      return networkCallWithApisauce(this.api, endPoints.signout, {}, apiMethods.get)
   }
}

export { AuthAPI }
