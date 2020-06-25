import React, { Component } from 'react'

import { RadioButtonElement } from './styledComponent'

interface RadioButtonProps{
   value:string,
   name:string,
   privacy:string,
   className:string,
   onHandleCheck:(value:string)=>void

}
class RadioButton extends Component<RadioButtonProps> {
   onHandleCheck = event => {
      this.props.onHandleCheck(event.target.value)
   }
   render() {
      const {  value, name, privacy, className } = this.props
      return (
         <RadioButtonElement
            type='radio'
            onChange={this.onHandleCheck}
            name={name}
            className={className}
            value={value}
            checked={value === privacy ? true : false}
         ></RadioButtonElement>
      )
   }
}
export { RadioButton }
