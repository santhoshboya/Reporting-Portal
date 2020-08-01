/*global jest,expect*/
import Cookie from 'js-cookie'

import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import AuthAPIService from '../../services/AuthService/index.api'
import getLoginResponse from '../../fixtures/getLoginResponse.json'

import AuthStore from '.'

const mockSetCookie = jest.fn()

Cookie.set = mockSetCookie

describe('AuthStore Tests', () => {
   let authAPIService: AuthAPIService
   let authStore: AuthStore

   beforeEach(() => {
      authAPIService = new AuthAPIService()
      authStore = new AuthStore(authAPIService)
   })

   it('should test initialising auth store', () => {
      expect(authStore.getLoginAPIStatus).toBe(API_INITIAL)
      expect(authStore.getLoginAPIError).toBe(null)
   })

   it('should test userLoginHandler() data fetching state', () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      const requestObject = {
            email: 'testuser@gamil.com',
            password: 'Test-password'
         },
         mockLoadingPromise = new Promise((): void => {})

      authAPIService.getLoginAPI = jest.fn().mockReturnValue(mockLoadingPromise)

      authStore.userLoginHandler(requestObject, onSuccess, onFailure)
      expect(authStore.getLoginAPIStatus).toBe(API_FETCHING)
      expect(mockSetCookie).not.toBeCalled()
      expect(onSuccess).not.toBeCalled()
   })

   it('should test userLoginHandler() success state', async () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      const requestObject = {
            email: 'testuser@gamil.com',
            password: 'Test-password'
         },
         mockSuccessPromise = Promise.resolve(getLoginResponse)

      authAPIService.getLoginAPI = jest.fn().mockReturnValue(mockSuccessPromise)

      await authStore.userLoginHandler(requestObject, onSuccess, onFailure)
      expect(authStore.getLoginAPIStatus).toBe(API_SUCCESS)
      expect(mockSetCookie).toBeCalled()
      expect(onSuccess).toBeCalled()
   })

   it('should test userLoginHandler() failure state', async () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      const requestObject = {
         email: 'testuser@gamil.com',
         password: 'Test-password'
      }

      jest
         .spyOn(authAPIService, 'getLoginAPI')
         .mockImplementation(() => Promise.reject())

      await authStore.userLoginHandler(requestObject, onSuccess, onFailure)
      expect(authStore.getLoginAPIStatus).toBe(API_FAILED)
      expect(onFailure).toBeCalled()
   })

   it('should test clearStore()', () => {
      jest.spyOn(authStore, 'init')
      authStore.clearStore()
      expect(authStore.init).toBeCalled()
   })
})
