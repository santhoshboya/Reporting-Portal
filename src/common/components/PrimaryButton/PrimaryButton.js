import React, { Component } from 'react'
import { ButtonElement } from './styledComponent'
class PrimaryButton extends Component {
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
export { PrimaryButton }
