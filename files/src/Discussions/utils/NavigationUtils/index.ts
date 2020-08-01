import { History } from 'history'

import { getAccessToken } from '../../../Common/utils/StorageUtils'

import { TASK_SPECIFIC_DISCUSSIONS_ROUTE_PATH } from '../../constants/NavigationConstants'

export const isLoggedIn = () => getAccessToken() !== undefined

// FIXME: wile {backendIntegration or before} implement a query/path parameter handling for task_id, taskString, sortby, filter
export const goToTaskSpecificDiscussionsRoutePath = (history: History) =>
   history.replace(TASK_SPECIFIC_DISCUSSIONS_ROUTE_PATH)
