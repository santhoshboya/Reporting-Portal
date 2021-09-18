/*global jest,expect*/
import Cookie from 'js-cookie'
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { networkCallWithApisauce } from '../../../Common/utils/AuthAPIUtils'

import UserProfileDetailsService from '../../services/UserProfileDetailsService/index.api'
import getUserProfileDetailsResponse from '../../fixtures/getUserProfileDetailsResponse.json'

import UserProfileDetailsStore from '.'

const mockRemoveCookie = jest.fn()
Cookie.remove = mockRemoveCookie

describe('UserProfileDetailsStore Tests', () => {
   let userProfileDetailsService: UserProfileDetailsService
   let userProfileDetailsStore: UserProfileDetailsStore

   beforeEach(() => {
      userProfileDetailsService = new UserProfileDetailsService(
         networkCallWithApisauce
      )
      userProfileDetailsStore = new UserProfileDetailsStore(
         userProfileDetailsService
      )
   })

   it('should test initialising auth store', () => {
      expect(userProfileDetailsStore.getUserProfileDetailsAPIStatus).toBe(
         API_INITIAL
      )
      expect(userProfileDetailsStore.getUserProfileDetailsAPIError).toBe(null)
      expect(userProfileDetailsStore.getLogoutAPIStatus).toBe(API_INITIAL)
      expect(userProfileDetailsStore.getLogoutAPIError).toBe(null)
   })

   it('should test getUserProfileDetails() data fetching state', () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      const mockLoadingPromise = new Promise((): void => {})

      userProfileDetailsService.getUserProfileDetailsAPI = jest
         .fn()
         .mockReturnValue(mockLoadingPromise)

      userProfileDetailsStore.getUserProfileDetails(onSuccess, onFailure)
      expect(userProfileDetailsStore.getUserProfileDetailsAPIStatus).toBe(
         API_FETCHING
      )
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test getUserProfileDetails() success state', async () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      const mockSuccessPromise = Promise.resolve(getUserProfileDetailsResponse)

      userProfileDetailsService.getUserProfileDetailsAPI = jest
         .fn()
         .mockReturnValue(mockSuccessPromise)

      await userProfileDetailsStore.getUserProfileDetails(onSuccess, onFailure)
      expect(userProfileDetailsStore.getUserProfileDetailsAPIStatus).toBe(
         API_SUCCESS
      )
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test getUserProfileDetails() failure state', async () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      jest
         .spyOn(userProfileDetailsService, 'getUserProfileDetailsAPI')
         .mockImplementation(() => Promise.reject())

      await userProfileDetailsStore.getUserProfileDetails(onSuccess, onFailure)
      expect(userProfileDetailsStore.getUserProfileDetailsAPIStatus).toBe(
         API_FAILED
      )
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test userLogoutHandler() data fetching state', () => {
      const mockLoadingPromise = new Promise((): void => {})

      userProfileDetailsService.getLogoutAPI = jest
         .fn()
         .mockReturnValue(mockLoadingPromise)

      userProfileDetailsStore.userLogoutHandler()
      expect(userProfileDetailsStore.getLogoutAPIStatus).toBe(API_FETCHING)
   })

   it('should test userLogoutHandler() success state', async () => {
      const mockSuccessPromise = Promise.resolve({})

      userProfileDetailsService.getLogoutAPI = jest
         .fn()
         .mockReturnValue(mockSuccessPromise)

      await userProfileDetailsStore.userLogoutHandler()
      expect(userProfileDetailsStore.getLogoutAPIStatus).toBe(API_SUCCESS)
      expect(mockRemoveCookie).toBeCalled()
   })

   it('should test userLogoutHandler() failure state', async () => {
      jest
         .spyOn(userProfileDetailsService, 'getLogoutAPI')
         .mockImplementation(() => Promise.reject())

      await userProfileDetailsStore.userLogoutHandler()
      expect(userProfileDetailsStore.getLogoutAPIStatus).toBe(API_FAILED)
   })

   it('should test userLogoutHandler() data fetching state', () => {
      const mockLoadingPromise = new Promise((): void => {})

      userProfileDetailsService.getLogoutAPI = jest
         .fn()
         .mockReturnValue(mockLoadingPromise)

      userProfileDetailsStore.userLogoutHandler()
      expect(userProfileDetailsStore.getLogoutAPIStatus).toBe(API_FETCHING)
   })

   it('should test userLogoutHandler() success state', async () => {
      const mockSuccessPromise = Promise.resolve({})

      userProfileDetailsService.getLogoutAPI = jest
         .fn()
         .mockReturnValue(mockSuccessPromise)

      await userProfileDetailsStore.userLogoutHandler()
      expect(userProfileDetailsStore.getLogoutAPIStatus).toBe(API_SUCCESS)
      expect(mockRemoveCookie).toBeCalled()
   })

   it('should test userLogoutHandler() failure state', async () => {
      jest
         .spyOn(userProfileDetailsService, 'getLogoutAPI')
         .mockImplementation(() => Promise.reject())

      await userProfileDetailsStore.userLogoutHandler()
      expect(userProfileDetailsStore.getLogoutAPIStatus).toBe(API_FAILED)
   })

   it('should test clearStore()', () => {
      jest.spyOn(userProfileDetailsStore, 'init')
      userProfileDetailsStore.clearStore()
      expect(userProfileDetailsStore.init).toBeCalled()
   })
})
