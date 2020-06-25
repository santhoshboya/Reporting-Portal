import React, { Component } from 'react'
import { ButtonElement } from './styledComponent'

interface SecondaryButtonProps{
   value:string,
   handleClick:()=>void,
   className:string
}
class SecondaryButton extends Component <SecondaryButtonProps>{
   render() {
      const { value, handleClick, className } = this.props
      return (
         <ButtonElement
            className={className}
            value={value}
            onClick={handleClick}
         >
            {value}
         </ButtonElement>
      )
   }
}
export { SecondaryButton }
