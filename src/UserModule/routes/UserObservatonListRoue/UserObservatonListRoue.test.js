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
import { UserObservatonListRoute } from './UserObservatonListRoute'
import { UserStore } from '../../stores/UserStore'

import { AuthAPI } from '../../../Authuntication/services/AuthService/AuthAPI'
import { AuthStore } from '../../../Authuntication/stores/AuthStore'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

const OBSERVATION = '/userobservation/'
const USER_OBSERVATION_LIST_PATH = '/userobservationslist'
const USER_OBSERVATION_SCREEN_PATH = '/observationscreen/'

describe('User ObservationListRoute tests', () => {
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

   it('should render UserObservationScreen state', async () => {
      const history = createMemoryHistory()
      const route = USER_OBSERVATION_LIST_PATH
      history.push(route)
      const {
         getByPlaceholderText,
         getByRole,
         queryByRole,
         getByTestId,
         debug
      } = render(
         <Provider userStore={userStore} authStore={authStore}>
            <Router history={history}>
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={UserObservatonListRoute}
               />
               <Route exact path={OBSERVATION} component={LocationDisplay} />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         getByRole('button', { name: 'ADD NEW' })
      })
      const addNewButton = getByRole('button', { name: 'ADD NEW' })
      fireEvent.click(addNewButton)
      await waitFor(() => {
         getByTestId('location-display')
      })
      expect(getByTestId('location-display')).toHaveTextContent(OBSERVATION)
   })

   it('should render UserObservationScreen state', async () => {
      const history = createMemoryHistory()
      const route = USER_OBSERVATION_LIST_PATH
      history.push(route)
      const {
         getByPlaceholderText,
         getByRole,
         queryByRole,
         getByTestId,
         debug,
         getAllByTestId
      } = render(
         <Provider userStore={userStore} authStore={authStore}>
            <Router history={history}>
               <Route
                  exact
                  path={USER_OBSERVATION_LIST_PATH}
                  component={UserObservatonListRoute}
               />
               <Route
                  exact
                  path={`${USER_OBSERVATION_SCREEN_PATH}:id`}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         getAllByTestId('observation-list-item')
      })
      const result = getAllByTestId('observation-list-item')
      fireEvent.click(result[0])
      const mockSuccessPromise = Promise.resolve(getObservationResponse)
      const mockObservationsAPI = jest.fn().mockReturnValue(mockSuccessPromise)
      observationApi.getObservationApi = mockObservationsAPI
      const observationId = 1
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await userStore.getObservation(observationId, onSuccess, onFailure)
      await waitFor(() => {
         getAllByTestId('location-display')
      })
      expect(getByTestId('location-display')).toHaveTextContent(
         USER_OBSERVATION_SCREEN_PATH
      )
   })
})
