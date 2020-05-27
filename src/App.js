
import React, { Component } from 'react'
import { Provider } from "mobx-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Page1 from "./components/Page1";

import "./App.css";
import { Check } from "./common/components";
import {authRoutes} from './Authuntication/routes'
import authStore from './Authuntication/stores'

class App extends Component {
  render() {
    console.log(authStore)
    return (
      <Provider {...authStore}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/page-1">
            <Page1 />
          </Route>
          <Route path="/check">
            <Check/>
          </Route>
          {authRoutes}
          <Route path="/">
            <HomePage />
          </Route>

        </Switch>
      </Router>
    </Provider>
    );
  }
}
export default App;
