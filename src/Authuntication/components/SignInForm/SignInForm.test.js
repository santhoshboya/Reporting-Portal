import React from 'react'
import { render, getByRole, fireEvent } from '@testing-library/react'

import { SignInForm } from '.'

describe('SignInForm test cases', () => {
   it('should check signin button', () => {
      const onClickSignIn = jest.fn()
      const { getByText, debug, getByRole } = render(
         <SignInForm onClickSignIn={onClickSignIn} />
      )
      const signInButton = getByRole('button', { name: 'LOGIN' })
      fireEvent.click(signInButton)
      expect(onClickSignIn).toBeCalled()
   })
})
