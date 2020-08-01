import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import DropDown from '.'

describe('DropDownWithMultiSelect component', () => {
   it('should render the dropdown ui component', () => {
      const { getByText } = render(
         <DropDown
            placeholder={'Select One Option'}
            options={[
               { value: 'chocolate', label: 'Chocolate' },
               { value: 'strawberry', label: 'Strawberry' },
               { value: 'vanilla', label: 'Vanilla' }
            ]}
         />
      )
      const dropDown = getByText('Select One Option')

      expect(dropDown).toBeDefined()
   })
   it('User should  be able to select dropdown Option', () => {
      const { getByText, getByTestId } = render(
         <DropDown
            placeholder={'Select One Option'}
            options={[
               { value: 'chocolate', label: 'Chocolate' },
               { value: 'strawberry', label: 'Strawberry' },
               { value: 'vanilla', label: 'Vanilla' }
            ]}
            isDisabled={false}
            isMulti={true}
         />
      )
      fireEvent.focus(getByText('Select One Option'))
      fireEvent.keyDown(getByText('Select One Option'), {
         key: 'ArrowDown',
         code: 40
      })
      const valueContainer = getByTestId('value-container')
      fireEvent.click(getByText('Vanilla'))
      fireEvent.click(getByText('Strawberry'))
      expect(valueContainer.textContent).toBe('VanillaStrawberry')
   })
})
