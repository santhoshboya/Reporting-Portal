import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'
import { networkCallWithApisauce } from '../../../Common/utils/AuthAPIUtils'

import { TaskActionApiResponse, TaskActionApiRequest } from '../../stores/types'

import TaskActionsService from '.'

const BASE_URL = `${Config.BASE_URL}api/ib_boards`

class TaskActionsApi implements TaskActionsService {
   api: ApisauceInstance
   networkCallWithApisauce: Function

   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
      this.networkCallWithApisauce = networkCallWithApisauce
   }

   getTaskActionResponse(
      requestObject: TaskActionApiRequest
   ): Promise<TaskActionApiResponse> {
      const { board_id, task_id, action_id } = requestObject
      const endpoint = `/boards/${board_id}/tasks/${task_id}/actions/${action_id}/v1/`
      return this.networkCallWithApisauce(
         this.api,
         endpoint,
         {},
         apiMethods.post
      )
   }
}

export default TaskActionsApi
