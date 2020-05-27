import React, { Component } from 'react'

import { InputElement } from './styledComponent'

class InputField extends Component {
   render() {
      const { type, value, onHandleChange } = this.props
      return (
         <InputElement
            type={type}
            value={value}
            onChange={onHandleChange}
         ></InputElement>
      )
   }
}
export { InputField }
