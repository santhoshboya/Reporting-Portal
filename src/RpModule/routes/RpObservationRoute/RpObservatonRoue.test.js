import React from 'react'
import {
   render,
   fireEvent,
   waitFor,
   waitForElement
} from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

//import getObservationResponse from '../../fixtures/getObservationResponse.json'
import { RpObservationFixtureService } from '../../services/RpObservationFixtureService/RpObservationFixtureService'
import { ObservationFixtureService } from '../../../UserModule/services/ObservationFixtureService/ObservationFixtureService'
import { RpObservationRoute } from './RpObservationRoute'
import { RpStore } from '../../stores/RpStore'
import { AuthStore } from '../../../Authuntication/stores/AuthStore'
import { AuthFixtureService } from '../../../Authuntication/services/AuthService/AuthFixtureService'
const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

const RP_OBSERVATION_LIST_PATH = '/rpobservationslist/'
const RP_OBSERVATION_PATH = '/rpobservation/'
const OBSERVATIONS_ASSIGNED_TO_RP = '/observationsassignedrp/'
const OBSERVATION_SCREEN_PATH = '/observationscreen/'

describe('User ObservationListRoute tests', () => {
   let observationApi
   let authApi
   let authStore
   let rpStore
   let rpObservationApi

   beforeEach(() => {
      rpObservationApi = new RpObservationFixtureService()
      observationApi = new ObservationFixtureService()
      rpStore = new RpStore(rpObservationApi, observationApi)
      authApi = new AuthFixtureService()
      authStore = new AuthStore(authApi)
   })
   afterEach(() => {
      jest.restoreAllMocks()
   })

   it('should render rp observation route state', async () => {
      const history = createMemoryHistory()
      const route = RP_OBSERVATION_PATH
      history.push(route)
      const {
         getByText,
         getByRole,
         debug,
         getByTestId,
         getByPlaceholderText
      } = render(
         <Provider rpStore={rpStore} authStore={authStore}>
            <Router history={history}>
               <Route
                  exact
                  path={RP_OBSERVATION_PATH}
                  component={RpObservationRoute}
               />
               <Route
                  exact
                  path={RP_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )
      getByText(/TITLE OF THE OBSERVATION/i)
   })

   it('should render rp observation route required field error msg', async () => {
      const history = createMemoryHistory()
      const route = RP_OBSERVATION_PATH
      history.push(route)
      const {
         getByText,
         getByRole,
         debug,
         getByTestId,
         getByPlaceholderText
      } = render(
         <Provider rpStore={rpStore} authStore={authStore}>
            <Router history={history}>
               <Route
                  exact
                  path={RP_OBSERVATION_PATH}
                  component={RpObservationRoute}
               />
               <Route
                  exact
                  path={RP_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )
      const submitButton = getByRole('button', { name: 'Submit' })
      fireEvent.click(submitButton)
      getByText(/Please enter title/i)
   })

   it('should render rp observation route change title state', async () => {
      const history = createMemoryHistory()
      const route = RP_OBSERVATION_PATH
      history.push(route)
      const {
         getByText,
         getByRole,
         debug,
         getByTestId,
         getByPlaceholderText
      } = render(
         <Provider rpStore={rpStore} authStore={authStore}>
            <Router history={history}>
               <Route
                  exact
                  path={RP_OBSERVATION_PATH}
                  component={RpObservationRoute}
               />
               <Route
                  exact
                  path={RP_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )

      const title = 'title'
      const description = 'description'
      const titleField = getByTestId('title')
      const descriptionField = getByTestId('description')
      const submitBtn = getByRole('button', { name: 'Submit' })
      fireEvent.change(titleField, { target: { value: title } })
      fireEvent.change(descriptionField, { target: { value: description } })
      console.log('title', titleField)

      fireEvent.click(submitBtn)
      getByText(/Please select severty/i)
   })
})
