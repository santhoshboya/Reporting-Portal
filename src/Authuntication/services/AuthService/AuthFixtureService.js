import getSignInResponce from '../../fixtures/getUserSignInResponse.json'
import getUserSignOutResponse from '../../fixtures/getUserSignOutResponse.json'
class AuthFixtureService {
   signInAPI(requestObject) {
      return new Promise(resolve => resolve(getSignInResponce))
   }
   signOutAPI(requestObject) {
      return new Promise(resolve => resolve(getUserSignOutResponse))
   }
}

export { AuthFixtureService }
