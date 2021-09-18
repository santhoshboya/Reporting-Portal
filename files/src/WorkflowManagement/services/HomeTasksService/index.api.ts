import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import { networkCallWithApisauce } from '../../../Common/utils/AuthAPIUtils'
import Config from '../../../Common/constants/EnvironmentConstants'
import { HomeScreenTasksRequestType } from '../../stores/types'
import endpoints from '../endpoints'
import { HomeTasksService } from './index'

const BASE_URL = `${Config.BASE_URL}` //TODO:update with the base url

class HomeTasksServiceAPI implements HomeTasksService {
   api: ApisauceInstance
   networkCallWithApiSauce: Function

   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
      this.networkCallWithApiSauce = networkCallWithApisauce
   }
   getHomeTaskDetailsAPI = (requestObject: HomeScreenTasksRequestType) => {
      const { offset, limit } = requestObject
      return this.networkCallWithApiSauce(
         this.api,
         `${endpoints.homeTasks}?offset=${offset}&limit=${limit}`,
         {},
         apiMethods.post
      )
   }
}

export default HomeTasksServiceAPI
