import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './common/components/HomePage'

import './App.css'
import { authRoutes } from './Authuntication/routes'
import { userRoutes } from './UserModule/routes'
import { rpRoutes } from './RpModule/routes'
import { adminRoutes } from './AdminModule/routes'
import authStore from './Authuntication/stores'
import userStore from './UserModule/stores'
import adminStore from './AdminModule/stores'
import rpStore from './RpModule/stores'

//Comment added
class App extends Component {
   render() {
      return (
         <Provider {...authStore} {...userStore} {...rpStore} {...adminStore}>
            <Router basename={process.env.PUBLIC_URL}>
               <Switch>
                  {authRoutes}
                  {userRoutes}
                  {rpRoutes}
                  {adminRoutes}
                  <Route path='/'>
                     <HomePage />
                  </Route>
               </Switch>
            </Router>
         </Provider>
      )
   }
}
export default App
