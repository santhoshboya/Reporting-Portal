import React from 'react'
import { Route } from 'react-router-dom'

import { TEAMS_ROUTE } from '../../constants/navigationConstants'

import TeamsRoute from './TeamsRoute'

const teamsRoute = (
   <Route key={TEAMS_ROUTE} exact path={TEAMS_ROUTE} component={TeamsRoute} />
)

export { teamsRoute }
