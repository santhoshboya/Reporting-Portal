import { ObservableMap, action, observable } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import TeamsService from '../../services/TeamsService'
import { INITIAL_LIMIT } from '../../constants/teamsConstants'

import TeamModel from '../models/TeamModel'

import { GetTeamsApiResonse, NewTeamObject, AddTeamApiResponse } from '../types'

class TeamsStore {
   @observable teamsList!: ObservableMap
   @observable getTeamsAPIStatus!: APIStatus
   @observable getTeamsAPIError!: Error | null
   @observable postTeamsAPIStatus!: APIStatus
   @observable postTeamsAPIError!: Error | null
   @observable deleteTeamsAPIStatus!: APIStatus
   @observable deleteTeamsAPIError!: Error | null
   teamsService: TeamsService
   offset = 0
   initialLimit: number = INITIAL_LIMIT

   constructor(teamsService: TeamsService) {
      this.teamsService = teamsService
      this.init()
   }

   @action.bound
   init() {
      this.getTeamsAPIStatus = API_INITIAL
      this.postTeamsAPIStatus = API_INITIAL
      this.deleteTeamsAPIStatus = API_INITIAL
      this.deleteTeamsAPIError = null
      this.postTeamsAPIError = null
      this.getTeamsAPIError = null
      this.teamsList = new ObservableMap()
   }

   @action.bound
   setGetTeamsAPIStatus(apiStatus: APIStatus) {
      this.getTeamsAPIStatus = apiStatus
   }

   @action.bound
   setGetTeamsAPIError(apiError: Error | null) {
      this.getTeamsAPIError = apiError
   }

   @action.bound
   setGetTeamsAPIResponse(apiResponse: GetTeamsApiResonse | null) {
      if (apiResponse) {
         apiResponse.teams?.map(team =>
            this.teamsList.set(
               team.team_id,
               new TeamModel(this.teamsService, team)
            )
         )
      }
   }

   @action.bound
   async getTeams() {
      const getTeamsPromise = this.teamsService.getTeams(
         this.initialLimit,
         this.offset
      )
      return bindPromiseWithOnSuccess(getTeamsPromise)
         .to(this.setGetTeamsAPIStatus, this.setGetTeamsAPIResponse)
         .catch(e => this.setGetTeamsAPIError(e))
   }

   @action.bound
   setPostTeamsAPIStatus(apiStatus: APIStatus) {
      this.postTeamsAPIStatus = apiStatus
   }

   @action.bound
   setPostTeamsAPIError(apiError: Error | null) {
      this.postTeamsAPIError = apiError
   }

   @action.bound
   async onAddTeam(team: NewTeamObject): Promise<void | AddTeamApiResponse> {
      const postTeamPromise = this.teamsService.postTeams(team)
      return bindPromiseWithOnSuccess(postTeamPromise)
         .to(this.setPostTeamsAPIStatus, _ => {})
         .catch(e => this.setPostTeamsAPIError(e))
   }

   @action.bound
   setDeleteTeamsAPIStatus(apiStatus: APIStatus) {
      this.deleteTeamsAPIStatus = apiStatus
   }

   @action.bound
   setDeleteTeamsAPIError(apiError: Error | null) {
      this.deleteTeamsAPIError = apiError
   }

   @action.bound
   onDeleteTeamSuccess(teamId: string) {
      this.teamsList.delete(teamId)
   }

   @action.bound
   async onDeleteTeam(teamId: string) {
      const deleteTeamPromise = this.teamsService.deleteTeams(teamId)
      return bindPromiseWithOnSuccess(deleteTeamPromise)
         .to(this.setDeleteTeamsAPIStatus, _ =>
            this.onDeleteTeamSuccess(teamId)
         )
         .catch(e => this.setDeleteTeamsAPIError(e))
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export default TeamsStore
