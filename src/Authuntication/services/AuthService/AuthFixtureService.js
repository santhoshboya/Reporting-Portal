import getSignInResponce from '../../fixtures/getUserSignInResponse.json'
import getUserSignOutResponse from '../../fixtures/getUserSignOutResponse.json'
class AuthFixtureService {
   signInAPI(requestObject) {
      return new Promise((resolve, reject) => reject('error'))
   }
   signOutAPI(requestObject) {
      return new Promise(resolve => resolve(getUserSignOutResponse))
   }
}

export { AuthFixtureService }
