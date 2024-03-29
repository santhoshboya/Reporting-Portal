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
import { ObservationFixtureService } from '../../services/ObservationFixtureService/ObservationFixtureService'
import { UserObservationRoute } from './UserObservationRoute'
import { UserStore } from '../../stores/UserStore'
import { AuthStore } from '../../../Authuntication/stores/AuthStore'
import { AuthFixtureService } from '../../../Authuntication/services/AuthService/AuthFixtureService'
import { API_INITIAL, API_FETCHING } from '@ib/api-constants'
const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

const OBSERVATION = '/userobservation/'
const USER_OBSERVATION_LIST_PATH = '/userobservationslist'
const USER_OBSERVATION_SCREEN_PATH = '/observationscreen/'

describe('User ObservationListRoute tests', () => {
   let observationApi
   let userStore
   let authApi
   let authStore

   beforeEach(() => {
      observationApi = new ObservationFixtureService()
      userStore = new UserStore(observationApi)
      authApi = new AuthFixtureService()
      authStore = new AuthStore(authApi)
   })
   afterEach(() => {
      jest.restoreAllMocks()
   })

   it('should render onchange title state', async () => {
      const history = createMemoryHistory()
      const route = OBSERVATION
      history.push(route)
      const {
         getByText,
         getByRole,
         debug,
         getByTestId,
         getByPlaceholderText
      } = render(
         <Provider userStore={userStore} authStore={authStore}>
            <Router history={history}>
               <Route
                  exact
                  path={OBSERVATION}
                  component={UserObservationRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )
      const submitButton = getByRole('button', { name: 'Submit' })
      fireEvent.click(submitButton)
      getByText(/Please enter title/i)
   })

   it('should render onchange description and title with state', async () => {
      const history = createMemoryHistory()
      const route = OBSERVATION
      history.push(route)
      const {
         getByText,
         getByRole,
         debug,
         getByTestId,
         getByPlaceholderText
      } = render(
         <Provider userStore={userStore} authStore={authStore}>
            <Router history={history}>
               <Route
                  exact
                  path={OBSERVATION}
                  component={UserObservationRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )
      const title = 'title'
      const description = 'problem description'
      const titleField = getByTestId('title')
      const descriptionField = getByTestId('description')
      const submitBtn = getByRole('button', { name: 'Submit' })
      fireEvent.change(titleField, { target: { value: title } })
      fireEvent.change(descriptionField, { target: { value: description } })
      fireEvent.click(submitBtn)
      getByText(/Please select severty/i)
   })

   it('should render onchange description and title without text state', async () => {
      const history = createMemoryHistory()
      const route = OBSERVATION
      history.push(route)
      const {
         getByText,
         getByRole,
         debug,
         getByTestId,
         getByPlaceholderText
      } = render(
         <Provider userStore={userStore} authStore={authStore}>
            <Router history={history}>
               <Route
                  exact
                  path={OBSERVATION}
                  component={UserObservationRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )
      const title = ''
      const description = ''
      const titleField = getByTestId('title')
      const descriptionField = getByTestId('description')
      const submitBtn = getByRole('button', { name: 'Submit' })
      fireEvent.change(titleField, { target: { value: title } })
      fireEvent.change(descriptionField, { target: { value: description } })
      fireEvent.click(submitBtn)
      getByText(/Please select severty/i)
   })

   it('should render submit user observation', async () => {
      const history = createMemoryHistory()
      const route = OBSERVATION
      history.push(route)
      const {
         getByText,
         getByRole,
         debug,
         getByTestId,
         getByPlaceholderText
      } = render(
         <Provider userStore={userStore} authStore={authStore}>
            <Router history={history}>
               <Route
                  exact
                  path={OBSERVATION}
                  component={UserObservationRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )
      const submitBtn = getByRole('button', { name: 'Submit' })
      expect(userStore.getPostObservationAPIStatus).toBe(API_INITIAL)
      fireEvent.click(submitBtn)
      //expect(userStore.getPostObservationAPIStatus).toBe(API_FETCHING)
   })
})
