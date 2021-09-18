import React from 'react'
import { Route } from 'react-router-dom'

import { ADD_COMPANY_ROUTE } from '../../constants/navigationConstants'

import AddCompanyRoute from './AddCompanyRoute'

const addCompanyRoute = (
   <Route
      key={ADD_COMPANY_ROUTE}
      exact
      path={ADD_COMPANY_ROUTE}
      component={AddCompanyRoute}
   />
)

export { addCompanyRoute }
