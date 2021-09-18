import React, { Component } from 'react'
import { ButtonElement, LeftIcon } from './styledComponent'


interface PrimaryLeftIconDefaultProps{
   src:string
   handleClick:()=>void
   className:string,
   value:string
}
class PrimaryLeftIconDefault extends Component<PrimaryLeftIconDefaultProps> {
   render() {
      const { value, handleClick, src, className } = this.props
      return (
         <ButtonElement
            className={className}
            value={value}
            onClick={handleClick}
         >
            <LeftIcon src={src} />
            {value}
         </ButtonElement>
      )
   }
}
export { PrimaryLeftIconDefault }
