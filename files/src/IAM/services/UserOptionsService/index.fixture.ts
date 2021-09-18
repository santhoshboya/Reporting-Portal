import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import userOptionsData from '../../fixtures/user-options-data.json'

import UserOptionsService from '.'

class UserOptionsFixtureService implements UserOptionsService {
   _networkithapiSauce
   constructor(_networkithapiSauce) {}

   getUserOptions() {
      return resolveWithTimeout(userOptionsData)
   }
}

export default UserOptionsFixtureService
