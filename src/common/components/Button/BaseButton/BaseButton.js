import React, { Component } from 'react'
import { BaseButtonWrapper } from './styledComponent'
class BaseButton extends Component {
   static defultProps = {
      className: '',
      TextTypo: <span />
   }
   getIsDisabled = () => {
      const { isDisabled } = this.props
      return !isDisabled
   }
   isClickable = () => {
      const { onClick } = this.props
      let otherProps = {}
      if (this.getIsDisabled()) otherProps.onClick = onClick
      return otherProps
   }
   render() {
      const {
         text,
         textTypo: TextTypo,
         buttonCss,
         isDisabled,
         className
      } = this.props

      return (
         <BaseButtonWrapper
            className={className}
            {...this.isClickable()}
            css={buttonCss}
            isDisabled={isDisabled}
         >
            <TextTypo>{text}</TextTypo>
         </BaseButtonWrapper>
      )
   }
}
export { BaseButton }
