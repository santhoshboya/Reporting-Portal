import {
   HomeScreenTasksResponseType,
   HomeScreenTasksRequestType
} from '../../stores/types'

export interface HomeTasksService {
   getHomeTaskDetailsAPI: (
      requestObject: HomeScreenTasksRequestType
   ) => Promise<HomeScreenTasksResponseType>
}
