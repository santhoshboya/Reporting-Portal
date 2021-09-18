import React from 'react'
import { Route } from 'react-router-dom'

import { ADD_TEAM_ROUTE } from '../../constants/navigationConstants'

import AddTeamRoute from './AddTeamRoute'

const addTeamRoute = (
   <Route
      key={ADD_TEAM_ROUTE}
      exact
      path={ADD_TEAM_ROUTE}
      component={AddTeamRoute}
   />
)

export { addTeamRoute }
