

import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { LIST_OF_OBSERVATIONS_PATH } from '../constants/RouteConstants'

import { ListOfObservationsRoute } from "./ListOfObservationsRoute";
import { ProtectedRoute } from '../../common/components/ProtectedRoute/ProtectedRoute';

const adminRoutes = [<ProtectedRoute exact path={LIST_OF_OBSERVATIONS_PATH} component={ListOfObservationsRoute} />]

export { adminRoutes }