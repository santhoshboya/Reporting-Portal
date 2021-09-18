import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import TaskTemplatesFixture from '../../fixtures/taskTemplates.json'

import { TaskTemplateService } from '.'

class TaskTempleteServiceFixture implements TaskTemplateService {
   getTaskTemplatesAPI() {
      return resolveWithTimeout(TaskTemplatesFixture)
   }
}

export default TaskTempleteServiceFixture
