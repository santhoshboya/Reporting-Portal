import { cleanup } from '@testing-library/react'

import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import getHomeTasksResponse from '../../fixtures/getHomeTasksResponse.json'
import HomeTasksServiceAPI from '../../services/HomeTasksService/index.fixture'
import HomeTasksStore from './index'

describe('HomeTasks tests', () => {
   let homeTasksStore, homeTasksServiceAPI
   beforeEach(() => {
      homeTasksServiceAPI = new HomeTasksServiceAPI()
      homeTasksStore = new HomeTasksStore(homeTasksServiceAPI)
   })

   afterEach(cleanup)

   it('should test initialization', () => {
      expect(homeTasksStore.getHomeTaskAPIStatus).toBe(API_INITIAL)
      expect(homeTasksStore.getHomeTasksAPIError).toBe(null)

      expect(homeTasksStore.homeTasks.size).toBe(0)
      expect(homeTasksStore.offset).toBe(0)
      expect(homeTasksStore.limit).toBe(30)
   })

   it('should test getHomeTasks fetching state', () => {
      const mockLoadingPromise = new Promise((resolve, reject) => {})

      const mockHomeTasksServiceAPI = jest.fn()
      mockHomeTasksServiceAPI.mockReturnValue(mockLoadingPromise)
      homeTasksServiceAPI.getHomeTaskDetailsAPI = mockHomeTasksServiceAPI

      homeTasksStore.getHomeTasks()
      expect(homeTasksStore.getHomeTaskAPIStatus).toBe(API_FETCHING)
   })

   it('should test getHomeTasks success state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve(getHomeTasksResponse)
      })

      const mockHomeTasksServiceAPI = jest.fn()
      mockHomeTasksServiceAPI.mockReturnValue(mockSuccessPromise)
      homeTasksServiceAPI.getHomeTaskDetailsAPI = mockHomeTasksServiceAPI

      await homeTasksStore.getHomeTasks()
      expect(homeTasksStore.getHomeTaskAPIStatus).toBe(API_SUCCESS)
   })

   it('should test getHomeTasks failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => {
         reject(new Error('failure'))
      })

      const mockHomeTasksServiceAPI = jest.fn()
      mockHomeTasksServiceAPI.mockReturnValue(mockFailurePromise)
      homeTasksServiceAPI.getHomeTaskDetailsAPI = mockHomeTasksServiceAPI

      await homeTasksStore.getHomeTasks()
      expect(homeTasksStore.getHomeTaskAPIStatus).toBe(API_FAILED)
      expect(homeTasksStore.getHomeTasksAPIError).toBe('failure')
   })

   it('should test clearStore', () => {
      homeTasksStore.clearStore()
      expect(homeTasksStore.getHomeTaskAPIStatus).toBe(API_INITIAL)
      expect(homeTasksStore.getHomeTasksAPIError).toBe(null)

      expect(homeTasksStore.homeTasks.size).toBe(0)
      expect(homeTasksStore.offset).toBe(0)
      expect(homeTasksStore.limit).toBe(30)
   })
})
