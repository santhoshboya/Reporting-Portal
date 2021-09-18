import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import userList from '../../fixtures/getUserListResponse.json'
import userOptions from '../../fixtures/getUserOptionsResponse.json'

import UserService from '.'

class UsersFixtureService implements UserService {
   constructor(networkCallWithApisauceWithAuth) {} // eslint-disable-line
   getUserList = requestObject => {
      const { offset, limit } = requestObject
      const users = {
         users: userList.users.slice(offset, offset + limit),
         total: userList.users.length
      }
      return resolveWithTimeout(users)
   }
   postAddUserDetails = requestObject => resolveWithTimeout(200)

   getUserOptionsAPI = () => resolveWithTimeout(userOptions)
   putEditUserDetails = (requestObject, userId) => resolveWithTimeout(200)

   deleteUserDetailsAPI = userId => resolveWithTimeout(200)
}
export default UsersFixtureService
