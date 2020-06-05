import React, { Component } from 'react'

import { DatePickerElement } from './styledComponent'

class DatePicker extends Component {
   render() {
      const { value, onChangeDate, className, isDisabled } = this.props
      console.log("Date picker:- ", value)
      return (
         <DatePickerElement
            type='datetime-local'
            value={value}
            min='2010-01-01'
            max='2030-12-31'
            onChange={onChangeDate}
            disabled={isDisabled}
            className={className}
         ></DatePickerElement>
      )
   }
}
export { DatePicker }
