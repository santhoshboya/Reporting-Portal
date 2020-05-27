import React, { Component } from 'react'
import { ButtonElement, LeftIcon } from './styledComponent'
class PrimaryLeftIconDefault extends Component {
   render() {
      const { value, handleClick, src } = this.props
      return (
         <ButtonElement value={value} onClick={handleClick}>
            <LeftIcon src={src} />
            {value}
         </ButtonElement>
      )
   }
}
export { PrimaryLeftIconDefault }
