import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import CommonButton from '.'

describe('Button', () => {
   it('should test if the function passed is called on click', () => {
      const onPressMockFunction = jest.fn()
      const { getByText } = render(
         <CommonButton text='Login' onClick={onPressMockFunction} />
      )
      fireEvent.click(getByText('Login'))
      expect(onPressMockFunction).toBeCalled()
   })
})
