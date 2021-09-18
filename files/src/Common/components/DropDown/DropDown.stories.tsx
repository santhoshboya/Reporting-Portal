import React from 'react'
import { storiesOf } from '@storybook/react'

import DropDown from '.'

storiesOf('DropDown', module)
   .add('DefaultUi', () => (
      <DropDown
         placeholder={'Select One Option'}
         options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
         ]}
      />
   ))
   .add('ErrorMessageWithOnBlur', () => (
      <DropDown
         validate={() => ({ shouldShowError: true, errorMessage: 'error' })}
         placeholder={'Select One Option'}
         options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
         ]}
      />
   ))
   .add('Selected DropDownOption', () => (
      <DropDown
         placeholder={'Select One Option'}
         options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
         ]}
         value={{ value: 'strawberry', label: 'Strawberry' }}
      />
   ))

   .add('InDisabledState', () => (
      <DropDown
         placeholder={'Select One Option'}
         options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
         ]}
         isDisabled={true}
      />
   ))
