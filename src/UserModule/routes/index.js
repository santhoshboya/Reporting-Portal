import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
   USER_OBSERVATION_LIST_PATH,
   USER_OBSERVATION_PATH,
   USER_OBSERVATION_SCREEN_PATH
} from '../constants/RouteConstants'
import { UserObservatonListRoute } from './UserObservatonListRoue'
import { UserObservationRoute } from './UserObservationRoute'
import { UserObservationScreenRoute } from './UserObservationScreenRoute'
import { ProtectedRoute } from '../../common/components/ProtectedRoute/ProtectedRoute'

const userRoutes = [
   <Route
      path={USER_OBSERVATION_LIST_PATH}
      exact
      component={UserObservatonListRoute}
   />,
   <Route
      exact
      path={USER_OBSERVATION_PATH}
      component={UserObservationRoute}
   />,
   <Route
      exact
      path={`${USER_OBSERVATION_SCREEN_PATH}:id`}
      component={UserObservationScreenRoute}
   />
]

export { userRoutes }
