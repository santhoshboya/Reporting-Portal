//TODO: Need to update to ts
import getData from '@ib/api'
import { ApisauceInstance } from 'apisauce'

import { apiMethods } from '../constants/APIConstants'

export const networkCallWithAPISauceWithoutAuth = async (
   api: ApisauceInstance,
   url: string,
   requestObject: Record<string, any>,
   type: any = apiMethods.post
) => await getData(api, url, requestObject, type)
