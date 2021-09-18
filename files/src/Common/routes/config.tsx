import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import CreateTaskModal from '../../WorkflowManagement/components/CreateTaskModal'
import UpdateTaskModal from '../../WorkflowManagement/components/UpdateTaskModal'
import workFlowManagementRoutes from '../../WorkflowManagement/routes'

import UserProfileRoutes from '../../UserProfile/routes'
import { IAMRoutes } from '../../IAM/routes/index'

import {
   NOT_FOUND_PAGE_PATH,
   NOT_FOUND_PAGE,
   USER_HOME_ROUTE_PATH
} from '../constants/NavigationConstants'
import PageNotFound404 from '../components/PageNotFound404'

const ProtectedRoute = lazy(() => import('../components/ProtectedRoute'))
const Home = lazy(() => import('./Home'))

export const routes = () => (
   <Router>
      <Switch>
         {/* <Route exact path='/' component={Home} /> */}

         {workFlowManagementRoutes}
         {UserProfileRoutes}
         {IAMRoutes}
         <ProtectedRoute exact path={USER_HOME_ROUTE_PATH} component={Home} />
         <Route
            path={NOT_FOUND_PAGE_PATH}
            key={NOT_FOUND_PAGE}
            component={PageNotFound404}
         />
      </Switch>
      <CreateTaskModal />
      <UpdateTaskModal />
   </Router>
)
