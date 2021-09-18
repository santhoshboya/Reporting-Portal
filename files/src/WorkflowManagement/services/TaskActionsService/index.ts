import { TaskActionApiResponse, TaskActionApiRequest } from '../../stores/types'

interface TaskService {
   getTaskActionResponse: (
      requestObject: TaskActionApiRequest
   ) => Promise<TaskActionApiResponse>
}

export default TaskService
