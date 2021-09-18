import { TaskTemplateResponse } from '../../stores/types'

export interface TaskTemplateService {
   getTaskTemplatesAPI: () => Promise<TaskTemplateResponse>
}
