import React, { Component } from 'react'

import { DatePickerElement } from './styledComponent'

class DatePicker extends Component {
   render() {
      const { value, onChangeDate, userType } = this.props
      return (
         <DatePickerElement
            type='date'
            value={value}
            min='2010-01-01'
            max='2030-12-31'
            onChange={onChangeDate}
            disabled={userType === "user" ? true : false}
         ></DatePickerElement>
      )
   }
}
export { DatePicker }
