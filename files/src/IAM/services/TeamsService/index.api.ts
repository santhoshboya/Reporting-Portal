import { create } from 'apisauce'

import config from '../../../Common/constants/EnvironmentConstants'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { NewTeamObject } from '../../stores/types'

import endpoints from '../endpoints'
import TeamsService from '.'

const TEAM_URL = `${config.BASE_URL}api/ib_iam/`

class TeamsApiService implements TeamsService {
   api: Record<string, any>
   networkCallWithApisauce
   constructor(networkCallWithApisauce) {
      this.networkCallWithApisauce = networkCallWithApisauce
      this.api = create({
         baseURL: TEAM_URL
      })
   }

   async getTeams(limit: number, offset: number) {
      return this.networkCallWithApisauce(
         this.api,
         `${endpoints.getTeams}?limit=${limit}&offset=${offset}`,
         {},
         apiMethods.get
      )
   }

   async postTeams(team: NewTeamObject) {
      return this.networkCallWithApisauce(
         this.api,
         endpoints.postTeams,
         team,
         apiMethods.post
      )
   }

   deleteTeams(teamId: string) {
      console.log(teamId)

      return this.networkCallWithApisauce(
         this.api,
         `${endpoints.deleteTeams}${teamId}/v1/`,
         {},
         apiMethods.delete
      )
   }

   editTeams(team: NewTeamObject, teamId: string) {
      console.log(team)
      return this.networkCallWithApisauce(
         this.api,
         `${endpoints.putTeams}${teamId}/v1/`,
         team,
         apiMethods.put
      )
   }
}

export default TeamsApiService
