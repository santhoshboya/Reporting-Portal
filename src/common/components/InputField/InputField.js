import React, { Component } from 'react'

import { InputElement } from './styledComponent'
import { observer } from 'mobx-react'
@observer
class InputField extends Component {
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
            onChange={onHandleChange}
            placeholder={placeHolder}
            className={className}
            data-testid={testid}
         ></InputElement>
      )
   }
}
export { InputField }
