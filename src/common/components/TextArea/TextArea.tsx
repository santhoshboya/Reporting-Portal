import React, { Component } from 'react'

import { TextAreaElement } from './styledComponent'
interface TextAreaProps{
   value:string,
   className:string,
   onHandleChange:(value:string)=>void,
   placeHolder?:string,
   isDisabled?:boolean,
   testid?:string
}
class TextArea extends Component <TextAreaProps>{
   onHandleChange = event => {
      this.props.onHandleChange(event.target.value)
   }

   render() {
      const {
         value,
         className,
         
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
