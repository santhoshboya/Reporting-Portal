import { resolveWithTimeout } from '../../../Common/utils/TestUtils'
import getHomeTasksResponse from '../../fixtures/getHomeTasksResponse.json'
import { HomeTasksService } from './index'

class HomeTasksServiceAPI implements HomeTasksService {
   constructor() {}
   getHomeTaskDetailsAPI = requestObject => {
      const { offset, limit } = requestObject
      const tasksDetails = {
         tasks: getHomeTasksResponse.tasks.slice(offset, offset + limit),
         total_tasks: getHomeTasksResponse.total_tasks
      }
      return resolveWithTimeout(tasksDetails)
   }
}

export default HomeTasksServiceAPI
