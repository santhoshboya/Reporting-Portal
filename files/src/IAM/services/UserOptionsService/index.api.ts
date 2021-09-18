import { create } from 'apisauce'

import config from '../../../Common/constants/EnvironmentConstants'
import { apiMethods } from '../../../Common/constants/APIConstants'

import endpoints from '../endpoints'

import UserOptionsService from '.'

const USER_URL = `${config.BASE_URL}api/ib_iam/`

class UserOptionsApiService implements UserOptionsService {
   api: Record<string, any>
   networkCallWithapiSauce: any
   constructor(networkCallWithapiSauce: any) {
      this.networkCallWithapiSauce = networkCallWithapiSauce
      this.api = create({
         baseURL: USER_URL
      })
   }

   getUserOptions() {
      return this.networkCallWithapiSauce(
         this.api,
         `${endpoints.getUserOptions}?limit=${10}&offset=${0}`,
         {},
         apiMethods.get
      )
   }
}

export default UserOptionsApiService
