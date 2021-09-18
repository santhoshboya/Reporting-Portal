import { resolveWithTimeout } from "../../../common/utils/TestUtils"

import getSignInResponce from '../../fixtures/getUserSignInResponse.json'

import getUserSignOutResponse from '../../fixtures/getUserSignOutResponse.json'

import { SigninService } from "./index.js"
import Config from '../../../common/constants/EnvironmentConstants'

class AuthFixtureService implements SigninService {
   signInAPI(requestObject){
      return resolveWithTimeout(getSignInResponce)
   }
   signoutAPI() {
      return resolveWithTimeout(getUserSignOutResponse);
   }
}
export { AuthFixtureService }
