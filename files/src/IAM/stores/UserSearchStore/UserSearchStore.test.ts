import {
   API_FETCHING,
   API_FAILED,
   API_SUCCESS,
   API_INITIAL
} from '@ib/api-constants'

import { networkCallWithApisauceWithAuth } from '../../../Common/stores'

import userData from '../../fixtures/user-options-data.json'
import UserOptionsFixtureService from '../../services/UserOptionsService/index.fixture'
import UserOptionsService from '../../services/UserOptionsService'

import UserSearchStore from '.'

describe('User search store', () => {
   let userSearchService: UserOptionsService
   let userSearchStore: UserSearchStore

   beforeEach(() => {
      userSearchService = new UserOptionsFixtureService(
         networkCallWithApisauceWithAuth
      )
      userSearchStore = new UserSearchStore(userSearchService)
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test initialization of the store', () => {
      expect(userSearchStore.getUsersAPIStatus).toBe(API_INITIAL)
      expect(userSearchStore.getUsersAPIError).toBe(null)
      expect(userSearchStore.usersList.size).toBe(0)
   })

   it('should test getUsersAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockGetUsersAPI = jest.fn()
      mockGetUsersAPI.mockReturnValue(mockFetchingPromise)
      userSearchService.getUserOptions = mockGetUsersAPI

      userSearchStore.getUsers()
      expect(userSearchStore.getUsersAPIStatus).toBe(API_FETCHING)
      expect(userSearchStore.getUsersAPIError).toBe(null)
   })

   it('should test getUsersAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while fetching Users!'))
      )

      const mockGetUsersAPI = jest.fn()
      mockGetUsersAPI.mockReturnValue(mockFailurePromise)
      userSearchService.getUserOptions = mockGetUsersAPI

      await userSearchStore.getUsers()
      expect(userSearchStore.getUsersAPIStatus).toBe(API_FAILED)
      expect(userSearchStore.getUsersAPIError).toBe(
         'Error while fetching Users!'
      )
   })

   it('should test getUsersAPI success state', async () => {
      await userSearchStore.getUsers()
      expect(userSearchStore.getUsersAPIStatus).toBe(API_SUCCESS)
      expect(userSearchStore.getUsersAPIError).toBe(null)
      expect(userSearchStore.usersList.size).toBe(userData.users.length)
   })

   it('should test clearStore', async () => {
      await userSearchStore.getUsers()
      expect(userSearchStore.getUsersAPIStatus).toBe(API_SUCCESS)
      expect(userSearchStore.getUsersAPIError).toBe(null)
      expect(userSearchStore.usersList.size).toBe(userData.users.length)
      userSearchStore.clearStore()
      expect(userSearchStore.getUsersAPIStatus).toBe(API_INITIAL)
      expect(userSearchStore.getUsersAPIError).toBe(null)
      expect(userSearchStore.usersList.size).toBe(0)
   })
})
