import { create } from 'apisauce'

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
      console.log('details', requestObject)
      return networkCallWithApisauce(
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
