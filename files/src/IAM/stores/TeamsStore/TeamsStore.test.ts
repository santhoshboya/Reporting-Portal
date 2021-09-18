import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'

import { networkCallWithApisauceWithAuth } from '../../../Common/stores'

import TeamsFixtureService from '../../services/TeamsService/index.fixture'
import TeamsService from '../../services/TeamsService'

import TeamsStore from '.'

describe('TeamsStore tests', () => {
   let teamsService: TeamsService
   let teamsStore: TeamsStore

   const sampleTeam = {
      name: 'team',
      description: 'description',
      user_ids: []
   }

   beforeEach(() => {
      teamsService = new TeamsFixtureService(networkCallWithApisauceWithAuth)
      teamsStore = new TeamsStore(teamsService)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test if store is initialized or not', () => {
      expect(teamsStore.getTeamsAPIStatus).toBe(API_INITIAL)
      expect(teamsStore.getTeamsAPIError).toBe(null)
      expect(teamsStore.postTeamsAPIStatus).toBe(API_INITIAL)
      expect(teamsStore.postTeamsAPIError).toBe(null)
      expect(teamsStore.deleteTeamsAPIStatus).toBe(API_INITIAL)
      expect(teamsStore.deleteTeamsAPIError).toBe(null)
      expect(teamsStore.teamsList.size).toBe(0)
   })

   it('should test getTeamsAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockGetTeamsAPI = jest.fn()
      mockGetTeamsAPI.mockReturnValue(mockFetchingPromise)
      teamsService.getTeams = mockGetTeamsAPI

      teamsStore.getTeams()
      expect(teamsStore.getTeamsAPIStatus).toBe(API_FETCHING)
      expect(teamsStore.getTeamsAPIError).toBe(null)
   })

   it('should test getTeamsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while fetching teams!'))
      )

      const mockGetTeamsAPI = jest.fn()
      mockGetTeamsAPI.mockReturnValue(mockFailurePromise)
      teamsService.getTeams = mockGetTeamsAPI

      await teamsStore.getTeams()
      expect(teamsStore.getTeamsAPIStatus).toBe(API_FAILED)
      expect(teamsStore.getTeamsAPIError).toBe('Error while fetching teams!')
   })

   it('should test getTeamsAPI success state', async () => {
      await teamsStore.getTeams()
      expect(teamsStore.getTeamsAPIStatus).toBe(API_SUCCESS)
      expect(teamsStore.getTeamsAPIError).toBe(null)
      expect(teamsStore.teamsList.size).not.toBe(0)
   })

   it('should test postTeamsAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockPostTeamsAPI = jest.fn()
      mockPostTeamsAPI.mockReturnValue(mockFetchingPromise)
      teamsService.postTeams = mockPostTeamsAPI

      teamsStore.onAddTeam(sampleTeam)
      expect(teamsStore.postTeamsAPIStatus).toBe(API_FETCHING)
      expect(teamsStore.postTeamsAPIError).toBe(null)
   })

   it('should test postTeamsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while adding team!'))
      )

      const mockPostTeamsAPI = jest.fn()
      mockPostTeamsAPI.mockReturnValue(mockFailurePromise)
      teamsService.postTeams = mockPostTeamsAPI

      await teamsStore.onAddTeam(sampleTeam)
      expect(teamsStore.postTeamsAPIStatus).toBe(API_FAILED)
      expect(teamsStore.postTeamsAPIError).toBe('Error while adding team!')
   })

   it('should test postTeamsAPI success state', async () => {
      await teamsStore.onAddTeam(sampleTeam)
      expect(teamsStore.postTeamsAPIStatus).toBe(API_SUCCESS)
      expect(teamsStore.postTeamsAPIError).toBe(null)
   })

   it('should test deleteTeamsAPI fetching state', async () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockDeleteTeamsAPI = jest.fn()
      mockDeleteTeamsAPI.mockReturnValue(mockFetchingPromise)
      teamsService.deleteTeams = mockDeleteTeamsAPI

      await teamsStore.getTeams()
      teamsStore.onDeleteTeam('1')
      expect(teamsStore.deleteTeamsAPIStatus).toBe(API_FETCHING)
      expect(teamsStore.deleteTeamsAPIError).toBe(null)
   })

   it('should test deleteTeamsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while deleting team!'))
      )

      const mockDeleteTeamsAPI = jest.fn()
      mockDeleteTeamsAPI.mockReturnValue(mockFailurePromise)
      teamsService.deleteTeams = mockDeleteTeamsAPI

      await teamsStore.onDeleteTeam('1')
      expect(teamsStore.deleteTeamsAPIStatus).toBe(API_FAILED)
      expect(teamsStore.deleteTeamsAPIError).toBe('Error while deleting team!')
   })

   it('should test deleteTeamsAPI success state', async () => {
      teamsStore.teamsList.set('1', { id: '1', name: 'sample team' })
      await teamsStore.onDeleteTeam('1')
      expect(teamsStore.deleteTeamsAPIStatus).toBe(API_SUCCESS)
      expect(teamsStore.deleteTeamsAPIError).toBe(null)
      expect(teamsStore.teamsList.size).toBe(0)
   })

   it('should test if store is cleared or not', async () => {
      await teamsStore.getTeams()
      teamsStore.clearStore()
      expect(teamsStore.getTeamsAPIStatus).toBe(API_INITIAL)
      expect(teamsStore.getTeamsAPIError).toBe(null)
      expect(teamsStore.postTeamsAPIStatus).toBe(API_INITIAL)
      expect(teamsStore.postTeamsAPIError).toBe(null)
      expect(teamsStore.deleteTeamsAPIStatus).toBe(API_INITIAL)
      expect(teamsStore.deleteTeamsAPIError).toBe(null)
      expect(teamsStore.teamsList.size).toBe(0)
   })
})
