import React, { Component } from 'react'

import { RadioButtonElement } from './styledComponent'

class RadioButton extends Component {
   render() {
      const { onHandleCheck, value, name, privacy, className } = this.props
      return (
         <RadioButtonElement
            type='radio'
            onChange={onHandleCheck}
            name={name}
            className={className}
            value={value}
            checked={value === privacy ? true : false}


         ></RadioButtonElement>
      )
   }
}
export { RadioButton }
