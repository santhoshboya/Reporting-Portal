import { observable, action } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { TeamObjectType } from '../../types'

import { TeamsModel } from '../TeamsModel'

interface RoleObject {
   roleId: string
   roleName: string
}

const counter = 1
class UserModel {
   @observable getEditUserAPIStatus!: APIStatus
   @observable getEditUserAPIError!: Error | null

   sno!: number
   userId!: string
   name!: string
   email!: string
   teams!: Array<TeamObjectType>
   roles!: Array<RoleObject>
   companyId: string
   companyName: string

   userServiceAPI

   constructor(user) {
      this.userId = user.user_id
      this.name = user.name
      this.email = user.email
      this.teams = this.teamDetails(user.teams)
      this.roles = this.roleDetails(user.roles)
      this.companyId = user.company.company_id
      this.companyName = user.company.company_name
      this.getEditUserAPIStatus = API_INITIAL
      this.getEditUserAPIError = null
   }
   roleDetails = roles =>
      roles.map(role => {
         const roleObject = { roleId: role.role_id, roleName: role.role_name }
         return roleObject
      })
   teamDetails = teams =>
      teams.map(team => {
         const teamObject = new TeamsModel(team)
         return teamObject
      })

   @action.bound
   setEditUserRequestAPIError(error: Error) {
      this.getEditUserAPIError = error
   }
   @action.bound
   setEditUserRequestAPIStatus(apiStatus: number) {
      this.getEditUserAPIStatus = apiStatus
   }
   @action.bound
   setEditUserRequestAPIResponse(response) {
      return true
   }
   @action.bound
   onClickEditUserDetails(onSuccess, onFialure, editUserDetails) {
      this.editUserDetailsAPI(onSuccess, onFialure, editUserDetails)
   }
   editUserDetailsAPI(onSuccess, onFailure, requestObject) {
      const editRequestPromise = this.userServiceAPI.putEditUserDetails(
         requestObject,
         this.userId
      )
      return bindPromiseWithOnSuccess(editRequestPromise)
         .to(this.setEditUserRequestAPIStatus, response => {
            this.setEditUserRequestAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setEditUserRequestAPIError(error)
            onFailure(error)
         })
   }
}
export { UserModel }
