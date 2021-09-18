import { observable, ObservableMap, action } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import UserOptionsService from '../../services/UserOptionsService'

import UserOptionModel from '../models/UserOptionModel'
import { GetUserOptionsApiResponse } from '../types'

class UserSearchStore {
   @observable getUsersAPIStatus!: APIStatus
   @observable getUsersAPIError!: Error | null
   @observable usersList!: ObservableMap<string, UserOptionModel>
   usersService: UserOptionsService

   constructor(usersService: UserOptionsService) {
      this.usersService = usersService
      this.init()
   }

   @action.bound
   init() {
      this.getUsersAPIStatus = API_INITIAL
      this.getUsersAPIError = null
      this.usersList = new ObservableMap()
   }

   @action.bound
   setGetUsersAPIStatus(apiStatus: APIStatus) {
      this.getUsersAPIStatus = apiStatus
   }

   @action.bound
   setGetUsersAPIError(apiError: Error | null) {
      this.getUsersAPIError = apiError
   }

   @action.bound
   setGetUsersAPIResponse(apiResponse: GetUserOptionsApiResponse | null) {
      if (apiResponse) {
         const { users } = apiResponse
         users.map(user =>
            this.usersList.set(user.user_id, new UserOptionModel(user))
         )
      }
   }

   @action.bound
   async getUsers() {
      const getUsersPromise = this.usersService.getUserOptions()
      return bindPromiseWithOnSuccess(getUsersPromise)
         .to(this.setGetUsersAPIStatus, this.setGetUsersAPIResponse)
         .catch(e => this.setGetUsersAPIError(e))
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export { UserSearchStore }
