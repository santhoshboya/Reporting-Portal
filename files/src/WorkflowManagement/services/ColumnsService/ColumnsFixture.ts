import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import getColumnsResponse from '../../fixtures/getColumnsResponse.json'
import getTasksOverviewResponse from '../../fixtures/getTasksOverviewResponse.json'
import { getPaginationResponse } from '../../utils/PaginationUtils'

import ColumnsService from '.'

class ColumnsFixture implements ColumnsService {
   getColumns = boardId => resolveWithTimeout(getColumnsResponse)
   getTasksOverview = params => {
      const response = {
         ...getTasksOverviewResponse[params.columnId],
         tasks: getPaginationResponse(
            getTasksOverviewResponse[params.columnId].tasks,
            params.limit,
            params.offset
         )
      }
      return resolveWithTimeout(response)
   }
}
export default ColumnsFixture
