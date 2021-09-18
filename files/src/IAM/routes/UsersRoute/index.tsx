import React from 'react'
import { Route } from 'react-router-dom'

import {
   ADD_USER,
   USER_LIST,
   EDIT_USER
} from '../../constants/navigationConstants'

import { AddUserRoute } from '../AddUserRoute'

import { EditUserRoute } from '../EditUserRoute'
import UsersRoute from './UsersRoute'

const userRoutes = [
   <Route key={USER_LIST} exact path={USER_LIST} component={UsersRoute} />,
   <Route key={ADD_USER} exact path={ADD_USER} component={AddUserRoute} />,
   <Route key={EDIT_USER} exact path={EDIT_USER} component={EditUserRoute} />
]

export { userRoutes }
