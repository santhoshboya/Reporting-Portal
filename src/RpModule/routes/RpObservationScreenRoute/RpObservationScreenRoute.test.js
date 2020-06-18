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
import { RpObservationScreenRoute } from './RpObservationScreenRoute'
import { RpStore } from '../../stores/RpStore'
import { AuthStore } from '../../../Authuntication/stores/AuthStore'
import { AuthFixtureService } from '../../../Authuntication/services/AuthService/AuthFixtureService'
import { API_SUCCESS } from '@ib/api-constants'
const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

const RP_OBSERVATION_LIST_PATH = '/rpobservationslist/'
const RP_OBSERVATION_PATH = '/rpobservation/'
const OBSERVATIONS_ASSIGNED_TO_RP = '/observationsassignedrp/'
const OBSERVATION_SCREEN_PATH = '/observationscreen/'
describe('User ObservationScreenRoute tests', () => {
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
   it('should render user observation screen', async () => {
      const history = createMemoryHistory()
      const observationId = 1
      history.push({
         pathname: `${OBSERVATION_SCREEN_PATH}${observationId}`,
         state: { userType: 'rp', currentPage: 'My Observations' }
      })
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
                  path={`${OBSERVATION_SCREEN_PATH}:id`}
                  component={RpObservationScreenRoute}
               />
               <Route
                  exact
                  path={RP_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )

      // await waitFor(() => {
      //    expect(rpStore.getObservationAPIStatus).toBe(API_SUCCESS)
      // })
      //getByText(/OBSERVATION/i)
      debug()
   })
})
