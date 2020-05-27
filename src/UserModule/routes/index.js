import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { USER_OBSERVATION_LIST_PATH,USER_OBSERVATION_PATH } from '../constants/RouteConstants'
import { UserObservatonListRoute } from './UserObservatonListRoue'
import { UserObservationRoute } from './UserObservationRoute'


const userRoutes = [<Route path={USER_OBSERVATION_LIST_PATH} component={UserObservatonListRoute} />,
<Route path={USER_OBSERVATION_PATH} component={UserObservationRoute} />]

export  { userRoutes }