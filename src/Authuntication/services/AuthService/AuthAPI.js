import { create } from 'apisauce'

import { networkCallWithApisauceWithoutAccessToken } from '../../../common/utils/AuthUtils'
import { networkCallWithApisauce } from '../../../common/utils/APIUtils'

import { apiMethods, apiUrls } from '../../constants/APIConstants'

import { endPoints } from '../EndPoints'

class AuthAPI {
   api
   constructor() {
      this.api = create({
         baseURL: apiUrls.signin
      })
   }
   signInAPI(requestObject) {
      return networkCallWithApisauceWithoutAccessToken(
         this.api,
         endPoints.signin,
         requestObject,
         apiMethods.post
      )
   }
   signOutAPI() {
      return networkCallWithApisauce(
         this.api,
         endPoints.signout,
         {},
         apiMethods.get
      )
   }
}

export { AuthAPI }
