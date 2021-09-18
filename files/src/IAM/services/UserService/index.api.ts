import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import config from '../../../Common/constants/EnvironmentConstants'
import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import { UsersListAPIRequestObjectType } from '../../stores/types'
import userlist from '../../fixtures/getUserListResponse.json'

import endpoints from '../endpoints'

import UserService from '.'

const BASE_URL = `${config.BASE_URL}api/ib_iam/`

class UsersAPIService implements UserService {
   api: ApisauceInstance
   networkCallWithApisauceWithAuth: any

   constructor(networkCallWithApisauceWithAuth) {
      this.api = create({
         baseURL: BASE_URL
      })
      this.networkCallWithApisauceWithAuth = networkCallWithApisauceWithAuth
   }

   getUserList = (requestObject: UsersListAPIRequestObjectType) => {
      const { offset, limit, searchText } = requestObject

      return this.networkCallWithApisauceWithAuth(
         this.api,
         `${endpoints.users}?offset=${offset}&limit=${limit}&search_text=${searchText}`,
         {},
         apiMethods.get
      )
   }
   postAddUserDetails = requestObject =>
      this.networkCallWithApisauceWithAuth(
         this.api,
         endpoints.addUser,
         requestObject,
         apiMethods.post
      )
   putEditUserDetails = (requestObject, userId) =>
      this.networkCallWithApisauceWithAuth(
         this.api,
         `${endpoints.editUser}${userId}/v1/`,
         requestObject,
         apiMethods.put
      )
   getUserOptionsAPI = () =>
      this.networkCallWithApisauceWithAuth(
         this.api,
         endpoints.configurationDetails,
         {},
         apiMethods.get
      )
   deleteUserDetailsAPI = (userId: string) =>
      this.networkCallWithApisauceWithAuth(
         this.api,
         `${endpoints.deleteUser}${userId}/v1/`,
         {},
         apiMethods.delete
      )
}
export default UsersAPIService
