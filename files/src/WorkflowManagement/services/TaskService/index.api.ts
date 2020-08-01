import { create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import EnvironmentConstants from '../../../Common/constants/EnvironmentConstants'

import endpoints from '../endpoints'

import { TaskService } from './index'

const URL = `${EnvironmentConstants.BASE_URL}/`

class TaskServiceAPI implements TaskService {
   api: Record<string, any>
   networkCallWithAPISauce: Function

   constructor(networkCallWithAPISauce: Function) {
      this.api = create({
         baseURL: URL
      })
      this.networkCallWithAPISauce = networkCallWithAPISauce
   }

   getTaskDetailsAPI(taskId) {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.taskDetails,
         taskId,
         apiMethods.get
      )
   }

   createTask(requestObject) {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.createTask,
         requestObject,
         apiMethods.post
      )
   }

   updateTaskAPI(requestObject) {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.updateTask,
         requestObject,
         apiMethods.post
      )
   }
}
export default TaskServiceAPI
