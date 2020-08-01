import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import getUserProfileDetailsResponse from '../../fixtures/getUserProfileDetailsResponse.json'

import { UserProfileDetailsService } from '.'

export default class UserProfileDetailsFixture
   implements UserProfileDetailsService {
   constructor(fun: Function) {
      // NOTE: Handling no-useless-constructor es-lint error
   }
   getUserProfileDetailsAPI = () =>
      resolveWithTimeout(getUserProfileDetailsResponse)

   getLogoutAPI() {
      return resolveWithTimeout({})
   }
}
