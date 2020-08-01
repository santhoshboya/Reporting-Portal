import { TaskResponse, CreateTaskRequest } from '../../stores/types'

export interface TaskService {
   getTaskDetailsAPI: (taskId: string) => Promise<TaskResponse>
   createTask(createTaskRequest: CreateTaskRequest): Promise<{}>
   updateTaskAPI: (updateTaskRequestObject: any) => Promise<{}>
}
