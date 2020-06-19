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

import getObservationResponse from '../../fixtures/getObservationResponse.json'
import { ObservationFixtureService } from '../../services/ObservationFixtureService/ObservationFixtureService'
import { UserObservationScreenRoute } from './UserObservationScreenRoute'
import { UserStore } from '../../stores/UserStore'
const USER_OBSERVATION_LIST_PATH = '/userobservationslist'
const USER_OBSERVATION_SCREEN_PATH = '/observationscreen/'
const RP_OBSERVATION_LIST_PATH = '/rpobservationslist/'
const OBSERVATIONS_ASSIGNED_TO_RP = '/observationsassignedrp/'
const LIST_OF_OBSERVATIONS_PATH = '/listofobservations/'

import { AuthAPI } from '../../../Authuntication/services/AuthService/AuthAPI'
import { AuthStore } from '../../../Authuntication/stores/AuthStore'
import { API_SUCCESS, API_FETCHING, API_INITIAL } from '@ib/api-constants'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('User ObservationScreenRoute tests', () => {
   let observationApi
   let userStore
   let authAPI
   let authStore
   beforeEach(() => {
      observationApi = new ObservationFixtureService()
      userStore = new UserStore(observationApi)
      authAPI = new AuthAPI()
      authStore = new AuthStore(authAPI)
   })
   afterEach(() => {
      jest.restoreAllMocks()
   })
   it('should render user observation screen', async () => {
      const history = createMemoryHistory()
      const observationId = 1
      history.push({
         pathname: `${USER_OBSERVATION_SCREEN_PATH}${observationId}`,
         state: { userType: 'user', currentPage: '' }
      })
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
                  path={`${USER_OBSERVATION_SCREEN_PATH}:id`}
                  component={UserObservationScreenRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         expect(userStore.getObservationAPIStatus).toBe(API_SUCCESS)
      })
      getByText(/OBSERVATION/i)
   })

   it('should render reset Rp observation screen', async () => {
      const history = createMemoryHistory()
      const observationId = 1
      history.push({
         pathname: `${USER_OBSERVATION_SCREEN_PATH}${observationId}`,
         state: { userType: 'rp', currentPage: 'My Observations' }
      })
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
                  path={`${USER_OBSERVATION_SCREEN_PATH}:id`}
                  component={UserObservationScreenRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         expect(userStore.getObservationAPIStatus).toBe(API_SUCCESS)
      })
      const resetBtn = getByRole('button', { name: 'RESET' })
      fireEvent.click(resetBtn)

      // await waitFor(() => {
      //    getByTestId('location-display')
      // })
      // expect(getByTestId('location-display')).toHaveTextContent(OBSERVATION)
      // getByText(/OBSERVATION/i)
      // debug()
   })
   it('should render reset Admin observation screen', async () => {
      const history = createMemoryHistory()
      const observationId = 1
      history.push({
         pathname: `${USER_OBSERVATION_SCREEN_PATH}${observationId}`,
         state: { userType: 'Admin', currentPage: 'Total Observations' }
      })
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
                  path={`${USER_OBSERVATION_SCREEN_PATH}:id`}
                  component={UserObservationScreenRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         expect(userStore.getObservationAPIStatus).toBe(API_SUCCESS)
      })
      const resetBtn = getByRole('button', { name: 'RESET' })
      fireEvent.click(resetBtn)
   })

   it('should render update Rp observation screen', async () => {
      const history = createMemoryHistory()
      const observationId = 1
      history.push({
         pathname: `${USER_OBSERVATION_SCREEN_PATH}${observationId}`,
         state: { userType: 'Rp', currentPage: 'Assigned to me' }
      })
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
                  path={`${USER_OBSERVATION_SCREEN_PATH}:id`}
                  component={UserObservationScreenRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )
      await waitFor(() => {
         expect(userStore.getObservationAPIStatus).toBe(API_SUCCESS)
      })
      const updateBtn = getByRole('button', { name: 'UPDATE' })
      expect(userStore.updateObservationAPIStatus).toBe(API_INITIAL)
      fireEvent.click(updateBtn)
      expect(userStore.updateObservationAPIStatus).toBe(API_FETCHING)
   })

   it('should render update Admin observation screen', async () => {
      const history = createMemoryHistory()
      const observationId = 1
      history.push({
         pathname: `${USER_OBSERVATION_SCREEN_PATH}${observationId}`,
         state: { userType: 'Admin', currentPage: 'Total Observations' }
      })
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
                  path={`${USER_OBSERVATION_SCREEN_PATH}:id`}
                  component={UserObservationScreenRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         expect(userStore.getObservationAPIStatus).toBe(API_SUCCESS)
      })
      const updateBtn = getByRole('button', { name: 'UPDATE' })
      expect(userStore.updateObservationAPIStatus).toBe(API_INITIAL)
      fireEvent.click(updateBtn)
      expect(userStore.updateObservationAPIStatus).toBe(API_FETCHING)
   })
   it('should render navigate to pages in Rp observation screen', async () => {
      const history = createMemoryHistory()
      const observationId = 1
      history.push({
         pathname: `${USER_OBSERVATION_SCREEN_PATH}${observationId}`,
         state: { userType: 'Rp', currentPage: 'My Observations' }
      })
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
                  path={`${USER_OBSERVATION_SCREEN_PATH}:id`}
                  component={UserObservationScreenRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )
      await waitFor(() => {
         getByTestId('Assigned to me')
      })
      const result = getByTestId('Assigned to me')
      fireEvent.click(result)
      expect(history.location.pathname).toBe(OBSERVATIONS_ASSIGNED_TO_RP)
   })

   it('should render navigate to pages in Rp observation screen', async () => {
      const history = createMemoryHistory()
      const observationId = 1
      history.push({
         pathname: `${USER_OBSERVATION_SCREEN_PATH}${observationId}`,
         state: { userType: 'Rp', currentPage: 'Assigned to me' }
      })
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
                  path={`${USER_OBSERVATION_SCREEN_PATH}:id`}
                  component={UserObservationScreenRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )
      await waitFor(() => {
         getByTestId('My observations')
      })
      const result = getByTestId('My observations')
      fireEvent.click(result)
      expect(history.location.pathname).toBe(RP_OBSERVATION_LIST_PATH)
   })

   it('should render navigate to pages in Admin observation screen', async () => {
      const history = createMemoryHistory()
      const observationId = 1
      history.push({
         pathname: `${USER_OBSERVATION_SCREEN_PATH}${observationId}`,
         state: { userType: 'Admin', currentPage: 'Total Observations' }
      })
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
                  path={`${USER_OBSERVATION_SCREEN_PATH}:id`}
                  component={UserObservationScreenRoute}
               />
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )
      await waitFor(() => {
         getByTestId('Total Observations')
      })
      const result = getByTestId('Total Observations')
      fireEvent.click(result)
      expect(history.location.pathname).toBe(LIST_OF_OBSERVATIONS_PATH)
   })
})
