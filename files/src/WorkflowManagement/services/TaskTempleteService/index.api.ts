import { create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import EnvironmentConstants from '../../../Common/constants/EnvironmentConstants'

import endpoints from '../endpoints'

import { TaskTemplateService } from './index'

const URL = `${EnvironmentConstants.BASE_URL}/`

class TaskTempleteServiceAPI implements TaskTemplateService {
   api: Record<string, any>
   networkCallWithAPISauce: Function

   constructor(networkCallWithAPISauce: Function) {
      this.api = create({
         baseURL: URL
      })
      this.networkCallWithAPISauce = networkCallWithAPISauce
   }

   getTaskTemplatesAPI() {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.taskTemplates,
         {},
         apiMethods.post
      )
   }
}
export default TaskTempleteServiceAPI
