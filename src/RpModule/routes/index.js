import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { RP_OBSERVATION_LIST_PATH, RP_OBSERVATION_PATH, RP_OBSERVATION_SCREEN_PATH } from '../constants/RouteConstants'
import { RpObservatonListRoute } from './RpObservatonListRoute'
import { RpObservationRoute } from './RpObservationRoute'
import { RpObservationScreenRoute } from './RpObservationScreenRoute'


const rpRoutes = [<Route path={RP_OBSERVATION_LIST_PATH} component={RpObservatonListRoute} />,
<Route path={RP_OBSERVATION_SCREEN_PATH} component={RpObservationScreenRoute} />,
<Route path={RP_OBSERVATION_PATH} component={RpObservationRoute} />]

export { rpRoutes }
