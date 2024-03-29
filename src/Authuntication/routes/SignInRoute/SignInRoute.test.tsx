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

import { AuthAPI } from '../../services/AuthService/AuthAPI'
import { AuthStore } from '../../stores/AuthStore'
import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'

import { SignInRoute } from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

const SIGN_IN_PATH = '/signin'
const USER_OBSERVATION_LIST_PATH = '/userobservationslist'

describe('SigninRoute tests', () => {
   let authAPI
   let authStore

   beforeEach(() => {
      authAPI = new AuthAPI()
      authStore = new AuthStore(authAPI)
   })
   afterEach(() => {
      jest.restoreAllMocks()
   })
   it('should render username empty error message', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const signInButton = getByRole('button', { name: 'LOGIN' })
      fireEvent.click(signInButton)
      getByText(/Please enter username/i)
   })

   it
   it('should render password empty error message', () => {
      const { getByText, getByRole, getByPlaceholderText } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const usernameField = getByPlaceholderText('Username')
      const signInButton = getByRole('button', { name: 'LOGIN' })
      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.click(signInButton)
      getByText(/Please enter password/i)
   })

   it('should render signInRoute loading state', async () => {
      const { getByText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('Username')
      const passwordField = getByPlaceholderText('Password')
      const signInButton = getByRole('button', { name: 'LOGIN' })

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockLoadingPromise)
      authAPI.signInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)
      expect(signInButton.disabled).toBe(true)
      console.log(signInButton.disabled,">>>>>>>>>>>>",signInButton);
      
   })

   it('should render signInRoute success state', async () => {
      const history = createMemoryHistory()
      const route = SIGN_IN_PATH
      history.push(route)

      const {
         getByPlaceholderText,
         getByRole,
         queryByRole,
         getByTestId
      } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path={SIGN_IN_PATH} component={SignInRoute} />
               <Route
                  path={USER_OBSERVATION_LIST_PATH}
                  component={LocationDisplay}
               />
            </Router>
         </Provider>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('Username')
      const passwordField = getByPlaceholderText('Password')
      const signInButton = getByRole('button', { name: 'LOGIN' })

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getUserSignInResponse)
      })
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      authAPI.signInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      await waitFor(() => {
         expect(
            queryByRole('button', { name: 'LOGIN' })
         ).not.toBeInTheDocument()

         expect(getByTestId('location-display')).toHaveTextContent(
            USER_OBSERVATION_LIST_PATH
         )
      })
   })

   it('should render signInRoute failure state', async () => {
      const { getByText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('Username')
      const passwordField = getByPlaceholderText('Password')
      const signInButton = getByRole('button', { name: 'LOGIN' })

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockFailurePromise)
      authAPI.signInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      await waitFor(() => {
         getByText(
            /We're having some trouble completing your request. Please try again./i
         )
      })
   })
})
