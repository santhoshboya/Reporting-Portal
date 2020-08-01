import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import getLoginResponse from '../../fixtures/getLoginResponse.json'

import { AuthService } from '.'

export default class AuthFixture implements AuthService {
   getLoginAPI(requestObject) {
      return resolveWithTimeout(getLoginResponse)
   }
}
