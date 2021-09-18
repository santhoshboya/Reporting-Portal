import {
   TaskDiscussionsRequestObjectType,
   TaskDiscussionsResponseObjectType,
   TaskDiscussionRequestObjectType
} from '../../stores/types'

export default interface TaskDiscussionsService {
   getDiscussionsAPI: (
      requestObject: TaskDiscussionsRequestObjectType
   ) => Promise<TaskDiscussionsResponseObjectType>

   postDiscussionAPI: (
      requestObject: TaskDiscussionRequestObjectType
   ) => Promise<{}>
}
