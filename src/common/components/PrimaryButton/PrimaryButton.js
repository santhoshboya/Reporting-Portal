import React, { Component } from 'react'
import { ButtonElement } from './styledComponent'
import Loader from 'react-loader-spinner'
class PrimaryButton extends Component {
   render() {
      const { value, handleClick, className, apiStatus } = this.props
      console.log("mkj", apiStatus)
      return (
         <ButtonElement
            className={className}
            value={value}
            onClick={handleClick}
         >
            {apiStatus === 100 ? <Loader type="Oval" height={25} width={25} color="white" /> :
               value}


         </ButtonElement>
      )
   }
}
export { PrimaryButton }
