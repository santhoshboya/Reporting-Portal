import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
   RP_OBSERVATION_LIST_PATH,
   RP_OBSERVATION_PATH,
   RP_OBSERVATION_SCREEN_PATH,
   OBSERVATIONS_ASSIGNED_TO_RP
} from '../constants/RouteConstants'
import { RpObservatonListRoute } from './RpObservatonListRoute'
import { RpObservationRoute } from './RpObservationRoute'
//import { RpObservationScreenRoute } from './RpObservationScreenRoute'
import { ObservationsAssignedToRpRoute } from './ObservationsAssignedToRpRoute'
import { ProtectedRoute } from '../../common/components/ProtectedRoute/ProtectedRoute'

const rpRoutes = [
   <ProtectedRoute
      exact
      path={RP_OBSERVATION_LIST_PATH}
      component={RpObservatonListRoute}
   />,
   <ProtectedRoute
      exact
      path={RP_OBSERVATION_PATH}
      component={RpObservationRoute}
   />,
   <ProtectedRoute
      exact
      path={OBSERVATIONS_ASSIGNED_TO_RP}
      component={ObservationsAssignedToRpRoute}
   />
]
export { rpRoutes }
