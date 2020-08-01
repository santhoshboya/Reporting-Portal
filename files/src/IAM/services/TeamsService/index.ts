import {
   GetTeamsApiResonse,
   NewTeamObject,
   AddTeamApiResponse
} from '../../stores/types'

interface TeamsService {
   getTeams: (limit: number, offset: number) => Promise<GetTeamsApiResonse>
   postTeams: (team: NewTeamObject) => Promise<AddTeamApiResponse>
   deleteTeams: (teamId: string) => Promise<any>
   editTeams: (team: NewTeamObject, teamId: string) => Promise<any>
}

export default TeamsService
