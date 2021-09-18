import { resolveWithTimeout } from '../../../Common/utils/TestUtils'
import { TaskActionApiResponse, TaskActionApiRequest } from '../../stores/types'
import taskActionsResponse from '../../fixtures/getTaskActionsResponse.json'

import TaskActionsService from '.'

class SampleServiceFixture implements TaskActionsService {
   getTaskActionResponse = (
      requestObject: TaskActionApiRequest
   ): Promise<TaskActionApiResponse> => resolveWithTimeout(taskActionsResponse)
}

export default SampleServiceFixture
