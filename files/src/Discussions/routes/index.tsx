import React, { lazy } from 'react'
import { Route } from 'react-router-dom'

import { TASK_SPECIFIC_DISCUSSIONS_ROUTE_PATH } from '../constants/NavigationConstants'

const TaskDiscussionsRoute = lazy(() => import('./TaskDiscussionsRoute'))

// TODO: Use ProtectedRoute instead pf Route for all routes

const DiscussionsRoutes = [
   <Route
      exact
      key={TASK_SPECIFIC_DISCUSSIONS_ROUTE_PATH}
      path={TASK_SPECIFIC_DISCUSSIONS_ROUTE_PATH}
      component={TaskDiscussionsRoute}
   />
]

export default DiscussionsRoutes
