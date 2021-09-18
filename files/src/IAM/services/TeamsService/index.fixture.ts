import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import teamsData from '../../fixtures/teams-data.json'
import addTeamResponse from '../../fixtures/add-team-response.json'

import {
   GetTeamsApiResonse,
   NewTeamObject,
   AddTeamApiResponse
} from '../../stores/types'

import TeamsService from '.'

class TeamsFixtureService implements TeamsService {
   constructor(_networkCallWithApiSauce) {} // eslint-disable-line
   getTeams(): Promise<GetTeamsApiResonse> {
      return resolveWithTimeout(teamsData)
   }

   postTeams(team: NewTeamObject): Promise<AddTeamApiResponse> {
      return resolveWithTimeout(addTeamResponse)
   }

   deleteTeams(_: string): Promise<any> {
      return resolveWithTimeout({})
   }

   editTeams(team: NewTeamObject, _teamId: string): Promise<any> {
      return resolveWithTimeout({})
   }
}

export default TeamsFixtureService
