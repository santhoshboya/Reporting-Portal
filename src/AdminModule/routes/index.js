

import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { LIST_OF_OBSERVATIONS_PATH } from '../constants/RouteConstants'

import { ListOfObservationsRoute } from "./ListOfObservationsRoute";

const adminRoutes = [<Route path={LIST_OF_OBSERVATIONS_PATH} component={ListOfObservationsRoute} />]

export { adminRoutes }