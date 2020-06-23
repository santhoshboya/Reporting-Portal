import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getAccessToken } from '../../utils/StorageUtils'

// interface ProtectedRouteProps{
//    path:string,
//    component:Function
// }

class ProtectedRoute extends React.Component {
   constructor(props) {
      super(props)
   }

   render() {
      const { path, component: Component } = this.props
      if (getAccessToken()) {
         return <Route path={path} component={Component} />
      }
      return (
         <Redirect
            to={{
               pathname: '/signin'
            }}
         />
      )
   }
}
export { ProtectedRoute }
