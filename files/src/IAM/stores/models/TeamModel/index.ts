import { observable, action } from 'mobx'

import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import TeamsService from '../../../services/TeamsService'

import { MemberObject, TeamObject, NewTeamObject } from '../../types'

class TeamModel {
   @observable name: string
   @observable description: string
   @observable editTeamsAPIStatus!: APIStatus
   @observable editTeamsAPIError!: Error | null

   id: string
   noOfMembers: number
   membersList: Array<MemberObject>

   teamsService: TeamsService

   constructor(teamsService: TeamsService, teamDetails: TeamObject) {
      const { team_id, name, description, no_of_members, members } = teamDetails
      this.editTeamsAPIStatus = API_INITIAL
      this.editTeamsAPIError = null
      this.teamsService = teamsService
      this.id = team_id
      this.name = name
      this.description = description
      this.noOfMembers = no_of_members
      this.membersList = [...members]
   }

   @action.bound
   setEditTeamsAPIStatus(apiStatus: APIStatus) {
      this.editTeamsAPIStatus = apiStatus
   }

   @action.bound
   setEditTeamsAPIError(apiError: Error | null) {
      this.editTeamsAPIError = apiError
   }

   @action.bound
   async onEditTeam(team: NewTeamObject): Promise<any> {
      const editTeamPromise = this.teamsService.editTeams(team, this.id)
      return bindPromiseWithOnSuccess(editTeamPromise)
         .to(this.setEditTeamsAPIStatus, _ => {})
         .catch(e => this.setEditTeamsAPIError(e))
   }
}

export default TeamModel
