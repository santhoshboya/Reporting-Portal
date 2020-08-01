import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import DropDown from '.'

describe('DropDown component', () => {
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
      const { container, getByText, debug } = render(
         <DropDown
            placeholder={'Select One Option'}
            options={[
               { value: 'chocolate', label: 'Chocolate' },
               { value: 'strawberry', label: 'Strawberry' },
               { value: 'vanilla', label: 'Vanilla' }
            ]}
            isDisabled={false}
         />
      )
      fireEvent.focus(getByText('Select One Option'))
      fireEvent.keyDown(getByText('Select One Option'), {
         key: 'ArrowDown',
         code: 40
      })

      fireEvent.click(getByText('Vanilla'))
      expect(getByText('Vanilla')).toBeDefined
   })
})
