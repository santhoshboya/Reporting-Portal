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
import { RpObservationFixtureService } from '../../../RpModule/services/RpObservationFixtureService/RpObservationFixtureService'
import { ObservationFixtureService } from '../../../UserModule/services/ObservationFixtureService/ObservationFixtureService'
import { AdminObservationFixtureService } from '../../services/AdminObservationFixtureService/AdminObservationFixtureService'
import getObservationsResponse from '../../fixtures/getObservationsResponse.json'
import { ListOfObservationsRoute } from './ListOfObservationsRoute'
import { AdminStore } from '../../stores/AdminStore'

import { AuthAPI } from '../../../Authuntication/services/AuthService/AuthAPI'
import { AuthStore } from '../../../Authuntication/stores/AuthStore'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

const ADMIN_OBSERVATION_LIST_PATH = '/listofobservations'
const OBSERVATION_SCREEN_PATH = '/observationscreen/'

describe('User ObservationListRoute tests', () => {
   let observationService
   let authApi
   let authStore
   let rpObservationService
   let adminObservationService
   let adminStore
   beforeEach(() => {
      authApi = new AuthAPI()
      authStore = new AuthStore(authApi)
      observationService = new ObservationFixtureService()
      rpObservationService = new RpObservationFixtureService()
      adminObservationService = new AdminObservationFixtureService()
      adminStore = new AdminStore(
         adminObservationService,
         rpObservationService,
         observationService
      )
   })
   afterEach(() => {
      jest.restoreAllMocks()
   })

   it('should render Observations Assigned to  admin onclick observation', async () => {
      const history = createMemoryHistory()
      const route = ADMIN_OBSERVATION_LIST_PATH
      history.push(route)
      const {
         getByPlaceholderText,
         getByRole,
         queryByRole,
         getByTestId,
         debug,
         getAllByTestId
      } = render(
         <Provider adminStore={adminStore} authStore={authStore}>
            <Router history={history}>
               <Route
                  exact
                  path={ADMIN_OBSERVATION_LIST_PATH}
                  component={ListOfObservationsRoute}
               />
               <Route
                  exact
                  path={`${OBSERVATION_SCREEN_PATH}:id`}
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
      const mockSuccessPromise = Promise.resolve(getObservationsResponse)
      const mockObservationsAPI = jest.fn().mockReturnValue(mockSuccessPromise)
      observationService.getObservationApi = mockObservationsAPI
      // const observationId = 1
      // const onSuccess = jest.fn()
      // const onFailure = jest.fn()
      await adminStore.getAdminObservationList()
      await waitFor(() => {
         getAllByTestId('location-display')
      })
      expect(getByTestId('location-display')).toHaveTextContent(
         OBSERVATION_SCREEN_PATH
      )
   })

   // it('should render navigate to pages', async () => {
   //    const history = createMemoryHistory()
   //    const route = OBSERVATIONS_ASSIGNED_TO_RP
   //    history.push(route)
   //    const {
   //       getByPlaceholderText,
   //       getByRole,
   //       queryByRole,
   //       getByTestId,
   //       debug,
   //       getAllByTestId
   //    } = render(
   //       <Provider rpStore={rpStore} authStore={authStore}>
   //          <Router history={history}>
   //             <Route
   //                exact
   //                path={OBSERVATIONS_ASSIGNED_TO_RP}
   //                component={ObservationsAssignedToRpRoute}
   //             />
   //             <Route
   //                exact
   //                path={RP_OBSERVATION_LIST_PATH}
   //                component={LocationDisplay}
   //             />
   //          </Router>
   //       </Provider>
   //    )

   //    await waitFor(() => {
   //       getByTestId('My observations')
   //    })
   //    const result = getByTestId('My observations')
   //    fireEvent.click(result)
   //    const mockSuccessPromise = Promise.resolve(getObservationResponse)
   //    const mockObservationsAPI = jest.fn().mockReturnValue(mockSuccessPromise)
   //    observationService.getObservationListApi = mockObservationsAPI
   //    await rpStore.getObservationList()
   //    await waitFor(() => {
   //       getByTestId('location-display')
   //    })
   //    expect(getByTestId('location-display')).toHaveTextContent(
   //       RP_OBSERVATION_LIST_PATH
   //    )
   // })
})
