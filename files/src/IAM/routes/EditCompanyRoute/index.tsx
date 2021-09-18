import React from 'react'
import { Route } from 'react-router-dom'

import {
   EDIT_COMPANY_ROUTE,
   EDIT_COMPANY_PATH
} from '../../constants/navigationConstants'

import EditCompanyRoute from './EditCompanyRoute'

const editCompanyRoute = (
   <Route
      key={EDIT_COMPANY_PATH}
      exact
      path={EDIT_COMPANY_ROUTE}
      component={EditCompanyRoute}
   />
)

export { editCompanyRoute }
