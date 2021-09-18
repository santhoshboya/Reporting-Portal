import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import DatePicker from '.'

const validate = () => ({
   shouldShowError: true,
   errorMessage: '123'
})

storiesOf('Date Picker', module).add('ui date picker component', () => (
   <DatePicker
      validate={validate}
      date={new Date(2015, 4, 5)}
      isValid={true}
      onSelectDate={action('date selected')}
   />
))
