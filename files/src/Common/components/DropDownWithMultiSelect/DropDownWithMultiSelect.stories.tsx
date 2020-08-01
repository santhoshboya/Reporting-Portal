import React from 'react'
import { storiesOf } from '@storybook/react'

import DropDowWithMultiSelect from '.'

storiesOf('DropDownWithMultiSelect', module)
   .add('Default', () => (
      <DropDowWithMultiSelect
         placeholder={'Select One Option'}
         options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
            { value: 'blackberry', label: 'Blackberry' },
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
            { value: 'c', label: 'C' },
            { value: 'd', label: 'D' },
            { value: 'e', label: 'E' }
         ]}
         isMulti={true}
      />
   ))
   .add('with label', () => (
      <DropDowWithMultiSelect
         placeholder={'Select One Option'}
         options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
            { value: 'blackberry', label: 'Blackberry' }
         ]}
         isMulti={true}
         labelText='iBHubs'
      />
   ))
   .add('Multi input value', () => (
      <DropDowWithMultiSelect
         placeholder={'Select One Option'}
         options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
            { value: 'blackberry', label: 'Blackberry' }
         ]}
         isMulti={true}
         defaultValue={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' }
         ]}
      />
   ))
