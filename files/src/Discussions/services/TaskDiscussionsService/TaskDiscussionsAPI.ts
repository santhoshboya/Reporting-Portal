import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import config from '../../../Common/constants/EnvironmentConstants'

import endpoints from '../endpoints'

import TaskDiscussionsService from '.'

export default class TaskDiscussionsAPI implements TaskDiscussionsService {
   api: ApisauceInstance
   networkCallWithApisauce: Function

   constructor(networkCallWithApisauce: Function) {
      this.api = create({
         baseURL: config.BASE_URL
      })
      this.networkCallWithApisauce = networkCallWithApisauce
   }

   getDiscussionsAPI = requestObect => {
      const { api, networkCallWithApisauce } = this
      return networkCallWithApisauce(
         api,
         endpoints.getTaskDiscussions,
         requestObect,
         apiMethods.get
      )
   }

   postDiscussionAPI = requestObect => {
      const { api, networkCallWithApisauce } = this
      return networkCallWithApisauce(
         api,
         endpoints.postTaskDiscussions,
         requestObect,
         apiMethods.post
      )
   }
}
