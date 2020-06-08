import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'
import { AuthAPI } from '../../services/AuthService/AuthAPI'
import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'
import { AuthStore } from '.'

describe('AuthStore Tests', () => {
   let authAPI
   let authStore

   beforeEach(() => {
      authAPI = new AuthAPI()
      authStore = new AuthStore(authAPI)
   })

   it('should test initialising auth store', () => {
      expect(authStore.getUserAuthAPIStatus).toBe(API_INITIAL)
      expect(authStore.getUserAuthAPIError).toBe(null)
   })

   it('should test userSignInAPI data fetching state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockAuthAPI = jest.fn()
      mockAuthAPI.mockReturnValue(mockLoadingPromise)
      authAPI.signInAPI = mockAuthAPI

      authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.getUserAuthAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test userSignInAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getUserSignInResponse)
      })
      const mockAuthAPI = jest.fn()
      mockAuthAPI.mockReturnValue(mockSuccessPromise)
      authAPI.signInAPI = mockAuthAPI

      await authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.getUserAuthAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test userSignInAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })
      const mockAuthAPI = jest.fn()
      mockAuthAPI.mockReturnValue(mockFailurePromise)
      authAPI.signInAPI = mockAuthAPI

      authStore = new AuthStore(authAPI)
      await authStore.userSignIn(requestObject, onSuccess, onFailure)

      expect(authStore.getUserAuthAPIStatus).toBe(API_FAILED)
      expect(authStore.getUserAuthAPIError).toBe('error')
      expect(onFailure).toBeCalled()
   })

   it('should test user sign-out', () => {
      authStore.userSignOut()
      expect(authStore.getUserAuthAPIStatus).toBe(API_INITIAL)
      expect(authStore.getUserAuthAPIError).toBe(null)
   })
})
