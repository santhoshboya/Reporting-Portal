import {
   GetTasksOverviewParameters,
   GetColumnsApiResponse,
   GetTasksOverviewApiResponse
} from '../../stores/types'

interface ColumnsService {
   getColumns: (reqObj: any) => Promise<GetColumnsApiResponse> | Promise<any>
   getTasksOverview: (
      getTasksParameters: GetTasksOverviewParameters
   ) => Promise<GetTasksOverviewApiResponse>
}
export default ColumnsService
