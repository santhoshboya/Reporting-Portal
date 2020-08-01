import { networkCallWithApisauce } from '../../Common/utils/AuthAPIUtils'
import stores from '../../Common/stores'

import TaskDiscussionsAPI from '../services/TaskDiscussionsService/TaskDiscussionsAPI'
import TaskDiscussionsFixture from '../services/TaskDiscussionsService/TaskDiscussionsFixture'
import TaskDiscussionsStore from './TaskDiscussionsStore'

export const networkCallWithApisauceWithAuth = networkCallWithApisauce(
   stores.authStore
)

// FIXME: Do this all service nstances and store nstances in Common/Stroes/index.ts
// TODO: remove this usage of isFixtures
const isFixtures = () => true

const getTaskDiscussionsService = () =>
   new (isFixtures() ? TaskDiscussionsFixture : TaskDiscussionsAPI)(
      networkCallWithApisauceWithAuth
   )
const taskDiscussionsStore = new TaskDiscussionsStore(
   getTaskDiscussionsService()
)

export default { taskDiscussionsStore }
