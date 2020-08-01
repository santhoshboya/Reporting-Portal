import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'

import TeamsFixtureService from '../../../services/TeamsService/index.fixture'
import teamsData from '../../../fixtures/teams-data.json'
import TeamsService from '../../../services/TeamsService'

import TeamModel from '.'

describe('TeamModel tests', () => {
   let teamsService: TeamsService
   let teamModel: TeamModel
   const teamDetails = teamsData.teams[0]

   const sampleTeam = {
      name: 'team',
      description: 'description',
      user_ids: []
   }

   beforeEach(() => {
      teamsService = new TeamsFixtureService(undefined)
      teamModel = new TeamModel(teamsService, teamDetails)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test if modal instantiated or not', () => {
      const { team_id, name, description, no_of_members, members } = teamDetails
      expect(teamModel.editTeamsAPIStatus).toBe(API_INITIAL)
      expect(teamModel.editTeamsAPIError).toBe(null)
      expect(team_id.toString()).toBe(teamModel.id)
      expect(name).toBe(teamModel.name)
      expect(description).toBe(teamModel.description)
      expect(no_of_members).toBe(teamModel.noOfMembers)
      expect(members.length).toBe(teamModel.membersList.length)
   })

   it('should test editTeamsAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockEditTeamsAPI = jest.fn()
      mockEditTeamsAPI.mockReturnValue(mockFetchingPromise)
      teamsService.editTeams = mockEditTeamsAPI

      teamModel.onEditTeam(sampleTeam)
      expect(teamModel.editTeamsAPIStatus).toBe(API_FETCHING)
      expect(teamModel.editTeamsAPIError).toBe(null)
   })

   it('should test editTeamsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while updating team!'))
      )

      const mockEditTeamsAPI = jest.fn()
      mockEditTeamsAPI.mockReturnValue(mockFailurePromise)
      teamsService.editTeams = mockEditTeamsAPI

      await teamModel.onEditTeam(sampleTeam)
      expect(teamModel.editTeamsAPIStatus).toBe(API_FAILED)
      expect(teamModel.editTeamsAPIError).toBe('Error while updating team!')
   })

   it('should test editTeamsAPI success state', async () => {
      await teamModel.onEditTeam(sampleTeam)
      expect(teamModel.editTeamsAPIStatus).toBe(API_SUCCESS)
      expect(teamModel.editTeamsAPIError).toBe(null)
   })
})
