//TODO: Need to update to ts

import getData from '@ib/api'
import { ApisauceInstance } from 'apisauce'

import { apiMethods } from '../constants/APIConstants'
import { isAccessTokenExpiredResult } from './APIErrorUtils'

import { getAccessToken, getRefreshToken } from './StorageUtils'

export const networkCallWithApisauce = (store: any) => async (
   api: ApisauceInstance,
   url: string,
   requestObject: Record<string, any>,
   type: any = apiMethods.post,
   options = {
      getAccessToken
   }
) => {
   api.setHeaders({
      Authorization: `Bearer access_token`
   })
   let response: any = null
   try {
      // NOTE: same api is invocation method is used in AuthApiUtils also. for any modifications update the same there
      response = await getData(api, url, requestObject, type)
   } catch (error) {
      const { message } = error
      const { isAccessTokenExpired } = isAccessTokenExpiredResult(message)
      //
      if (isAccessTokenExpired) {
         // NOTE: To avoid circular dependencies we are passing store as an argument

         const request = {
            refresh_token: getRefreshToken(),
            access_token: getAccessToken()
         }
         await store.refreshAuthTokensAPI(request)

         api.setHeaders({
            Authorization: `Bearer ${options.getAccessToken()}`
         })
         response = await getData(api, url, requestObject, type)
      } else {
         throw error
      }
   }
   return response
}
