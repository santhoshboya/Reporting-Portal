import React, { Component } from 'react'

import Loader from '../../Loader'
import { ButtonProps } from '../types'

import { StyledBaseButton } from './styledComponents'

export default class BaseButton extends Component<ButtonProps> {
   static defaultProps = {
      className: ''
   }

   getChildren = ({ children, text, isLoading }) =>
      isLoading ? (
         <Loader
            color={'white'}
            height={25}
            width={25}
            className='loaderStyles'
         />
      ) : children ? (
         children
      ) : (
         text
      )

   render() {
      const {
         id,
         children,
         text,
         isLoading,
         startEnhancer,
         endEnhancer,
         ...otherProps
      } = this.props

      const { getChildren } = this

      return (
         <StyledBaseButton
            data-testid={id}
            {...{
               id,
               isLoading,
               ...otherProps
            }}
         >
            {startEnhancer && startEnhancer()}
            {getChildren({
               isLoading,
               children,
               text
            })}
            {endEnhancer && endEnhancer()}
         </StyledBaseButton>
      )
   }
}
