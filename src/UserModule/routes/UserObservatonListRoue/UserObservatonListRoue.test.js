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

import { ObservationFixtureService } from '../../services/ObservationFixtureService/ObservationFixtureService'
import { UserObservatonListRoute } from './UserObservatonListRoute'
import { UserStore } from '../../stores/UserStore'
import getObservationsResponseForTesting from '../../fixtures/getObservationsResponseForTesting.json'

import { AuthAPI } from '../../../Authuntication/services/AuthService/AuthAPI'
import { AuthStore } from '../../../Authuntication/stores/AuthStore'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

const OBSERVATION = '/userobservation/'
const USER_OBSERVATION_LIST_PATH = '/userobservationslist'
const USER_OBSERVATION_SCREEN_PATH = '/userobservationscreen/'

describe('SigninRoute tests', () => {
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
                  path={USER_OBSERVATION_LIST_PATH}
                  component={UserObservatonListRoute}
               />
               <Route path={OBSERVATION} component={LocationDisplay} />
            </Router>
         </Provider>
      )
      const addNewButton = getByRole('button', { name: 'ADD NEW' })
      fireEvent.click(addNewButton)
      debug()
      expect(getByTestId('location-display')).toHaveTextContent(OBSERVATION)
   })

   // it("should render UserObservationScreen state", async () => {
   //   const history = createMemoryHistory();
   //   const route = USER_OBSERVATION_LIST_PATH;
   //   history.push(route);
   //   const {
   //     getByPlaceholderText,
   //     getByRole,
   //     queryByRole,
   //     getByTestId,
   //     debug,
   //     getAllByTestId
   //   } = render(
   //     <Provider userStore={userStore} authStore={authStore}>
   //       <Router history={history}>
   //         <Route path={USER_OBSERVATION_LIST_PATH} component={UserObservatonListRoute} />
   //         <Route path={OBSERVATION} component={LocationDisplay} />
   //       </Router>
   //     </Provider>
   //   );

   //   const result = getAllByTestId('observation-list-item')
   //   fireEvent.click(result[0]);
   //   console.log("result", result);

   //   const mockSuccessPromise = new Promise(function (resolve, reject) {
   //     resolve(getObservationResponse);
   //   });
   //   const mockObservationsAPI = jest.fn();
   //   mockObservationsAPI.mockReturnValue(mockSuccessPromise);
   //   observationApi.getObservationApi = mockObservationsAPI;
   //   await userStore.getObservation();

   //   debug();
   //   expect(getByTestId("location-display")).toHaveTextContent(
   //     OBSERVATION);
   // });
})
