import React, { Component } from 'react'
import { ButtonElement } from './styledComponent'
import Loader from 'react-loader-spinner'

interface PrimaryButtonProps{
   value:string,
   handleClick:()=>void,
   className:string,
   apiStatus?:number
}
class PrimaryButton extends Component<PrimaryButtonProps> {
   render() {
      const { value, handleClick, className, apiStatus } = this.props
      return (
         <ButtonElement
            className={className}
            value={value}
            onClick={handleClick}
            disabled={apiStatus === 100 ? true : false}
         >
            {apiStatus === 100 ? (
               <Loader type='Oval' height={25} width={25} color='white' />
            ) : (
               value
            )}
         </ButtonElement>
      )
   }
}
export { PrimaryButton }
