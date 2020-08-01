/*global jest,expect*/
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import PasswordAPI from '../../services/PasswordService/index.api'

import PasswordStore from '.'

describe('PasswordStore Tests', () => {
   let passwordAPIService: PasswordAPI
   let passwordStore: PasswordStore

   beforeEach(() => {
      passwordAPIService = new PasswordAPI()
      passwordStore = new PasswordStore(passwordAPIService)
   })

   it('should test initialising auth store', () => {
      expect(passwordStore.getForgotPasswordAPIStatus).toBe(API_INITIAL)
      expect(passwordStore.getForgotPasswordAPIError).toBe(null)
      expect(passwordStore.getUpdatePasswordAPIStatus).toBe(API_INITIAL)
      expect(passwordStore.getUpdatePasswordAPIError).toBe(null)
   })

   it('should test forgotPasswordHandler() data fetching state', () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      const requestObject = {
            email: 'testuser@gamil.com'
         },
         mockLoadingPromise = new Promise(() => {})

      passwordAPIService.sendResetPasswordLinkAPI = jest
         .fn()
         .mockReturnValue(mockLoadingPromise)

      passwordStore.forgotPasswordHandler(requestObject, onSuccess, onFailure)
      expect(passwordStore.getForgotPasswordAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test forgotPasswordHandler() success state', async () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      const requestObject = {
            email: 'testuser@gamil.com'
         },
         mockSuccessPromise = Promise.resolve({})

      passwordAPIService.sendResetPasswordLinkAPI = jest
         .fn()
         .mockReturnValue(mockSuccessPromise)

      await passwordStore.forgotPasswordHandler(
         requestObject,
         onSuccess,
         onFailure
      )
      expect(passwordStore.getForgotPasswordAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test forgotPasswordHandler() failure state', async () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      const requestObject = {
         email: 'testuser@gamil.com'
      }

      jest
         .spyOn(passwordAPIService, 'sendResetPasswordLinkAPI')
         .mockImplementation(() => Promise.reject())

      await passwordStore.forgotPasswordHandler(
         requestObject,
         onSuccess,
         onFailure
      )
      expect(passwordStore.getForgotPasswordAPIStatus).toBe(API_FAILED)
      expect(onFailure).toBeCalled()
   })

   it('should test updatePasswordHandler() data fetching state', () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      const requestObject = {
            password: 'paSS1@rd',
            token: 'token'
         },
         mockLoadingPromise = new Promise((): void => {})

      passwordAPIService.updatePasswordAPI = jest
         .fn()
         .mockReturnValue(mockLoadingPromise)

      passwordStore.updatePasswordHandler(requestObject, onSuccess, onFailure)
      expect(passwordStore.getUpdatePasswordAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test updatePasswordHandler() success state', async () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      const requestObject = {
            password: 'paSS1@rd',
            token: 'token'
         },
         mockSuccessPromise = Promise.resolve({})

      passwordAPIService.updatePasswordAPI = jest
         .fn()
         .mockReturnValue(mockSuccessPromise)

      await passwordStore.updatePasswordHandler(
         requestObject,
         onSuccess,
         onFailure
      )
      expect(passwordStore.getUpdatePasswordAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test updatePasswordHandler() failure state', async () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      const requestObject = {
         password: 'paSS1@rd',
         token: 'token'
      }

      jest
         .spyOn(passwordAPIService, 'updatePasswordAPI')
         .mockImplementation(() => Promise.reject())

      await passwordStore.updatePasswordHandler(
         requestObject,
         onSuccess,
         onFailure
      )
      expect(passwordStore.getUpdatePasswordAPIStatus).toBe(API_FAILED)
      expect(onFailure).toBeCalled()
   })

   it('should test clearStore()', () => {
      jest.spyOn(passwordStore, 'init')
      passwordStore.clearStore()
      expect(passwordStore.init).toBeCalled()
   })
})
