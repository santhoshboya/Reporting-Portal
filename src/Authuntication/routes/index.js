import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { SIGN_IN_PATH } from '../constants/RouteConstants'

import { SignInRoute } from './SignInRoute'
import { ProtectedRoute } from '../../common/components/ProtectedRoute/ProtectedRoute'

const authRoutes = [<Route path={SIGN_IN_PATH} component={SignInRoute} />]

export { authRoutes }
