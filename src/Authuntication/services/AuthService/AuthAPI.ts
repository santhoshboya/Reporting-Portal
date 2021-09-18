import { create } from 'apisauce'

import { networkCallWithApisauceWithoutAccessToken } from '../../../common/utils/AuthUtils'
import { networkCallWithApisauce } from '../../../common/utils/APIUtils'

import { apiMethods, apiUrls } from '../../constants/APIConstants'

import { endPoints } from '../EndPoints'

import { SigninService } from "."
import baseURL from '../../../common/constants/EnvironmentConstants'

class AuthAPI implements SigninService {
   api
   
   
   constructor() {
      this.api = create({
         baseURL: apiUrls.signin
      })
      console.log(baseURL);
   }
   signInAPI(requestObject) {
      return networkCallWithApisauceWithoutAccessToken(
         this.api,
         endPoints.signin,
         requestObject,
         apiMethods.post
      )
   }
   signoutAPI() {
      return networkCallWithApisauce(
         this.api,
         endPoints.signout,
         {},
         apiMethods.get
      )
   }
}

export { AuthAPI }
