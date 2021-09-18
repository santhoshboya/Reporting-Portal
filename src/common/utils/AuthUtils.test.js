import {
   networkCallWithApisauceWithoutAccessToken,
   getUserDisplayableErrorMessage
} from './AuthUtils'
import { create } from 'apisauce'
import { apiUrls } from '../../UserModule/constants/APIConstants'
import { apiMethods } from '../constants/APIConstants'
describe('AuthUtils Test cases', () => {
   let api = create({
      baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
   })
   afterEach(() => {
      jest.restoreAllMocks()
   })
   it('should test networkCallWithApisauceWithoutAccessToken pending promise', async () => {
      const mockPromise = new Promise(resolve => {})
      let promiseResponse = networkCallWithApisauceWithoutAccessToken(
         api,
         'v1/signin/',
         {},
         apiMethods.get
      )
      expect(promiseResponse).toStrictEqual(mockPromise)
   })
   // it('should test networkCallWithApisauceWithoutAccessToken resolve promise', async () => {
   //    const mockPromise = Promise.resolve('response')
   //    let api = create({
   //       baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
   //    })
   //    let promiseResponse = networkCallWithApisauceWithoutAccessToken(
   //       api,
   //       'v1/signin/',
   //       {},
   //       apiMethods.get
   //    )
   //    await promiseResponse
   //    //console.log(promiseResponse)
   //    expect(promiseResponse).toStrictEqual(mockPromise)
   // })
   // it('should test networkCallWithApisauceWithoutAccessToken failue promise', async () => {
   //    const mockFailurePromise = new Promise(function(resolve, reject) {
   //       reject(new Error('error'))
   //    }).catch(() => {})
   //    let api = create({
   //       baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io'
   //    })
   //    let promiseResponse = networkCallWithApisauceWithoutAccessToken(
   //       api,
   //       'v1/signin',
   //       {},
   //       apiMethods.get
   //    )
   //    try {
   //       await promiseResponse
   //    } catch (error) {}

   //    //console.log(mockFailurePromise,'promise', promiseResponse)
   //    expect(promiseResponse).toStrictEqual(mockFailurePromise)
   // })

   it('should test getUserDisplayableErrorMessage empty error', () => {
      //console.log(getUserDisplayableErrorMessage())

      expect(getUserDisplayableErrorMessage()).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test getUserDisplayableErrorMessage with error request times out', async () => {
      const error = JSON.stringify({
         data: {
            message: 'Endpoint request timed out',
            response: null
         }
      })
      expect(getUserDisplayableErrorMessage(error)).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test getUserDisplayableErrorMessage with parsed error undefined', async () => {
      const error = JSON.stringify({})
      expect(getUserDisplayableErrorMessage(error)).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test getUserDisplayableErrorMessage with error description', async () => {
      const error = JSON.stringify({
         data: {
            message: 'Endpoint request timed out',
            response: {
               title: { errorTitle: 'Response Error' },
               description: {
                  errorDescription: 'not found'
               }
            }
         }
      })
      expect(getUserDisplayableErrorMessage(error)).toStrictEqual({
         description: {
            errorDescription: 'not found'
         },
         title: {
            errorTitle: 'Response Error'
         }
      })
   })
   it('should test getUserDisplayableErrorMessage with error http status code', async () => {
      const error = JSON.stringify({
         data: {
            http_status_code: 503
         }
      })
      expect(getUserDisplayableErrorMessage(error)).toStrictEqual(
         'Please check your internet connection'
      )
   })
   it('should test getUserDisplayableErrorMessage with error Response', async () => {
      const error = JSON.stringify({
         data: {
            message: 'Endpoint request timed out',
            response: JSON.stringify({
               title: 'Response Error',
               description: 'not found'
            })
         }
      })
      expect(getUserDisplayableErrorMessage(error)).toStrictEqual('not found')
   })
})
