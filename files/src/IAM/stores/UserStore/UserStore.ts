import { observable, action, computed } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import PaginationStore from '../../../Common/stores/PaginationStore'

import UserService from '../../services/UserService'

import { UserModel } from '../models/UserModel'
import { RolesModel } from '../models/RolesModel'
import { TeamsModel } from '../models/TeamsModel'
import { CompanyOptionsModel } from '../models/CompanyOptionsModel'
import { AddUserRequestObject } from '../types'

class UserStore {
   @observable getAddUserAPIStatus: APIStatus = API_INITIAL
   @observable getAddUserAPIError!: Error | null
   @observable addUserResponse

   @observable getUserOptionsAPIStatus!: APIStatus
   @observable getUserOptionsAPIError!: Error | null

   @observable getDeleteUserAPIStatus!: APIStatus
   @observable getDeleteUserAPIError!: Error | null

   @observable teams: Array<TeamsModel> = []
   @observable roles: Array<RolesModel> = []
   @observable companies: Array<CompanyOptionsModel> = []

   paginationStore!: PaginationStore

   userService: UserService

   constructor(service) {
      this.userService = service
      this.initStore()
   }

   @action.bound
   initStore() {
      this.getAddUserAPIStatus = API_INITIAL
      this.getAddUserAPIError = null
      this.getUserOptionsAPIStatus = API_INITIAL
      this.getUserOptionsAPIError = null
      this.getDeleteUserAPIStatus = API_INITIAL
      this.getDeleteUserAPIError = null
      this.initPaginationStore()
   }

   @action.bound
   initPaginationStore() {
      this.paginationStore = new PaginationStore(UserModel)
      this.paginationStore.getEntitiesListAPI = this.userService.getUserList
      this.paginationStore.getEntitiesFromResponse = response => response.users
      this.paginationStore.getStringEntityIndex = entity => entity.user_id
      this.paginationStore.getEntitiesCountFromResponse = response =>
         response.total
      this.paginationStore.changeShowPerPage(6)

      this.paginationStore.responseItemIterator = modalInstance => {
         modalInstance.userServiceAPI = this.userService
      }
   }

   @computed
   get formattedRoleOptions() {
      return this.roles.map(eachRole => {
         const object = {
            value: eachRole.roleId,
            label: eachRole.roleName
         }
         return object
      })
   }
   @computed
   get formattedTeamOptions() {
      return this.teams.map(eachTeam => {
         const object = {
            value: eachTeam.teamId,
            label: eachTeam.teamName
         }
         return object
      })
   }
   @computed
   get formattedCompanyOptions() {
      return this.companies.map(eachRole => {
         const object = {
            value: eachRole.companyName,
            label: eachRole.companyName
         }
         return object
      })
   }

   @action.bound
   onChangeUsersSearchText(text: string) {
      this.paginationStore.defaultGetEntitiesRequestObject = {
         searchText: text
      }
   }

   @action.bound
   setUserOptionsAPIStatus(apiStatus) {
      this.getUserOptionsAPIStatus = apiStatus
   }
   @action.bound
   setUserOptionsAPIError(error) {
      this.getUserOptionsAPIError = error
   }

   @action.bound
   setUserOptionsAPIResponse(response) {
      this.roles = []
      this.teams = []
      this.companies = []

      response.roles.map(role => {
         const roleObject = new RolesModel(role)
         this.roles.push(roleObject)
      })
      response.teams.map(team => {
         const teamObject = new TeamsModel(team)
         this.teams.push(teamObject)
      })
      response.companies.map(company => {
         const companyObject = new CompanyOptionsModel(company)
         this.companies.push(companyObject)
      })
   }

   @action.bound
   setDeleteUserAPIStatus(apiStatus) {
      this.getDeleteUserAPIStatus = apiStatus
   }

   @action.bound
   setDeleteUserAPIError(error) {
      this.getDeleteUserAPIError = error
   }

   @action.bound
   setDeleteUserAPIResponse(response) {
      this.paginationStore.getEntitiesResponseCallback = response
   }

   @action.bound
   setAddUserAPIStatus(apiStatus) {
      this.getAddUserAPIStatus = apiStatus
   }
   @action.bound
   setAddUserAPIError(error) {
      this.getAddUserAPIError = error
   }

   @action.bound
   setAddUserAPIResponse(response) {
      this.addUserResponse = response.res_status
   }

   @action.bound
   addUserRequestAPI(
      onSuccessRequest: () => void,
      onFailureRequest: (error: Error) => void,
      requestObject: AddUserRequestObject
   ) {
      const serviceApiPromise = this.userService.postAddUserDetails(
         requestObject
      )
      return bindPromiseWithOnSuccess(serviceApiPromise)
         .to(this.setAddUserAPIStatus, response => {
            this.setAddUserAPIResponse(response)
            onSuccessRequest()
         })
         .catch(error => {
            this.setAddUserAPIError(error)
            onFailureRequest(error)
         })
   }
   @action.bound
   getUserOptions() {
      const promise = this.userService.getUserOptionsAPI()
      return bindPromiseWithOnSuccess(promise)
         .to(this.setUserOptionsAPIStatus, this.setUserOptionsAPIResponse)
         .catch(this.setUserOptionsAPIError)
   }

   @action.bound
   deleteUserDetails(
      onSuccessRequest: () => void,
      onFailureRequest: (error: Error) => void,
      userId: string
   ) {
      const serviceApiPromise = this.userService.deleteUserDetailsAPI(userId)
      return bindPromiseWithOnSuccess(serviceApiPromise)
         .to(this.setDeleteUserAPIStatus, response => {
            this.setDeleteUserAPIResponse(response)
            onSuccessRequest()
         })
         .catch(error => {
            this.setDeleteUserAPIError(error)
            onFailureRequest(error)
         })
   }
   @action.bound
   clearStore() {
      this.initStore()
      this.initPaginationStore()
   }
}
export { UserStore }
