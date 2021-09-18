import React, { lazy } from 'react'

import ProtectedRoute from '../../Common/components/ProtectedRoute'

import { ADMIN_HOME_ROUTE_PATH } from '../constants/navigationConstants'

import { userRoutes } from './UsersRoute'
import { teamsRoute } from './TeamsRoute/index'
import { addTeamRoute } from './AddTeamRoute'
import { editTeamRoute } from './EditTeamRoute'
import { addCompanyRoute } from './AddCompanyRoute'
import { editCompanyRoute } from './EditCompanyRoute'
import { companiesRoute } from './CompaniesRoute'

const AdminHomeRoute = lazy(() => import('./AdminHomeRoute'))

const IAMRoutes = [
   <ProtectedRoute
      exact
      path={ADMIN_HOME_ROUTE_PATH}
      key={ADMIN_HOME_ROUTE_PATH}
      component={AdminHomeRoute}
   />,
   teamsRoute,
   addTeamRoute,
   userRoutes,
   editTeamRoute,
   addCompanyRoute,
   companiesRoute,
   editCompanyRoute
]

export { IAMRoutes }
