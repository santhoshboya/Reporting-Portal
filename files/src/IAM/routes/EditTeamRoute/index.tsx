import React from 'react'
import { Route } from 'react-router-dom'

import { EDIT_TEAM_ROUTE } from '../../constants/navigationConstants'

import EditTeamRoute from './EditTeamRoute'

const editTeamRoute = (
   <Route
      key={EDIT_TEAM_ROUTE}
      exact
      path={EDIT_TEAM_ROUTE}
      component={EditTeamRoute}
   />
)

export { editTeamRoute }
