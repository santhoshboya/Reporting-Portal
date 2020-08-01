import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import { PasswordService } from '.'

export default class PasswordFixture implements PasswordService {
   sendResetPasswordLinkAPI(requestObject) {
      return resolveWithTimeout({})
   }

   updatePasswordAPI(requestObject) {
      return resolveWithTimeout({})
   }
}
