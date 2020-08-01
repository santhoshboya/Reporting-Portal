import React from 'react'
import { Route } from 'react-router-dom'

import { COMPANIES_ROUTE } from '../../constants/navigationConstants'

import CompaniesRoute from './CompaniesRoute'

const companiesRoute = (
   <Route
      key={COMPANIES_ROUTE}
      exact
      path={COMPANIES_ROUTE}
      component={CompaniesRoute}
   />
)

export { companiesRoute }
