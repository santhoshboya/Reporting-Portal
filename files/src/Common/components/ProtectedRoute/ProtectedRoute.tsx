import React from 'react'
import { observer } from 'mobx-react'
import { Redirect, Route } from 'react-router'

import { isLoggedIn } from '../../../UserProfile/utils/NavigationUtils'
import { LOGIN_ROUTE_PATH } from '../../../UserProfile/constants/NavigationConstants'

@observer
class ProtectedRoute extends React.Component<any> {
   render() {
      const { component: Component, ...otherProps } = this.props
      return isLoggedIn() ? (
         <Route {...otherProps} component={Component} />
      ) : (
         <Redirect to={LOGIN_ROUTE_PATH} />
      )
   }
}

export default ProtectedRoute
