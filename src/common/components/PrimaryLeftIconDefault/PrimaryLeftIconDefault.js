import React, { Component } from 'react'
import { ButtonElement, LeftIcon } from './styledComponent'
class PrimaryLeftIconDefault extends Component {
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
