import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TextInput from '.'

describe('TextInput', () => {
   it('should test on change function', () => {
      const onChange = jest.fn()
      const { getByTestId } = render(
         <TextInput value={'hello'} onChange={onChange} />
      )
      const inputBox = getByTestId('input')
      fireEvent.change(inputBox, { target: { value: 'Good Day' } })
      expect(onChange).toHaveBeenCalled()
   })
   it('should test render error message', () => {
      const validate = () => ({
         shouldShowError: true,
         errorMessage: 'required'
      })
      const onChange = jest.fn()
      const { getByText, getByTestId } = render(
         <TextInput value={'hello'} onChange={onChange} validate={validate} />
      )
      const inputBox = getByTestId('input')
      fireEvent.blur(inputBox)
      getByText(/required/)
   })
})
