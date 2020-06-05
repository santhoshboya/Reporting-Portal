import React, { Component } from 'react'

import { RadioButtonElement } from './styledComponent'

class RadioButton extends Component {
   render() {
      const { onHandleCheck, name, className } = this.props
      return (
         <RadioButtonElement
            type='radio'
            onChange={onHandleCheck}
            name={name}
            className={className}

         ></RadioButtonElement>
      )
   }
}
export { RadioButton }
