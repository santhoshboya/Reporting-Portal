import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import UsersFixtureService from '../../services/UserService/index.fixture'
import { networkCallWithAPISauceWithoutAuth } from '../../../Common/utils/APIUtils'
import { UserStore } from './UserStore'

describe(' tests', () => {
   let userApiService
   let usersStore
   beforeEach(() => {
      userApiService = new UsersFixtureService(
         networkCallWithAPISauceWithoutAuth
      )
      usersStore = new UserStore(userApiService)
   })
   it('Should test initialising users store', () => {
      expect(usersStore.getAddUserAPIStatus).toBe(API_INITIAL)
      expect(usersStore.getAddUserAPIError).toBe(null)
      expect(usersStore.getDeleteUserAPIStatus).toBe(API_INITIAL)
      expect(usersStore.getDeleteUserAPIError).toBe(null)
      expect(usersStore.getUserOptionsAPIStatus).toBe(API_INITIAL)
      expect(usersStore.getUserOptionsAPIError).toBe(null)
   })

   it('Should test addUser request loading state', () => {
      const onSuccess = jest.fn()

      const onFailure = jest.fn()

      const mockLoadingPromise = new Promise(function(resolve, reject) {
         return true
      })
      const mockAddUserAPI = jest.fn()
      mockAddUserAPI.mockReturnValue(mockLoadingPromise)

      userApiService.postAddUserDetails = mockAddUserAPI
      usersStore.addUserRequestAPI(onSuccess, onFailure, {})

      expect(usersStore.getAddUserAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('Should test addUser request success state', async () => {
      const onSuccess = jest.fn()

      const onFailure = jest.fn()
      await usersStore.addUserRequestAPI(onSuccess, onFailure, {})
      expect(usersStore.getAddUserAPIStatus).toBe(API_SUCCESS)
      expect(usersStore.getAddUserAPIError).toBe(null)
   })
   it('Should test addUser request failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })
      const mockAddUserAPI = jest.fn()
      mockAddUserAPI.mockReturnValue(mockFailurePromise)
      userApiService.postAddUserDetails = mockAddUserAPI
      await usersStore.addUserRequestAPI(onSuccess, onFailure, {})

      expect(usersStore.getAddUserAPIStatus).toBe(API_FAILED)

      expect(onFailure).toBeCalled()
   })

   it('Should test deleteUser request loading state', () => {
      const onSuccess = jest.fn()

      const onFailure = jest.fn()

      const mockLoadingPromise = new Promise(function(resolve, reject) {
         return true
      })
      const mockDeleteUserAPI = jest.fn()
      mockDeleteUserAPI.mockReturnValue(mockLoadingPromise)

      userApiService.deleteUserDetailsAPI = mockDeleteUserAPI
      usersStore.deleteUserDetails(onSuccess, onFailure, {})
      expect(usersStore.getDeleteUserAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('Should test deleteUser request success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      await usersStore.deleteUserDetails(onSuccess, onFailure, {})
      expect(usersStore.getDeleteUserAPIStatus).toBe(API_SUCCESS)
      expect(usersStore.getAddUserAPIError).toBe(null)
   })
   it('Should test deleteUser request failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })
      const mockDeleteUserAPI = jest.fn()
      mockDeleteUserAPI.mockReturnValue(mockFailurePromise)

      userApiService.deleteUserDetailsAPI = mockDeleteUserAPI
      await usersStore.deleteUserDetails(onSuccess, onFailure, {})

      expect(usersStore.getDeleteUserAPIStatus).toBe(API_FAILED)
      expect(onFailure).toBeCalled()
   })

   it('Should test getUserOptions loading state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {
         return true
      })
      const mockGetUserOptionsAPI = jest.fn()
      mockGetUserOptionsAPI.mockReturnValue(mockLoadingPromise)

      userApiService.getUserOptionsAPI = mockGetUserOptionsAPI
      expect(usersStore.getUserOptionsAPIStatus).toBe(API_INITIAL)
   })
   it('Should test getUserOptions failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })
      const mockGetUserOptionsAPI = jest.fn()
      mockGetUserOptionsAPI.mockReturnValue(mockFailurePromise)

      userApiService.getUserOptionsAPI = mockGetUserOptionsAPI
      await usersStore.getUserOptions()
      expect(usersStore.getUserOptionsAPIStatus).toBe(API_FAILED)
      expect(usersStore.getUserOptionsAPIError).toBe('error')
   })
   it('Should test getUserOptions success state', async () => {
      await usersStore.getUserOptions()
      expect(usersStore.getUserOptionsAPIStatus).toBe(API_SUCCESS)
      expect(usersStore.getUserOptionsAPIError).toBe(null)
   })
})
