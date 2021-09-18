import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import getTaskSpecficDiscussions from '../../fixtures/getTaskSpecficDiscussions.json'

import TaskDiscussionsService from '.'

export default class TaskDiscussionsFixture implements TaskDiscussionsService {
   getDiscussionsAPI = requestObect =>
      resolveWithTimeout(getTaskSpecficDiscussions)

   postDiscussionAPI = requestObect => resolveWithTimeout({})
}
