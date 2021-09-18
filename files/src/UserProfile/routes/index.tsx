import React, { lazy } from 'react'
import { Route } from 'react-router-dom'
import {
   LOGIN_ROUTE_PATH,
   FORGOT_PASSWORD_ROUTE_PATH,
   UPDATE_PASSWORD_ROUTE_PATH,
   LINK_HAS_EXPIRED_ROUTE_PATH
} from '../constants/NavigationConstants'

const LoginRoute = lazy(() => import('./LoginRoute'))
const ForgotPasswordRoute = lazy(() => import('./ForgotPasswordRoute'))
const UpdatePasswordRoute = lazy(() => import('./UpdatePasswordRoute'))
const LinkHasExpiredRoute = lazy(() => import('./LinkHasExpiredRoute'))

const UserProfileRoutes = [
   <Route
      exact
      key={LOGIN_ROUTE_PATH}
      path={LOGIN_ROUTE_PATH}
      component={LoginRoute}
   />,
   <Route
      exact
      key={FORGOT_PASSWORD_ROUTE_PATH}
      path={FORGOT_PASSWORD_ROUTE_PATH}
      component={ForgotPasswordRoute}
   />,
   <Route
      exact
      key={UPDATE_PASSWORD_ROUTE_PATH}
      path={UPDATE_PASSWORD_ROUTE_PATH}
      component={UpdatePasswordRoute}
   />,
   <Route
      exact
      key={LINK_HAS_EXPIRED_ROUTE_PATH}
      path={LINK_HAS_EXPIRED_ROUTE_PATH}
      component={LinkHasExpiredRoute}
   />
]

export default UserProfileRoutes
