import React, { Component } from 'react'

import { ovalCss, rectangularCss } from './styledComponent'
import { buttonType, buttonVarient } from './constants'

import { BaseButton } from './BaseButton'
import { OutlineButton } from './OutlineButton'

class Button extends Component {
   static defaultProps = {
      type: buttonType.filled,
      varient: buttonVarient.oval
   }
   static buttonTypes = buttonType
   static buttonVarients = buttonVarient
   getButtonCss = () => {
      const { varient } = this.props
      switch (varient) {
         case buttonVarient.oval:
            return ovalCss
         case buttonVarient.re:
            return rectangularCss
         default:
            console.warn('invalid varient')
            return null
      }
   }
   render() {
      const { type, varient, ...otherProps } = this.props
      console.log(type, buttonType, Button.buttonTypes)

      switch (type) {
         case buttonType.filled:
            return (
               <BaseButton {...otherProps} buttonCss={this.getButtonCss()} />
            )
         case buttonType.outline:
            return (
               <OutlineButton {...otherProps} buttonCss={this.getButtonCss()} />
            )
         default:
            console.warn('invalid type')
            return null
      }
   }
}
export { Button }
