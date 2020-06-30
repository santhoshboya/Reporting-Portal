import React, { Component } from 'react'

import { InputElement } from './styledComponent'
import { observer } from 'mobx-react'
type InputFieldProps = {
   type: string
   testid?: string
   value: string
   onHandleChange: (value: string) => void
   placeHolder?: string
   className?: string
}

@observer
class InputField extends Component<InputFieldProps> {
   static defaultProps = {
      onHandleChange: () => {}
   }
   inputRef: React.RefObject<HTMLInputElement>

   constructor(props) {
      super(props)
      this.inputRef = React.createRef()
   }
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
            ref={this.inputRef}
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
