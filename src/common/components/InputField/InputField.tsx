import React, { Component } from 'react'

import { InputElement } from './styledComponent'
import { observer } from 'mobx-react'
type InputFieldProps={
   type:string,
   testid?:string,
   value:string,
   onHandleChange:Function,
   placeHolder?:string,
   className?:string
}

@observer
class InputField extends Component<InputFieldProps> {
   onHandleChange = event => {
      this.props.onHandleChange(event.target.value)
   }
   render() {
      const {
         type,
         testid,
         value,
         onHandleChange,
         placeHolder,
         className
      } = this.props
      return (
         <InputElement
            type={type}
            value={value}
            onChange={this.onHandleChange}
            placeholder={placeHolder}
            className={className}
            data-testid={testid}
         ></InputElement>
      )
   }
}
export { InputField }
