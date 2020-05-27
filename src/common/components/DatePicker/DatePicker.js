import React, { Component } from 'react'

import { DatePickerElement } from './styledComponent'
class DatePicker extends Component {
   render() {
      return (
         <DatePickerElement
            type='date'
            name='trip-start'
            value='2020-06-01'
            min='2010-01-01'
            max='2030-12-31'
         ></DatePickerElement>
      )
   }
}
export { DatePicker }
