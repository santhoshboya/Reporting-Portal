import React, { lazy } from 'react'
import { Route } from 'react-router-dom'

import {
   BOARDS_ROUTE_PATH,
   HOME_TASKS_PATH,
   CREATE_TASK_ROUTE_PATH,
   GET_TASK_ROUTE_PATH
} from '../constants/NavigationConstants'

import ProjectHomeRoute from './ProjectHomeRoute'

import CreateTaskRoute from './CreateTaskRoute'
import GetTaskRoute from './GetTaskRoute'

const BoardsRoute = lazy(() => import('./BoardsRoute'))

const routes = [
   <Route
      key={HOME_TASKS_PATH}
      exact
      path={'/'}
      component={ProjectHomeRoute}
   />,
   <Route
      key={BOARDS_ROUTE_PATH}
      exact
      path={`${BOARDS_ROUTE_PATH}`}
      component={BoardsRoute}
   />,
   <Route
      key={CREATE_TASK_ROUTE_PATH}
      exact
      path={CREATE_TASK_ROUTE_PATH}
      component={CreateTaskRoute}
   />,
   <Route
      key={GET_TASK_ROUTE_PATH}
      exact
      path={GET_TASK_ROUTE_PATH}
      component={GetTaskRoute}
   />
]

export default routes
