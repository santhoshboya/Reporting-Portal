import React, { Component } from 'react'

import { TextAreaElement } from './styledComponent'

class TextArea extends Component {
   onHandleChange = event => {
      this.props.onHandleChange(event.target.value)
   }

   render() {
      const {
         value,
         className,
         onHandleChange,
         placeHolder,
         isDisabled,
         testid
      } = this.props

      return (
         <TextAreaElement
            value={value}
            onChange={this.onHandleChange}
            placeholder={placeHolder}
            className={className}
            disabled={isDisabled}
            data-testid={testid}
         />
      )
   }
}
export { TextArea }
