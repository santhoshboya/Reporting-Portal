import getObservationsList from '../../fixtures/getObservationsResponse.json'
import getObservation from '../../fixtures/getObservationResponse.json'
import getSignInResponce from '../../fixtures/getUserSignInResponse.json'
class AuthFixtureService {
   signInAPI(requestObject) {
      return new Promise(resolve => resolve(getSignInResponce))
   }
   signOutAPI(requestObject) {
      return new Promise(resolve => resolve('log out'))
   }
}

export { AuthFixtureService }
