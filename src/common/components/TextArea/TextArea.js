import React, { Component } from 'react'

import { TextAreaElement } from './styledComponent'

class TextArea extends Component {
   render() {
      const { value,className, onHandleChange,placeHolder } = this.props
      return (
         <TextAreaElement
            value={value}
            onChange={onHandleChange}
            placeholder={placeHolder}
            className={className}
         />
      )
   }
}
export { TextArea }