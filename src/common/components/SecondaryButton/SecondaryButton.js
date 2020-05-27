import React, { Component } from 'react'
import { ButtonElement } from './styledComponent'
class SecondaryButton extends Component {
   render() {
      const { value, handleClick } = this.props
      return (
         <ButtonElement value={value} onClick={handleClick}>
            {value}
         </ButtonElement>
      )
   }
}
export { SecondaryButton }
