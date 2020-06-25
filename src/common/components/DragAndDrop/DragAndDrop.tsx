import React, { Component } from 'react'

import { TextAreaElement } from './styledComponent'
import { InputField } from '../InputField'

interface DragAndDropProps{
   value:string,
   className?:string,
   onHandleChange?:()=>void, 
   placeHolder?:string 
}

class DragAndDrop extends Component <DragAndDropProps>{
   render() {
      const { value, className, onHandleChange, placeHolder } = this.props
      return (
         <TextAreaElement
            
            onChange={onHandleChange}
            placeholder={placeHolder}
            className={className}
         >
            <InputField type={'input'} value={value} />
         </TextAreaElement>
      )
   }
}
export { DragAndDrop }
