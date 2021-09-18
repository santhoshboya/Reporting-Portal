import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import taskDetails from '../../fixtures/taskDetails.json'

import { TaskService } from '.'

class TaskServiceFixture implements TaskService {
   networkCallWithAPISauce: Function
   constructor(networkCallWithAPISauce: Function) {
      this.networkCallWithAPISauce = networkCallWithAPISauce
   }
   getTaskDetailsAPI() {
      return resolveWithTimeout(taskDetails)
   }

   createTask(requestObject) {
      return resolveWithTimeout({})
   }

   updateTaskAPI(requestObject) {
      console.log('updateTaskAPI requestObject', requestObject)
      return resolveWithTimeout({})
   }
}

export default TaskServiceFixture
